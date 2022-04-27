import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { Container, Label } from 'reactstrap';
import Cookies from 'universal-cookie';
import { ProfileContent } from './profileContent';
import { ProfileHeader } from './profileHeader';
import ProfilePlaceholder from './profilePlaceholder';
import constants from '../../constants.json'

function Profile(props) {

  const [state, setState] = useState(false);
  const location = useLocation()
  const [userProfileID, setUserProfileID] = useState(location.pathname.split('/')[2]);
  const [isMine, setIsMine] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [backgroundPic, setbackgroundPic] = useState('');
  const [userID, setUserID] = useState('');
  const [country, setCountry] = useState('');


  useEffect(() => {

    async function getUser() {
      const cookie = new Cookies();
      const isLogedIn = cookie.get(constants.CookieIsLogedIn);
      if (isLogedIn) {

        const userSessionID = cookie.get(constants.CookieUserID);
        const userID = cookie.get(constants.CookieUserID);

        const response = await fetch(`http://localhost:3001/api/v1/user/${userID}`);
        const respJson = await response.json();

        if (respJson.success) {

          if (userSessionID === userProfileID) {
            setIsMine(true)
          }
          setUserID(userID);
          const data = respJson.Data;
          setState(true);
          setProfileImage(data.profilePic);
          setName(data.name);
          setDescription(data.description);
          setbackgroundPic(data.backgroundImg);
          setCountry(data.countryID);
        }

      }
    }
    getUser();

    return () => {

    }
  }, [])


  return (
    state ? (
      <>
        <Container className='profile'>
          <ProfileHeader profilePic={profileImage} backgroundPic={backgroundPic} name={name} description={description} isMine={isMine} country={country}/>
          <Label className='bottom-line-profile-true' />
          <ProfileContent />
        </Container>
      </>
    ) : (
      <>

        <Container className='profile'>
          <ProfilePlaceholder />
        </Container>
      </>
    )

  );

}

export default Profile;
