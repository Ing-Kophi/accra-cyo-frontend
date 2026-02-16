import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function MediaList() {
  const [media, setMedia] = useState([]);
  const navigate = useNavigate();

  const fetchMedia = async () => {
    const res = await api.get("/media");
    setMedia(res.data);
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const deleteMedia = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await api.delete(`/media/${id}`);
    fetchMedia();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">Media Gallery</h4>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/media/new")}
      >
        Upload Image
      </button>

      <div className="row g-3">
        {media.map(m => (
          <div key={m.id} className="col-md-3">
            <div className="card h-100 shadow-sm">
              <img
                src={`http://localhost:5000/uploads/media/${m.file_name}`}
                className="card-img-top"
                alt={m.title || "Media"}
                style={{ height: "180px", objectFit: "cover" }}
              />

              <div className="card-body p-2">
                <h6 className="mb-1">{m.title || "Untitled"}</h6>

                {m.category && (
                  <small className="text-muted">{m.category}</small>
                )}

                <div className="mt-2 d-flex justify-content-between">
                  <span
                    className={`badge ${
                      m.is_public ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {m.is_public ? "Public" : "Private"}
                  </span>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteMedia(m.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <p className="text-muted">No media uploaded yet.</p>
        )}
      </div>
    </div>
  );
}