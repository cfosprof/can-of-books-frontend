import axios from 'axios';
import React from 'react';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount(){
    axios.get('./books')
      .then((response) => {
        this.setState({
          books: response.data
        })
      })
      .catch ((error) => {
        console.log(error);
      })
  }

  render() {

    let bookItems;

    if (this.state.books.length) {
      bookItems = this.state.books.map((book) =>
        <Carousel.Item key={book._id}>
          <img
            className="d-block w-100"
            src={book.image}
            alt={book.title}
          />
          <Carousel.Caption>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    } else {
      bookItems = <h3>No Books Found :(</h3>;
    }

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <p>Book Carousel coming soon</p>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
