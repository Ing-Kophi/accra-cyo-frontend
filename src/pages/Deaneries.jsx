import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Deaneries() {
  const [deaneries, setDeaneries] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchDeaneries = useCallback(async () => {
    const res = await api.get("/deaneries");
    setDeaneries(res.data);
  }, []);

  useEffect(() => {
    fetchDeaneries();
  }, [fetchDeaneries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/deaneries/${editingId}`, { name });
    } else {
      await api.post("/deaneries", { name });
    }

    setName("");
    setEditingId(null);
    fetchDeaneries();
  };

  const handleEdit = (d) => {
    setEditingId(d.id);
    setName(d.name);
  };

  const deactivateDeanery = async (id) => {
    if (!window.confirm("Deactivate this deanery?")) return;
    await api.put(`/deaneries/deactivate/${id}`);
    fetchDeaneries();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">Deaneries</h4>

      <form className="d-flex mb-4" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          placeholder="Deanery name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-success">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th style={{ width: "200px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deaneries.map((d) => (
            <tr key={d.id}>
              <td>{d.name}</td>
              <td>
                {d.is_active
                  ? <span className="badge bg-success">Active</span>
                  : <span className="badge bg-secondary">Inactive</span>}
              </td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(d)}
                >
                  Edit
                </button>

                {d.is_active && (
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deactivateDeanery(d.id)}
                  >
                    Deactivate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
