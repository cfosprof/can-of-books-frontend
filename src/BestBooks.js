import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import CarouselComponent from "./CarouselComponent";
import AddBookModal from "./AddBookModal";
import EditBookModal from "./EditBookModal";
import { fetchBooks, createBook, deleteBook, updateBook } from "./BookUtils";

function BestBooks() {
  // Declare state variables
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookFormState, setBookFormState] = useState({
    title: "",
    author: "",
    description: "",
    coverImageUrl: "",
  });

  //Fetch books from the API when the component mounts
  useEffect(() => {
    async function fetchAndSetBooks() {
      const books = await fetchBooks();
      setBooks(books);
    }
    fetchAndSetBooks();
  }, []);

  //Show the modal when the add book button is clicked
  const handleAddBookClick = () => {
    setShowModal(true);
  };

  //Close the modal when the close button is clicked
  const handleCloseModal = () => {
    setShowModal(false);
    resetFormState();
  };

  //Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  
  //Reset the form state to empty strings when the modal is closed
  const resetFormState = () => {
    setBookFormState({
      title: "",
      author: "",
      description: "",
      coverImageUrl: "",
    });
  };

  //Handle form submission when a new book is added
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, author, description, coverImageUrl } = bookFormState;
    const newBook = await createBook({
      title,
      author,
      description: description || "No description provided.",
      coverImageUrl,
    });

    //If the book was successfully created, add it to the books array and close the modal
    if (newBook) {
      setBooks((prevState) => [...prevState, newBook]);
      setShowModal(false);
      resetFormState();
    }
  };

  //Handle book deletion
  const handleDeleteBook = async (bookId) => {
    const success = await deleteBook(bookId);
    if (success) {
      setBooks((prevState) => prevState.filter((book) => book._id !== bookId));
    }
  };

  //Handle edit book click
  const handleEditBookClick = (book) => {
    setSelectedBook(book);
    setBookFormState({
      title: book.title,
      author: book.author,
      description: book.description,
      coverImageUrl: book.coverImageUrl,
    });
    setEditModalShow(true);
  };

  //Handle edit modal close
  const handleEditModalClose = () => {
    setEditModalShow(false);
    setSelectedBook(null);
    resetFormState();
  };

  //Handle edit form submission
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!selectedBook) return;

    //Create a new book object with the updated Book value in the books array and close the modal
    const updatedBook = await updateBook(selectedBook._id, bookFormState);
    if (updatedBook) {
      setBooks((prevState) => prevState.map((book) => (book._id === updatedBook._id ? updatedBook : book)));
      setEditModalShow(false);
      setSelectedBook(null);
      resetFormState();
    }
  };

  if (books.length === 0) {
    return <p>No books in the collection.</p>;
  }

  return (
    <>
      <CarouselComponent books={books} handleDeleteBook={handleDeleteBook} handleEditBookClick={handleEditBookClick} />
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
      <EditBookModal
        showModal={editModalShow}
        handleCloseModal={handleEditModalClose}
        handleInputChange={handleInputChange}
        handleSubmit={handleEditSubmit}
        bookFormState={bookFormState}
        book={selectedBook}
      />
    </>
  );
}

export default BestBooks;
