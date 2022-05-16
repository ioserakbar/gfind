import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { Button, Input, Label, Row } from 'reactstrap';
import constants from '../../constants.json'
import Cookies from 'universal-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function LogIn() {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const sessionauth = async (e) => {

    e.preventDefault();
    const cookies = new Cookies();

    const emailInput = $('#email').val();
    const passwordInput = $('#contra').val();

    if (!emailInput || !passwordInput) {

      setError('Llene los campos vacios.');
      $('.error').addClass('bounce');
      $('.error').slideDown('fast');

      setTimeout(function () {
        $('.error').removeClass("bounce");
      }, 1000);

      return;
    }
    setLoading(true)
    const cookie = new Cookies();
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/user?e=${emailInput}&p=${passwordInput}`, {
      headers: { 'authorization': `Bearer ${accessToken}` },
    });
    const respJson = await response.json();

    if (respJson.success) {

      cookies.set(constants.CookieUserID, respJson.Data[0]._id, { path: '/' })
      cookies.set(constants.CookieIsLogedIn, true, { path: '/' })
      cookies.set(constants.CookieAccessToken, respJson.AccessToken, { path: '/' })
      navigate('/home');
      return;

    } else {
      setLoading(false)
      setError('Verifique que las credenciales sean correctas.');
      $('.error').addClass('bounce');
      $('.error').slideDown('fast');

      setTimeout(function () {
        $('.error').removeClass("bounce");
      }, 1000);

      return;
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
        <Label className='title'>Iniciar sesion</Label>
      </Row>
      <Row>
        <form className='init-session-forms' onSubmit={sessionauth}>

          <Label for='name' >Email: </Label>
          <Input id='email' type='text' />

          <Label for='contra' >Contraseña: </Label>
          <Input id='contra' type='password' />

          <div className='error'>
            <Label>{error}</Label>
          </div>

          <div className='init-session-btn'>
            <Button type='submit'>Iniciar sesion</Button>
          </div>

          <div className='label-inicio'>
            <Label>¿No tienes cuenta?<Link to={'/CreateAccount'} className='to-create-account'><u>Crea una</u></Link></Label>
          </div>

        </form>
      </Row>
    </>
  );
}
