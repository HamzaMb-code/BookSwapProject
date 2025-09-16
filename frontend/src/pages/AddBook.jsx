import { useState } from "react";
import { axiosClient } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaUser,
  FaAlignLeft,
  FaTag,
  FaList,
  FaImage,
} from "react-icons/fa";
import "./AddBook.css";

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    condition: "new",
    category: "",
    image: null,
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewImage(null);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await axiosClient.get("/sanctum/csrf-cookie");

      await axiosClient.post("/api/books", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book added successfully! 🎉");
      navigate("/books");
    } catch (err) {
      console.error(err);
      setError(
        "An error occurred while adding the book. Please check all fields."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-book-container">
      <div className="add-book-header">
        <h1>Add a New Book</h1>
        <p className="lead">Share your book with the BookSwap community</p>
      </div>

      <div className="add-book-form-container">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">
                <FaBook className="form-icon" /> Book Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter the book title"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaUser className="form-icon" /> Author
              </label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter the author's name"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                <FaAlignLeft className="form-icon" /> Description
              </label>   
              <textarea
                className="form-control"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief description of the book"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaTag className="form-icon" /> Condition
              </label>
              <select
                className="form-select"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="new">New</option>
                <option value="good">Good</option>
                <option value="used">Used</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <FaList className="form-icon" /> Category
              </label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Enter book category (e.g., Fiction, Science)"
                required
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">
                <FaImage className="form-icon" /> Book Cover Image
              </label>
              <div className="image-upload-container">
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  required
                />
                {previewImage && (
                  <div className="image-preview">
                    <img src={previewImage} alt="Book cover preview" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="ri-error-warning-line me-2"></i>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Adding Book...
              </>
            ) : (
              "Add Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;
