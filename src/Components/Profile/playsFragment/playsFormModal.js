import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import constants from '../../../constants.json';
import Cookies from 'universal-cookie';
import $ from 'jquery';

export const PlaysFormsModal = (props) => {

  const [multimediaJson, setMultimediaJson] = useState({});
  const [base64Multimedia, setBase64Multimedia] = useState({});
  const [loading, setLoading] = useState(false);


  const imageHandleChange = (e) => {
    if (e.target.files) {

      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      const json2 = {
        src: fileArray[0],
        type: e.target.files[0].type
      }

      const jsonBase64 = {
        blob: e.target.files[0]
      }

      setBase64Multimedia(jsonBase64);
      setMultimediaJson(json2);

      console.log(multimediaJson);
      console.log(base64Multimedia);

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

    } else {
      alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
    }
  }

  async function publicate(e) {

    e.preventDefault()
    const cookies = new Cookies();
    const content = $('#content').val();
    const game = $('#game option:selected').attr('value');

    if (cookies.get(constants.CookieIsLogedIn) === 'false') {
      alert("Se necesita iniciar sesion para comentar")
      return;
    } else if (Object.keys(base64Multimedia).length === 0) {
      alert("Tienes que publicar un video");
      return;
    }
    setLoading(true);

    const userID = cookies.get(constants.CookieUserID);
    var multi = {};

    var reader = new FileReader();
    reader.readAsDataURL(base64Multimedia.blob);
    reader.onloadend = function () {

      var base64data = reader.result;

      const parts = base64data.split(';')
      const mime = parts[0].split(':')[1].split('/')[1];
      const imgName = "publication";
      const multimediaData = parts[1].split('base64,').pop();

      multi['name'] = imgName;
      multi['extention'] = mime;
      multi['path'] = multimediaData;
      savePublication(multi, content, userID, game);
    }

  }


  async function savePublication(pMultiArray2, pContent, pUserID, game) {

    var today = new Date().toISOString();

    let body = {
      date: today,
      content: pContent,
      userID: pUserID,
      gameID: game,
      multimedia: pMultiArray2
    };

    const response = await fetch(`http://localhost:3001/api/v1/videoPlay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const respJson = await response.json();
    setLoading(false);

    props.closeCallback(false);

    if (!respJson.success) {
      props.closeCallback(false);
      alert('Hubo un error subiendo el comentario, por favor intente de nuevo');
    }
  }

  const removeMultimedia = () => {

    var empty = {};
    setMultimediaJson(empty);
    setBase64Multimedia(empty);
    return;
  }

  const renderMultimedia = (source) => {

    if (source['type'] === 'video/mp4') {

      return (
        <div className='single-multimedia' >
          <video src={source.src} controls />
          <FontAwesomeIcon className='delete-button' icon={faTimesCircle} onClick={() => removeMultimedia()} />
        </div>
      )

    } else if (source['type'] === 'image/jpeg' || source['type'] === 'image/jpg' || source['type'] === 'image/png' || source['type'] === 'image/bmp') {

      return (
        <div className='single-multimedia' >
          <img src={source.src} alt='imgMultimedia' />
          <FontAwesomeIcon className='delete-button' icon={faTimesCircle} onClick={() => removeMultimedia()} />
        </div>
      )

    } else {
      return (<></>)
    }
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
              <Label>Compartir jugada</Label>
              <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={() => props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body'>
              <form onSubmit={publicate}>
                <div className='content-input'>
                  <textarea id='content' type='text' placeholder='Dinos lo que piensas. . .' />
                </div>
                <div className='game-select'>
                  <select id='game'>
                    <option value='gameID1'>Lol</option>
                    <option value='gameID2'>Fortnite</option>
                    <option value='gameID3'>Super Smash Bros Brawl</option>
                  </select>
                </div>
                <div className='publication-multimedia-modal'>
                  {multimediaJson ? (
                    renderMultimedia(multimediaJson)
                  ) : (
                    <></>
                  )}
                </div>
                <Label className='bottom-line-modal'></Label>
                <div className="image-upload">
                  <label htmlFor="file-input">
                    <FontAwesomeIcon icon={faFileUpload} />
                  </label>
                  <input id="file-input" type="file" accept='.mp4' onChange={imageHandleChange} />
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

