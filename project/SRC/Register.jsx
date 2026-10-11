import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const exists = users.some(
      (user) => user.email === email
    );

    if (exists) {
      alert("An account with this email already exists.");
      return;
    }

    const user = {
      id: Date.now(),
      name,
      email,
      password,
    };

    localStorage.setItem(
      "users",
      JSON.stringify([...users, user])
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-icon">
          <UserPlus size={25} />
        </div>

        <span className="eyebrow">JOIN EVENTORA</span>

        <h1>Create your account</h1>

        <p>
          Start discovering and booking experiences.
        </p>

        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Your name"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Create a password"
              minLength="6"
              required
            />
          </label>

          <button
            type="submit"
            className="primary-btn full"
          >
            Create Account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;