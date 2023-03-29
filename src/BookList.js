import React from "react";
import Carousel from "react-bootstrap/Carousel";
import BookItem from "./BookItem";

function BookList({ books, onDeleteBook }) {
  if (books.length === 0) {
    return <p>No books in the collection.</p>;
  }

  return (
    <Carousel className="best-books-carousel">
      {books.map((book) => (
        <BookItem key={book._id} book={book} onDeleteBook={onDeleteBook} />
      ))}
    </Carousel>
  );
}

export default BookList;
