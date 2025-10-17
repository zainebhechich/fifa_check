export type SendEmailArgs = {
  to?: string | string[]
  subject: string
  html?: string
  text?: string
  replyTo?: string | string[]
}

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailArgs): Promise<{ ok: boolean; id?: string; warning?: string }> {
  const TO = to ?? process.env.CONTACT_TO ?? "contact@wallahwecan.org"
  const FROM = process.env.EMAIL_FROM ?? "Wallah We Can <onboarding@resend.dev>"
  const API_KEY = process.env.RESEND_API_KEY

  if (!API_KEY) {
    console.warn("[email] RESEND_API_KEY not set – logging message instead of sending")
    console.log({ to: TO, subject, html, text })
    return { ok: true, warning: "RESEND_API_KEY not configured. Email logged to server console." }
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: Array.isArray(TO) ? TO : [TO],
        subject,
        html,
        text,
        reply_to: replyTo ? (Array.isArray(replyTo) ? replyTo : [replyTo]) : undefined,
      }),
    })

    if (!res.ok) {
      const msg = await res.text()
      console.error("[email] Resend error", res.status, msg)
      return { ok: false, warning: msg }
    }

    const data = await res.json()
    return { ok: true, id: data?.id }
  } catch (err) {
    console.error("[email] send error", err)
    return { ok: false, warning: String(err) }
  }
}
