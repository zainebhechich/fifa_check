import WallahWeCanNavbar from "../../../../navbar";
import { Footer } from "@/components/footer";

export default function ContactTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <WallahWeCanNavbar />
      <main className="pt-24 pb-12 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800 dark:text-white">
          Équipe de contact
        </h1>
        <p className="text-lg text-center text-slate-600 dark:text-slate-300">
          Découvrez les membres de notre équipe et comment les contacter directement.
        </p>
        {/* Add team contact info here */}
      </main>
      <Footer />
    </div>
  );
}
