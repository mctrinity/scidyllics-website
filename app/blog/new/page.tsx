
import { isAdminServer } from "@/lib/admin";
import { redirect } from "next/navigation";
import NewPostForm from "./NewPostForm";

export default function NewBlogPostPage() {
  if (!isAdminServer()) {
    redirect('/admin/login');
  }
  return (
    <NewPostForm />
  );
}
