import { useNavigate } from "react-router-dom";
import "../pagesCSS/allBooks.css";

function AllBooks({ book, dataOfBooks, onShowAllBooks }) {
  const booksToDisplay = book.length > 0 ? book : dataOfBooks;
  const navigate = useNavigate();

  const handleShowMore = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="title">All Books</h1>
        {book.length > 0 && (
          <button className="btn btn-outline-primary" onClick={onShowAllBooks}>
            <i className="ri-refresh-line me-2"></i>
            Show All Books
          </button>
        )}
      </div>

      {book.length === 0 && dataOfBooks.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <i className="ri-information-line me-2"></i>
          No books found. Try adjusting your search or check back later.
        </div>
      ) : (
        <div className="row">
          {booksToDisplay.map((book, index) => (
            <div className="col-md-4 mb-4" key={book.id || index}>
              <div className="card">
                <img
                  src={book.image}
                  className="card-img-top"
                  alt={book.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{book.title}</h5>
                  <p className="card-text">
                    <strong>Author: </strong>
                    {book.author}
                  </p>
                  <p className="card-text">
                    <strong>Description: </strong>
                    {book.description.substring(0, 100)}...
                  </p>
                  <p className="card-text">
                    <strong>Category: </strong>
                    {book.category}
                  </p>
                  <p className="card-text">
                    <strong>Condition: </strong>
                    {book.condition}
                  </p>
                  <div className="d-flex justify-content-end mt-3">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleShowMore(book.id)}
                    >
                      Show More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default AllBooks;
