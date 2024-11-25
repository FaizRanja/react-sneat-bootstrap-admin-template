import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './page-auth.css';
import { AuthWrapper } from "./AuthWrapper";
import { loginUser } from "../../store/reducers/User";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setSuccess(null); // Reset success state

    if (!termsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const loginData = {  email, password }; // Make sure it's an object
      const response = await dispatch(loginUser(loginData)); // Assuming registerUser is a thunk
      if (response.meta.requestStatus === "fulfilled") {
        setSuccess("Login successful!");
        setTimeout(() => navigate("/"), 
        1000); // Redirect after 2 seconds
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <AuthWrapper>
      <h4 className="mb-2">Welcome to Sneat! 👋</h4>
      <p className="mb-4">Please sign in to your account and start the adventure</p>

      <form id="formAuthentication" className="mb-3" onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email or Username</label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={email}
            name="email"
            placeholder="Enter your email or username"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className="mb-3 form-password-toggle">
          <div className="input-group input-group-merge">
            <input
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              name="password"
              aria-describedby="password"
            />
            <span
              className="input-group-text cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bx ${showPassword ? 'bx-show' : 'bx-hide'}`}></i>
            </span>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="remember-me"
              name="rememberMe"
            />
            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
          </div>
        </div>
        <div className="mb-3">
          <button aria-label="Click me" className="btn btn-primary d-grid w-100" type="submit">Sign in</button>
        </div>
      </form>

      {error && <p className="text-danger text-center">{error}</p>}
      {success && <p className="text-success text-center">{success}</p>}

      <p className="text-center">
        <span>New on our platform? </span>
        <Link aria-label="Go to Register Page" to="/auth/register" className="registration-link">
          <span>Create an account</span>
        </Link>
      </p>
    </AuthWrapper>
  );
};
