import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { PlayModal } from './playModal';
import { PlaysFormsModal } from './playsFormModal';
import { PlaysPlaceholder } from './playsPlaceholder';

export const Plays = (props) => {


  const [isMine, setIsMine] = useState(false);
  const [state, setState] = useState(false);
  const [playFormModal, setPlayFormModal] = useState(false);
  const [plays, setPlays] = useState([]);
  const [playModal, setPlayModal] = useState(false);

  const [modalSrc, setModalSrc] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [modalGame, setModalGame] = useState('');


  useEffect(() => {

    async function getPlays(pProfileUser) {

      const response = await fetch(`http://localhost:3001/api/v1/videoPlay/user/${pProfileUser}`);
      const respJson = await response.json();

      if (respJson.success) {
        setPlays(respJson.Data)
      } 
    }

    setState(true);
    setIsMine(props.isMine);

    if (props.profileUser) {
      getPlays(props.profileUser);
    }

  }, []);


  const playsFormModal = () => {
    setPlayFormModal(!playFormModal)
  }

  const playsModal = () => {
    setPlayModal(!playModal);
  }

  const openPlayModal = (pSrc, pGame, pContent) => {

    setModalSrc(pSrc);
    setModalGame(pGame);
    setModalContent(pContent);
    setPlayModal(true);
  }

  return (
    state ? (
      <>
        {playFormModal && (
          <PlaysFormsModal closeCallback={playsFormModal} />
        )}
        {playModal && (
          <PlayModal closeCallback={playsModal} src={modalSrc} content={modalContent} game={modalGame}/>
        )}
        <div className='profile-publications'>
          {isMine && (
            <Row className='search-bar'>
              <Col md={11}>
                <Button className='search-bar add-pub-btn' onClick={playsFormModal}> Publicar jugada </Button>
              </Col>
            </Row>
          )}
          <Container className='plays-container'>
            {plays.map((play, index) => (
              <Container className='play' key={index} onClick={() => openPlayModal(play.multimedia.path, play.gameID, play.content)}>
                <video src={play.multimedia.path} autoPlay muted />
              </Container>
            ))}
          </Container>
        </div>
      </>
    ) : (
      <PlaysPlaceholder />
    )
  );
}
