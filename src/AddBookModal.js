import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

// Define the AddBookModal functional component
const AddBookModal = ({ showModal, handleCloseModal, handleInputChange, handleSubmit, bookFormState }) => {
  // Destructure the bookFormState object to get the form field values
  const { title, author, description, coverImageUrl } = bookFormState;

  // Render the modal component with the form to add a new book
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              name="author"
              value={author}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="coverImageUrl">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control
              type="text"
              name="coverImageUrl"
              value={coverImageUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Export the AddBookModal component for use in other modules
export default AddBookModal;
