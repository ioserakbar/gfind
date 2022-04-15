import { faEdit, faFileUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';

export function CreateAccount() {

  const [profilePic, setProfilePic] = useState(null);

  const [crop, setCrop] = useState({ aspect: 1 / 1, minWidth: 50, minHeight: 50 })
  const [profileModal, setProfileModal] = useState(false);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const onlyNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const imageHandleChange = e => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
    openModal();
  }

  const closeModal = () => {
    setProfileModal(false);
  }

  const openModal = () => {
    setProfileModal(true);
  }

  const editPic = () => {
    if (result)
      openModal();
    else
      alert('Suba una imagen primero')
  }

  function getCroppedImg() {

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    // New lines to be added
    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    setResult(canvas.toDataURL('image/jpeg'));
  }


  const renderMultimedia = (source) => {

    if (source) {
      return (
        <div className='profile-pic'>
          <img src={source} alt='profilePic' />
        </div>
      )
    } else {
      return (
        <div className='profile-pic'>
          <img src={require('../../Resources/Imgs/user.png')} alt='profilePic' />
        </div>
      )
    }

  }

  return (
    <>
      <Row>
        <Label className='title'>Crear cuenta</Label>
      </Row>
      <Row>
        <form className='create-account-forms'>
          <Row>
            <Col>
              <Label for='name'>Nombre: </Label>
              <Input id='name' type='text' autocomplete="off" />

              <Label for='email'>Correo electronico: </Label>
              <Input id='email' type='text' />

              <Label for='edad'>Edad: </Label>
              <Input id='edad' type='text' onKeyPress={onlyNumber} autoComplete="off" />

              <Label for='user'>Nickname: </Label>
              <Input id='user' type='text' autocomplete="off" />

              <Label for='contra'>Contraseña: </Label>
              <Input id='contra' type='password' />

              <Label for='contra2'>Confirmar contraseña: </Label>
              <Input id='contra2' type='password' />
            </Col>
            <Label className='vertical-line' />
            <Col className='second-Row'>

              {renderMultimedia(result)}


              <div className='image'>
                <Label >Foto de perfil</Label>
                <Label htmlFor="profilePic">
                  <FontAwesomeIcon icon={faFileUpload} />
                </Label>
                <Input id='profilePic' type='file' accept='.jpeg, .jpg, .png, .bmp' onChange={imageHandleChange} />
                {result && (
                  <Label>
                    <FontAwesomeIcon icon={faEdit} onClick={editPic} />
                  </Label>
                )}

              </div>
              <Row className='pais-y-voice'>
                <Col className='pais'>
                  <Label for='country'>Pais: </Label>
                  <select name='country'>
                    <option value="value1">Value 1</option>
                    <option value="value2">Value 2</option>
                    <option value="value3">Value 3</option>
                  </select>
                </Col>
                <Col className='voicechat'>
                  <Label for='voicechat'>Disponibilidad de voicechat:</Label>
                  <Input id='voicechat' type='checkbox' />
                </Col>
              </Row>
              <Input id='submit' type='submit' />
              <div className='label-inicio'>
                <Label >¿Ya tienes cuenta? <u>Inicia sesion</u></Label>
              </div>
            </Col>
          </Row>
        </form>
      </Row>
      {
        profileModal ? (
          <div className='modal-profile-pic'>
            <Container className='modal-content-profile-pic'>
              <Card>
                <CardHeader className='title'>
                  <Label>Foto de perfil</Label>
                  <FontAwesomeIcon className='close-modal-profile-pic' icon={faTimesCircle} onClick={closeModal} />
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col className='to-crop-col'>
                      <div className='image-to-crop'>
                        <ReactCrop onImageLoaded={setImage} src={profilePic} crop={crop} onChange={newCrop => setCrop(newCrop)} />
                      </div>
                      <Button className='crop-btn' onClick={getCroppedImg}>Cortar imagen</Button>
                    </Col>
                    <Col className='cropped-col'>

                      {result && (
                        <>
                          <div>
                            <img src={result} alt='cropped' />
                          </div>
                          <Button className='set-profile-pic-btn' onClick={closeModal} >Aceptar</Button>
                        </>
                      )}

                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Container>
          </div>
        ) : (
          <></>
        )
      }

    </>
  );


}

