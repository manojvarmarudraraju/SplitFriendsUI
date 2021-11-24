import React, { Component } from "react";
import Header from "./Header";
import GroupComponent from "./GroupComponent";
import Data from "./groupdata.json";

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <container className="d-flex align-items-center">
          <row
            style={{
              display: "flex",
              flex: 1,
              flexWrap: "wrap",
              flexDirection: "row",
            }}
          >
            {Data.map((value) => {
              return (
                <div className="ms-2" style={{ flexBasis: "18%" }}>
                  <GroupComponent data={value} />
                </div>
              );
            })}
          </row>
        </container>
      </>
    );
  }
}

export default Home;
