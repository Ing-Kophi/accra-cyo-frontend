import { useEffect, useState, useCallback } from "react";
import api from "../services/api";

export default function Registrations() {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [years, setYears] = useState([]);
  const [parishes, setParishes] = useState([]);
  const [deaneries, setDeaneries] = useState([]);
  const [selectedDeanery, setSelectedDeanery] = useState("");
  const [form, setForm] = useState({
    year_id: "",
    parish_id: "",
    infant_male: 0,
    infant_female: 0,
    apostle_male: 0,
    apostle_female: 0,
    soldier_male: 0,
    soldier_female: 0,
    officer_male: 0,
    officer_female: 0
  });

  const fetchData = useCallback(async () => {
  const [y, p, d] = await Promise.all([
    api.get("/years"),
    api.get("/parishes"),
    api.get("/deaneries")
  ]);

  setYears(y.data.filter(x => !x.is_locked));
  setParishes(p.data.filter(x => x.is_active));
  setDeaneries(d.data.filter(x => x.is_active));
}, []);

const filteredParishes = selectedDeanery
  ? parishes.filter(p => p.deanery_id === Number(selectedDeanery))
  : [];


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
        await api.post("/registrations", form);

        setMessage("Registration saved successfully.");

        // OPTIONAL: reset form after save
        setForm({
        ...form,
        parish_id: "",
        infant_male: 0,
        infant_female: 0,
        apostle_male: 0,
        apostle_female: 0,
        soldier_male: 0,
        soldier_female: 0,
        officer_male: 0,
        officer_female: 0
        });

    } catch (err) {
        setMessage(
        err.response?.data?.message ||
        "An error occurred while saving."
        );
    } finally {
        setSaving(false);
    }
    };


  const toNumber = (val) => Number(val) || 0;

    const rankTotal = (rank) =>
    toNumber(form[`${rank}_male`]) + toNumber(form[`${rank}_female`]);

    const totalMales =
    toNumber(form.infant_male) +
    toNumber(form.apostle_male) +
    toNumber(form.soldier_male) +
    toNumber(form.officer_male);

    const totalFemales =
    toNumber(form.infant_female) +
    toNumber(form.apostle_female) +
    toNumber(form.soldier_female) +
    toNumber(form.officer_female);

    const grandTotal = totalMales + totalFemales;


  return (
    <div>
      <h4 className="cyogreen mb-3">Registrations</h4>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <select
              name="year_id"
              className="form-select"
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {years.map(y => (
                <option key={y.id} value={y.id}>{y.year_label}</option>
              ))}
            </select>
          </div>

            <div className="col-md-4 mb-3">
            <select
                className="form-select"
                value={selectedDeanery}
                onChange={(e) => {
                setSelectedDeanery(e.target.value);
                setForm({ ...form, parish_id: "" }); // reset parish
                }}
                required
            >
                <option value="">Select Deanery</option>
                {deaneries.map(d => (
                <option key={d.id} value={d.id}>
                    {d.name}
                </option>
                ))}
            </select>
            </div>

          <div className="col-md-6">
            <select
                name="parish_id"
                className="form-select"
                value={form.parish_id}
                onChange={handleChange}
                required
                disabled={!selectedDeanery}
                >
                <option value="">
                    {selectedDeanery ? "Select Parish" : "Select Deanery First"}
                </option>

                {filteredParishes.map(p => (
                    <option key={p.id} value={p.id}>
                    {p.name}
                    </option>
                ))}
            </select>

          </div>
        </div>

        <hr />

        <table className="table table-bordered">
            <thead className="table-light">
                <tr>
                <th>Rank</th>
                <th style={{ width: "150px" }}>Male</th>
                <th style={{ width: "150px" }}>Female</th>
                <th style={{ width: "150px" }}>Total</th>
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
                        min="0"
                        name={`${key}_male`}
                        className="form-control"
                        value={form[`${key}_male`]}
                        onChange={handleChange}
                    />
                    </td>

                    <td>
                    <input
                        type="number"
                        min="0"
                        name={`${key}_female`}
                        className="form-control"
                        value={form[`${key}_female`]}
                        onChange={handleChange}
                    />
                    </td>

                    <td className="fw-bold text-center">
                    {rankTotal(key)}
                    </td>
                </tr>
                ))}
            </tbody>

            <tfoot className="table-success">
                <tr>
                <th>Total</th>
                <th className="text-center">{totalMales}</th>
                <th className="text-center">{totalFemales}</th>
                <th className="text-center">{grandTotal}</th>
                </tr>
            </tfoot>
            </table>

                <div className="alert alert-info">
                <strong>Summary for this Parish</strong><br />
                Males: {totalMales} <br />
                Females: {totalFemales} <br />
                <strong>Grand Total: {grandTotal}</strong>
                </div>
                {message && (
                        <div className="alert alert-info mt-3">
                            {message}
                        </div>
                        )}
                    <button
                        className="btn btn-success mt-3"
                        disabled={saving}
                        >
                        {saving ? "Saving..." : "Save Registration"}
        </button>
      </form>
    </div>
  );
}
