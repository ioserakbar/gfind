import React, { useState } from 'react';
import { Button, Col, Container, Label, Row } from 'reactstrap';

export const ProfilePlaysPlaceholder = (props) => {


  const [isMine, setIsMine] = useState(true);
  const [state, setState] = useState(true);
  const [playModal, setPlayModal] = useState(false);



  const comp = (
    <Container className='play'>
      <video src={require('../../Resources/Videos/backgroundVid.mp4')} />
    </Container>
  );


  return (
    state ? (
      <>
        <div className='profile-publications'>
          {isMine && (
            <Row className='search-bar'>
              <Col md={11}>
                <Button className='search-bar add-pub-btn'> Publicar jugada </Button>
              </Col>
            </Row>
          )}
          <Container className='plays-container'>
            {comp}
            {comp}
            {comp}
            {comp}
          </Container>
        </div>
      </>
    ) : (
      <div className='profile-publications'>
        <Container className='plays-container'>
          <Container className='play-placeholder'>
            <Label />
          </Container>
          <Container className='play-placeholder'>
            <Label />
          </Container>
          <Container className='play-placeholder'>
            <Label />
          </Container>
          <Container className='play-placeholder'>
            <Label />
          </Container>
        </Container>
      </div >
    )

  );


}
