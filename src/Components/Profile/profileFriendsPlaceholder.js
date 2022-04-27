import { faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Label, Row } from 'reactstrap';

export class ProfileFriendsPlaceholder extends React.Component {

  render() {

    const comp = (<Container className='friend'>
    <Col md={2} className='friend-img'>
      <Label className='friend-img-placeholder' />
    </Col>
    <Col md={10}>
      <Row className='name-placeholder'>
        <Label></Label>
      </Row>
      <Row className='profile-placeholder'>
        <Label></Label>
        <Label></Label>
      </Row>
      <Row className='action-buttons-placeholder'>
        <Col>
          <FontAwesomeIcon icon={faUser} />
        </Col>
        <Col>
          <FontAwesomeIcon icon={faMessage} />
        </Col>
      </Row>
    </Col>
  </Container>);
    return (

      <Container className='friends-container'>
        {comp}
        {comp}
        {comp}
        {comp}
        {comp}
        {comp}
        {comp}
      </Container>
    );
  }


}
