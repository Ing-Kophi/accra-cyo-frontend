import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

export default function PostForm() {
  const { id } = useParams(); // undefined when creating
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
    type: "news",
    event_date: "",
    venue: "",
    is_published: false
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load post when editing
  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);

      setForm({
        title: res.data.title,
        content: res.data.content,
        type: res.data.type,
        event_date: res.data.event_date || "",
        venue: res.data.venue || "",
        is_published: Boolean(res.data.is_published)
      });
    } catch (err) {
      alert("Failed to load post");
      navigate("/admin/posts");
    }
  };

  fetchPost();
}, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const data = new FormData();
  Object.keys(form).forEach(key => {
    if (form[key] !== null) data.append(key, form[key]);
  });

   images.forEach(img => {
    data.append("images", img);
  });

  try {
    if (id) {
      await api.put(`/posts/${id}`, data);
    } else {
      await api.post("/posts", data);
    }

    navigate("/admin/posts");
  } finally {
    setLoading(false);
  }
 };

 if (id && !form.title && !loading) {
  return <p className="text-center mt-5">Loading post…</p>;
}

  return (
    <div className="container">
      <h4 className="cyogreen mb-3">
        {id ? "Edit Post" : "Create Post"}
      </h4>

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* TYPE */}
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            className="form-select"
            value={form.type}
            onChange={handleChange}
          >
            <option value="news">News</option>
            <option value="event">Event</option>
          </select>
        </div>

        {/* EVENT FIELDS */}
        {form.type === "event" && (
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Event Date</label>
              <input
                type="date"
                name="event_date"
                className="form-control"
                value={form.event_date}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label">Venue</label>
              <input
                name="venue"
                className="form-control"
                value={form.venue}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea
            name="content"
            className="form-control"
            rows="6"
            value={form.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Post Images (max 3)
          </label>

          <label className="form-label">Post Image</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files].slice(0, 3))}
          />
        </div>

        {/* PUBLISH */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="is_published"
            className="form-check-input"
            checked={form.is_published}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Publish immediately
          </label>
        </div>

        <button
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Post"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/posts")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}