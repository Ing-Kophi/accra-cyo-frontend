import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function DocumentForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    is_public: true,
    file: null
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key] !== null) data.append(key, form[key]);
    });

    try {
      await api.post("/documents", data);
      navigate("/admin/documents");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h4 className="cyogreen mb-3">Upload Document</h4>

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        {/* CATEGORY */}
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input
            className="form-control"
            placeholder="e.g. Constitution, Reports, Forms"
            required
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-3">
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-control"
            rows="3"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* FILE */}
        <div className="mb-3">
          <label className="form-label">Document File</label>
          <input
            type="file"
            className="form-control"
            accept=".pdf,.doc,.docx,.xls,.xlsx"
            required
            onChange={(e) =>
              setForm({ ...form, file: e.target.files[0] })
            }
          />
        </div>

        {/* VISIBILITY */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={form.is_public}
            onChange={(e) =>
              setForm({ ...form, is_public: e.target.checked })
            }
          />
          <label className="form-check-label">
            Make document public
          </label>
        </div>

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Uploading..." : "Upload Document"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/documents")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}