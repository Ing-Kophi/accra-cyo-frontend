import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api";

export default function Executives() {
  const [executives, setExecutives] = useState([]);
  const navigate = useNavigate();

  const fetchExecutives = async () => {
    const res = await api.get("/contacts/executives");
    setExecutives(res.data);
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const deleteExecutive = async (id) => {
    if (!window.confirm("Delete this executive?")) return;
    await api.delete(`/contacts/executives/${id}`);
    fetchExecutives();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">Executive Members</h4>

      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/admin/contact/executives/new")}
      >
        Add Executive
      </button>

      <table className="table table-bordered table-sm">
        <thead className="table-light">
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Parish</th>
            <th style={{ width: "150px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {executives.map(e => (
            <tr key={e.id}>
              <td>
                <img
                  src={
                    e.photo
                      ? `http://localhost:5000/uploads/executives/${e.photo}`
                      : "/no-photo.png"
                  }
                  alt={e.full_name}
                  width="50"
                  height="50"
                  style={{ objectFit: "cover", borderRadius: "50%" }}
                />
              </td>
              <td>{e.full_name}</td>
              <td>{e.position}</td>
              <td>{e.phone}</td>
              <td>{e.parish}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() =>
                    navigate(`/admin/contact/executives/edit/${e.id}`)
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteExecutive(e.id)}
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