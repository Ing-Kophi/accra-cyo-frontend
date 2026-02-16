import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await api.delete(`/posts/${id}`);
    fetchPosts();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">News & Events</h4>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/posts/new")}
      >
        Add New
      </button>

      <table className="table table-bordered table-sm">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Published</th>
            <th style={{ width: "180px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td className="text-capitalize">{p.type}</td>
              <td>
                {p.is_published ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/admin/posts/edit/${p.id}`)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deletePost(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}