import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css";

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
    this.fetchBooks();
  }

  fetchBooks = async () => {
    try {
      const url = `${process.env.REACT_APP_SERVER}/books`;
      const response = await axios.get(url);
      this.setState({ books: response.data });
    } catch (error) {
      console.error(error);
    }
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
  try {
    const { title, author, description, coverImageUrl } = this.state;
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, {
      title,
      author,
      description: description || "No description provided.",
      coverImageUrl,
      status: 'AVAILABLE',
    });
    const newBook = response.data;
    this.setState((prevState) => ({
      books: [...prevState.books, newBook],
      showModal: false,
      title: "",
      author: "",
      description: "",
      coverImageUrl: "",
    }));
  } catch (error) {
    console.error("Error creating book:", error);
  }
};

  handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookId}`);
      this.setState((prevState) => ({
        books: prevState.books.filter((book) => book._id !== bookId),
      }));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  render() {
    const { books, showModal, title, author, description, coverImageUrl } = this.state;

    if (books.length === 0) {
      return <p>No books in the collection.</p>;
    }

    return (
      <>
        <Carousel className="best-books-carousel">
          {books.map((book) => (
            <Carousel.Item key={book._id} className="carousel-item-custom">
              <div className="container">
                <div className="row">
                  <div className="col-md-5">
                    <img src={book.coverImageUrl} alt={book.title} className="carousel-image img-fluid" />
                  </div>
                  <div className="col-md-7">
                    <h3>{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Description: {book.description}</p>
                    <Button variant="danger" onClick={() => this.handleDeleteBook(book._id)}>
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <Button variant="primary" onClick={this.handleAddBookClick}>
          Add Book
        </Button>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={title}
                  onChange={this.handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  name="author"
                  value={author}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={description}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Form.Group controlId="coverImageUrl">
                <Form.Label>Cover Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="coverImageUrl"
                  value={coverImageUrl}
                  onChange={this.handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default BestBooks;