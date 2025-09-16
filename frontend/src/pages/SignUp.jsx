import { useState } from "react";
import "../pagesCSS/SignUp.css";
import { axiosClient } from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import { useSignUp, useAuth } from "@clerk/clerk-react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();
  const { signUp } = useSignUp();
  const { isSignedIn } = useAuth();

  async function handleManualSignUp(e) {
    e.preventDefault();
    try {
      await axiosClient.get("sanctum/csrf-cookie");

      await axiosClient.post("api/signUp", {
        name,
        email,
        password,
        phoneNumber,
      });

      alert("Sign up successful 🎉");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error during sign up ❌");
    }
  }

  const handleOAuthSignUp = async (provider) => {
    if (isSignedIn) {
      alert("You are already signed in!");
      return;
    }

    try {
      await signUp.authenticateWithRedirect({
        strategy: `oauth_${provider}`,
        redirectUrl: "/books",
      });
    } catch (err) {
      console.error("OAuth SignUp error:", err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleManualSignUp}>
        <h2>Create Your Account</h2>
        <p className="subtitle">Join BookSwap and start exchanging books 📚</p>

        <div className="social-login-select">
          <button
            type="button"
            className="social-main-btn"
            onClick={() => setShowOptions(!showOptions)}
          >
            Sign up with Google or Facebook
          </button>
          {showOptions && (
            <div className="social-options">
              <button
                type="button"
                onClick={() => handleOAuthSignUp("google")}
              >
                Continue with Google
              </button>
              <button
                type="button"
                onClick={() => handleOAuthSignUp("facebook")}
              >
                Continue with Facebook
              </button>
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number"
          required
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button type="submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
