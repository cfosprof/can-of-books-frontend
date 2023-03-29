import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditBookModal = ({ showModal, handleCloseModal, handleInputChange, handleSubmit, bookFormState, book }) => {
  if (!book) return null;

  const { title, author, description, coverImageUrl } = bookFormState;

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Edit book details</Modal.Title>
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
          <Button variant="primary" type="submit">Save Changes</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditBookModal;