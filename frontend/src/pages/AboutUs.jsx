import { Link } from "react-router-dom";
import { FaBook, FaUsers, FaHandshake, FaLightbulb } from "react-icons/fa";
import "../pagesCSS/AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1>About BookSwap</h1>
          <p className="lead">
            Empowering students through the power of book sharing
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2>Our Story</h2>
              <p>
                BookSwap was born from a simple idea: making education more
                accessible through community-driven book sharing. What started
                as a small initiative has grown into a vibrant platform
                connecting students across Morocco.
              </p>
              <p>
                We believe that knowledge should be freely shared and accessible
                to all. By facilitating book exchanges between students, we're
                not just saving money – we're building a community of learners
                who support each other's educational journey.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="story-image">
                <img
                  src="/src/assets/bookSlider1.jpg"
                  alt="Students sharing books"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="container">
          <h2 className="text-center mb-5">Our Core Values</h2>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="value-card">
                <div className="value-icon">
                  <FaBook />
                </div>
                <h3>Accessibility</h3>
                <p>
                  Making educational resources available to all students,
                  regardless of their financial situation.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card">
                <div className="value-icon">
                  <FaUsers />
                </div>
                <h3>Community</h3>
                <p>
                  Building a supportive network of students who help each other
                  succeed in their academic journey.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card">
                <div className="value-icon">
                  <FaHandshake />
                </div>
                <h3>Sustainability</h3>
                <p>
                  Promoting eco-friendly practices by giving books a second life
                  and reducing waste.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="value-card">
                <div className="value-icon">
                  <FaLightbulb />
                </div>
                <h3>Innovation</h3>
                <p>
                  Continuously improving our platform to better serve the needs
                  of our community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At BookSwap, we're dedicated to creating a sustainable and
              accessible educational ecosystem. We envision a world where every
              student has access to the books they need, where knowledge flows
              freely, and where learning is a collaborative journey.
            </p>
            <div className="mission-stats">
              <div className="stat-item">
                <h3>2,500+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>8,700+</h3>
                <p>Books Shared</p>
              </div>
              <div className="stat-item">
                <h3>15+</h3>
                <p>Universities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container text-center">
          <h2>Join Our Community</h2>
          <p>
            Be part of the movement to make education more accessible and
            sustainable.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/books" className="btn btn-outline-primary btn-lg">
              Browse Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
