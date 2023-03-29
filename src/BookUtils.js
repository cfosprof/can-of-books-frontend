import axios from "axios";

// Function to fetch books from the server
export const fetchBooks = async () => {
  try {
    const url = `${process.env.REACT_APP_SERVER}/books`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Function to create a new book on the server
export const createBook = async (bookData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/books`, {
      ...bookData,
      status: 'AVAILABLE',
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    return null;
  }
};

// Function to delete a book from the server
export const deleteBook = async (bookId) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER}/books/${bookId}`);
    return true;
  } catch (error) {
    console.error("Error deleting book:", error);
    return false;
  }
};

