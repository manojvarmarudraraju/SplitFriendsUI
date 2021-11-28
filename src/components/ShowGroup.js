import React, { Component } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Modal,
  Form,
  OverlayTrigger,
  Tooltip,
  Nav,
} from "react-bootstrap";
import { IoMdListBox } from "react-icons/io";
import Data from "./data/SingleGroupData.json";
import GActivity from "./data/GroupActivity.json";
import { RiPencilFill, RiDeleteBin5Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import Walmart from "../components/data/images/walmart.png";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      activity: GActivity,
      addExp: false,
      lgShow: false,
      SplitName: { formHorizontalRadios: "equal" },
      chartHeader: { navChartItem: "weekly" },
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
  handleNav = (e) => {
    const { name, id } = e.target;
    this.setState({
      chartHeader: {
        [name]: id,
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
    var debt_str = "";
    Object.keys(this.state.data.debts).forEach((val) => {
      debt_str +=
        val.toString() + ":" + this.state.data.debts[val].toString() + "$, ";
    });
    debt_str = debt_str.slice(0, -2);
    return (
      <>
        <>
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
                  {this.state.SplitName["formHorizontalRadios"] === "equal"
                    ? this.state.data.members.map((val, index) => (
                        <div key={index} className="mb-3">
                          <Form.Check
                            inline
                            label={val}
                            name="group1"
                            type="checkbox"
                            id="inline-checkbox-1"
                          />
                        </div>
                      ))
                    : this.state.data.members.map((val, index) => (
                        <div key={index} className="mb-3">
                          <label>{val}</label>
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
        <Container className="mt-1">
          <Row>
            <Col lg="8">
              <Card>
                <Card.Header as="h5">Group Name</Card.Header>
                <Card.Body>
                  <Card.Title as="h5">
                    Members:
                    {this.state.data.members.map((val) => (
                      <Button
                        variant="secondary"
                        className="rounded-pill fs-6"
                        size="sm"
                      >
                        {val}
                      </Button>
                    ))}
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">Add Expense</Tooltip>
                      }
                    >
                      <Button
                        variant="primary"
                        className="float-end rounded-pill"
                        onClick={() => this.setState({ lgShow: true })}
                      >
                        <IoMdListBox fontSize="1.5em" className="mb-1" />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="bottom"
                      overlay={
                        <Tooltip id="button-tooltip-2">SettleUp</Tooltip>
                      }
                    >
                      <Button
                        variant="danger"
                        className="float-end rounded-pill"
                      >
                        <MdDelete fontSize="1.5em" className="mb-1" />
                      </Button>
                    </OverlayTrigger>
                  </Card.Title>
                  <Card.Title>Debts:</Card.Title>
                  <Card.Text>{debt_str}</Card.Text>
                </Card.Body>
              </Card>
              <Row className="m-1">
                <Card>
                  <Card.Header as="h5">Expenses</Card.Header>
                  {this.state.activity.map((val) => (
                    <Card className="mt-1">
                      <Card.Header as="h5">
                        <Container>
                          <Row>
                            <Col className="d-flex align-items-center">
                              Walmart
                            </Col>
                            <Col className="d-flex justify-content-end">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">Edit</Tooltip>
                                }
                              >
                                <div className="m-1 ">
                                  <RiPencilFill
                                    fontSize="1.5em"
                                    color="darkblue"
                                  />
                                </div>
                              </OverlayTrigger>
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip id="button-tooltip-2">
                                    Archive
                                  </Tooltip>
                                }
                              >
                                <div className="m-1">
                                  <RiDeleteBin5Fill
                                    fontSize="1.5em"
                                    color="red"
                                  />
                                </div>
                              </OverlayTrigger>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Header>
                      <Card.Body>
                        <Container>
                          <Row>
                            <Col className="d-flex align-items-top">
                              <Card.Img
                                src={Walmart}
                                alt="Walmart.png"
                                className="w-25 h-100"
                              />
                            </Col>
                            <Col>
                              <div className="mx-2 float-end">
                                <Card.Title>Details:</Card.Title>
                                <Card.Text>Lender: Manoj</Card.Text>
                                <Card.Text>
                                  Borrower: [Abijith, Harsh]
                                </Card.Text>
                                <Card.Text>Original Amount: $70.00</Card.Text>
                                <Card.Text>Total Amount: $40.00</Card.Text>
                                <Card.Text>Date: 11-27-2021 22:45</Card.Text>
                              </div>
                            </Col>
                          </Row>
                        </Container>
                      </Card.Body>
                    </Card>
                  ))}
                </Card>
              </Row>
            </Col>
            <Col className="mt-5">
              <Nav justify variant="pills" defaultActiveKey="home">
                <Nav.Item>
                  <Nav.Link
                    eventKey="home"
                    name="navChartItem"
                    id="weekly"
                    onClick={this.handleNav}
                  >
                    Weekly
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="link-1"
                    name="navChartItem"
                    id="monthly"
                    onClick={this.handleNav}
                  >
                    Monthly
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              {console.log(this.state.chartHeader)}
              {this.state.chartHeader["navChartItem"] === "weekly" ? (
                <div>
                  <Bar
                    data={{
                      labels: ["January", "February", "March", "April", "May"],
                      datasets: [
                        {
                          label: "Expenses",
                          fill: true,
                          backgroundColor: "blue",
                          borderColor: "rgba(0,0,0,1)",
                          borderWidth: 1,
                          data: [65, 59, 80, 81, 56],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: "Expenses per month",
                          fontSize: 10,
                        },
                        legend: {
                          display: true,
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              ) : (
                <div>
                  <Pie
                    data={{
                      labels: ["January", "February", "March", "April", "May"],
                      datasets: [
                        {
                          label: "Rainfall",
                          backgroundColor: [
                            "#B21F00",
                            "#C9DE00",
                            "#2FDE00",
                            "#00A6B4",
                            "#6800B4",
                          ],
                          hoverBackgroundColor: [
                            "#501800",
                            "#4B5000",
                            "#175000",
                            "#003350",
                            "#35014F",
                          ],
                          data: [65, 59, 80, 81, 56, 65, 59, 80, 81, 56],
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        title: {
                          display: true,
                          text: "Expenses per month",
                          fontSize: 10,
                        },
                        legend: {
                          display: true,
                          position: "bottom",
                        },
                      },
                    }}
                  />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default ShowGroup;
