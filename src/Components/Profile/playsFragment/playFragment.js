import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { PlayModal } from './playModal';
import { PlaysFormsModal } from './playsFormModal';
import { PlaysPlaceholder } from './playsPlaceholder';
import constants from '../../../constants.json'
import Cookies from 'universal-cookie';

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
      const cookie = new Cookies();
      const accessToken = cookie.get(constants.CookieAccessToken);
      const response = await fetch(`http://localhost:3001/api/v1/videoPlay/user/${pProfileUser}`, {
        headers: { 'authorization': `Bearer ${accessToken}` },
      });
      const respJson = await response.json();

      if (respJson.success) {

        let arrayToPush = [];

        respJson.Data.forEach(async function (element) {

          const response2 = await fetch(`http://localhost:3001/api/v1/game/${element.gameID}`, {
            headers: { 'authorization': `Bearer ${accessToken}` },
          });
          const respJson2 = await response2.json();

          let obj = {};
          obj.video = element.multimedia.path;
          obj.gameIcon = respJson2.Data.image.path
          obj.content = element.content


          arrayToPush.push(obj);

        });

        setPlays(arrayToPush);
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

  function addPlay(pla) {

  }

  return (
    state ? (
      <>
        {playFormModal && (
          <PlaysFormsModal closeCallback={playsFormModal} addPlay={addPlay} />
        )}
        {playModal && (
          <PlayModal closeCallback={playsModal} src={modalSrc} content={modalContent} game={modalGame} />
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
              <Container className='play' key={index} onClick={() => openPlayModal(play.video, play.gameIcon, play.content)}>
                <img src={play.gameIcon} alt='imgIcon' />
                <video src={play.video} autoPlay muted />
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
