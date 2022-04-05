import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Publication } from '../publicacion/publication';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      
      <Container>
        <Row>
          <Col md={3} >

          </Col>

          <Col md={6} >
           <Publication img={'https://i.imgur.com/bCOjLao.jpeg'}/>
           <Publication/>
           <Publication img={'https://i.imgur.com/VgYAFPI.jpeg'}/>
           <Publication/>
          </Col>

          <Col md={3} >

          </Col>
        </Row>
      </Container>
    );
  }

}

