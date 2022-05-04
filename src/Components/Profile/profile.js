import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
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
  const [age, setAge] = useState('');
  const [userID, setUserID] = useState('');
  const [country, setCountry] = useState('');
  const [gotInfo, setGotInfo] = useState(false);


  useEffect(() => {

    async function getUser() {
      if (!gotInfo) {
        const cookie = new Cookies();
        const isLogedIn = cookie.get(constants.CookieIsLogedIn);
        let userSessionID;
        if (isLogedIn)
          userSessionID = cookie.get(constants.CookieUserID);

        const response = await fetch(`http://localhost:3001/api/v1/user/${userProfileID}`);
        const respJson = await response.json();

        if (respJson.success) {

          if (userSessionID === userProfileID) {
            setIsMine(true)
          }

          setUserID(userSessionID);
          const data = respJson.Data;
          setState(true);
          setProfileImage(data.profilePic);
          setName(data.name);
          setDescription(data.description);
          setbackgroundPic(data.backgroundImg);
          setCountry(data.countryID);
          setAge(data.age);
        }

        setGotInfo(true);
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
          <ProfileHeader profilePic={profileImage} backgroundPic={backgroundPic} name={name} description={description} isMine={isMine} country={country} age={age} />
          <Label className='bottom-line-profile-true' />
          <ProfileContent userID={userProfileID}  isMine={isMine}/>
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
