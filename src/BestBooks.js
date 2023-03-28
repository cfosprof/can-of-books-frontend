import React, { Component } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BestBooks.css"; // Import the BestBooks.css file

class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
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

  render() {
    const { books } = this.state;

    if (books.length === 0) {
      return <p>No books in the collection.</p>;
    }

    return (
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
                </div>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    );
  }
}

export default BestBooks;
