import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../pagesCSS/detailOfBook.css";
import { axiosClient } from "../../api/axios";

function DetailOfBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exchangeCount, setExchangeCount] = useState(0);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [requestError, setRequestError] = useState(null);
  const isOriginalBook = parseInt(id) <= 30;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookResponse, exchangeResponse] = await Promise.all([
          axiosClient.get(`/api/books/${id}`),
          axiosClient.get(`/api/books/${id}/exchange-count`),
        ]);

        setBook(bookResponse.data);
        setExchangeCount(exchangeResponse.data.exchange_count);

        // Check if the current user is the owner
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await axiosClient.get("/api/user");
          setIsOwner(userResponse.data.id === bookResponse.data.student_id);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err.response || err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleExchangeRequest = async () => {
    try {
      setRequestError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to request a book exchange");
        navigate("/login");
        return;
      }

      console.log("Sending exchange request for book:", id);
      const response = await axiosClient.post("/api/exchange-requests", {
        book_id: id,
      });

      console.log("Exchange request response:", response.data);
      alert("Exchange request sent successfully!");
      setShowExchangeModal(false);
    } catch (error) {
      console.error("Exchange request error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      if (error.response?.status === 403) {
        setRequestError(error.response.data.message);
      } else {
        setRequestError("Error sending exchange request. Please try again.");
      }
    }
  };

  if (loading) return <div className="book-details-container">Loading...</div>;
  if (error)
    return <div className="book-details-container">Error: {error}</div>;
  if (!book)
    return <div className="book-details-container">Book not found</div>;

  return (
    <div className="book-details-container">
      <div className="book-details-card">
        <div className="book-image">
          <img src={book.image} alt={book.title} />
        </div>
        <div className="book-info">
          <h1>{book.title}</h1>
          <p className="author">
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>Owner:</strong>{" "}
            {book.student ? book.student.name : "Unknown User"}
          </p>
          <p className="description">
            <strong>Description:</strong> {book.description}
          </p>
          <p className="category">
            <strong>Category:</strong> {book.category}
          </p>
          <p className="condition">
            <strong>Condition:</strong> {book.condition}
          </p>
          {!isOriginalBook && (
            <p className="exchanges">
              <strong>Total Exchanges:</strong> {exchangeCount}
            </p>
          )}

          {!isOriginalBook && !isOwner && (
            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowExchangeModal(true)}
            >
              Request Exchange
            </button>
          )}

          {isOriginalBook && (
            <div className="alert alert-info mt-3" role="alert">
              <i className="ri-information-line me-2"></i>
              This is a featured book and cannot be exchanged. Browse user-added
              books to find exchangeable titles.
            </div>
          )}
        </div>
      </div>

      {/* Exchange Modal */}
      {showExchangeModal && (
        <div className="modal-overlay">
          <div className="exchange-modal">
            <h3>Request Book Exchange</h3>
            <p>Are you sure you want to request an exchange for this book?</p>
            <p className="text-muted">
              Note: You need to have at least one book to make an exchange
              request.
            </p>

            {requestError && (
              <div className="alert alert-danger mt-3" role="alert">
                {requestError}
              </div>
            )}

            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowExchangeModal(false);
                  setRequestError(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleExchangeRequest}
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailOfBook;
