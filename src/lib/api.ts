// src/lib/api.ts
export async function submitContactForm(data: {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}) {
  const response = await fetch("http://localhost:1337/api/contacts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: data,
    }),
  });

  if (!response.ok) {
    throw new Error("Błąd podczas wysyłania formularza");
  }

  return response.json();
}
