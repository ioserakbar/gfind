import { faEllipsisH, faMessage, faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { useNavigate } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Row } from 'reactstrap';
import Cookies from 'universal-cookie';
import constants from '../../constants.json';

export const ProfileHeader = (props) => {

  //TODO consultas para pais, pasar ID de pais, año y ID

  const [countryName, setCountryName] = useState('');
  const [gotCountry, setGotCountry] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isFriend, setIsFriend] = useState(props.isFriend);
  const userID = props.userID;
  const isMine = props.isMine;
  const userProfileID = props.userProfileID;
  const [isLogedIn, setIsLogedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getCountry() {
      if (!gotCountry) {
        const country = props.country;
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${country}`);
        const respJson = await response.json();
        if (respJson[0].name.common) {
          setCountryName(respJson[0].name.common)
          setGotCountry(true);
        }
      }
    }
    getCountry();
  });

  useEffect(() => {

    const cookie = new Cookies();
    const isLogedIn = cookie.get(constants.CookieIsLogedIn);
    setIsLogedIn(isLogedIn);

  }, []);
  const toggleDrop = () => {
    setDrop(!drop);
  }

  async function addFriend() {
    var today = new Date().toISOString();
    const body = {
      userToFriend: userProfileID,
      date: today
    }
    const cookie = new Cookies();
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/addFriend/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();
    if (respJson.success)
      setIsFriend(true)
  }

  async function removeFriend() {

    const body = {
      userToUnfriend: userProfileID
    }
    const cookie = new Cookies();
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/removeFriend/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();
    if (respJson.success)
      setIsFriend(false)
  }


  async function createChatRoom() {


    if (!isLogedIn) {
      alert('Es necesario iniciar sesion');
      return;
    }

    const cookie = new Cookies();
    const logedUserID = cookie.get(constants.CookieUserID);

    const body = {
      userOne: userProfileID,
      userTwo: logedUserID
    }
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/chatroom`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });

    const respJson = await response.json();
    console.log('create chatroom', respJson);

    navigate(`/chat/${respJson.Data['_id']}`);

  }

  return (
    <div className='header'>
      <Row className='cover-image' >
        <img src='https://gfindmultimediadb.blob.core.windows.net/backgroundpics/defaultBackground.jpg' alt="profile-pic" />
      </Row>
      <Label className='bottom-line-profile' />
      <Row className='profile-pic' >
        <img src={props.profilePic.path} alt="profile-pic" />
      </Row>
      <Row className='profile-content'>
        <Row className='header'>
          <Label className='name-options'>
            <Label className='name'>{props.name}</Label>
            {isMine && (
              <>
                <Dropdown isOpen={drop} toggle={toggleDrop} className='options'>
                  <DropdownToggle className='toggle'>
                    <FontAwesomeIcon claassName='optionsMenu' icon={faEllipsisH} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Opciones</DropdownItem>
                    <DropdownItem >Editar foto de fondo</DropdownItem>
                    <DropdownItem >Editar foto de perfil</DropdownItem>
                    <DropdownItem >Editar descripcion</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
          </Label>
          <Label className='info'>
            {!isMine && isLogedIn && (
              <Label className='message'>
                <FontAwesomeIcon icon={faMessage} onClick={() => createChatRoom()} />
              </Label>
            )}
            {!isFriend && !isMine && isLogedIn && (
              <Label className='friend'>
                <FontAwesomeIcon icon={faUserPlus} onClick={() => addFriend()} />
              </Label>
            )}
            {isFriend && !isMine && isLogedIn && (
              <Label className='friend'>
                <FontAwesomeIcon icon={faUserMinus} onClick={() => removeFriend()} />
              </Label>
            )}
            <Label className='age'>{props.age} años</Label>
            <Label className='country'>{countryName}<ReactCountryFlag countryCode={props.country} svg /></Label>
          </Label>
        </Row>
        <Row className='description'>
          <Label> {props.description}</Label>
        </Row>
      </Row>
    </div>
  );
}

