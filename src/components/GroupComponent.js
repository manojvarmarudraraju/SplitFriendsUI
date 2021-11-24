import React from "react";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiEyeFill } from "react-icons/ri";
import { IoMdArchive } from "react-icons/io";

const GroupComponent = (props) => {
  const { data } = props;
  return (
    <Card
      style={{ width: "15rem", backgroundColor: "#D9DDDC" }}
      className="m-2 shadow  rounded"
    >
      <Card.Body>
        <Card.Title className="text-center text-uppercase fs-3 fw-bold">
          {data.name}
        </Card.Title>
        <Card.Text className="text-center fs-4 text-dark">
          Members: {data.members.length}{" "}
        </Card.Text>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">View</Tooltip>}
        >
          <Button variant="primary" className="rounded-circle border border-1 ">
            <RiEyeFill fontSize="1.6em" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="button-tooltip-2">Archive</Tooltip>}
        >
          <Button variant="success" className="rounded-circle border border-1">
            <IoMdArchive fontSize="1.6em" />
          </Button>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );
};

export default GroupComponent;
