import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import GroupComponent from "./GroupComponent";
import Data from "./data/groupdata.json";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col></Col>
            <Col lg="10">
              {Data.map((value) => {
                return <GroupComponent data={value} />;
              })}
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
