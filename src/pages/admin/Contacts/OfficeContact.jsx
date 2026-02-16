import { useEffect, useState } from "react";
import api from "../../../services/api";

export default function OfficeContact() {
  const [office, setOffice] = useState({
    email: "",
    location: ""
  });

  const fetchOffice = async () => {
    const res = await api.get("/contacts/office");
    setOffice(res.data);
  };

  useEffect(() => {
    fetchOffice();
  }, []);

  const saveOffice = async (e) => {
    e.preventDefault();
    await api.put("/contacts/office", office);
    alert("Office contact updated");
  };

  return (
    <div className="container">
      <h4 className="cyogreen mb-3">Office Contact Details</h4>

      <form onSubmit={saveOffice}>
        <div className="mb-3">
          <label>Email Address</label>
          <input
            className="form-control"
            value={office.email}
            onChange={(e) =>
              setOffice({ ...office, email: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-3">
          <label>Physical Location</label>
          <textarea
            className="form-control"
            rows="3"
            value={office.location}
            onChange={(e) =>
              setOffice({ ...office, location: e.target.value })
            }
            required
          />
        </div>

        <button className="btn btn-success">
          Save Changes
        </button>
      </form>
    </div>
  );
}