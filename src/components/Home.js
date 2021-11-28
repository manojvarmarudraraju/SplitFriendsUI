import React, { Component, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import GroupComponent from "./GroupComponent";
import Data from "./data/groupdata.json";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router';
import { getAllGroups } from '../redux/actions/group';
import { clearMessage } from '../redux/actions/message'

const Home = (props) => {

  const [isGetDataSuccess, setIsGetDataSuccess] = useState(false);
  const [isAPICalled, setIsAPICalled] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const { groups } = useSelector(state => state.group);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage())
    if (isAPICalled) {
      return
    }
    setIsAPICalled(true)
    dispatch(getAllGroups())
    .then(() => {
      setIsGetDataSuccess(true);
    })
    .catch((e) => {
      setIsGetDataSuccess(false);
      setIsAPICalled(false);
    });
  }, []);

  useEffect(() => {
    
  });

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col></Col>
          <Col lg="10">
            {isGetDataSuccess && groups && (
              groups.map((value) => {
                return <GroupComponent data={value} />;
              }))}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
