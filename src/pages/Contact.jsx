import { useEffect, useState } from "react";
import api from "../services/api";
import Footer from "../components/home/Footer";
import { getUploadsUrl } from "../utils/uploads";

export default function Contact() {
  const [executives, setExecutives] = useState([]);
  const [office, setOffice] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    api.get("/contacts/executives/public").then(res => {
      setExecutives(res.data);
    });

    api.get("/contacts/office").then(res => {
      setOffice(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess("");

    try {
      await api.post("/contacts/message", form);
      setSuccess("Your message has been sent successfully.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* PAGE HEADER */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h1 className="cyogreen mb-2">Contact Us</h1>
          <p className="lead">
            For God and Ghana — Get in touch with the Accra Archdiocesan CYO
          </p>
        </div>
      </section>

      {/* EXECUTIVES */}
      <section className="container my-5">
        <h3 className="cyogreen mb-4">Executive Members</h3>

        <div className="row g-4">
          {executives.map(e => (
            <div key={e.id} className="col-md-4">
              <div className="card h-100 text-center shadow-sm">
                <div className="card-body">
                  <img
                    src={
                      e.photo
                        ? getUploadsUrl(`executives/${e.photo}`)
                        : "/no-photo.png"
                    }
                    alt={e.full_name}
                    className="rounded-circle mb-3"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover" }}
                  />

                  <h5 className="mb-1">{e.full_name}</h5>
                  <p className="mb-1 fw-semibold">{e.position}</p>
                  <p className="mb-1">{e.parish}</p>
                  <p className="mb-0">
                    <a href={`tel:${e.phone}`}>{e.phone}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* OFFICE CONTACT */}
      <section className="bg-light py-5">
        <div className="container">
          <h3 className="cyogreen mb-3">General Office</h3>

          {office && (
            <>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </p>
              <p>
                <strong>Location:</strong> {office.location}
              </p>
            </>
          )}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="container my-5">
        <h3 className="cyogreen mb-3">Send Us a Message</h3>

        {success && (
          <div className="alert alert-success">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea
              name="message"
              rows="5"
              className="form-control"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-success"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}