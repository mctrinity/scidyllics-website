import BlogPostCard from "@/components/BlogPostCard";
import { isAdminServer } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { BlogPost } from "@prisma/client";
import React from "react";

export default async function BlogPage() {
  const posts: BlogPost[] = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  const admin = isAdminServer();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 container mx-auto max-w-2xl py-16 px-4">
          <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold pt-4">Blog</h1>
          {admin && (
            <a
              href="/blog/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              New Post
            </a>
          )}
        </div>
        <div>
          {posts.length === 0 ? (
            <div className="text-gray-500 italic">No posts yet. Check back soon!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogPostCard
                  key={post.slug}
                  title={post.title}
                  author={post.author}
                  authorEmail={""} // TODO: link to User model
                  publishedAt={post.publishedAt.toISOString()}
                  thumbnailUrl={post.thumbnailUrl ?? undefined}
                    backgroundUrl={post.backgroundUrl ?? undefined}
                  excerpt={post.content.slice(0, 120) + (post.content.length > 120 ? "..." : "")}
                  slug={post.slug}
                  showControls={admin}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
