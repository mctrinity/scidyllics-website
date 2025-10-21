"use client";
import React from "react";

export default function AdminToolbar({ onLogout }: { onLogout?: () => void }) {
  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-white border rounded p-2 shadow">
        <button onClick={logout} className="text-sm px-3 py-1 bg-red-100 text-red-600 rounded">Logout</button>
      </div>
    </div>
  );
}
