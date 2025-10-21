export const dynamic = 'force-dynamic';

import { isAdminServer } from '@/lib/admin';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function AdminDBPage() {
  // server-side admin check
  const admin = isAdminServer();
  if (!admin) return redirect('/admin/login');

  const users = await prisma.user.findMany({ select: { id: true, name: true, email: true, avatarUrl: true } });
  const posts = await prisma.blogPost.findMany({ select: { id: true, title: true, slug: true, thumbnailUrl: true, author: true } });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Database</h1>
      <h2 className="font-semibold">Users</h2>
      <pre className="bg-gray-100 p-4 rounded mb-6">{JSON.stringify(users, null, 2)}</pre>
      <h2 className="font-semibold">Posts</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(posts, null, 2)}</pre>
    </div>
  );
}
