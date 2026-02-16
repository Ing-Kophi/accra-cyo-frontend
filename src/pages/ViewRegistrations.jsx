import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function ViewRegistrations() {
  const [rows, setRows] = useState([]);
  const [editing, setEditing] = useState(null); // registration being edited
  const [editForm, setEditForm] = useState(null);
  const [filters, setFilters] = useState({
  year: "",
  deanery: "",
  parish: ""
});


const toNumber = (v) => Number(v) || 0;

const calcEditTotals = (form) => {
  const male =
    toNumber(form.infant_male) +
    toNumber(form.apostle_male) +
    toNumber(form.soldier_male) +
    toNumber(form.officer_male);

  const female =
    toNumber(form.infant_female) +
    toNumber(form.apostle_female) +
    toNumber(form.soldier_female) +
    toNumber(form.officer_female);

  return {
    male,
    female,
    total: male + female
  };
};


  const fetchRegistrations = useCallback(async () => {
    const res = await api.get("/registrations");
    setRows(res.data);
  }, []);

  useEffect(() => {
    fetchRegistrations();
  }, [fetchRegistrations]);

  const deleteRegistration = async (id, isLocked) => {
    if (isLocked) {
      alert("This registration year is locked.");
      return;
    }

    if (!window.confirm("Delete this registration?")) return;

    await api.delete(`/registrations/${id}`);
    fetchRegistrations();
  };

  const calcTotals = (r) => {
    const male =
      r.infant_male +
      r.apostle_male +
      r.soldier_male +
      r.officer_male;

    const female =
      r.infant_female +
      r.apostle_female +
      r.soldier_female +
      r.officer_female;

    return {
      male,
      female,
      total: male + female
    };
  };

  const uniqueYears = [...new Set(rows.map(r => r.year_label))];
const uniqueDeaneries = [...new Set(rows.map(r => r.deanery_name))];

const filteredParishes = filters.deanery
  ? [...new Set(
      rows
        .filter(r => r.deanery_name === filters.deanery)
        .map(r => r.parish_name)
    )]
  : [...new Set(rows.map(r => r.parish_name))];

  const filteredRows = rows.filter(r => {
  if (filters.year && r.year_label !== filters.year) return false;
  if (filters.deanery && r.deanery_name !== filters.deanery) return false;
  if (filters.parish && r.parish_name !== filters.parish) return false;
  return true;
});



  return (
    <div>
      <h4 className="cyogreen mb-3">View Registrations</h4>

        <div className="card mb-3">
          <div className="card-body">
            <div className="row g-3">

                 {/* YEAR FILTER */}
                <div className="col-md-4">
                    <label className="form-label">Filter by Year</label>
                    <select
                    className="form-select"
                    value={filters.year}
                    onChange={(e) =>
                        setFilters({ ...filters, year: e.target.value })
                    }
                    >
                    <option value="">All Years</option>
                    {uniqueYears.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                    </select>
                </div>

                {/* DEANERY FILTER */}
                <div className="col-md-4">
                    <label className="form-label">Filter by Deanery</label>
                    <select
                    className="form-select"
                    value={filters.deanery}
                    onChange={(e) =>
                        setFilters({
                        ...filters,
                        deanery: e.target.value,
                        parish: ""
                        })
                    }
                    >
                    <option value="">All Deaneries</option>
                    {uniqueDeaneries.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                    </select>
                </div>

                {/* PARISH FILTER */}
                <div className="col-md-4">
                    <label className="form-label">Filter by Parish</label>
                    <select
                    className="form-select"
                    value={filters.parish}
                    onChange={(e) =>
                        setFilters({ ...filters, parish: e.target.value })
                    }
                    disabled={!filteredParishes.length}
                    >
                    <option value="">All Parishes</option>
                    {filteredParishes.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                    </select>
                </div>

                    </div>
                </div>
            </div>

                {(filters.year || filters.deanery || filters.parish) && (
            <div className="alert alert-info py-2">
                <strong>Active Filters:</strong>
                {filters.year && ` Year: ${filters.year}`}
                {filters.deanery && ` | Deanery: ${filters.deanery}`}
                {filters.parish && ` | Parish: ${filters.parish}`}
            </div>
            )}


      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <thead className="table-light">
            <tr>
              <th>Year</th>
              <th>Deanery</th>
              <th>Parish</th>
              <th>Males</th>
              <th>Females</th>
              <th>Total</th>
              <th>Status</th>
              <th style={{ width: "160px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRows.map((r) => {
              const totals = calcTotals(r);

              return (
                <tr key={r.id}>
                  <td>{r.year_label}</td>
                  <td>{r.deanery_name}</td>
                  <td>{r.parish_name}</td>
                  <td className="text-center">{totals.male}</td>
                  <td className="text-center">{totals.female}</td>
                  <td className="fw-bold text-center">{totals.total}</td>
                  <td className="text-center">
                    {r.is_locked ? (
                      <span className="badge bg-danger">Locked</span>
                    ) : (
                      <span className="badge bg-success">Open</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      disabled={r.is_locked}
                      onClick={() => {
                        setEditing(r);
                        setEditForm({
                            infant_male: r.infant_male,
                            infant_female: r.infant_female,
                            apostle_male: r.apostle_male,
                            apostle_female: r.apostle_female,
                            soldier_male: r.soldier_male,
                            soldier_female: r.soldier_female,
                            officer_male: r.officer_male,
                            officer_female: r.officer_female
                        });
                        }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      disabled={r.is_locked}
                      onClick={() =>
                        deleteRegistration(r.id, r.is_locked)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {editing && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Edit Registration</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setEditing(null)}
          />
        </div>

        <div className="modal-body">
          <p className="mb-2">
            <strong>Year:</strong> {editing.year_label} <br />
            <strong>Deanery:</strong> {editing.deanery_name} <br />
            <strong>Parish:</strong> {editing.parish_name}
          </p>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Rank</th>
                <th>Male</th>
                <th>Female</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["infant", "Infant Jesus (6–11)"],
                ["apostle", "Young Apostles (12–16)"],
                ["soldier", "Christian Soldiers (17+)"],
                ["officer", "Officers"]
              ].map(([key, label]) => (
                <tr key={key}>
                  <td>{label}</td>

                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm[`${key}_male`]}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          [`${key}_male`]: e.target.value
                        })
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={editForm[`${key}_female`]}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          [`${key}_female`]: e.target.value
                        })
                      }
                    />
                  </td>

                  <td className="fw-bold text-center">
                    {toNumber(editForm[`${key}_male`]) +
                     toNumber(editForm[`${key}_female`])}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="table-success">
              {(() => {
                const t = calcEditTotals(editForm);
                return (
                  <tr>
                    <th>Total</th>
                    <th className="text-center">{t.male}</th>
                    <th className="text-center">{t.female}</th>
                    <th className="text-center">{t.total}</th>
                  </tr>
                );
              })()}
            </tfoot>
          </table>
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={() => setEditing(null)}
          >
            Cancel
          </button>

          <button
            className="btn btn-success"
            onClick={async () => {
              await api.put(
                `/registrations/${editing.id}`,
                editForm
              );
              setEditing(null);
              fetchRegistrations();
            }}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
}
