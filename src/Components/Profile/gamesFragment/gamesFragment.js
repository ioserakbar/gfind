import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { GameFormsModal } from './gamesFormModal';
import { GamesPlaceholder } from './gamesPlaceholder';

export const GamesFragment = (props) => {


  const [games, setGames] = useState([]);
  const [state, setState] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [gameFormModal, setGameFormModal] = useState(false);
  const [userID, setUserID] = useState('');
  const [gameArray, setGameArray] = useState([]);

  useEffect(() => {

    setIsMine(props.isMine);
    setState(true);
    setUserID(props.userID);
    setGames(props.games);
    generateGameCardArray()
  }, [])

  function gameForm() {
    setGameFormModal(!gameFormModal);
  }

  async function generateGameCardArray() {

    let array = [];
    props.games.forEach(async (game) => {

      let obj = {};
      const response = await fetch(`http://localhost:3001/api/v1/game/${game.gameID}`);
      const respJson = await response.json();
      if (respJson.success) {
        obj.gameName = respJson.Data.name;
        obj.gameImg = respJson.Data.image.path;
        let rankToAdd = {};

        respJson.Data.ranking.forEach(rank => {
          if (rank.index == game.RANKED)
            rankToAdd = rank;
        });

        obj.rankedName = rankToAdd.name;
        obj.rankedImg = rankToAdd.IMAGE.path
      }
      console.log('obj', obj);

      array.push(obj);
    })
    setGameArray(array);

  }

  return (

    state ? (
      <>
        {gameFormModal && (
          <GameFormsModal closeCallback={() => gameForm()} userID={userID} />
        )}
        <div className='profile-publications'>
          {isMine && (
            <Row className='search-bar'>
              <Col md={11}>
                <Button className='search-bar add-pub-btn' onClick={() => gameForm()}> Agregar juego </Button>
              </Col>
            </Row>
          )}
          <Container className='juego-container'>
            {gameArray.map((game, index) => (
              <Container className='juego' key={index}>
                <Row className='juego-info' >
                  <Col md={2}>
                    <img src={game.gameImg} alt='juego-icon' />
                  </Col>
                  <Col>
                    <Label>{game.gameName}</Label>
                  </Col>
                </Row>
                <br></br>
                <Row className='rank-info'>
                  <Col className='img'>
                    <img src={game.rankedImg} alt='juego-icon' />
                  </Col>
                  <Col>
                    <Label>{game.rankedName}</Label>
                  </Col>
                </Row>
              </Container>
            ))}
          </Container>
        </div>
      </>
    ) : (
      <GamesPlaceholder />
    )

  );

}

