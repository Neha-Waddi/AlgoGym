import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [handles, setHandles] = useState({ leetcode: '', gfg: '', codeforces: '' });

  useEffect(() => {
    if (session) {
      axios.get('/api/user-handles').then(res => setHandles(res.data));
    }
  }, [session]);

  const handleChange = (e) => {
    setHandles({ ...handles, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/user-handles', handles);
    alert('Handles saved!');
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Link Your Coding Profiles</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="leetcode" placeholder="LeetCode Handle" value={handles.leetcode} onChange={handleChange} className="w-full border p-2 text-black" />
        <input type="text" name="gfg" placeholder="GFG Handle" value={handles.gfg} onChange={handleChange} className="w-full border p-2 text-black" />
        <input type="text" name="codeforces" placeholder="Codeforces Handle" value={handles.codeforces} onChange={handleChange} className="w-full border p-2 text-black" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Handles</button>
      </form>
    </div>
  );
}
