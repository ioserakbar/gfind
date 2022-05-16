import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { ChatFooter } from './chatFooter';
import { ChatHeader } from './chatHeader';
import { ChatMessageBox } from './chatMessageBox';
import constants from '../../constants.json'


 
export const ChatBox = (props) => {

  const [state, setState] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatID = props.chatroom;

  useEffect(() => {
    getMessages();
  }, [])

  async function getMessages() {
    const cookie = new Cookies();
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/message/getFromChatroom/${chatID}`, {
      headers: { 'authorization': `Bearer ${accessToken}` },
    });
    const respJson = await response.json();
    console.log(respJson);
    if (respJson.success) {
      setMessages(respJson.Data);
    }

    setState(true);
  }

  function getJustAddedMessage(message) {
    let array = messages;
    array.push(message);
    setMessages(array);
  }

  return (
    state ? (
      <div className='chat-main-box'>
        <ChatHeader />
        <ChatMessageBox mensajes={messages} />
        <ChatFooter chatroom={chatID} addCallback={getJustAddedMessage} />
      </div>
    ) : (
      <></>
    )

  );
}
