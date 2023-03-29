import React, { useState, useEffect } from "react";
import axios from "axios";
import BookList from "./BookList";
import AddBookModal from "./AddBookModal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";

function BestBooks() {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`;
      const response = await axios.get(url);
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddBookClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddBookSubmit = async (newBook) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, {
        ...newBook,
        description: newBook.description || "No description provided.",
        status: "AVAILABLE",
      });
      setBooks((prevState) => [...prevState, response.data]);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookId}`);
      setBooks((prevState) => prevState.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <>
      <BookList books={books} onDeleteBook={handleDeleteBook} />
      <Button variant="primary" onClick={handleAddBookClick}>
        Add Book
      </Button>
      <AddBookModal show={showModal} onHideModal={handleCloseModal} onSubmit={handleAddBookSubmit} />
    </>
  );
}

export default BestBooks;
