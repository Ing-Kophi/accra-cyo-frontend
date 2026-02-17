import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/home/Footer";
import { getUploadsUrl } from "../utils/uploads";

const CATEGORIES = [
  "All",
  "Camp",
  "Competitions",
  "Leadership",
  "Mass",
  "Recollection",
  "Meetings",
  "General"
];

export default function Media() {
  const [media, setMedia] = useState([]);
  const [active, setActive] = useState(null);
  const [category, setCategory] = useState("All");

  const fetchMedia = async (cat) => {
    const url =
      cat && cat !== "All"
        ? `/media/public?category=${cat}`
        : "/media/public";

    const res = await api.get(url);
    setMedia(res.data);
  };

  useEffect(() => {
    fetchMedia(category);
  }, [category]);

  return (
    <>
      {/* HEADER */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="cyogreen mb-2">Media Gallery</h1>
          <p className="lead">
            Moments and memories from our activities
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="container my-4 text-center">
        <div className="btn-group flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`btn btn-sm ${
                category === cat
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="container my-4">
        <div className="row g-3">
          {media.map(m => (
            <div key={m.id} className="col-6 col-md-4 col-lg-3">
              <img
                  src={getUploadsUrl(`posts/${m.file_name}`)}
                alt={m.title}
                className="img-fluid rounded shadow-sm"
                style={{
                  height: "220px",
                  width: "100%",
                  objectFit: "cover",
                  cursor: "pointer"
                }}
                onClick={() => setActive(m)}
              />
            </div>
          ))}

          {media.length === 0 && (
            <p className="text-muted text-center">
              No media found for this category.
            </p>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {active && (
        <div
          className="modal show d-block"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setActive(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div
              className="modal-content"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`http://localhost:5000/uploads/media/${active.file_name}`}
                className="img-fluid"
                alt={active.title}
              />
              {(active.title || active.caption) && (
                <div className="modal-body">
                  <h5>{active.title}</h5>
                  <p className="text-muted">{active.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}