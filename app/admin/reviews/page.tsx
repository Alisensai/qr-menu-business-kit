import { ReviewReplyModule } from "@/components/admin/ReviewReplyModule";
import { SalesMessageBox } from "@/components/admin/SalesMessageBox";

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <ReviewReplyModule />
      <SalesMessageBox />
    </div>
  );
}
