import React from 'react';

export default function AdminDBPage() {
  const [data, setData] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch('/api/admin/db')
      .then(res => res.json())
      .then(json => {
        if (json.error) setError(json.error);
        else setData(json);
      })
      .catch(() => setError('Failed to fetch'));
  }, []);

  if (error) return <div className="p-8 text-red-600">{error}</div>;
  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Database</h1>
      <h2 className="font-semibold">Users</h2>
      <pre className="bg-gray-100 p-4 rounded mb-6">{JSON.stringify(data.users, null, 2)}</pre>
      <h2 className="font-semibold">Posts</h2>
      <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data.posts, null, 2)}</pre>
    </div>
  );
}
