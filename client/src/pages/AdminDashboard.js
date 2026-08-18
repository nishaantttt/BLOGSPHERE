import { useEffect, useState } from "react";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [tab, setTab] = useState("users");
  const token = localStorage.getItem("token");

  const authHeader = { Authorization: `Bearer ${token}` };

  const fetchUsers = async () => {
    const res = await fetch("http://localhost:8000/api/admin/users", {
      headers: authHeader,
    });
    const data = await res.json();
    setUsers(data);
  };

  const fetchBlogs = async () => {
    const res = await fetch("http://localhost:8000/api/admin/blogs", {
      headers: authHeader,
    });
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchUsers();
    fetchBlogs();
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await fetch(`http://localhost:8000/api/admin/users/${id}`, {
      method: "DELETE",
      headers: authHeader,
    });
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Remove this blog?")) return;
    await fetch(`http://localhost:8000/api/admin/blogs/${id}`, {
      method: "DELETE",
      headers: authHeader,
    });
    setBlogs((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <div className="app-shell px-4 py-10 sm:px-6">
      <div className="mx-auto w-full max-w-5xl">
        <h2 className="section-title !text-2xl">Admin Dashboard</h2>
        <p className="section-subtitle mb-6">Manage users and moderate content.</p>

        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setTab("users")}
            className={tab === "users" ? "primary-btn" : "secondary-btn"}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => setTab("blogs")}
            className={tab === "blogs" ? "primary-btn" : "secondary-btn"}
          >
            Blogs ({blogs.length})
          </button>
        </div>

        {tab === "users" && (
          <div className="glass-card overflow-x-auto p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 text-slate-500">
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-orange-50">
                    <td className="py-2">{u.name}</td>
                    <td className="py-2">{u.email}</td>
                    <td className="py-2 capitalize">{u.role}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="text-sm font-semibold text-rose-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "blogs" && (
          <div className="glass-card overflow-x-auto p-4">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-orange-100 text-slate-500">
                  <th className="py-2">Title</th>
                  <th className="py-2">Author</th>
                  <th className="py-2">Category</th>
                  <th className="py-2"></th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => (
                  <tr key={b._id} className="border-b border-orange-50">
                    <td className="py-2">{b.title}</td>
                    <td className="py-2">{b.author?.name}</td>
                    <td className="py-2">{b.category}</td>
                    <td className="py-2 text-right">
                      <button
                        onClick={() => handleDeleteBlog(b._id)}
                        className="text-sm font-semibold text-rose-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;