import React, { useState } from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import BookFields from './BookFields';

const UpdateList = ({ elementId, title, getList, updateList, saving, formLoading, formError, ...fields }) => {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  const open = async event => { setReady(false); setShow(true); setReady(await getList(event, elementId)); };
  const close = () => { if (!saving) setShow(false); };
  const submit = async event => { if (await updateList(event, elementId)) setShow(false); };
  return (
    <>
      <Button size="sm" variant="outline-primary" aria-label={`Update ${title}`} onClick={open}>Update</Button>
      <Modal show={show} onHide={close} backdrop="static" keyboard={!saving} aria-labelledby={`update-heading-${elementId}`}>
        <form onSubmit={submit}>
          <Modal.Header closeButton={!saving}><Modal.Title id={`update-heading-${elementId}`}>Update Book</Modal.Title></Modal.Header>
          <Modal.Body>
            {formLoading && <p role="status">Loading book…</p>}
            {formError && <Alert variant="danger" role="alert">{formError}</Alert>}
            <BookFields {...fields} disabled={!ready || formLoading || saving} prefix={`update-${elementId}`} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={close} disabled={saving}>Close</Button>
            <Button type="submit" disabled={!ready || formLoading || saving}>{saving ? 'Saving…' : 'Update'}</Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default UpdateList;
