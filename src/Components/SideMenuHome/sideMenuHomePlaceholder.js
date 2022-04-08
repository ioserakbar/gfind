import { faMessage, faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Container, Label, Row } from 'reactstrap';

export class SideMenuHomePlaceholder extends React.Component {
  constructor() {
    super();
    const friendsNum = Math.round((Math.random() * (3 - 1)) + 1);
    var v = Math.round((Math.random() * (2 - 1)) + 1);
    if (v === 1)
      v = 'hasIMAGE';
    this.state = {
      friends: friendsNum
    };
  }

  render() {
    let friendPlaceholder = [];

    for (let index = 0; index < this.state.friends; index++) {
      friendPlaceholder.push(
        <Row className='friends-actives-info'>
          <Col md={2} className='profile-pic-placeholder'>
          </Col>
          <Col md={8} className='profile-info-placeholder'>
            <Label className='name'></Label>
            <br></br>
            <Label className='status '></Label>
            <div className='action-buttons-placeholder'>
              <FontAwesomeIcon icon={faMessage} />
              <FontAwesomeIcon icon={faUser} />
            </div>
          </Col>
          <Label className='bottom-line' />
        </Row>
      );

    }

    return (
      <>
        <Container className='home-side-bar'>
          <Row className='featured-title title'>
            <Label>Destacados</Label>
            <Label className='bottom-line-title' />
          </Row>
          <Row className='featured'>
            <Row className='featured-image-placeholder'>
            </Row>
            <Label className='bottom-line' />
            <Row>
              <Col md={4} className='featured-profile-pic-image-placeholder'>
              </Col>
              <Col md={8} className="featured-name-placeholder">
                <Label className='name'></Label>
              </Col>
            </Row>
            <Row className='featured-name'>
              <Label><FontAwesomeIcon icon={faThumbsUp}/></Label>
            </Row>
          </Row>
          <Row className='friends-title title'>
            <Label>Amigos</Label>
            <Label className='bottom-line-title' />
          </Row>
          {friendPlaceholder}
          <Row className='friends-title'>
            <Label></Label>
          </Row>
        </Container>
      </>
    );
  }
}