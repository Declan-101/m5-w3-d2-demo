import React from 'react';
import { Form } from 'react-bootstrap';

const BookFields = ({ singledata, handleChange, disabled, prefix }) => (
  <>
    <Form.Group className="mb-3" controlId={`${prefix}-title`}>
      <Form.Label>Title</Form.Label>
      <Form.Control name="title" value={singledata.title} onChange={handleChange}
        disabled={disabled} required maxLength={200} autoFocus />
    </Form.Group>
    <Form.Group controlId={`${prefix}-author`}>
      <Form.Label>Author</Form.Label>
      <Form.Control name="author" value={singledata.author} onChange={handleChange}
        disabled={disabled} required maxLength={200} />
    </Form.Group>
  </>
);
export default BookFields;
