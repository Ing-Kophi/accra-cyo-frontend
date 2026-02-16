import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

export default function ExecutiveForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    position: "",
    phone: "",
    parish: "",
    photo: null
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    api.get(`/contacts/executives`).then(res => {
      const exec = res.data.find(e => e.id === Number(id));
      if (exec) {
        setForm({
          full_name: exec.full_name,
          position: exec.position,
          phone: exec.phone,
          parish: exec.parish,
          photo: null
        });
      }
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(form).forEach(key => {
      if (form[key]) data.append(key, form[key]);
    });

    try {
      if (id) {
        await api.put(`/contacts/executives/${id}`, data);
      } else {
        await api.post("/contacts/executives", data);
      }
      navigate("/admin/contact/executives");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h4 className="cyogreen mb-3">
        {id ? "Edit Executive" : "Add Executive"}
      </h4>

      <form onSubmit={handleSubmit}>

        <input className="form-control mb-2"
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
          required
        />

        <input className="form-control mb-2"
          name="position"
          placeholder="Position"
          value={form.position}
          onChange={handleChange}
          required
        />

        <input className="form-control mb-2"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <input className="form-control mb-3"
          name="parish"
          placeholder="Parish"
          value={form.parish}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          name="photo"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleChange}
        />

        <button className="btn btn-success" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/admin/contact/executives")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}