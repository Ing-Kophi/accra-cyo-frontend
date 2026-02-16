import { useState } from "react";
import api from "../services/api";
import { saveToken } from "../utils/auth";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    console.log("handlesubmit is entered");
    console.log("api is:", api);

    try {
      const res = await api.post("/admin/login", {
        email,
        password,
      });
      console.log("response recieved:", res)
      saveToken(res.data.token);
      window.location.href = "/admin/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      console.log("finally block")
        setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <form
        className="p-4 shadow bg-white rounded"
        style={{ width: "380px", borderTop: "6px solid #0b7a3b" }}
        onSubmit={handleSubmit}
      >
        <h4 className="text-center cyogreen mb-2">
          Accra CYO Admin Login
        </h4>

        <p className="text-center small">
          <strong>For God and Ghana!</strong><br />
          Thanks be to God.
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn cyogreen-bg w-100"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-center mt-3 small text-muted">
          CYO… Do something for God and Ghana now!
        </p>
      </form>
    </div>
  );
}
