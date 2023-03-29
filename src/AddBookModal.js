import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function AddBookModal({ show, onHideModal, onSubmit }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleCoverImageUrlChange = (event) => setCoverImageUrl(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ title, author, description, coverImageUrl });
    onHideModal();
  };

  return (
    <Modal show={show} onHide={onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a new book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={title} onChange={handleTitleChange} required />
          </Form.Group>
          <Form.Group controlId="author">
            <Form.Label>Author</Form.Label>
            <Form.Control type="text" name="author" value={author} onChange={handleAuthorChange} />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={description} onChange={handleDescriptionChange} />
          </Form.Group>
          <Form.Group controlId="coverImageUrl">
            <Form.Label>Cover Image URL</Form.Label>
            <Form.Control type="text" name="coverImageUrl" value={coverImageUrl} onChange={handleCoverImageUrlChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBookModal;
