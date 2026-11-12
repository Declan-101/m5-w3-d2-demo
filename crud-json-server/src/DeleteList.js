import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import BookFields from './BookFields';

const DeleteList = ({ elementId, title, getList, deleteList, saving, formLoading, formError, ...fields }) => {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const open = async event => { setReady(false); setShow(true); setReady(await getList(event, elementId)); };
  const close = () => { if (!saving) setShow(false); };
  const submit = async event => { if (await deleteList(event, elementId)) setShow(false); };
  return (
    <>
      <Button size="sm" variant="outline-danger" aria-label={`Delete ${title}`} onClick={open}>Delete</Button>
      <Modal show={show} onHide={close} backdrop="static" keyboard={!saving} aria-labelledby={`delete-heading-${elementId}`}>
        <form onSubmit={submit}>
          <Modal.Header closeButton={!saving}><Modal.Title id={`delete-heading-${elementId}`}>Delete Book</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Delete this book from the local database?</p>
            {formLoading && <p role="status">Loading book…</p>}
            {formError && <Alert variant="danger" role="alert">{formError}</Alert>}
            <BookFields {...fields} disabled prefix={`delete-${elementId}`} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close} disabled={saving}>Close</Button>
            <Button type="submit" variant="danger" disabled={!ready || formLoading || saving}>{saving ? 'Deleting…' : 'Delete'}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default DeleteList;
