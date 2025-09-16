import { Link, useNavigate } from "react-router-dom";
import "../pagesCSS/login.css";
import { useRef, useState } from "react";
import { useSignIn, useAuth, useClerk } from "@clerk/clerk-react";
import { useAuth as useCustomAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const showError = useRef();

  const { signIn } = useSignIn();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { login: customLogin } = useCustomAuth();

  const handleLogout = async () => {
    try {
      // Handle Clerk OAuth logout
      if (isSignedIn) {
        await signOut();
      }

      // Handle custom authentication logout
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  async function handleManualLogin(e) {
    e.preventDefault();
    try {
      await customLogin({ email, password });
      alert("Login successful 🎉");
      navigate("/books");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showError.current.innerHTML = "Invalid email or password.";
      }
    }
  }

  const handleOAuthLogin = async (provider) => {
    if (isSignedIn) {
      alert("You are already logged in!");
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "/books",
      });
    } catch (err) {
      console.error("OAuth login error:", err);
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "400px", borderRadius: "20px" }}
      >
        <h2 className="text-center mb-4 fw-bold">Welcome Back!</h2>
        <p className="text-center text-muted mb-4">
          Login to continue exchanging your favorite books.
        </p>

        <form onSubmit={handleManualLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              type="email"
              className="form-control p-3"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              type="password"
              className="form-control p-3"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 p-2 fw-bold">
            Login
          </button>

          <div
            ref={showError}
            style={{
              color: "red",
              fontSize: "14px",
              padding: "10px",
              textAlign: "center",
            }}
          ></div>

          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-outline-danger w-100 mb-2"
              onClick={() => handleOAuthLogin("google")}
            >
              Sign in with Google
            </button>
            <button
              type="button"
              className="btn btn-outline-primary w-100"
              onClick={() => handleOAuthLogin("facebook")}
            >
              Sign in with Facebook
            </button>
          </div>

          <p className="text-center mt-4 mb-0 text-muted">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary fw-semibold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
