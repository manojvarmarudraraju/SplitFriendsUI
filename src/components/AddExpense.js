import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
//import { FaSleigh } from "react-icons/fa";
import membersData from "./data/members.json";

class AddExpense extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false,
      SplitName: { formHorizontalRadios: "equal" },
      amountValue: "",
    };
  }
  handleClose = () => this.setState({ lgShow: false });
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      SplitName: {
        [name]: value,
      },
    });
  };
  handleText = (evt) => {
    const amountValue = evt.target.validity.valid
      ? evt.target.value
      : this.state.amountValue;

    this.setState({ amountValue: amountValue });
  };
  render() {
    return (
      <>
        <Button onClick={() => this.setState({ lgShow: true })}>
          Large modal
        </Button>
        <Modal
          size="lg"
          show={this.state.lgShow}
          onHide={() => this.setState({ lgShow: false })}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Add Expense
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Enter Amount</Form.Label>
                <Form.Control type="text" placeholder="$0.00" />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Upload Bill(Optional)</Form.Label>
                <Form.Control type="file" multiple />
              </Form.Group>
              <fieldset>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label>Split</Form.Label>
                  <Col sm={10} className="d-flex flex-row">
                    <Form.Check
                      className="m-2"
                      type="radio"
                      label="Equally"
                      value="equal"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                      onChange={this.handleChange}
                      checked={
                        this.state.SplitName.formHorizontalRadios === "equal"
                      }
                    />
                    <Form.Check
                      className="m-2"
                      type="radio"
                      label="Unequally"
                      value="unequal"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
              <Form.Label>Members: </Form.Label>
              <div className="d-flex flex-row" style={{ overflowY: "auto" }}>
                {console.log(this.state.SplitName)}
                {this.state.SplitName["formHorizontalRadios"] === "equal"
                  ? Object.keys(membersData.members).map((val, index) => (
                      <div key={index} className="mb-3">
                        <Form.Check
                          inline
                          label={membersData["members"][val]}
                          name="group1"
                          type="checkbox"
                          id="inline-checkbox-1"
                        />
                      </div>
                    ))
                  : Object.keys(membersData.members).map((val, index) => (
                      <div key={index} className="mb-3">
                        <label>{membersData["members"][val]}</label>
                        <input
                          id={index}
                          type="text"
                          pattern="[0-9]*.[0-9]*"
                          name="number"
                          placeholder="$0.00"
                          className="m-2"
                        />
                      </div>
                    ))}
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={this.handleClose}
              variant="danger"
              className="rounded-pill"
            >
              Close
            </Button>
            <Button
              onClick={this.handleClose}
              variant="primary"
              className="rounded-pill"
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default AddExpense;
