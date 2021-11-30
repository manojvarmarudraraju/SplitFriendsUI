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
import { useDispatch } from "react-redux";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import { archiveGroup } from "../redux/actions/group";

const GroupComponent = (props) => {
  const { data } = props;
  var debt_str = "";
  Object.keys(data.debts.debts).forEach((val) => {
    debt_str += val.toString() + ":" + data.debts.debts[val].toString() + ", ";
  });
  debt_str = debt_str.slice(0, -2);

  const dispatch = useDispatch();

  const handleArchive = () => {
    dispatch(archiveGroup(data._id))
      .then(window.location.reload())
      .catch((error) => {
        console.log(error);
      });
  };

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
                  disabled={data.is_archived}
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
                  onClick={handleArchive}
                  disabled={data.is_archived}
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
          {Object.keys(data.debts.debts).length === 0 ? (
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
