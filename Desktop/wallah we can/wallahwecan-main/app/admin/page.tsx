import { redirect } from "next/navigation";

// PHASE 2 admin isolation: keep admin outside i18n; route directly to dashboard
export default function AdminPage() {
  redirect("/admin/dashboard");
}
