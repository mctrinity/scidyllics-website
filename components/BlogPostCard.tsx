"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ImageWithFallback from "@/components/ImageWithFallback";
import { getGravatarUrl } from "@/lib/gravatar";

export interface BlogPostCardProps {
  title: string;
  author: string;
  authorEmail: string;
  publishedAt: string;
  thumbnailUrl?: string;
  backgroundUrl?: string;
  excerpt?: string;
  slug: string;
}

export default function BlogPostCard({
  title,
  author,
  authorEmail,
  publishedAt,
  thumbnailUrl,
  backgroundUrl,
  excerpt,
  slug,
  showControls,
}: BlogPostCardProps & { showControls?: boolean }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const ok = confirm("Delete this post? This cannot be undone.");
    if (!ok) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/blog/${slug}`, { method: "DELETE" });
      if (res.ok) {
        window.location.reload();
      } else {
        const json = await res.json();
        setError(json?.error ?? "Failed to delete post.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <a href={`/blog/${slug}`} className="group block">
      <motion.div
        className="bg-white/90 border border-gray-200 rounded-xl shadow-md overflow-hidden mb-6 transition-shadow flex flex-col h-full"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.995 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {backgroundUrl ? (
          <div
            className="h-48 w-full bg-center bg-cover relative"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          >
            <div className="absolute inset-0 bg-black/10" />
            {thumbnailUrl && (
              <div className="absolute top-3 left-3 z-10 w-12 h-12 rounded-md overflow-hidden border border-white/60">
                <ImageWithFallback src={thumbnailUrl} alt={`${title} thumbnail`} className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        ) : (
          <div className="h-48 w-full overflow-hidden relative">
            {/* ImageWithFallback handles missing/failed images */}
            <ImageWithFallback src={thumbnailUrl} alt={`${title} thumbnail`} className="w-full h-full object-cover" />
          </div>
        )}
        
  <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <img src={getGravatarUrl(authorEmail, 32)} alt={author} className="rounded-full w-8 h-8" />
              <span className="font-medium text-gray-700">{author}</span>
              <span className="text-xs text-gray-500">{new Date(publishedAt).toLocaleDateString()}</span>
            </div>
            {excerpt && <p className="text-gray-600 mb-2 line-clamp-2">{excerpt}</p>}
          </div>
          {showControls && (
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={(e) => {
                  // Prevent the outer anchor from navigating to the post page
                  e.preventDefault();
                  e.stopPropagation();
                  // navigate to edit page
                  window.location.href = `/blog/${slug}/edit`;
                }}
                className="px-3 py-1 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
              >
                Edit
              </button>
              <button type="button" onClick={handleDelete} disabled={loading} className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm hover:bg-red-200">{loading ? 'Deleting...' : 'Delete'}</button>
            </div>
          )}
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
  </motion.div>
    </a>
  );
}
