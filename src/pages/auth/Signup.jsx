import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../lib/api";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";

const ROLE_OPTIONS = [
  { value: "Frontend Developer", label: "Frontend Developer" },
  { value: "Backend Developer", label: "Backend Developer" },
  { value: "Full Stack Developer", label: "Full Stack Developer" },
  { value: "UI/UX Designer", label: "UI/UX Designer" },
  { value: "Product Designer", label: "Product Designer" },
  { value: "Graphic Designer", label: "Graphic Designer" },
  { value: "Product Manager", label: "Product Manager" },
  { value: "Data Analyst", label: "Data Analyst" },
  { value: "Copywriter", label: "Copywriter" },
  { value: "Content Creator", label: "Content Creator" },
  { value: "Marketing Manager", label: "Marketing Manager" },
  { value: "DevOps Engineer", label: "DevOps Engineer" },
  { value: "Mobile Developer", label: "Mobile Developer" },
  { value: "Other", label: "Other" },
];

export default function Signup() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const upd = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.full_name || !form.email || !form.password || !form.role) {
      setError("All fields are required");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      // Create account via backend
      const res = await api.post("/api/auth/signup", {
        email: form.email,
        password: form.password,
        full_name: form.full_name,
        role: form.role,
      });

      if (res.data.error) {
        setError(res.data.error);
        setLoading(false);
        return;
      }

      // Sign in directly via Supabase
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        navigate("/profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Something went wrong",
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #E5E7EB",
        padding: "32px",
      }}
    >
      <h2
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#0F0F0F",
          marginBottom: "6px",
        }}
      >
        Create your account
      </h2>
      <p style={{ fontSize: "13px", color: "#6B7280", marginBottom: "28px" }}>
        Start your outreach in minutes
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Input
          label="Full Name"
          value={form.full_name}
          onChange={(v) => upd("full_name", v)}
          placeholder="Daniel Elemide"
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => upd("email", v)}
          placeholder="you@example.com"
          required
        />
        <Select
          label="Your Role"
          value={form.role}
          onChange={(v) => upd("role", v)}
          options={ROLE_OPTIONS}
          placeholder="Select your role"
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(v) => upd("password", v)}
          placeholder="Min. 6 characters"
          required
        />

        {error && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              fontSize: "13px",
              color: "#DC2626",
            }}
          >
            {error}
          </div>
        )}

        <Button type="submit" fullWidth loading={loading}>
          Create Account
        </Button>
      </form>

      <p
        style={{
          textAlign: "center",
          fontSize: "13px",
          color: "#6B7280",
          marginTop: "20px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "var(--accent)",
            fontWeight: "500",
            textDecoration: "none",
          }}
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
