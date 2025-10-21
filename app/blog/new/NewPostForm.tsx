"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  function slugify(str: string) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-");
  }

  React.useEffect(() => {
    if (!slugManuallyEdited) setSlug(slugify(title));
  }, [title, slugManuallyEdited]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!title || !slug || !content || !author) {
      setError("All fields except thumbnail are required.");
      return;
    }
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug, content, thumbnailUrl, author }),
      });
      if (res.ok) {
        router.push(`/blog/${slug}`);
      } else {
        setError("Failed to create post.");
      }
    } catch {
      setError("Network error.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form className="bg-white border rounded-xl shadow-lg p-8 w-full max-w-5xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Create New Blog Post</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <input className="w-full mb-4 p-3 border rounded-lg" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full mb-4 p-3 border rounded-lg" placeholder="Slug (auto-generated, can edit)" value={slug} onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true); }} />
        <input className="w-full mb-4 p-3 border rounded-lg" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <textarea className="w-full mb-4 p-3 border rounded-lg" placeholder="Content (Markdown or HTML)" rows={6} value={content} onChange={(e) => setContent(e.target.value)} />
        <input className="w-full mb-4 p-3 border rounded-lg" placeholder="Thumbnail URL (optional)" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Create Post</button>
      </form>
    </div>
  );
}
