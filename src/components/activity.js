import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import actData from "./data/activity.json";
import Header from "./Header";

const Activity = () => {
  return (
    <>
      <Header />
      <Container className="mt-2">
        <Row>
          <Col></Col>
          <Col lg="10">
            <h4>Activites</h4>
            {Object.keys(actData.activites).map((val) => {
              return (
                <Card
                  className="m-2 border border-light shadow-lg rounded"
                  style={{ backgroundColor: "#DEDEDE", color: "antiquewhite" }}
                >
                  <Card.Body>
                    <Card.Text>{actData.activites[val].act1}</Card.Text>
                    <Card.Text>{actData.activites[val].dt1}</Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default Activity;
