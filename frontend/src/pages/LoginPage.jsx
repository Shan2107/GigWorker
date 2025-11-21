// frontend/src/pages/LoginPage.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";
import { apiLogin } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Decide where to send user based on BACKEND role
  function redirectByRole(role) {
    switch (role) {
      case "artist":
        navigate("/dashboard/artist");
        break;
      case "content_creator":
        navigate("/dashboard/creator");
        break;
      case "small_business":
        navigate("/dashboard/business");
        break;
      default:
        navigate("/dashboard/artist");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors("");

    if (!formData.email || !formData.password) {
      setErrors("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      // CALL DJANGO BACKEND
      const data = await apiLogin(formData.email, formData.password);
      // data = { message: "Login successful.", user: {...} }

      // Save user in your auth storage (adjust as your app expects)
      saveAuth({
        user: data.user,
      });

      const role = data.user?.role; // from backend
      redirectByRole(role);
    } catch (err) {
      setErrors(err.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="landing">
      {/* RIGHT: Login card */}
      <div className="auth-card landing-auth-card" aria-labelledby="login-heading">
        <h2 id="login-heading" className="auth-title">
          Login to GigWorker AI
        </h2>
        <p className="auth-subtitle">
          Access your personalised dashboard and AI tools.
        </p>

        {errors && (
          <div className="auth-error" role="alert">
            {errors}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          New to GigWorker? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
}