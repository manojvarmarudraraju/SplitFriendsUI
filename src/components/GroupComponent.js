import React from "react";
import {
  Card,
  Button,
  OverlayTrigger,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";

const GroupComponent = (props) => {
  const { data } = props;
  var debt_str = "";
  Object.keys(data.debts).forEach((val) => {
    debt_str += val.toString() + ":" + data.debts[val].toString() + ", ";
  });
  debt_str = debt_str.slice(0, -2);

  return (
    <Card
      style={{ width: "auto", backgroundColor: "#E1E1E1" }}
      className="mh-50 m-3 border border-light shadow-lg rounded"
    >
      <Card.Header as="h5" className="text-uppercase">
        <Container>
          <Row>
            <Col className="d-flex align-items-center">{data.name}</Col>
            <Col className="d-flex justify-content-end">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}
              >
                <Button
                  variant="primary"
                  className="rounded-pill border border-1 "
                >
                  <FaEye fontSize="1.4em" />
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Archive</Tooltip>}
              >
                <Button
                  variant="danger"
                  className="rounded-pill border border-1"
                >
                  <RiDeleteBin5Fill fontSize="1.4em" />
                </Button>
              </OverlayTrigger>
            </Col>
          </Row>
        </Container>
      </Card.Header>
      <Card.Body>
        <div>
          {Object.keys(data.debts).length === 0 ? (
            <>
              <Card.Title> Debts: </Card.Title>
              <Card.Text>You are clean</Card.Text>
            </>
          ) : (
            <>
              <Card.Title> Debts: </Card.Title>
              <Card.Text> {debt_str}</Card.Text>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default GroupComponent;
