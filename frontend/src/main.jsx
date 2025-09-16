import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = PUBLISHABLE_KEY;

// Get the current domain for proper redirect URLs
const domain = window.location.origin;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      navigate={(to) => window.location.href = `${domain}${to}`}
      afterSignInUrl={`${domain}/books`}
      afterSignUpUrl={`${domain}/books`}
      signInUrl={`${domain}/login`}
      signUpUrl={`${domain}/signup`}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>
);
