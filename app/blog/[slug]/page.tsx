
import { getGravatarUrl } from "@/lib/gravatar";
import { prisma } from "@/lib/prisma";
import React from "react";
import { notFound } from "next/navigation";
import { isAdminServer } from "@/lib/admin";
import ReactMarkdown from "react-markdown";
import CommentForm from "@/components/CommentForm";
import remarkGfm from "remark-gfm";

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      comments: {
        include: {
          author: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!post) return notFound();

  const admin = isAdminServer();
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="flex-1 container mx-auto max-w-2xl py-16 px-4">
        <div className="bg-white/90 border border-gray-200 rounded-2xl shadow-lg p-8 mt-8 mb-8 md:mb-12">
          {post.thumbnailUrl && (
            <img src={post.thumbnailUrl} alt="Thumbnail" className="w-full h-64 object-cover rounded-xl mb-6" />
          )}
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <img src={getGravatarUrl(post.author, 40)} alt={post.author} className="rounded-full w-10 h-10" />
            <span className="font-medium text-gray-700">{post.author}</span>
            <span className="text-xs text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <article className="prose prose-indigo max-w-none mb-8">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </article>
          <hr className="my-8" />
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-6">
            {post.comments.length === 0 ? (
              <div className="text-gray-500 italic">No comments yet.</div>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-4">
                  <img src={getGravatarUrl(comment.author.email, 36)} alt={comment.author.name} className="rounded-full w-9 h-9" />
                  <div>
                    <div className="font-medium text-gray-800">{comment.author.name}</div>
                    <div className="text-xs text-gray-500 mb-1">{new Date(comment.createdAt).toLocaleString()}</div>
                    <div className="text-gray-700">{comment.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Comment form */}
          <CommentForm slug={params.slug} />
        </div>
      </main>
    </div>
  );
}
