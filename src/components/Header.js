import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  FormControl,
  Button,
  InputGroup,
  Modal,
  Dropdown,
} from "react-bootstrap";
import "./styles/Header.css";
import { MdAddCircleOutline } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import membersData from "./data/members.json";

const Header = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Group</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="my-2 ms-2">
              <InputGroup.Text>Group Name</InputGroup.Text>
              <FormControl
                placeholder="Group Name"
                aria-label="Group Name"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <div className="dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic-button">
                  Search Members
                </Dropdown.Toggle>

                <Dropdown.Menu
                  style={{
                    backgroundColor: "#73a47",
                    overflow: "auto",
                    maxHeight: "15rem",
                  }}
                >
                  <InputGroup className="mb-1 position-sticky top-0">
                    <FormControl
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2" onClick={searchMembers}>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                  {Object.keys(membersData.members).map((val) => {
                    return (
                      <Dropdown.Item>
                        {membersData["members"][val]}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Navbar bg="dark" expand="lg" sticky="top">
        <Container fluid>
          <Navbar.Brand href="/Home" id="navBrand">
            Splitwith Friends
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link id="navItem1" onClick={handleShow}>
                <MdAddCircleOutline
                  fontSize="1.5rem"
                  style={{ marginBottom: "3px" }}
                />{" "}
                Create Group
              </Nav.Link>
              <Nav.Link href="/Activity" id="navItem1">
                <FiActivity fontSize="1.5rem" style={{ marginBottom: "3px" }} />{" "}
                Activity
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/AddExpense" id="navItem1">
                <HiOutlineLogout
                  fontSize="1.5rem"
                  style={{ marginBottom: "3px" }}
                />{" "}
                Logout
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

const searchMembers = (data) => {
  alert("It is working" + data);
};

export default Header;
