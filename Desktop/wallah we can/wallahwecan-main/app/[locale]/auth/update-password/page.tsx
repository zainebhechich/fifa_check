"use client";

import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "@/components/footer";
import { UpdatePasswordForm } from "@/components/update-password-form";

export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <WallahWeCanNavbar />
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-md">
          <UpdatePasswordForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
