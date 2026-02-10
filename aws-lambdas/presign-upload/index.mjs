// presign-upload/index.mjs
// Lambda: agencja-copywriterska-presign
// Generuje presigned URL do uploadu plików na S3

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

const s3 = new S3Client({ region: process.env.AWS_REGION || "eu-north-1" });
const BUCKET = process.env.BUCKET_NAME || "agencja-copywriterska-attachments";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_EXTENSIONS = [
  ".pdf", ".doc", ".docx", ".jpg", ".jpeg", ".png",
  ".zip", ".rar", ".xlsx", ".txt"
];

const headers = {
  "Access-Control-Allow-Origin": "https://agencja-copywriterska.pl",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

export const handler = async (event) => {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { filename, contentType, size } = body;

    // Walidacja
    if (!filename || !contentType) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Brak nazwy pliku lub typu" }),
      };
    }

    if (size && size > MAX_SIZE) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Plik za duży (maks. 10 MB)" }),
      };
    }

    const ext = "." + filename.split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Niedozwolony format pliku. Dozwolone: " + ALLOWED_EXTENSIONS.join(", "),
        }),
      };
    }

    // Generuj unikalny klucz S3
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const uuid = randomUUID().slice(0, 8);
    const safeFilename = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `uploads/${date}/${uuid}-${safeFilename}`;

    // Generuj presigned URL (ważny 10 min)
    const command = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 600 });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ uploadUrl, key }),
    };
  } catch (error) {
    console.error("Presign error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Błąd generowania linku" }),
    };
  }
};
