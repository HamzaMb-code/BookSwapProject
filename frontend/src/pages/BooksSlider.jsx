// src/components/BooksSlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import book1 from "../assets/bookSlider1.jpg";
import book2 from "../assets/bookSlider2.jpg";
import book3 from "../assets/bookSlider3.jpg";
import book4 from "../assets/bookSlider4.jpg";

function BooksSlider() {
  return (
    <section className="container py-5">
      <div className="row align-items-center mb-4">
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">
            Welcome to{" "}
            <mark
              style={{
                color: "brown",
                background: "white",
                borderRadius: "8px",
              }}
            >
              BookSwap
            </mark>
          </h1>
          <h3 className="fw-bold mb-3">Give a Book, Get a Book</h3>
          <p className="text-muted">
            BookSwap is a community-driven platform where students exchange
            their favorite books, discover new reads, and connect with fellow
            book lovers.
          </p>
          <Link to="/books">
            <button className="btn btn-primary mt-3">Explore Now</button>
          </Link>
        </div>
      </div>

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        className="mySwiper"
      >
        {[book1, book2, book3, book4].map((book, index) => (
          <SwiperSlide key={index}>
            <div className="card shadow-sm border-0 book-slide">
              <img
                src={book}
                alt={`book-${index}`}
                className="card-img-top"
                style={{ height: "350px", objectFit: "cover" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default BooksSlider;
