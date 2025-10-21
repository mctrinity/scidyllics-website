"use client";
import React, { useState, useEffect } from "react";

interface Props {
  src?: string | null;
  alt?: string;
  className?: string;
}

export default function ImageWithFallback({ src, alt = "", className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  // Don't set resolvedSrc to the raw src immediately for album/gallery URLs
  const [resolvedSrc, setResolvedSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    let mounted = true;
    async function tryResolve() {
      if (!src) return;
      try {
        const url = new URL(src, 'https://example.com');
        if (url.hostname.includes('imgur.com') && (url.pathname.includes('/a/') || url.pathname.includes('/gallery/'))) {
          const res = await fetch(`/api/resolve-thumbnail?url=${encodeURIComponent(src)}`);
          const json = await res.json();
          if (mounted && json?.resolved) setResolvedSrc(json.resolved);
        } else {
          // For direct image URLs, set immediately
          setResolvedSrc(src);
        }
      } catch (err) {
        setResolvedSrc(src);
      }
    }
    tryResolve();
    return () => { mounted = false; };
  }, [src]);

  if (!resolvedSrc || failed) {
    return (
      <div className={`bg-gray-100 border border-gray-200 rounded-md flex items-center justify-center text-gray-400 ${className}`}>
        <span className="text-sm">No image</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
