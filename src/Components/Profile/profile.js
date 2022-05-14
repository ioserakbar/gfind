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
  const [games, setGames] = useState([]);
  const [friends, setFriends] = useState([])
  const [isFriend, setIsFriends] = useState(false);
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
          console.log('friendForEach start')

          respJson.Data.friends.forEach(friend => {
            console.log('result', friend.user === userSessionID)

            if (friend.user === userSessionID)
              setIsFriends(true);
          })
          setUserID(userSessionID);
          setProfileImage(respJson.Data.profilePic);
          setName(respJson.Data.name);
          setDescription(respJson.Data.description);
          setbackgroundPic(respJson.Data.backgroundImg);
          setCountry(respJson.Data.countryID);
          setAge(respJson.Data.age);
          setGames(respJson.Data.favoriteGames);
          setFriends(respJson.Data.friends);
          setState(true);
        }

        setGotInfo(true);

      }

    }
    getUser();
  }, [])


  return (
    state ? (
      <>
        <Container className='profile'>
          <ProfileHeader
            profilePic={profileImage}
            backgroundPic={backgroundPic}
            name={name} description={description}
            isMine={isMine}
            country={country}
            age={age}
            userProfileID={userProfileID}
            userID={userID}
            isFriend={isFriend}
          />
          <Label className='bottom-line-profile-true' />
          <ProfileContent userID={userProfileID} isMine={isMine} games={games} friends={friends} />
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
