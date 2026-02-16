import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function MediaForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    caption: "",
    category: "",
    is_public: true
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const MEDIA_CATEGORIES = [
  "Camp",
  "Competitions",
  "Leadership",
  "Mass",
  "Recollection",
  "Meetings",
  "General"
];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    setLoading(true);

    const data = new FormData();
    data.append("image", image);

    Object.keys(form).forEach(key => {
      data.append(key, form[key]);
    });

    try {
      await api.post("/media", data);
      navigate("/admin/media");
    } catch {
      alert("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h4 className="cyogreen mb-3">Upload Media</h4>

      <form onSubmit={handleSubmit} className="col-md-6">

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Title (optional)</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Caption (optional)</label>
          <textarea
            name="caption"
            className="form-control"
            rows="3"
            value={form.caption}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            className="form-control"
            value={form.category}
            onChange={handleChange}
            required
            >
              <option value="">Select Category</option>
              {MEDIA_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="is_public"
            className="form-check-input"
            checked={form.is_public}
            onChange={handleChange}
          />
          <label className="form-check-label">
            Make public
          </label>
        </div>

        <button
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/media")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}