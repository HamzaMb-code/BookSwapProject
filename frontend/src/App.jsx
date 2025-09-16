import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import Layout from "./layouts/Layout";
import "./pagesCSS/Home.css";
import AllBooks from "./pages/AllBooks";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import AddBook from "./pages/AddBook";
import DetailOfBook from "./pages/DetailOfBook";
import { AuthProvider } from "./contexts/AuthContext";
// import AuthChecker from "./components/AuthChecker";

function App() {
  const [dataOfBooks, setDataOfBooks] = useState([]);
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8000/api/books").then((response) => {
      setDataOfBooks(response.data);
    });
  }, []);

  function filteringBooks(bookName) {
    if (bookName.trim() === "") {
      setBook([]);
      return;
    }

    const searchTerm = bookName.toLowerCase().trim();
    const filteredBooks = dataOfBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );

    setBook(filteredBooks);
    navigate("books");
  }

  const handleShowAllBooks = () => {
    setBook([]);
  };

  return (
    <>
      <AuthProvider>
        {/* <AuthChecker> */}
        <Routes>
          <Route element={<Layout checkName={filteringBooks} />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/aboutUs" element={<AboutUs />}></Route>
            <Route
              path="/books"
              element={
                <AllBooks
                  dataOfBooks={dataOfBooks}
                  book={book}
                  onShowAllBooks={handleShowAllBooks}
                />
              }
            ></Route>
            <Route path="/book/:id" element={<DetailOfBook />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUpPage />}></Route>
            <Route path="/addBook" element={<AddBook />}></Route>
          </Route>

          <Route
            path="*"
            element={
              <div style={{ padding: "20px" }}>
                <NotFound />
              </div>
            }
          ></Route>
        </Routes>
        {/* </AuthChecker> */}
      </AuthProvider>
    </>
  );
}

export default App;
