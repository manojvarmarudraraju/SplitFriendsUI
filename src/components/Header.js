import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import "./styles/Header.css";
import { AiFillHome } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";

const Header = (props) => {
  return (
    <>
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
              <Nav.Link href="#action1" id="navItem1">
                <AiFillHome style={{ marginBottom: "4px" }} />
                Home
              </Nav.Link>
              <Nav.Link href="#action2" id="navItem1">
                <BsPlusCircleFill style={{ marginBottom: "3px" }} /> Create
                Group
              </Nav.Link>
              <Nav.Link href="#" id="navItem1">
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

export default Header;
