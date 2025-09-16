import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../pagesCSS/Home.css";
// import "../pagesCSS/HomePage.css";
import book1 from "../assets/bookSlider1.jpg";
import book2 from "../assets/bookSlider2.jpg";
import book3 from "../assets/bookSlider3.jpg";
import book4 from "../assets/bookSlider4.jpg";

export default function HomePage() {
  const [popularBooks, setPopularBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading popular books data
    const fetchPopularBooks = async () => {
      try {
        // This would be replaced with your actual API call
        // e.g., const response = await axios.get("/api/popular-books");
        
        // Mock data for demonstration
        const mockData = [
          { 
            id: 1, 
            title: "The Great Gatsby", 
            author: "F. Scott Fitzgerald", 
            cover: book1,
            rating: 4.5,
            swaps: 126
          },
          { 
            id: 2, 
            title: "To Kill a Mockingbird", 
            author: "Harper Lee", 
            cover: book2,
            rating: 4.8,
            swaps: 218
          },
          { 
            id: 3, 
            title: "1984", 
            author: "George Orwell", 
            cover: book3,
            rating: 4.6,
            swaps: 173
          },
          { 
            id: 4, 
            title: "Pride and Prejudice", 
            author: "Jane Austen", 
            cover: book4,
            rating: 4.7,
            swaps: 195
          }
        ];
        
        setPopularBooks(mockData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching popular books:", error);
        setIsLoading(false);
      }
    };

    fetchPopularBooks();
  }, []);

  // How it works steps
  const steps = [
    {
      icon: "ri-book-open-line",
      title: "List Your Books",
      description: "Add books you're willing to swap to your library."
    },
    {
      icon: "ri-search-eye-line",
      title: "Find Books",
      description: "Browse available books from other members."
    },
    {
      icon: "ri-exchange-line",
      title: "Request a Swap",
      description: "Request to swap with another user."
    },
    {
      icon: "ri-chat-smile-3-line",
      title: "Connect & Exchange",
      description: "Coordinate the exchange and enjoy your new book!"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah L.",
      photo: "https://randomuser.me/api/portraits/women/32.jpg",
      quote: "BookSwap helped me discover amazing novels I wouldn't have found otherwise!",
      role: "English Student"
    },
    {
      name: "Michael T.",
      photo: "https://randomuser.me/api/portraits/men/54.jpg",
      quote: "I've saved so much money and met great friends through BookSwap.",
      role: "History Major"
    },
    {
      name: "Jessica K.",
      photo: "https://randomuser.me/api/portraits/women/45.jpg",
      quote: "The platform is so easy to use. I've already swapped over 30 books!",
      role: "Literature Professor"
    }
  ];

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <h1 className="display-4 fw-bold mb-3">
                Share <span className="text-primary">Books</span>, 
                Spread <span className="text-primary">Knowledge</span>
              </h1>
              <p className="lead mb-4">
                BookSwap is a community-driven platform where book lovers exchange their 
                favorite reads, discover new stories, and connect with fellow readers.
              </p>
              <div className="d-flex gap-3">
                <Link to="/books" className="btn btn-primary btn-lg">
                  Find Books
                </Link>
                <Link to="/signup" className="btn btn-outline-primary btn-lg">
                  Join Now
                </Link>
              </div>
              <div className="stats mt-4 d-flex gap-4">
                <div className="stat-item">
                  <h3 className="mb-0">2,500+</h3>
                  <p className="text-muted mb-0">Active Users</p>
                </div>
                <div className="stat-item">
                  <h3 className="mb-0">8,700+</h3>
                  <p className="text-muted mb-0">Books Swapped</p>
                </div>
                <div className="stat-item">
                  <h3 className="mb-0">4.8</h3>
                  <p className="text-muted mb-0">User Rating</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-swiper-container">
                <Swiper
                  modules={[Navigation, Autoplay, Pagination]}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  className="hero-swiper rounded shadow"
                >
                  {[book1, book2, book3, book4].map((book, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={book}
                        alt={`Featured book ${index + 1}`}
                        className="w-100 rounded hero-image"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">How BookSwap Works</h2>
            <p className="text-muted">Simple steps to start swapping books today</p>
          </div>
          <div className="row">
            {steps.map((step, index) => (
              <div className="col-md-3 mb-4 mb-md-0" key={index}>
                <div className="card border-0 shadow-sm h-100 text-center p-4">
                  <div className="step-icon-wrapper mb-3 mx-auto">
                    <i className={`${step.icon} fs-1 text-primary`}></i>
                  </div>
                  <h5 className="card-title">{step.title}</h5>
                  <p className="card-text text-muted">{step.description}</p>
                  <div className="step-number">{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="popular-books py-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold mb-0">Popular Books for Swap</h2>
              <p className="text-muted">Most sought-after books in our community</p>
            </div>
            <Link to="/books" className="btn btn-outline-primary">
              View All Books
            </Link>
          </div>
          
          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {popularBooks.map((book) => (
                <div className="col-md-6 col-lg-3 mb-4" key={book.id}>
                  <div className="card book-card h-100 border-0 shadow-sm">
                    <div className="book-cover-wrapper">
                      <img 
                        src={book.cover} 
                        alt={book.title} 
                        className="card-img-top book-cover" 
                      />
                      <div className="book-rating">
                        <i className="ri-star-fill text-warning"></i> {book.rating}
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title book-title">{book.title}</h5>
                      <p className="card-text text-muted book-author">{book.author}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-light text-dark">
                          <i className="ri-repeat-line me-1"></i> {book.swaps} swaps
                        </span>
                        <button className="btn btn-sm btn-primary">Request Swap</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-5 bg-primary text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="benefit-item text-center p-4">
                <i className="ri-money-dollar-circle-line fs-1 mb-3"></i>
                <h4>Save Money</h4>
                <p>Exchange books instead of buying new ones and save hundreds of dollars a year.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4 mb-md-0">
              <div className="benefit-item text-center p-4">
                <i className="ri-earth-line fs-1 mb-3"></i>
                <h4>Eco-Friendly</h4>
                <p>Reduce waste and your carbon footprint by giving books a second life.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="benefit-item text-center p-4">
                <i className="ri-team-line fs-1 mb-3"></i>
                <h4>Build Community</h4>
                <p>Connect with fellow readers who share your literary interests.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">What Our Users Say</h2>
            <p className="text-muted">Hear from the BookSwap community</p>
          </div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            loop={true}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="card h-100 border-0 shadow-sm p-4 testimonial-card">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="rounded-circle testimonial-avatar me-3"
                    />
                    <div>
                      <h5 className="mb-0">{testimonial.name}</h5>
                      <p className="text-muted mb-0 small">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-warning"></i>
                    ))}
                  </div>
                  <p className="testimonial-quote">"{testimonial.quote}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section py-5 bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="fw-bold mb-3">Ready to Start Swapping?</h2>
              <p className="lead mb-4">
                Join thousands of book lovers and start your reading journey today.
                It's free and only takes a minute to sign up!
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Link to="/signup" className="btn btn-primary btn-lg">
                  Sign Up Now
                </Link>
                <Link to="/books" className="btn btn-outline-primary btn-lg">
                  Browse Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}