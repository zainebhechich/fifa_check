"use client";
import React from "react";
import { FileText } from "lucide-react";

const pdfFiles = [
    {
        name: "statuts fondateurs pv statuts amendés",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/lesregles-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL2xlc3JlZ2xlcy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDUwNCwiZXhwIjoxOTE1ODg0NTA0fQ.3yBjEF47UxOQhqt-liC0AaLbjZAAlr-fDWselC8QKpM",
    },
    {
        name: "patente code douane rne exoneration impot",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/patente%20code%20douane%20rne%20exoneration%20impot-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL3BhdGVudGUgY29kZSBkb3VhbmUgcm5lIGV4b25lcmF0aW9uIGltcG90LWNvbXByZXNzZWQucGRmIiwiaWF0IjoxNzU4MjA0NjMzLCJleHAiOjE5MTU4ODQ2MzN9.BhF5rBewJLcxZVhabVa5StHVXxd5lj6NxqwArX7L4wI",
    },
    {
        name: "JORT & declaration d'existence",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/JORT%20&%20declaration%20d'existence-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0pPUlQgJiBkZWNsYXJhdGlvbiBkJ2V4aXN0ZW5jZS1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDQ0OSwiZXhwIjoxOTE1ODg0NDQ5fQ.2w-7arlQQQTb9cVFQyaFU0CzbMkYAFCNfjegJTgisgo",
    },
    {
        name: "Narratifs et états financiers 2013 - 2019",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/narratifs,%20etats%20financiers%20et%20audits%202020%20-%202022-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL25hcnJhdGlmcywgZXRhdHMgZmluYW5jaWVycyBldCBhdWRpdHMgMjAyMCAtIDIwMjItY29tcHJlc3NlZC5wZGYiLCJpYXQiOjE3NTgyMDQ1NTEsImV4cCI6MTkxNTg4NDU1MX0.YjVpJaMr8IlGW8sh2_Kjp2ko2aBdacOGPhCVZY9SGtY",
    },
    {
        name: "Narratifs, etats financiers et audits 2020 - 2022",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/narratifs,%20etats%20financiers%20et%20audits%202020%20-%202022-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL25hcnJhdGlmcywgZXRhdHMgZmluYW5jaWVycyBldCBhdWRpdHMgMjAyMCAtIDIwMjItY29tcHJlc3NlZC5wZGYiLCJpYXQiOjE3NTgyMDQ1NTEsImV4cCI6MTkxNTg4NDU1MX0.YjVpJaMr8IlGW8sh2_Kjp2ko2aBdacOGPhCVZY9SGtY",
    },
    {
        name: "Domiciliation & CNSS",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/domiciliation%20&%20CNSS-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL2RvbWljaWxpYXRpb24gJiBDTlNTLWNvbXByZXNzZWQucGRmIiwiaWF0IjoxNzU4MjA0MzM4LCJleHAiOjE5MTU4ODQzMzh9.PlVveFIMCCd67ugREV611ksRSMZBsPJaOk46W7qaVPM",
    },
    {
        name: "Convs min Education 2014 & 2023",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/onvs%20min%20Education%202014%20&%202023-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL29udnMgbWluIEVkdWNhdGlvbiAyMDE0ICYgMjAyMy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDU2MywiZXhwIjoxOTE1ODg0NTYzfQ.RG63V3aPkti7pqj2sfD0UZu9V3jBPGjvBkP_cJ0q3Z8",
    },
    {
        name: "Publication des dons de l'ambassade des Pays-Bas",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Publication%20des%20dons%20de%20l'ambassade%20des%20Pays-Bas-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL1B1YmxpY2F0aW9uIGRlcyBkb25zIGRlIGwnYW1iYXNzYWRlIGRlcyBQYXlzLUJhcy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDcxMCwiZXhwIjoxOTE1ODg0NzEwfQ.B2rTJLHqktHCorfJH8aTjUc9K3Df6RCgPU4Z5dxIGaU",
    },
    {
        name: "Etats financiers et audit 2023",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Etats%20financiers%20et%20audit%202023-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0V0YXRzIGZpbmFuY2llcnMgZXQgYXVkaXQgMjAyMy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDM1MSwiZXhwIjoxOTE1ODg0MzUxfQ.cdmFMDTl16qwzemRj652m9XvbTOpUETr7YV2cUUIr8M",
    },
    {
        name: "Rapport narratif 2022",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Rapport%20narratif%202022-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL1JhcHBvcnQgbmFycmF0aWYgMjAyMi1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDcyNywiZXhwIjoxOTE1ODg0NzI3fQ.IWhlL__85QBugFgjzceS_rJKJURMQRdOdYI03i2g9_8",
    },
    {
        name: "Rapport narratif 2023",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Rapport%20narratif%202023-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL1JhcHBvcnQgbmFycmF0aWYgMjAyMy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDc0NCwiZXhwIjoxOTE1ODg0NzQ0fQ.YCZB27-oUi-BGPixE95g96MgjPQIPsX3dECjxyTyYF4",
    },
    {
        name: "Attestation de situation fiscal",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Attestation%20de%20situation%20fiscal-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL0F0dGVzdGF0aW9uIGRlIHNpdHVhdGlvbiBmaXNjYWwtY29tcHJlc3NlZC5wZGYiLCJpYXQiOjE3NTgyMDQxODEsImV4cCI6MTkxNTg4NDE4MX0.RpXiprMhIrbHaPI-dujW75FWaBR5HgzMVrnT2k6grhE",
    },
    {
        name: "Publication des dons étrangers 2021-2023",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Publication%20des%20dons%20de%20l'ambassade%20des%20Pays-Bas-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL1B1YmxpY2F0aW9uIGRlcyBkb25zIGRlIGwnYW1iYXNzYWRlIGRlcyBQYXlzLUJhcy1jb21wcmVzc2VkLnBkZiIsImlhdCI6MTc1ODIwNDcxMCwiZXhwIjoxOTE1ODg0NzEwfQ.B2rTJLHqktHCorfJH8aTjUc9K3Df6RCgPU4Z5dxIGaU",
    },
    {
        name: "Organigramme de WallahWeCan Global",
        url: "https://wxnjmlrnmqxnwtybppiz.supabase.co/storage/v1/object/sign/pdfs/Organigramme%20de%20WallahWeCan%20Global-compressed.pdf?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9mZGFhZTI0OC0zZDFjLTQ0MGMtYWE3Mi1jYzdhYjJiOWQ2NzgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwZGZzL09yZ2FuaWdyYW1tZSBkZSBXYWxsYWhXZUNhbiBHbG9iYWwtY29tcHJlc3NlZC5wZGYiLCJpYXQiOjE3NTgyMDQ1OTgsImV4cCI6MTkxNTg4NDU5OH0.K39K7KMPF2XQd_d8mEAlEwHPsDQ1YlzkBexmAuvLh_0",
    },
];

const GlassFolderGrid = () => {
    return (
        <div className="w-full space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {pdfFiles.map((file, fileIndex) => (
                    <div
                        key={fileIndex}
                        className="group p-3 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/50 hover:border-[#142346]/20 hover:bg-white/95 transition-all duration-300 hover:shadow-md"
                    >
                        <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3"
                        >
                            <div className="w-8 h-8 rounded-md bg-[#142346]/10 text-[#142346] flex items-center justify-center flex-shrink-0 group-hover:bg-[#142346]/20 transition-colors">
                                <FileText className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 group-hover:text-[#142346] transition-colors line-clamp-2 mb-1">
                                    {file.name}
                                </h4>
                                <p className="text-xs text-gray-500 group-hover:text-gray-600">
                                    Document PDF
                                </p>
                            </div>
                            <div className="text-[#142346] opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GlassFolderGrid;
