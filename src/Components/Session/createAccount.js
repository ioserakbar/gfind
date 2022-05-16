import { faEdit, faFileUpload, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Label, Row } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import constants from '../../constants.json';



export function CreateAccount() {

  const [profilePic, setProfilePic] = useState(null);
  const [crop, setCrop] = useState({ aspect: 1 / 1, minWidth: 50, minHeight: 50 })
  const [profileModal, setProfileModal] = useState(false);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


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

  const createAccountHandler = async (e) => {
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const edad = $('#edad').val();
    const user = $('#user').val();
    const contra = $('#contra').val();
    const contra2 = $('#contra2').val();
    const country = $('#country').val();
    const voicechat = $('#voicechat').is(':checked');

    const cookies = new Cookies();

    const validName = /^[a-zA-Z ]{1,}$/;
    const validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (name === '' || email === '' || edad === '' || user === '' || contra === '' || contra2 === '' || country === '') {
      setError('Llene los campos vacios.');
    } else if (contra !== contra2) {
      setError('Las contraseñas deben coincidir');
    } else if (contra.length > 15) {
      setError('La contraseña debe tener menos de 15 caracteres');
    } else if (!validEmail.test(email)) {
      setError('Introduzca un email valido.');
    } else if (!validPassword.test(contra)) {
      setError('La contraseña debe tener mínimo letra mayuscula, una letra minuscula, un digito, un caracter especial y debe de contar con 8 o más caracteres');
    } else if (edad < 13) {
      setError('Tienes que ser mayor de 13 años para crear una cuenta');
    } else if (!validName.test(name)) {
      setError('El nombre no puede tener numeros ni caracteres especiales');
    } else {

      setError('');
      setLoading(true);

      const img = $('#profile-pic').attr('src');
      const parts = img.split(';')
      const mime = parts[0].split(':')[1].split('/')[1];
      const imgName = name.replace(/\s+/g, '-') + "-profile-pic";
      const profilePicData = parts[1].split('base64,').pop();


      const profilePic = {
        "name": imgName,
        "extention": mime,
        "path": profilePicData
      }

      const body = {
        "name": name,
        "email": email,
        "age": edad,
        "user": user,
        "password": contra,
        "countryID": country,
        "voicechat": voicechat,
        "profilePic": profilePic
      }
      const cookie = new Cookies();
      const accessToken = cookie.get(constants.CookieAccessToken);
      const response = await fetch(`http://localhost:3001/api/v1/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });

      const respJson = await response.json();
      console.log(respJson);
      if (respJson.success) {
        cookies.set(constants.CookieUserID, respJson.Data._id, { path: '/' })
        cookies.set(constants.CookieIsLogedIn, true, { path: '/' })
        setLoading(false);
        navigate('/home');

      }
    }

    $('.create-account-error').addClass('bounce');
    $('.create-account-error').slideDown('fast');

    setTimeout(function () {
      $('.create-account-error').removeClass("bounce");
    }, 1000);

  }


  useEffect(() => {

    async function fillCountrySelect() {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const respJson = await response.json();

      let options = ``;
      respJson.forEach(country => {
        options += `<option value="${country.cca2}">${country.name.common}</option>`;
      });

      $('#country').html(options);

    }

    fillCountrySelect()
  }, []);


  const renderMultimedia = (source) => {

    if (source) {
      return (
        <div className='profile-pic'>
          <img src={source} alt='profilePic' id='profile-pic' />
        </div>
      )
    } else {
      return (
        <div className='profile-pic'>
          <img src={require('../../Resources/Imgs/user.png')} alt='profilePic' id='profile-pic' />
        </div>
      )
    }

  }

  return (
    <>
      {loading && (
        <div className='loading-modal'>
          <FontAwesomeIcon icon={faSpinner} />
        </div>
      )}
      <Row>
        <Label className='title'>Crear cuenta</Label>
      </Row>
      <Row>
        <form className='create-account-forms' onSubmit={createAccountHandler}>
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
                <Input id='profilePic' name='profilePic ' type='file' accept='.jpeg, .jpg, .png, .bmp' onChange={imageHandleChange} />
                {result && (
                  <Label>
                    <FontAwesomeIcon icon={faEdit} onClick={editPic} />
                  </Label>
                )}

              </div>
              <Row className='pais-y-voice'>
                <Col className='pais'>
                  <Label for='country'>Pais: </Label>
                  <select name='country' id="country">
                  </select>
                </Col>
                <Col className='voicechat'>
                  <Label for='voicechat'>Disponibilidad de voicechat:</Label>
                  <Input id='voicechat' type='checkbox' />
                </Col>
              </Row>
              <Input id='submit' type='submit' />
              <div className='label-inicio'>
                <Label >¿Ya tienes cuenta? <Link to={'/LogIn'} className='to-init-session'><u>Inicia sesion</u></Link></Label>
              </div>
            </Col>
          </Row>
        </form>
      </Row>
      <Row className='create-account-error'>
        <Label>{error}</Label>
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
                        <ReactCrop onImageLoaded={setImage} src={profilePic} crop={crop} onChange={newCrop => setCrop(newCrop)} minWidth={50} minHeight={50} x={10} y={10} ruleOfThirds />
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

