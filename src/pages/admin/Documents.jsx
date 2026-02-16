import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    const res = await api.get("/documents");
    setDocuments(res.data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const deleteDocument = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    await api.delete(`/documents/${id}`);
    fetchDocuments();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">Document Center</h4>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/documents/new")}
      >
        Upload Document
      </button>

      <table className="table table-bordered table-sm">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Public</th>
            <th>Uploaded</th>
            <th style={{ width: "140px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map(d => (
            <tr key={d.id}>
              <td>{d.title}</td>
              <td>{d.category}</td>
              <td>
                {d.is_public ? (
                  <span className="badge bg-success">Yes</span>
                ) : (
                  <span className="badge bg-secondary">No</span>
                )}
              </td>
              <td>
                {new Date(d.uploaded_at).toLocaleDateString()}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteDocument(d.id)}
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