import React, { useEffect, useState } from "react";
import ListSidebar from "../components/ListSidebar";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { Col, Container, Row } from "react-bootstrap";

function Dashboard() {
  const [lists, setLists] = useState([]);
  const [loadData, setLoadData] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem("authToken") === null && sessionStorage.getItem("authToken") === null) {
      //navigate(-1);
    }
  }, []);

  let authToken = localStorage.getItem("authToken") === null ? sessionStorage.getItem("authToken") : localStorage.getItem("authToken");
  console.log(authToken);
  const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 1000,
    headers: {'Authorization': `Bearer ${authToken}`}
  });

  useEffect(() => {
    setLoadData(true);
    instance.get('/lists')
      .then(function (response) {
        setLists(response.data);
        setLoadData(false);
      }).catch(function (response) {
        setLoadData(true);
      })
  }, []);

  return(
    <Container fluid>
      <NavigationBar/>
      <Row>
        <Col xs={6}>
          <Container fluid>
            <ListSidebar lists={lists}/>
          </Container>
        </Col>
        <Col>
          <div></div>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard;