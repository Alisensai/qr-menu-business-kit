import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { PricingManager } from "@/components/admin/PricingManager";
import { SalesMessageBox } from "@/components/admin/SalesMessageBox";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <AdminDashboard />
      <PricingManager />
      <SalesMessageBox />
    </div>
  );
}
