import React, { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
  InputGroup,
  Modal,
  Dropdown,
} from "react-bootstrap";
import "./styles/Header.css";
import { AiFillHome } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

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

                <Dropdown.Menu style={{ backgroundColor: "#73a47" }}>
                  <InputGroup className="mb-1">
                    <FormControl
                      placeholder="Recipient's username"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                    <InputGroup.Text id="basic-addon2" onClick={searchMembers}>
                      <FaSearch />
                    </InputGroup.Text>
                  </InputGroup>
                  <Dropdown.Item href="#">Arabic</Dropdown.Item>
                  <Dropdown.Item href="#">English</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" id="navBrand">
            Splitwith Friends
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link id="navItem1">
                <AiFillHome style={{ marginBottom: "4px" }} />
                Home
              </Nav.Link>
              <Nav.Link id="navItem1" onClick={handleShow}>
                <BsPlusCircleFill style={{ marginBottom: "3px" }} /> Create
                Group
              </Nav.Link>
              <Nav.Link id="navItem1">
                <FiActivity style={{ marginBottom: "3px" }} /> Activity
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
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
