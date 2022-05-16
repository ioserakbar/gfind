import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import constants from '../../../constants.json';
import { useNavigate } from 'react-router-dom';

export const FriendSearchModal = (props) => {



  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userID = props.userID
  const friends = props.friends;
  const navigate = useNavigate();


  useEffect(() => {

    async function getUsers() {
      const cookie = new Cookies();
      const accessToken = cookie.get(constants.CookieAccessToken);
      const response = await fetch(`http://localhost:3001/api/v1/user/`, {
        headers: { 'authorization': `Bearer ${accessToken}` },
      });
      const respJson = await response.json();
      if (respJson.success) {


        setUsers(respJson.Data);
        let arrayToFilter = [];
        respJson.Data.forEach(user => {
          let isFriend = false;
          friends.forEach(friend => {
            if (user._id == friend.user)
              isFriend = true;
          })
          if (user._id != userID && !isFriend)
            arrayToFilter.push(user);
        });
        setFilteredUsers(arrayToFilter);
      }
    }

    getUsers();

  }, [])

  function inputHandler() {

    let arrayToFilter = [];
    const filter = $('#seach-text').val();

    users.forEach(user => {
      let isFriend = false;
      friends.forEach(friend => {
        if (user._id == friend.user)
          isFriend = true;
      })
      if ((user.name.toLowerCase().includes(filter.toLowerCase())) && user._id != userID && !isFriend)
        arrayToFilter.push(user);
    });

    setFilteredUsers(arrayToFilter);
  }

  async function addFriend(friendID) {
    var today = new Date().toISOString();
    const body = {
      userToFriend: friendID,
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
    if (respJson.success) {
      props.refreshFriends(respJson.Data.new.friends)
      props.closeCallback(false)
    } else {
      alert('algo salio mal');
    }
  }


  async function createChatRoom(usID) {

    const cookie = new Cookies();
    const logedUserID = cookie.get(constants.CookieUserID);

    const body = {
      userOne: usID,
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
    <>
      <div className='modal-publication-form '>
        <Container className='modal-content-publication'>
          <Card>
            <CardHeader className='title'>
              <Label>Buscar usuarios</Label>
              <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={() => props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body overflowY'>
              <input type='text' id='seach-text' className='friend-search-bar' placeholder='Buscar personas' onChange={inputHandler} />
              <br></br>
              <div className='users'>
                {filteredUsers.map((user, index) => (
                  <div className='user' key={index}>
                    <Row>
                      <div className='user-image'>
                        <img src={user.profilePic.path} alt='profile-pic' />
                      </div>
                    </Row>
                    <Row>
                      <div className='info'>
                        <Row className='name'>
                          <Label>{user.name}</Label>
                        </Row>
                        <Row className='buttons'>
                          <FontAwesomeIcon icon={faMessage} onClick={() => createChatRoom(user._id)} />
                          <FontAwesomeIcon icon={faUserPlus} onClick={() => addFriend(user._id)} />
                        </Row>
                      </div>
                    </Row>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </>

  );
}

