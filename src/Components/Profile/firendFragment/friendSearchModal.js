import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Label, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faMessage, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';

export const FriendSearchModal = (props) => {



  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const userID = props.userID
  const friends = props.friends;

  useEffect(() => {

    async function getUsers() {
      const response = await fetch(`http://localhost:3001/api/v1/user/`);
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

    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/addFriend/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();
    if(respJson.success){
      props.refreshFriends(respJson.Data.new.friends)
      props.closeCallback(false)
    }else{
      alert('algo salio mal');
    }
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
                          <FontAwesomeIcon icon={faMessage} />
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

