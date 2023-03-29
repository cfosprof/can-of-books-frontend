import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import CarouselComponent from "./CarouselComponent";
import AddBookModal from "./AddBookModal";
import { fetchBooks, createBook, deleteBook } from "./BookUtils";

function BestBooks() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookFormState, setBookFormState] = useState({
    title: "",
    author: "",
    description: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    async function fetchAndSetBooks() {
      const books = await fetchBooks();
      setBooks(books);
    }
    fetchAndSetBooks();
  }, []);

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, author, description, coverImageUrl } = bookFormState;
    const newBook = await createBook({
      title,
      author,
      description: description || "No description provided.",
      coverImageUrl,
    });

    if (newBook) {
      setBooks((prevState) => [...prevState, newBook]);
      setShowModal(false);
      setBookFormState({
        title: "",
        author: "",
        description: "",
        coverImageUrl: "",
      });
    }
  };

  const handleDeleteBook = async (bookId) => {
    const success = await deleteBook(bookId);
    if (success) {
      setBooks((prevState) => prevState.filter((book) => book._id !== bookId));
    }
  };

  if (books.length === 0) {
    return <p>No books in the collection.</p>;
  }

  return (
    <>
      <CarouselComponent books={books} handleDeleteBook={handleDeleteBook} />
      <Button variant="primary" onClick={handleAddBookClick}>
        Add Book
      </Button>
      <AddBookModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        bookFormState={bookFormState}
      />
    </>
  );
}

export default BestBooks;