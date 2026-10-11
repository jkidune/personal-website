import { redirect } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import AdminStudio from "@/components/AdminStudio";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export { viewport } from "next-sanity/studio";

export const dynamic = "force-dynamic";

export default async function ContentStudioPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <main className="admin-studio-page">
      <AdminHeader active="content" />
      <div className="admin-studio-frame">
        <AdminStudio />
      </div>
    </main>
  );
}
