import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Label, Row } from 'reactstrap';

export const ProfileHeader = (props) => {

  //TODO consultas para pais, pasar ID de pais, año y ID

  const [countryName, setCountryName] = useState('');
  const [gotCountry, setGotCountry] = useState(false);

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
    console.log(props);
    //getCountry();
  });


  return (
    <div className='header'>
      <Row className='cover-image' >
        <img src={props.backgroundPic.path} alt="profile-pic" />
      </Row>
      <Label className='bottom-line-profile' />
      <Row className='profile-pic' >
        <img src={props.profilePic.path} alt="profile-pic" />
      </Row>
      <Row className='profile-content'>
        <Row className='header'>
          <Label>
            <Label className='name'>{props.name}</Label>
          </Label>
          <Label className='info'>
            <Label className='age'>20 años</Label>
            <Label className='country'>{countryName}<ReactCountryFlag countryCode={props.country} svg /></Label>
            {!props.isMine && (
              <Label className='message'>
                <FontAwesomeIcon icon={faMessage} />
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

