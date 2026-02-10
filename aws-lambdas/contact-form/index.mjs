// contact-form/index.mjs
// Lambda: agencja-copywriterska-contact
// Przetwarza formularz kontaktowy i wysyła email przez SES

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const REGION = process.env.AWS_REGION || "eu-north-1";
const SES_REGION = "us-east-1";
const ses = new SESClient({ region: SES_REGION });
const s3 = new S3Client({ region: REGION });

const BUCKET = process.env.BUCKET_NAME || "agencja-copywriterska-attachments";
const TO_EMAIL = "kontakt@agencja-copywriterska.pl";
const FROM_EMAIL = "formularz@agencja-copywriterska.pl";
const FROM_NAME = "Agencja Copywriterska";

const headers = {
  "Access-Control-Allow-Origin": "https://agencja-copywriterska.pl",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json",
};

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export const handler = async (event) => {
  // CORS preflight
  if (event.requestContext?.http?.method === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, phone, company, service, message, attachments } = body;

    // Walidacja
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: "Brak wymaganych pól (name, email, message)",
        }),
      };
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Nieprawidłowy adres email" }),
      };
    }

    // Generuj linki do pobrania załączników (ważne 7 dni)
    let attachmentsHtml = "";
    if (attachments && attachments.length > 0) {
      const attachmentLinks = [];
      for (const att of attachments) {
        try {
          const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: att.key,
          });
          const downloadUrl = await getSignedUrl(s3, command, {
            expiresIn: 7 * 24 * 60 * 60, // 7 dni
          });
          attachmentLinks.push(
            `<li><a href="${downloadUrl}">${escapeHtml(att.name)}</a> (${formatSize(att.size || 0)})</li>`,
          );
        } catch (err) {
          console.error("Error generating download URL for:", att.key, err);
          attachmentLinks.push(
            `<li>${escapeHtml(att.name)} - <em>błąd generowania linku</em></li>`,
          );
        }
      }
      attachmentsHtml = `
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;vertical-align:top;width:140px;border-bottom:1px solid #eef1f8">Załączniki:</td>
          <td style="padding:12px 16px;color:#4a5178;border-bottom:1px solid #eef1f8">
            <ul style="margin:0;padding-left:20px">${attachmentLinks.join("")}</ul>
            <p style="font-size:12px;color:#999;margin-top:8px">Linki ważne 7 dni</p>
          </td>
        </tr>`;
    }

    // Buduj email HTML
    const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fc">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#12193a,#1a2248);border-radius:16px 16px 0 0;padding:32px;text-align:center">
      <h1 style="color:#fcbb42;font-size:20px;margin:0 0 8px">Nowe zapytanie z formularza</h1>
      <p style="color:rgba(255,255,255,.7);font-size:14px;margin:0">agencja-copywriterska.pl</p>
    </div>
    
    <!-- Body -->
    <div style="background:white;padding:0;border-radius:0 0 16px 16px;box-shadow:0 4px 12px rgba(18,25,58,.08)">
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;width:140px;border-bottom:1px solid #eef1f8">Imię i nazwisko:</td>
          <td style="padding:12px 16px;color:#4a5178;border-bottom:1px solid #eef1f8">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;border-bottom:1px solid #eef1f8">Email:</td>
          <td style="padding:12px 16px;border-bottom:1px solid #eef1f8">
            <a href="mailto:${escapeHtml(email)}" style="color:#fcbb42">${escapeHtml(email)}</a>
          </td>
        </tr>
        ${
          phone
            ? `<tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;border-bottom:1px solid #eef1f8">Telefon:</td>
          <td style="padding:12px 16px;color:#4a5178;border-bottom:1px solid #eef1f8">${escapeHtml(phone)}</td>
        </tr>`
            : ""
        }
        ${
          company
            ? `<tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;border-bottom:1px solid #eef1f8">Firma:</td>
          <td style="padding:12px 16px;color:#4a5178;border-bottom:1px solid #eef1f8">${escapeHtml(company)}</td>
        </tr>`
            : ""
        }
        ${
          service
            ? `<tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;border-bottom:1px solid #eef1f8">Usługa:</td>
          <td style="padding:12px 16px;color:#4a5178;border-bottom:1px solid #eef1f8">
            <span style="background:rgba(252,187,66,.15);color:#12193a;padding:4px 12px;border-radius:99px;font-size:13px;font-weight:500">${escapeHtml(service)}</span>
          </td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding:12px 16px;font-weight:600;color:#12193a;vertical-align:top;border-bottom:1px solid #eef1f8">Wiadomość:</td>
          <td style="padding:12px 16px;color:#4a5178;line-height:1.6;border-bottom:1px solid #eef1f8">${escapeHtml(message).replace(/\n/g, "<br>")}</td>
        </tr>
        ${attachmentsHtml}
      </table>
      
      <!-- Reply button -->
      <div style="padding:24px 16px;text-align:center">
        <a href="mailto:${escapeHtml(email)}?subject=Re: Zapytanie - ${escapeHtml(FROM_NAME)}" 
           style="display:inline-block;padding:12px 32px;background:#fcbb42;color:#12193a;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px">
          Odpowiedz na zapytanie
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <p style="text-align:center;font-size:12px;color:#999;margin-top:24px">
      Wiadomość wysłana z formularza kontaktowego agencja-copywriterska.pl
    </p>
  </div>
</body>
</html>`;

    // Wyślij email
    const command = new SendEmailCommand({
      Source: `${FROM_NAME} <${FROM_EMAIL}>`,
      Destination: { ToAddresses: [TO_EMAIL] },
      ReplyToAddresses: [email],
      Message: {
        Subject: {
          Data: `Nowe zapytanie: ${name}${service ? " – " + service : ""}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: { Data: htmlBody, Charset: "UTF-8" },
        },
      },
    });

    await ses.send(command);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Błąd wysyłania wiadomości" }),
    };
  }
};
