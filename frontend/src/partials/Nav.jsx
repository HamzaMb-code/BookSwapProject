import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo-BookSwap.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useClerk } from "@clerk/clerk-react";
import { useAuth as useCustomAuth } from "../contexts/AuthContext";

export default function Nav({ checkName }) {
  const [searchInput, setSearchInput] = useState("");
  const showSearchInp = useRef("");
  const searchInp = useRef("");
  const [theme, setTheme] = useState("light-mode");
  const navigate = useNavigate();
  const navFixed = useRef("");
  const { isSignedIn, user: clerkUser } = useAuth();
  const { signOut } = useClerk();
  const { user: customUser, logout: customLogout } = useCustomAuth();

  function handleSearchButton() {
    showSearchInp.current.style.display = "block";
  }

  function handleCloseSearch() {
    showSearchInp.current.style.display = "none";
  }

  function handleKeyDown(e) {
    // console.log(e.key)
    if (e.key === "Enter") {
      // e.key hiya dekchi li canclicki 3lih f keyboard dyal pc.
      e.preventDefault();
      checkName(searchInp.current.value); // hadi bach mni nclicki 3la entrer ytkhad dekchi li finput bach ytcheka.
      showSearchInp.current.style.display = "none";
      navigate("books");
    }
  }

  function handleThemeButton() {
    // console.log(theme);
    if (theme === "light-mode") {
      document.body.classList.add("dark-mode");
      // document.body.style.background = "black";
      // document.body.style.color = "white";
      setTheme("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      // document.body.style.background = "white";
      // document.body.style.color = "black";
      setTheme("light-mode");
    }
  }

  const handleLogout = async () => {
    try {
      // Handle Clerk OAuth logout
      if (isSignedIn) {
        await signOut();
      }

      // Handle custom authentication logout
      customLogout();

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    function handleFixedNav() {
      if (scrollY > 0) {
        navFixed.current.style.backgroundColor = "black";
      } else {
        navFixed.current.style.backgroundColor = "";
      }
    }
    window.addEventListener("scroll", handleFixedNav);
    return () => {
      window.removeEventListener("scroll", handleFixedNav);
    };
  }, []);

  return (
    <div ref={navFixed} className="navFixed">
      <nav id="nav" className="navbar navbar-expand-lg navbar-light px-3">
        <img
          src={logo}
          alt="BookSwap Logo"
          width="150"
          // height="100"
          className="me-2"
        />

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul id="ulNav" className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/aboutUs">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/books">
                All Books
              </Link>
            </li>
            {!isSignedIn && !customUser ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/addBook">
                    Add Book
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    onClick={handleLogout}
                    className="nav-link"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
          {isSignedIn || customUser ? (
            <div
              className="user-welcome"
              style={{
                marginLeft: "auto",
                padding: "8px 15px",
                backgroundColor: "#e3f2fd",
                borderRadius: "20px",
                border: "1px solid #90caf9",
                color: "#1976d2",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="ri-user-line"></i>
              <span>
                {clerkUser?.fullName || customUser?.name || customUser?.email}
              </span>
            </div>
          ) : null}
        </div>

        <div className="nav-actions">
          <i
            className="ri-search-line"
            id="search-button"
            onClick={handleSearchButton}
          ></i>
          <Link style={{ color: "black" }} to="/login">
            <i className="ri-user-line" id="login-button"></i>
          </Link>
          <i
            className="ri-moon-line"
            id="theme-button"
            value={theme}
            onClick={handleThemeButton}
          ></i>
        </div>
      </nav>

      <div ref={showSearchInp} className="search">
        <form action="" className="serch-form">
          <input
            type="text"
            placeholder="Search for books to swap"
            id="search-input"
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
            }}
            ref={searchInp}
            onKeyDown={handleKeyDown}
          />
          <i
            className="ri-search-line"
            id="search-icon"
            onClick={() => {
              checkName(searchInp.current.value);
              handleCloseSearch();
              setSearchInput("");
            }}
          ></i>
        </form>
        <i
          className="ri-close-line"
          id="search-close"
          onClick={handleCloseSearch}
        ></i>
      </div>
    </div>
  );
}
