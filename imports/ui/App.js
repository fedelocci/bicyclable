import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Menu from './Menu';
import RouitingMap from './RouitingMap';


const App = () => (
  <Container>
    <h1 className="App">Welcome to Bicyclable</h1>
    <Menu />
    <Row>
      <Col xs={12} md={12}>

        <RouitingMap />


      </Col>
    </Row>

  </Container>
);

export default App;
