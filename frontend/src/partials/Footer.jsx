import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" style={{ marginTop: "15rem" }}>
      <div className="footer-content">
        <div className="footer-section about">
          <h3>BookSwap</h3>
          <p>
            Connecting students through the power of book sharing. Making
            education more accessible and sustainable through our
            community-driven platform.
          </p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/books">Browse Books</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <FaEnvelope className="contact-icon" />
              <span>contact@bookswap.com</span>
            </li>
            <li>
              <FaPhone className="contact-icon" />
              <span>+212 606114815</span>
            </li>
            <li>
              <FaMapMarkerAlt className="contact-icon" />
              <span>Casablanca, Morocco</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BookSwap. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
