import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";
import CarouselComponent from "./CarouselComponent";
import AddBookModal from "./AddBookModal";
import { fetchBooks, createBook, deleteBook } from "./BookUtils";

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      title: "",
      author: "",
      description: "",
      coverImageUrl: "",
    };
  }

  componentDidMount() {
    this.fetchAndSetBooks();
  }

  fetchAndSetBooks = async () => {
    const books = await fetchBooks();
    this.setState({ books });
  };

  handleAddBookClick = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { title, author, description, coverImageUrl } = this.state;
    const newBook = await createBook({
      title,
      author,
      description: description || "No description provided.",
      coverImageUrl,
    });

    if (newBook) {
      this.setState((prevState) => ({
        books: [...prevState.books, newBook],
        showModal: false,
        title: "",
        author: "",
        description: "",
        coverImageUrl: "",
      }));
    }
  };

  handleDeleteBook = async (bookId) => {
    const success = await deleteBook(bookId);
    if (success) {
      this.setState((prevState) => ({
        books: prevState.books.filter((book) => book._id !== bookId),
      }));
    }
  };

  render() {
    const { books, showModal, title, author, description, coverImageUrl } = this.state;

    if (books.length === 0) {
      return <p>No books in the collection.</p>;
    }

    return (
      <>
        <CarouselComponent books={books} handleDeleteBook={this.handleDeleteBook} />
        <Button variant="primary" onClick={this.handleAddBookClick}>
          Add Book
        </Button>
        <AddBookModal
          showModal={showModal}
          handleCloseModal={this.handleCloseModal}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
          bookFormState={{
            title,
            author,
            description,
            coverImageUrl,
          }}
        />
      </>
    );
  }
}

export default BestBooks;