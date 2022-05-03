import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants.json';
import Cookies from 'universal-cookie';
import $ from 'jquery';

export const CommentFormsModal = (props) => {

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


      console.log('file', json2)
      console.log('64', jsonBase64)

      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

    } else {
      alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
    }
  }

  async function publicate(e) {
    const cookies = new Cookies();
    const content = $('#content').val();
    if (cookies.get(constants.CookieIsLogedIn) === 'false') {
      alert("Se necesita iniciar sesion para comentar")
      return;
    } else if (content === '' && !base64Multimedia) {
      alert("No puedes comentar algo vacio");
      return;
    }
    e.preventDefault()
    setLoading(true);

    const userID = cookies.get(constants.CookieUserID);
    var multi = {};

    if (base64Multimedia) {
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
        savePublication(multi, content, userID);
      }
    }
    savePublication(multi, content, userID);
  }


  async function savePublication(pMultiArray2, pContent, pUserID) {

    var today = new Date().toISOString();
    let body = {
      date: today,
      content: pContent,
      userID: pUserID
    };

    if (pMultiArray2)
      body.multimedia = pMultiArray2;

    const response = await fetch(`http://localhost:3001/api/v1/comment`, {
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
        <div className='single-multimedia' key={source.index}>
          <video src={source.src} controls />
          <FontAwesomeIcon className='delete-button' icon={faTimesCircle} onClick={() => removeMultimedia()} />
        </div>
      )

    } else if (source['type'] === 'image/jpeg' || source['type'] === 'image/jpg' || source['type'] === 'image/png' || source['type'] === 'image/bmp') {

      return (
        <div className='single-multimedia' key={source.index}>
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
              <Label>Comentar</Label>
              <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={() => props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body'>
              <form onSubmit={publicate}>
                <div className='content-input'>
                  <textarea id='content' type='text' placeholder='Dinos lo que piensas. . .' />
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
                  <input id="file-input" type="file" accept='.jpeg, .jpg, .png, .bmp, .mp4' onChange={imageHandleChange} />
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

