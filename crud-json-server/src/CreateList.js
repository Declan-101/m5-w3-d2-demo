import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import BookFields from './BookFields';

const CreateList = ({ resetForm, createList, saving, formError, ...fields }) => {
  const [show, setShow] = useState(false);
  const close = () => { if (!saving) setShow(false); };
  const submit = async event => { if (await createList(event)) setShow(false); };
  return (
    <>
      <Button variant="outline-primary" onClick={() => { resetForm(); setShow(true); }}>Create</Button>
      <Modal show={show} onHide={close} backdrop="static" keyboard={!saving} aria-labelledby="create-heading">
        <form onSubmit={submit}>
          <Modal.Header closeButton={!saving}><Modal.Title id="create-heading">Create Book</Modal.Title></Modal.Header>
          <Modal.Body>
            {formError && <Alert variant="danger" role="alert">{formError}</Alert>}
            <BookFields {...fields} disabled={saving} prefix="create" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close} disabled={saving}>Close</Button>
            <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Create'}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default CreateList;
