"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPostPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params as any).slug as string;

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");
  const [newSlug, setNewSlug] = useState("");

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/blog/${slug}`);
      if (!res.ok) {
        setError("Failed to load post.");
        setLoading(false);
        return;
      }
      const json = await res.json();
      setTitle(json.title || "");
      setContent(json.content || "");
      setThumbnailUrl(json.thumbnailUrl || "");
      setAuthor(json.author || "");
      setNewSlug(json.slug || "");
      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title || !newSlug || !content || !author) {
      setError("All fields required.");
      return;
    }
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug: newSlug, content, thumbnailUrl, author }),
      });
      if (res.ok) {
        router.push(`/blog/${newSlug}`);
      } else {
        const json = await res.json();
        setError(json?.error ?? "Failed to update post.");
      }
    } catch (err) {
      setError("Network error.");
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full mb-4 p-3 border rounded" />
        <input value={newSlug} onChange={e => setNewSlug(e.target.value)} placeholder="Slug" className="w-full mb-4 p-3 border rounded" />
        <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" className="w-full mb-4 p-3 border rounded" />
        <textarea value={content} onChange={e => setContent(e.target.value)} rows={10} placeholder="Content (Markdown)" className="w-full mb-4 p-3 border rounded" />
        <input value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} placeholder="Thumbnail URL" className="w-full mb-4 p-3 border rounded" />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded" type="submit">Save</button>
      </form>
    </div>
  );
}
