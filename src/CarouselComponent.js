import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

// CarouselComponent is a functional component that takes books and handleDeleteBook as props
const CarouselComponent = ({ books, handleDeleteBook }) => {
  return (
    // Create a Carousel with custom class name
    <Carousel className="best-books-carousel">
      {/* Iterate through the books array and create a Carousel.Item for each book */}
      {books.map((book) => (
        <Carousel.Item key={book._id} className="carousel-item-custom">
          <div className="container">
            <div className="row">
              {/* Display the book cover image */}
              <div className="col-md-5">
                <img src={book.coverImageUrl} alt={book.title} className="carousel-image img-fluid" />
              </div>
              {/* Display the book details */}
              <div className="col-md-7">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>Description: {book.description}</p>
                {/* Display the delete button and call handleDeleteBook when clicked */}
                <Button variant="danger" onClick={() => handleDeleteBook(book._id)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselComponent;
