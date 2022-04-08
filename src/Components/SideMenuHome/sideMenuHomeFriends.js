import { faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Label, Row } from 'reactstrap';

class SideMenuHomeFriends extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Row className='friends-actives-info'>
        <Col md={2} className='profile-pic'>
          <img src='https://i.imgur.com/aD2V747.jpeg' alt='prof-pic'/>
        </Col>
        <Col md={8} className='profile-info'>
          <Label className='name'>Roberto Gomez Bolaños</Label>
          <Label className='status'>En sesion</Label>
          <div className='action-buttons'>
            <FontAwesomeIcon icon={faMessage} />
            <FontAwesomeIcon icon={faUser} />
          </div>
        </Col>
        <Label className='bottom-line' />
      </Row>
    );
  }

}

export default SideMenuHomeFriends;
