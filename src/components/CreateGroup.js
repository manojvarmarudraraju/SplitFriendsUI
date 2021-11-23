import React from "react";
import Search from "./Search";

import { InputGroup, FormControl, Button } from "react-bootstrap";

const creategroup = () => {
  return (
    <>
      <div className=" mw-75">
        <InputGroup className="my-2 ms-2">
          <InputGroup.Text>Group Name</InputGroup.Text>
          <FormControl
            placeholder="Group Name"
            aria-label="Group Name"
            aria-describedby="basic-addon1"
          />
        </InputGroup>
        <div>
          {["clientName"].map((key) => (
            <select key={key}>
              {["clientName"].map(({ [key]: value }) => (
                <option key={value}>{value}</option>
              ))}
            </select>
          ))}
        </div>
        <Search />
        <Button variant="success">Save</Button>
      </div>
    </>
  );
};

export default creategroup;
