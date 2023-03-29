import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import CarouselComponent from "./CarouselComponent";
import AddBookModal from "./AddBookModal";
import { fetchBooks, createBook, deleteBook } from "./BookUtils";

function BestBooks() {
  // Declare state variables
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [bookFormState, setBookFormState] = useState({
    title: "",
    author: "",
    description: "",
    coverImageUrl: "",
  });

  // Fetch books when the component mounts
  useEffect(() => {
    async function fetchAndSetBooks() {
      const books = await fetchBooks();
      setBooks(books);
    }
    fetchAndSetBooks();
  }, []);

  // Show the AddBookModal when the "Add Book" button is clicked
  const handleAddBookClick = () => {
    setShowModal(true);
  };

  // Close the AddBookModal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Update the book form state when input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  // Submit the book form to create a new book
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, author, description, coverImageUrl } = bookFormState;
    const newBook = await createBook({
      title,
      author,
      description: description || "No description provided.",
      coverImageUrl,
    });

    // Add the new book to the list and close the modal if successful
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

  // Delete a book and update the state
  const handleDeleteBook = async (bookId) => {
    const success = await deleteBook(bookId);
    if (success) {
      setBooks((prevState) => prevState.filter((book) => book._id !== bookId));
    }
  };

  // If there are no books, show a message
  if (books.length === 0) {
    return <p>No books in the collection.</p>;
  }

  // Render the CarouselComponent, "Add Book" button, and AddBookModal
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
