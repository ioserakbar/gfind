import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { GameFormsModal } from './gamesFormModal';
import { GamesPlaceholder } from './gamesPlaceholder';

export const GamesFragment = (props) => {


  const [state, setState] = useState(false);
  const [gameFormModal, setGameFormModal] = useState(false);
  const [gameArray, setGameArray] = useState([]);
  const isMine = props.isMine;
  const userID = props.userID;
  const [games, setGames] = useState(props.games);

  useEffect(() => {
    setState(true);
    generateGameCardArray(games);
  }, [])


  useEffect(() => {
    generateGameCardArray();
  }, [games])




  function gameForm() {
    setGameFormModal(!gameFormModal);
  }

  async function generateGameCardArray() {

    let array = [];
    games.forEach(async (game) => {
      let obj = {};
      const response = await fetch(`http://localhost:3001/api/v1/game/${game.gameID}`);
      const respJson = await response.json();
      if (respJson.success) {
        obj.gameName = respJson.Data.name;
        obj.gameID = game.gameID;
        obj.gameImg = respJson.Data.image.path;
        let rankToAdd = {};

        respJson.Data.ranking.forEach(rank => {
          if (rank.index == game.RANKED)
            rankToAdd = rank;
        });
        obj.rankedName = rankToAdd.name;
        obj.rankedImg = rankToAdd.IMAGE.path
      }
      array.push(obj);
    })
    setGameArray(array);
  }

  function refreshGames(newGames) {
    setGames(newGames);
  }

  async function deleteGame(gameID) {
    const body = {
      gameToRemove: gameID
    }
    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/removeGame/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();
    setGames(respJson.Data.new.favoriteGames);
  }

  return (

    state ? (
      <>
        {gameFormModal && (
          <GameFormsModal closeCallback={() => gameForm()} userID={userID} games={games} refreshGames={refreshGames}/>
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
                  <Col md={1}>
                    <FontAwesomeIcon icon={faTimesCircle} onClick={() => deleteGame(game.gameID)} />
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

