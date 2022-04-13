import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Input, Label, Row } from 'reactstrap';

export function InicioSession() {

  const [profilePic, setProfilePic] = useState();

  const onlyNumber = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }

  const imageHandleChange = (e) => {
    if (e.target.files) {

      const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
      setProfilePic(fileArray);
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));

    } else {
      alert('No se pudo cargar el archivo deseado, por favor intente de nuevo');
    }
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
              <Input id='edad' type='text' onKeyPress={onlyNumber} autocomplete="off" />

              <Label for='user'>Nickname: </Label>
              <Input id='user' type='text' autocomplete="off" />

              <Label for='contra'>Contraseña: </Label>
              <Input id='contra' type='password' />

              <Label for='contra2'>Confirmar contraseña: </Label>
              <Input id='contra2' type='password' />
            </Col>
            <Label className='vertical-line' />
            <Col className='second-Row'>

              {renderMultimedia(profilePic)}

              <div className='image'>
                <Label >Foto de perfil</Label>
                <Label htmlFor="profilePic">
                  <FontAwesomeIcon icon={faFileUpload} />
                </Label>
                <Input id='profilePic' type='file' accept='.jpeg, .jpg, .png, .bmp' onChange={imageHandleChange}/>
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
    </>
  );


}

