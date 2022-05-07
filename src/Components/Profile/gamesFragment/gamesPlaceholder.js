import React from 'react';
import { Col, Container, Label, Row } from 'reactstrap';

export class GamesPlaceholder extends React.Component {

  render() {

    const comp = (
      <Container className='game'>
        <Col md={2} className='game-img'>
          <Label className='game-img-placeholder' />
        </Col>
        <Col md={10}>
          <Row className='title-placeholder'>
            <Label></Label>
          </Row>
          <Row className='rango-placeholder'>
            <Label className='ranked-img-placeholder' />
            <div className='rango'>
              <Label></Label>
              <Label></Label>
              <Label></Label>
            </div>
          </Row>
        </Col>
      </Container>
    );

    return (
      <div className='profile-publications'>
        <Container className='games-container'>
          {comp}
          {comp}
          {comp}
          {comp}
          {comp}
        </Container>
      </div>
    );
  }

}

