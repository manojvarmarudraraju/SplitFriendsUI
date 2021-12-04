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
  Dropdown,
  DropdownButton,
  Alert,
} from "react-bootstrap";
import Header from "./Header";
import Data from "./data/SingleGroupData.json";
import GActivity from "./data/GroupActivity.json";
import { RiDeleteBin5Fill, RiAddFill } from "react-icons/ri";
import { FcMoneyTransfer } from 'react-icons/fc';
import { MdDelete } from "react-icons/md";
import Walmart from "../components/data/images/walmart.png";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { clearMessage } from "../redux/actions/message";
import { deleteExpense, getSingleGroups } from "../redux/actions/group";
import { connect } from "react-redux";
import { login } from "../redux/actions/auth";
import { addExpense } from "../redux/actions/group";
import { archiveExpense } from "../redux/actions/group";
import MyLoader from "./MyLoader";

class ShowGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: Data,
      activity: GActivity,
      addExp: false,
      lgShow: false,
      cshow: false,
      SplitName: { formHorizontalRadios: "equal" },
      chartHeader: { navChartItem: "weekly" },
      amountValue: "",
      weeklyHeaders: [],
      weeklyAmount: [],
      monthlyHeaders: [],
      monthlyAmount: [],
      debt_str1: "",
      id: this.props.params.id,
      groupSingle: this.props.groupSingle,
      members: this.props.members,
      allMembers: [this.props.user, ...this.props.members],
      user: this.props.user,
      idUserMap: this.props.idUserMap,
      isAPICalled: false,
      isAPISuccess: false,
      tempMembers: [],
      selectedMembers: [],
      name: "",
      totalAmount: "",
      clearDebtSelectedMember: "",
      clearDebtSelectedMemberAmount: "",
      isClearAllDebt: false,
    };
    this.clearMessage = this.clearMessage.bind(this);
    this.getGroupData = this.getGroupData.bind(this);
    this.handleBorrowerName = this.handleBorrowerName.bind(this);
    this.handleText = this.handleText.bind(this);
    this.handleAmount = this.handleAmount.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.archiveExpense = this.archiveExpense.bind(this);
    this.clearMessage();
    this.getGroupData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      groupSingle: nextProps.groupSingle,
      weeklyHeaders: nextProps.weeklyHeaders,
      weeklyAmount: nextProps.weeklyAmount,
      monthlyHeaders: nextProps.monthlyHeaders,
      monthlyAmount: nextProps.monthlyAmount,
      debt_str1: nextProps.debt_str1,
    });
  }

  handleAdd = () => {
    if (this.state.name === "" || this.state.totalAmount === "") {
      alert("Please fill in all the details!");
      return;
    }
    if (this.state.SplitName.formHorizontalRadios !== "equal") {
      let total = 0;
      this.state.allMembers.map((item) => {
        total += item.amountValue * 1;
      });
      if (total !== this.state.totalAmount * 1) {
        alert("Please fill appropriate amount for distribution!");
        return;
      }
    } else if (this.state.selectedMembers.length <= 0) {
      alert("Please fill in all the details!");
      return;
    }
    const obj = {};
    obj["name"] = this.state.name;
    obj["division"] = [];
    if (this.state.SplitName.formHorizontalRadios === "equal") {
      this.state.selectedMembers.map((item) => {
        item.amountValue =
          (this.state.totalAmount * 1) / this.state.selectedMembers.length;
        let division = {
          lender: this.state.user._id,
          borrower: item._id,
          amount: item.amountValue,
        };
        obj["division"].push(division);
      });
    } else {
      this.state.allMembers.map((item) => {
        if (item.amountValue != 0) {
          let division = {
            lender: this.state.user._id,
            borrower: item._id,
            amount: item.amountValue,
          };
          obj["division"].push(division);
        }
      });
    }
    obj["amount"] = this.state.totalAmount * 1;
    obj["is_payment"] = false;
    const { dispatch } = this.props;
    dispatch(addExpense(this.state.id, obj))
      .then(() => {
        this.handleClose();
      })
      .catch(() => {});
  };

  handleName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.state.allMembers.map((item) => {
      item.amountValue = "";
    });
    this.setState({
      SplitName: {
        [name]: value,
      },
      allMembers: this.state.allMembers
    });
  };

  handleBorrowerName = (val) => {
    const { idUserMap } = this.state;
    let names = [];
    val.division.map(function (d, idx) {
      let name = idUserMap[d.borrower] + "($" + Math.round(Math.abs(d.amount * 1 + Number.EPSILON) * 100)/100 + ")";
      names.push(name);
    });
    return <>{names.join(", ")}</>;
  };

  clearMessage = () => {
    const { dispatch } = this.props;
    dispatch(clearMessage());
  };

  getGroupData = () => {
    if (this.state.isAPICalled) {
      return;
    }
    this.setState({ ...this.state, isAPICalled: true, isAPISuccess: false });
    const { dispatch } = this.props;
    dispatch(getSingleGroups(this.state.id))
      .then(() => {
        const newWHeaders = [];
        const newWAmount = [];
        const newMHeaders = [];
        const newMAmount = [];
        var debt_str = "";
        Object.keys(this.state.groupSingle.debts.weekExp).map((val) => {
          newWHeaders.push(this.state.idUserMap[val]);
          newWAmount.push(this.state.groupSingle.debts.weekExp[val]);
        });
        Object.keys(this.state.groupSingle.debts.monthExp).map((val) => {
          newMHeaders.push(this.state.idUserMap[val]);
          newMAmount.push(this.state.groupSingle.debts.monthExp[val]);
        });
        Object.keys(this.state.groupSingle.debts.debts).forEach((val) => {
          debt_str +=
            this.state.idUserMap[val] +
            ": $" +
            Math.round((this.state.groupSingle.debts.debts[val] * 1 + Number.EPSILON)*100)/100 +
            ", ";
        });
        debt_str = debt_str.slice(0, -2);
        if (debt_str === "") {
          debt_str = "No debts to show.";
        }
        this.setState({
          ...this.state,
          isAPICalled: false,
          isAPISuccess: true,
          weeklyHeaders: newWHeaders,
          weeklyAmount: newWAmount,
          monthlyHeaders: newMHeaders,
          monthlyAmount: newMAmount,
          debt_str1: debt_str,
          tempMembers: this.state.allMembers.filter((val) => this.props.groupSingle.data.members.includes(val._id) || 
          val._id === this.props.groupSingle.data.admin),
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          isAPICalled: false,
          isAPISuccess: false,
        });
      });
  };

  handleClose = () => {
    this.setState({
      lgShow: false,
      SplitName: {
        formHorizontalRadios: "equal",
      },
      totalAmount: "",
      members: this.props.members,
      user: this.props.user,
      selectedMembers: [],
      name: "",
      message: this.props.message,
    });
    window.location.reload();
  };

  handleDebtsClose = () => {
    this.setState({ cshow: false });
    window.location.reload();
  }

  handleDebtsSubmit = () => {
    if (this.state.clearDebtSelectedMember === "" || this.state.clearDebtSelectedMemberAmount * 1 === 0) {
      alert("Please fill in all the details!");
      return
    }
    if (this.state.clearDebtSelectedMemberAmount * 1  > Math.abs(this.state.groupSingle.debts.debts[this.state.clearDebtSelectedMember]) || 
      this.state.clearDebtSelectedMemberAmount * 1  < 0){
      alert("Please enter valid amount to clear your debt.");
      return
    }
  }
  
  handleNav = (e) => {
    const { name, id } = e.target;
    this.setState({
      chartHeader: {
        [name]: id,
      },
    });
  };

  handleText = (evt, val) => {
    const re = /^[+-]?\d*(?:[.]\d*)?$/;
    if (re.test(evt.target.value) || evt.target.value === "") {
      // const amountValue = evt.target.validity.valid
      //   ? evt.target.value
      //   : this.state.amountValue;
      //this.setState({ amountValue: evt.target.value });
      var array = [...this.state.allMembers];
      var index = array.indexOf(val);
      if (index !== -1) {
        array[index].amountValue = evt.target.value;
        this.setState({ allMembers: array });
      }
    }
  };

  handleAmount = (e) => {
    const re = /^[+-]?\d*(?:[.]\d*)?$/;
    if (re.test(e.target.value) || e.target.value === "") {
      // const amountValue = evt.target.validity.valid
      //   ? evt.target.value
      //   : this.state.amountValue;
      this.setState({ totalAmount: e.target.value });
    }
  };

  handleCheck = (e, val) => {
    if (e.target.checked) {
      this.setState({ selectedMembers: [...this.state.selectedMembers, val] });
    } else {
      var array = [...this.state.selectedMembers];
      var index = array.indexOf(val);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ selectedMembers: array });
      }
    }
  };


  archiveExpense = (gId, eId, gName, eName) => {
    const { dispatch } = this.props;
    var obj = {};
    obj["groupName"] = gName;
    obj["expenseName"] = eName;
    dispatch(archiveExpense(gId, eId, obj))
      .then(window.location.reload())
      .catch((error) => {
        console.log(error);
      });
  };

  onClearDebtMemberSelected = (e) => {
    this.setState({
      clearDebtSelectedMember: e,
      clearDebtSelectedMemberAmount: Math.abs(this.state.groupSingle.debts.debts[e]),
      isClearAllDebt: true,
    })
  }

  handleClearDebtAmount = (evt) => {
    let temp = false;
      if(evt.target.value * 1 === this.state.groupSingle.debts.debts[this.state.clearDebtSelectedMember]) {
        temp = true;
      }
      this.setState({
        clearDebtSelectedMemberAmount: evt.target.value * 1,
        isClearAllDebt: temp,
      });
  };

  handleBillUpload = (e) => {
    console.log(e.target);
  }

  render() {
    if(this.state.isAPISuccess && this.state.groupSingle.data != null) {
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
                    <Form.Label>Enter Expense Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Walmart, Uber, etc."
                      onChange={this.handleName}
                      value={this.state.name}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Enter Amount</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="$0.00"
                      onChange={this.handleAmount}
                      value={this.state.totalAmount}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFileMultiple" className="mb-3">
                    <Form.Label>Upload Bill(Optional)</Form.Label>
                    <Form.Control type="file" onChange={this.handleBillUpload}/>
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
                      ? this.state.tempMembers.map((val, index) => (
                          <div key={index} className="mb-3">
                            <Form.Check
                              inline
                              label={val.displayName}
                              title={"Hello"}
                              name="group1"
                              type="checkbox"
                              id="inline-checkbox-1"
                              onChange={(event) => this.handleCheck(event, val)}
                            />
                          </div>
                        ))
                      : this.state.tempMembers.map((val, index) => (
                          <div key={index} className="mb-3">
                            <label>{val.displayName}</label>
                            <input
                              id={index}
                              type="text"
                              name="number"
                              placeholder="$0.00"
                              className="m-2"
                              onChange={(event) => this.handleText(event, val)}
                              value={val.amountValue}
                            />
                          </div>
                        ))}
                  </div>
                </Form>
                {this.state.message && (
                  <>
                    <Alert variant={"danger"}>{this.state.message}</Alert>
                  </>
                )}
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
                  onClick={this.handleAdd}
                  variant="primary"
                  className="rounded-pill"
                >
                  Add
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <>
            <Modal
              show={this.state.cshow}
              onHide={this.handleDebtsClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Clear Debts</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row>
                    <Col>Group Name:</Col>
                    <Col className="text-uppercase">{this.state.groupSingle.data.name}</Col>
                  </Row>
                  <Row className="mt-2">
                    <Col className="float-start">
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Members"
                        className="rounded-pill"
                        onSelect={this.onClearDebtMemberSelected}
                      >
                        {Object.keys(this.state.groupSingle.debts.debts).length !== 0 &&
                          Object.keys(this.state.groupSingle.debts.debts)
                            .map((value, index) => (
                              <>
                                <Dropdown.Item key={index} eventKey={value}>
                                  {this.state.idUserMap[value]} ({Math.round((this.state.groupSingle.debts.debts[value] * 1 +Number.EPSILON)*100)/100}$){" "}
                                </Dropdown.Item>
                                <hr />
                              </>
                            ))}
                      </DropdownButton>
                    </Col>
                    <Col>
                      <input
                        id={1}
                        type="number"
                        name="number"
                        placeholder="$0.00"
                        className="m-2"
                        onChange={(event) => this.handleClearDebtAmount(event)}
                        value={this.state.clearDebtSelectedMemberAmount}
                      />
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  onClick={this.handleDebtsClose}
                  className="rounded rounded-pill"
                >
                  Close
                </Button>
                <Button
                  variant="success"
                  className="rounded rounded-pill text-black"
                  onClick={this.handleDebtsSubmit}
                >
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          <Header />
          <Container className="mt-1">
            <Row>
              <Col lg="8">
                <Card>
                  <Card.Header as="h5">
                    {this.state.groupSingle.data.name}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title as="h5">
                      Members:
                      <Container>
                        <Row>
                          <Col lg="9">
                            {this.state.tempMembers.map((val) => (
                              <Button
                                variant="secondary"
                                className="rounded-pill fs-6"
                                size="sm"
                              >
                                {val.displayName}
                              </Button>
                            ))}
                          </Col>
                          <Col>
                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="button-tooltip-2">
                                  Add Expense
                                </Tooltip>
                              }
                            >
                              <Button
                                variant="primary"
                                className="float-end rounded-pill"
                                onClick={() => this.setState({ lgShow: true })}
                              >
                                <RiAddFill fontSize="1.5em" className="mb-1" />{" "}
                              </Button>
                            </OverlayTrigger>

                            <OverlayTrigger
                              placement="bottom"
                              overlay={
                                <Tooltip id="button-tooltip-2">SettleUp</Tooltip>
                              }
                            >
                              <Button
                                variant="outline-light"
                                className="float-end rounded-pill"
                                onClick={() => this.setState({ cshow: true })}
                              >
                                <FcMoneyTransfer fontSize="1.5em" className="mb-1" />{" "}
                              </Button>
                            </OverlayTrigger>
                          </Col>
                        </Row>
                      </Container>
                    </Card.Title>
                    <Card.Title>Debts:</Card.Title>
                    <Card.Text>{this.state.debt_str1}</Card.Text>
                  </Card.Body>
                </Card>
                {this.state.groupSingle.data.expenses.length > 0 && (
                  <Row className="m-1">
                    <Card>
                      <Card.Header as="h5">Expenses</Card.Header>
                      {this.state.groupSingle.data.expenses.map((val) => (
                        <Card className="mt-1">
                          <Card.Header as="h5">
                            <Container>
                              <Row>
                                <Col className="d-flex align-items-center">
                                  {val.name}
                                </Col>
                                <Col className="d-flex justify-content-end">
                                  { val.division[0].lender === this.state.user._id &&
                                    (<>
                                  <OverlayTrigger
                                    placement="bottom"
                                    overlay={
                                      <Tooltip id="button-tooltip-2">
                                        Archive
                                      </Tooltip>
                                    }
                                  >

                                    <Button
                                      className="m-1 rounded"
                                      variant="danger"
                                      disabled={val.is_deleted}
                                      onClick={() =>
                                        this.archiveExpense(
                                          this.state.groupSingle.data._id,
                                          val._id,
                                          this.state.groupSingle.data.name,
                                          val.name
                                        )
                                      }
                                    >
                                      <RiDeleteBin5Fill fontSize="1.5em" />
                                    </Button>

                                  </OverlayTrigger></>)}
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
                                    <Card.Text>
                                      Lender:{" "}
                                      {
                                        this.state.idUserMap[
                                          val.division[0].lender
                                        ]
                                      }
                                    </Card.Text>
                                    <Card.Text>
                                      Borrower: {this.handleBorrowerName(val)}
                                    </Card.Text>
                                    <Card.Text>
                                      Original Amount: ${val.ori_amount}
                                    </Card.Text>
                                    <Card.Text>
                                      Total Amount: ${val.amount}
                                    </Card.Text>
                                    <Card.Text>
                                      Date:{" "}
                                      {val.date +
                                        " " +
                                        new Date(val.timestamp).getHours() +
                                        ":" +
                                        new Date(val.timestamp).getMinutes() +
                                        ":" +
                                        new Date(val.timestamp).getSeconds()}
                                    </Card.Text>
                                  </div>
                                </Col>
                              </Row>
                            </Container>
                          </Card.Body>
                        </Card>
                      ))}
                    </Card>
                  </Row>
                )}
              </Col>
              {this.state.groupSingle.data.expenses.length > 0 && (
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
                  {this.state.chartHeader["navChartItem"] === "weekly" ? (
                    <div>
                      <Bar
                        data={{
                          labels: this.state.weeklyHeaders,
                          datasets: [
                            {
                              label: "Users",
                              fill: true,
                              backgroundColor: [
                                "#B21F00",
                                "#C9DE00",
                                "#2FDE00",
                                "#00A6B4",
                                "#6800B4",
                              ],
                              borderColor: "rgba(0,0,0,1)",
                              borderWidth: 1,
                              data: this.state.weeklyAmount,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            title: {
                              display: true,
                              text: "Expenses of users for last week",
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
                          labels: this.state.monthlyHeaders,
                          datasets: [
                            {
                              label: "Users",
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
                              data: this.state.monthlyAmount,
                            },
                          ],
                        }}
                        options={{
                          responsive: true,
                          plugins: {
                            title: {
                              display: true,
                              text: "Expenses of users per month",
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
              )}
            </Row>
          </Container>
        </>
      );
    } else {
      return (
        <MyLoader />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  members: state.auth.members,
  user: state.auth.user,
  message: state.message.message,
  groupSingle: state.group.groupSingle,
  idUserMap: state.auth.idUserMap,
});

export default connect(mapStateToProps, { login, getSingleGroups })(ShowGroup);
