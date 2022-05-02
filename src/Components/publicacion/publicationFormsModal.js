import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import constants from '../../constants.json';
import Cookies from 'universal-cookie';
import $ from 'jquery'
import moment from 'moment';

export const PublicationFormsModal = (props) => {

  const [multimediaJson, setMultimediaJson] = useState([]);
  const [base64Multimedia, setBase64Multimedia] = useState([]);
  const [loading, setLoading] = useState(false);

  const imageHandleChange = (e) => {
    if (e.target.files) {

      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));

      let json2 = [];
      let jsonBase64 = [];
      for (let index = 0; index < fileArray.length; index++) {
        json2.push({
          src: fileArray[index],
          type: e.target.files[index].type,
          key: index
        })
      }

      for (let index = 0; index < fileArray.length; index++) {
        jsonBase64.push({
          blob: e.target.files[index]
        })
      }
      setBase64Multimedia((prevImages) => prevImages.concat(jsonBase64))
      setMultimediaJson((prevImages) => prevImages.concat(json2))
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

    } else {
      alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
    }
  }

  async function publicate(e) {
    const cookies = new Cookies();
    const content = $('#content').val();
    if (cookies.get(constants.CookieIsLogedIn) === 'false') {
      alert("Se necesita iniciar sesion para publicar")
      return;
    } else if (content === '' && base64Multimedia.length === 0) {
      alert("No puedes publicar algo vacio");
      return;
    }
    e.preventDefault()
    setLoading(true);

    const userID = cookies.get(constants.CookieUserID);
    let multiArray2 = [];
    let index = 0
    base64Multimedia.forEach(multimedia => {

      var reader = new FileReader();
      reader.readAsDataURL(multimedia.blob);
      reader.onloadend = function () {

        var base64data = reader.result;

        const parts = base64data.split(';')
        const mime = parts[0].split(':')[1].split('/')[1];
        const imgName = "publication";
        const multimediaData = parts[1].split('base64,').pop();
        var multi = {};

        multi['name'] = imgName;
        multi['extention'] = mime;
        multi['path'] = multimediaData;
        multiArray2[`${index}`] = multi;

        if (index === base64Multimedia.length - 1) {
          savePublication(multiArray2, content, userID);
        }
        index++;
      }
    });

  }


  async function savePublication(pMultiArray2, pContent, pUserID) {
    var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00Z]');

    const body = {
      multimedia: pMultiArray2,
      date: today,
      content: pContent,
      userID: pUserID
    };



    const response = await fetch(`http://localhost:3001/api/v1/publication`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const respJson = await response.json();
    setLoading(false);
    props.closeCallback(false);
    if (!respJson.success) {
      props.closeCallback(false);
      alert('Hubo un error subiendo la publicacion, por favor intente de nuevo');
    }
  }

  const renderMultimedia = (source) => {

    return source.map((multimedia) => {
      if (multimedia['type'] === 'video/mp4') {

        return (
          <div className='single-multimedia' key={multimedia.index}>
            <video src={multimedia.src} controls />
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        )

      } else if (multimedia['type'] === 'image/jpeg' || multimedia['type'] === 'image/jpg' || multimedia['type'] === 'image/png' || multimedia['type'] === 'image/bmp') {

        return (
          <div className='single-multimedia' key={multimedia.index}>
            <img src={multimedia.src} alt='imgMultimedia' />
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        )

      } else {
        return (<></>)
      }
    })
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
              <Label>Publicar</Label>
              <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={() => props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body'>
              <form onSubmit={publicate}>
                <div className='content-input'>
                  <textarea id='content' type='text' placeholder='¿Que es lo que nos quieres contar?' />
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
                  <input id="file-input" type="file" multiple accept='.jpeg, .jpg, .png, .bmp, .mp4' onChange={imageHandleChange} />
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

