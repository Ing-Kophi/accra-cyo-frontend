import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Parishes() {
  const [parishes, setParishes] = useState([]);
  const [deaneries, setDeaneries] = useState([]);
  const [name, setName] = useState("");
  const [deaneryId, setDeaneryId] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchData = useCallback(async () => {
    const [pRes, dRes] = await Promise.all([
      api.get("/parishes"),
      api.get("/deaneries")
    ]);
    setParishes(pRes.data);
    setDeaneries(dRes.data.filter(d => d.is_active));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      deanery_id: deaneryId
    };

    if (editingId) {
      await api.put(`/parishes/${editingId}`, payload);
    } else {
      await api.post("/parishes", payload);
    }

    setName("");
    setDeaneryId("");
    setEditingId(null);
    fetchData();
  };

  const handleEdit = (p) => {
    setEditingId(p.id);
    setName(p.name);
    setDeaneryId(p.deanery_id);
  };

  const deactivateParish = async (id) => {
    if (!window.confirm("Deactivate this parish?")) return;
    await api.put(`/parishes/deactivate/${id}`);
    fetchData();
  };

  const activateParish = async (id) => {
  if (!window.confirm("Activate this parish?")) return;
  await api.put(`/parishes/activate/${id}`);
  fetchData();
};


  return (
    <div>
      <h4 className="cyogreen mb-3">Parishes</h4>

      <form className="row g-2 mb-4" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Parish name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={deaneryId}
            onChange={(e) => setDeaneryId(e.target.value)}
            required
          >
            <option value="">Select Deanery</option>
            {deaneries.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <button className="btn btn-success w-100">
            {editingId ? "Update" : "Add"}
          </button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Parish</th>
            <th>Deanery</th>
            <th>Status</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {parishes.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.deanery_name}</td>
              <td>
                {p.is_active
                  ? <span className="badge bg-success">Active</span>
                  : <span className="badge bg-secondary">Inactive</span>}
              </td>
              <td>
                <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(p)}
                >
                    Edit
                </button>

                {p.is_active ? (
                    <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deactivateParish(p.id)}
                    >
                    Deactivate
                    </button>
                ) : (
                    <button
                    className="btn btn-sm btn-success"
                    onClick={() => activateParish(p.id)}
                    >
                    Activate
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
