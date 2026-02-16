import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/home/Footer";

export default function PublicDocuments() {
  const [documents, setDocuments] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.get("/documents/public").then(res => setDocuments(res.data));
  }, []);

  const filteredDocs = documents.filter(d =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* PAGE HEADER */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="cyogreen mb-2">Document Center</h1>
          <p className="lead">
            Official publications, forms, and important documents
            of the Accra Archdiocesan CYO.
          </p>
        </div>
      </section>

      {/* DOCUMENT LIST */}
      <section className="container my-5">

        {/* SEARCH */}
        <div className="row mb-4 justify-content-center">
          <div className="col-md-6">
            <input
              className="form-control"
              placeholder="Search documents by title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filteredDocs.length === 0 ? (
          <p className="text-center text-muted">
            No documents available.
          </p>
        ) : (
          <div className="row g-4">
            {filteredDocs.map(doc => (
              <div className="col-md-6 col-lg-4" key={doc.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{doc.title}</h5>

                    <span className="badge bg-success mb-2 align-self-start">
                      {doc.category}
                    </span>

                    {doc.description && (
                      <p className="card-text small">
                        {doc.description}
                      </p>
                    )}

                    <p className="small text-muted mt-auto">
                      Uploaded:{" "}
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </p>

                    <a
                      href={`http://localhost:5000/uploads/documents/${doc.file}`}
                      className="btn btn-outline-success btn-sm mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}