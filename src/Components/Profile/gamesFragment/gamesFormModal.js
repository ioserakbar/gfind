import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export const GameFormsModal = (props) => {

  const [loading, setLoading] = useState(false);
  const [userID, setUserId] = useState('');



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

    async function fillSelects() {
      const response = await fetch(`http://localhost:3001/api/v1/game`);
      const respJson = await response.json();
      $("#game").html('');
      $("#ranked").html('');
      respJson.Data.forEach(element => {

        $("#game").append(
          `<option value='${element._id}'>${element.name} (${element.developers})</option>`
        );

      });

      respJson.Data[0].ranking.sort((a, b) => {
        return a.index - b.index;
      })

      respJson.Data[0].ranking.forEach(element => {
        $("#ranked").append(
          `<option value='${element.index}'>${element.name}</option>`
        );
      });


    }

    fillSelects();
    setUserId(props.userID);

  }, [])

  async function addFavoriteGame(e) {
    e.preventDefault();
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

