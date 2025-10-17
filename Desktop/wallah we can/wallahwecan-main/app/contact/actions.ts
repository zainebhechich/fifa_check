"use server"

import { sendEmail } from "@/lib/email"

export async function submitContact(formData: FormData) {
  const payload = {
    nom: (formData.get("nom") as string) || "",
    email: (formData.get("email") as string) || "",
    subject: (formData.get("subject") as string) || "",
    reason: (formData.get("reason") as string) || "",
    message: (formData.get("message") as string) || "",
    submittedAt: new Date().toISOString(),
  }

  const subject = payload.subject?.trim()
    ? `Contact: ${payload.subject}`
    : `Contact: Nouveau message`

  const html = `
    <div style="font-family: Inter, ui-sans-serif, system-ui;">
      <h2>Nouveau message de contact</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Nom</strong></td><td>${escapeHtml(payload.nom)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escapeHtml(payload.email)}</td></tr>
        <tr><td><strong>Raison</strong></td><td>${escapeHtml(payload.reason)}</td></tr>
        <tr><td><strong>Date</strong></td><td>${payload.submittedAt}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>
    </div>
  `

  await sendEmail({
    subject,
    html,
    text: `Nom: ${payload.nom}\nEmail: ${payload.email}\nRaison: ${payload.reason}\nDate: ${payload.submittedAt}\n\n${payload.message}`,
    replyTo: payload.email,
  })

  return { ok: true }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
