import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';


export const  PublicationFormsModal = (props) => {

  const [multimediaJson, setMultimediaJson] = useState([]);

  const imageHandleChange = (e) => {
    if (e.target.files) {

      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      let json2 = [];

      for (let index = 0; index < fileArray.length; index++) {
        json2.push({
          src: fileArray[index],
          type: e.target.files[index].type
        })
      }

      setMultimediaJson((prevImages) => prevImages.concat(json2))
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

    } else {
      alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
    }
  }



  const renderMultimedia = (source) => {

    return source.map((multimedia) => {
      if (multimedia['type'] === 'video/mp4') {

        return (
          <div className='single-multimedia' key={multimedia}>
            <video src={multimedia.src} controls />
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        )

      } else if (multimedia['type'] === 'image/jpeg' || multimedia['type'] === 'image/jpg' || multimedia['type'] === 'image/png' || multimedia['type'] === 'image/bmp') {

        return (
          <div className='single-multimedia' key={multimedia}>
            <img src={multimedia.src} alt='imgMultimedia' />
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        )

      } else {
        <></>
      }
    })

  }


  return (
    <div className='modal-publication-form'>
      <Container className='modal-content-publication'>
        <Card>
          <CardHeader className='title'>
            <Label>Publicar</Label>
            <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle}  onClick={ () => props.closeCallback(false)}/>
          </CardHeader>
          <CardBody className='body'>
            <form>
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


  );
}

