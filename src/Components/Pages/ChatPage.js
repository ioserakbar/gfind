import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { ChatBox } from '../Chat/chat';
import { ChatSideBar } from '../Chat/side bar/chatSideBar';
import constants from '../../constants.json'

export const ChatPage = () => {

  const cookies = new Cookies();
  const location = useLocation()
  const [chatroomID, setchatroomid] = useState(location.pathname.split('/')[2]);
  const navigate = useNavigate();
  const [state, setState] = useState(false);
  const [messageUser, setMessageUser] = useState('')

  useEffect(() => {

    if (!cookies.get(constants.CookieIsLogedIn)) {
      alert('necesitas iniciar sesion para continuar')
      navigate('/Home');
    }
    getChatUser();
    setState(true);

  }, [])

  async function getUserChatrooms() {

  }

  async function getChatUser() {

    const accessToken = cookies.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/chatroom/${chatroomID}`, {
      headers: { 'authorization': `Bearer ${accessToken}` },
    })
    const respJson = await response.json();

    const userID = cookies.get(constants.CookieUserID);

    if (respJson.userOne === userID)
      setMessageUser(respJson.userTwo)
    else if (respJson.userTwo === userID)
      setMessageUser(respJson.userOne)

  }


  return (
    state ? (
      <div className='chat'>
        <ChatBox chatroom={chatroomID} messageID={messageUser} />
      </div>
    ) : (
      <></>
    )
  );

}

