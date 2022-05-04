import { faEllipsisH, faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Row } from 'reactstrap';

export const ProfileHeader = (props) => {

  //TODO consultas para pais, pasar ID de pais, año y ID

  const [countryName, setCountryName] = useState('');
  const [gotCountry, setGotCountry] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isFriend, setIsFriend] = useState(false)

  useEffect(() => {
    async function getCountry() {
      if (!gotCountry) {
        const response = await fetch(`https://restcountries.com/v3.1/alpha/${props.country}`);
        const respJson = await response.json();
        console.log(respJson);
        if (respJson) {
          setCountryName(respJson[0].name.common)
          setGotCountry(true);
        }
      }
    }
    getCountry();
  });

  const toggleDrop = () => {
    setDrop(!drop);
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
            {props.isMine && (
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
                    <DropdownItem divider />
                    <DropdownItem disabled>Editar informacion</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}

          </Label>
          <Label className='info'>
            <Label className='age'>{props.age} años</Label>
            <Label className='country'>{countryName}<ReactCountryFlag countryCode={props.country} svg /></Label>
            {!props.isMine && (
              <Label className='message'>
                <FontAwesomeIcon icon={faMessage} />
              </Label>
            )}
            {!props.isFriend && (
              <Label className='message'>
                <FontAwesomeIcon icon={faUserPlus} />
              </Label>
            )}
          </Label>
        </Row>
        <Row className='description'>
          <Label> {props.description}</Label>
        </Row>
      </Row>
    </div>
  );
}

