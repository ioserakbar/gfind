import { faMessage, faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { FriendSearchModal } from './friendSearchModal';
import { FriendsPlaceholder } from './friendsPlaceholder';

export const FriendFragment = (props) => {

  const [state, setState] = useState(true);
  const [searchModal, setSearchModal] = useState(false);
  const [friends, setFriends] = useState(props.friends);
  const [friendsArray, setFriendsArray] = useState([]);


  const userID = props.userID
  const isMine = props.isMine;

  function showsearchModal() {
    setSearchModal(!searchModal)
  }

  useEffect(() => {
    buildArray();
  }, [friends])

  async function buildArray() {
    let arrayToPush = [];

    friends.forEach(async function (friend) {
      const response = await fetch(`http://localhost:3001/api/v1/user/${friend.user}`);
      const respJson = await response.json();
      let obj = {};
      const date = new Date(friend.date);
      obj.id = friend.user;
      obj.name = respJson.Data.name;
      obj.img = respJson.Data.profilePic.path;
      obj.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      arrayToPush.push(obj);
    })
    setFriendsArray(arrayToPush);
  }

  async function unFriend(user) {
    
    const body = {
      userToUnfriend: user
    }

    const response = await fetch(`http://localhost:3001/api/v1/user/${userID}/removeFriend/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const respJson = await response.json();

    if (respJson.success) {
      setFriends(respJson.Data.new.friends)
    }

  }

  function addFriend(newFriends) {
    setFriends(newFriends);
  }

  return (
    state ? (
      <>
        {searchModal && (
          <FriendSearchModal closeCallback={showsearchModal} userID={userID} friends={friends} refreshFriends={addFriend} />
        )}
        <div className='profile-publications'>
          {isMine ? (
            <Row className='search-bar'>
              <Col md={11}>
                <Button className='search-bar add-pub-btn' onClick={showsearchModal}> Buscar usuarios </Button>
              </Col>
            </Row>
          ) : (<></>)}
          <div className='friendContainer'>
            {friendsArray.map((friend, index) =>
              <div className='friend' key={index}>
                <div className='profiel-pic'>
                  <img src={friend.img} alt='ola' />
                </div>
                <div className='info' >
                  <Row className='name'>
                    <Label>{friend.name}</Label>
                  </Row>
                  <Row className='date'>
                    <Label>Amigos desde: {friend.date}</Label>
                  </Row>
                  <Row className='button'>
                    <FontAwesomeIcon icon={faUserMinus} onClick={() => unFriend(friend.id)} />
                    <FontAwesomeIcon icon={faMessage} />
                  </Row>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    ) : (
      <div className='profile-publications'>
        <FriendsPlaceholder />
      </div>
    )
  );


}
