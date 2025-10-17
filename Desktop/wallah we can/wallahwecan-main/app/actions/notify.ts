"use server"

import { sendEmail } from "@/lib/email"

function escape(input: string) {
  return (input || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

export async function notifyTeamBuilding(payload: any) {
  const subject = `Team Building: ${payload?.companyName || "Nouvelle demande"}`
  const html = `
    <div style="font-family: Inter, ui-sans-serif, system-ui;">
      <h2>Nouvelle demande Team Building</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Entreprise</strong></td><td>${escape(payload?.companyName)}</td></tr>
        <tr><td><strong>Contact</strong></td><td>${escape(payload?.contactPerson)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(payload?.email)}</td></tr>
        <tr><td><strong>Téléphone</strong></td><td>${escape(payload?.phone)}</td></tr>
        <tr><td><strong>Taille équipe</strong></td><td>${escape(payload?.teamSize)}</td></tr>
        <tr><td><strong>Dates</strong></td><td>${escape(payload?.preferredDates)}</td></tr>
        <tr><td><strong>Services</strong></td><td>${Array.isArray(payload?.serviceInterests) ? payload.serviceInterests.join(", ") : ""}</td></tr>
        <tr><td><strong>Budget</strong></td><td>${escape(payload?.budget)}</td></tr>
      </table>
      <h3>Message</h3>
      <p>${escape(payload?.message).replace(/\n/g, "<br/>")}</p>
    </div>
  `

  await sendEmail({
    subject,
    html,
    text: JSON.stringify(payload, null, 2),
    replyTo: payload?.email,
  })

  return { ok: true }
}

export async function notifyAdherer(payload: any) {
  const subject = `Adhésion: ${payload?.prenom ?? ""} ${payload?.nom ?? ""}`.trim()
  const html = `
    <div style="font-family: Inter, ui-sans-serif, system-ui;">
      <h2>Nouvelle demande d'adhésion</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Nom</strong></td><td>${escape(payload?.nom)}</td></tr>
        <tr><td><strong>Prénom</strong></td><td>${escape(payload?.prenom)}</td></tr>
        <tr><td><strong>Âge</strong></td><td>${escape(payload?.age)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(payload?.email)}</td></tr>
        <tr><td><strong>Numéro</strong></td><td>${escape(payload?.numero)}</td></tr>
        <tr><td><strong>Statut</strong></td><td>${escape(payload?.statut)}</td></tr>
        <tr><td><strong>Spécialité</strong></td><td>${escape(payload?.specialite)}</td></tr>
        <tr><td><strong>Compétences</strong></td><td>${Array.isArray(payload?.skills) ? payload.skills.join(", ") : ""}</td></tr>
        ${payload?.autres ? `<tr><td><strong>Autres</strong></td><td>${escape(payload.autres)}</td></tr>` : ""}
        <tr><td><strong>Disponibilité</strong></td><td>${escape(payload?.disponibilite)}</td></tr>
      </table>
      ${payload?.message ? `<h3>Message</h3><p>${escape(payload.message).replace(/\n/g, '<br/>')}</p>` : ''}
    </div>
  `

  await sendEmail({ subject, html, text: JSON.stringify(payload, null, 2), replyTo: payload?.email })
  return { ok: true }
}

export async function notifyStage(payload: any) {
  const subject = `Stage: ${payload?.prenom ?? ""} ${payload?.nom ?? ""}`.trim()
  const html = `
    <div style="font-family: Inter, ui-sans-serif, system-ui;">
      <h2>Nouvelle demande de stage</h2>
      <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
        <tr><td><strong>Nom</strong></td><td>${escape(payload?.nom)}</td></tr>
        <tr><td><strong>Prénom</strong></td><td>${escape(payload?.prenom)}</td></tr>
        <tr><td><strong>Âge</strong></td><td>${escape(payload?.age)}</td></tr>
        <tr><td><strong>Email</strong></td><td>${escape(payload?.email)}</td></tr>
        <tr><td><strong>Numéro</strong></td><td>${escape(payload?.numero)}</td></tr>
        <tr><td><strong>Université</strong></td><td>${escape(payload?.universite)}</td></tr>
        <tr><td><strong>Spécialité</strong></td><td>${escape(payload?.specialite)}</td></tr>
        <tr><td><strong>Année d'étude</strong></td><td>${escape(payload?.anneeEtude)}</td></tr>
        <tr><td><strong>Type de stage</strong></td><td>${escape(payload?.typeStage)}</td></tr>
        <tr><td><strong>Durée</strong></td><td>${escape(payload?.dureeStage)}</td></tr>
      </table>
      ${payload?.message ? `<h3>Message</h3><p>${escape(payload.message).replace(/\n/g, '<br/>')}</p>` : ''}
    </div>
  `

  await sendEmail({ subject, html, text: JSON.stringify(payload, null, 2), replyTo: payload?.email })
  return { ok: true }
}
