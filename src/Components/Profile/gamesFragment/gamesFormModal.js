import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

export const GameFormsModal = (props) => {

  const [loading, setLoading] = useState(false);
  const [userID, setUserId] = useState('');
  const [games, setGames] = useState(props.games);
  const navigate = useNavigate();


  async function onChangeGameHandler() {

    const gameID = $("#game option:selected").attr('value');
    const response = await fetch(`http://localhost:3001/api/v1/game/${gameID}`);
    const respJson = await response.json();

    respJson.Data.ranking.sort((a, b) => {
      return a.index - b.index;
    })
    $("#ranked").html('');
    respJson.Data.ranking.forEach(element => {
      $("#ranked").append(
        `<option value='${element.index}'>${element.name}</option>`
      );
    });
  }


  useEffect(() => {

    fillSelects();
    setUserId(props.userID);
  }, [])

  useEffect(() => {
    fillSelects();
  }, [games])

  async function fillSelects() {

    const response = await fetch(`http://localhost:3001/api/v1/game`);
    const respJson = await response.json();
    $("#game").html('');
    $("#ranked").html('')

    let gotFirstIndex = false;
    let indexToFillRanked = 0;
    let index = 0;

    respJson.Data.forEach(element => {

      let hasGame = false;

      games.forEach(game => {
        if (game.gameID === element._id) {
          hasGame = true;
        }
      })

      if (!hasGame) {
        if (!gotFirstIndex) {
          indexToFillRanked = index;
          gotFirstIndex = true;
        }
        $("#game").append(
          `<option value='${element._id}'>${element.name} (${element.developers})</option>`
        );
      }
      index++;
    });

    respJson.Data[indexToFillRanked].ranking.sort((a, b) => {
      return a.index - b.index;
    })

    respJson.Data[indexToFillRanked].ranking.forEach(element => {
      $("#ranked").append(
        `<option value='${element.index}'>${element.name}</option>`
      );
    });

  }

  async function addFavoriteGame(e) {
    e.preventDefault();
    setLoading(true)
    const gameID = $("#game option:selected").attr('value');
    const rankedIndex = $("#ranked option:selected").attr('value');
    const body = {
      gameID: gameID,
      ranked: rankedIndex
    }
    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/addGame/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();
    setLoading(false);
    props.refreshGames(respJson.Data.new.favoriteGames);
    props.closeCallback(true);

  }

  return (
    <>
      {loading && (
        <div className='loading-modal'>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      )}
      <div className='modal-publication-form'>
        <Container className='modal-content-publication'>
          <Card>
            <CardHeader className='title'>
              <Label>Añadir juego</Label>
              <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={() => props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body'>
              <form onSubmit={(e) => addFavoriteGame(e)}>
                <div className='game-select'>
                  <select id='game' onChange={() => onChangeGameHandler()}>
                  </select>
                </div>
                <div className='game-select'>
                  <select id='ranked'>
                  </select>
                </div>
                <Label className='bottom-line-modal'></Label>
                <div className="image-upload">
                  <input type='submit' className='submit-publication' value='Publicar' />
                </div>
              </form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>

  );
}

