import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Years() {
  const [years, setYears] = useState([]);
  const [yearLabel, setYearLabel] = useState("");

  const fetchYears = useCallback(async () => {
  const res = await api.get("/years");
  setYears(res.data);
    }, []);


  useEffect(() => {
    fetchYears();
  }, [fetchYears]);

  const createYear = async (e) => {
    e.preventDefault();
    await api.post("/years", { year_label: yearLabel });
    setYearLabel("");
    fetchYears();
  };

  const lockYear = async (id) => {
    await api.put(`/years/lock/${id}`, {});
    fetchYears();
  };

  const deleteYear = async (id) => {
    if (!window.confirm("Delete this year?")) return;
    await api.delete(`/years/${id}`);
    fetchYears();
  };

  return (
    <div>
      <h4 className="cyogreen mb-3">Registration Years</h4>

      <form className="d-flex mb-4" onSubmit={createYear}>
        <input
          className="form-control me-2"
          placeholder="e.g. 2025"
          value={yearLabel}
          onChange={(e) => setYearLabel(e.target.value)}
          required
        />
        <button className="btn btn-success">Add Year</button>
      </form>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Year</th>
            <th>Status</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map((y) => (
            <tr key={y.id}>
              <td>{y.year_label}</td>
              <td>
                {y.is_locked
                  ? <span className="badge bg-danger">Locked</span>
                  : <span className="badge bg-success">Open</span>}
              </td>
              <td>
                {!y.is_locked && (
                  <>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => lockYear(y.id)}
                    >
                      Lock
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteYear(y.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
