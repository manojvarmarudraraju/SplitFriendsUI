import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import membersData from "./data/members.json";

const AddExpense = () => {
  const [lgShow, setLgShow] = useState(false);
  const handleClose = () => setLgShow(false);
  return (
    <>
      <Button onClick={() => setLgShow(true)}>Large modal</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Add Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Amount($)</Form.Label>
              <Form.Control type="text" placeholder="Amount" />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Upload Bill(Optional)</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <Form.Label>Members: </Form.Label>
            <div className="d-flex flex-row" style={{ overflowY: "auto" }}>
              {Object.keys(membersData.members).map((val) => (
                <div key="inline-checkbox" className="mb-3">
                  <Form.Check
                    inline
                    label={membersData["members"][val]}
                    name="group1"
                    type="checkbox"
                    id="inline-checkbox-1"
                  />
                </div>
              ))}
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleClose}
            variant="danger"
            className="rounded-pill"
          >
            Close
          </Button>
          <Button
            onClick={handleClose}
            variant="primary"
            className="rounded-pill"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddExpense;
