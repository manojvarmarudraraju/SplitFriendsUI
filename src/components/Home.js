import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import GroupComponent from "./GroupComponent";
import Data from "./data/groupdata.json";
import ReactPaginate from "react-paginate";
import "./styles/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: [],
      perPage: 4,
      currentPage: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  receivedData() {
    const data = Data;
    const slice = data.slice(
      this.state.offset,
      this.state.offset + this.state.perPage
    );
    const postData = slice.map((val) => <GroupComponent data={val} />);

    this.setState({
      pageCount: Math.ceil(data.length / this.state.perPage),

      postData,
    });
  }

  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  render() {
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col></Col>
            <Col lg="10">
              <div>
                {this.state.postData}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Home;
