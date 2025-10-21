import EditPostClient from '@/components/EditPostClient';
import { isAdminServer } from '@/lib/admin';
import { redirect } from 'next/navigation';

export default function EditPostPageWrapper() {
  if (!isAdminServer()) redirect('/admin/login');
  return <EditPostClient />;
}
 
