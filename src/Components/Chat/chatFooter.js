import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import constants from '../../constants.json';
export const ChatFooter = (props) => {


  const chatID = props.chatroom;
  const [messageToAdd, setMessageToAdd] = useState([]);


  async function sendMessage() {
    const content = $("#message").val();

    if (content !== '') {
      console.log('chatroomid footer', chatID)
      const cookie = new Cookies();

      const userID = cookie.get(constants.CookieUserID);

      var today = new Date().toISOString();
      const body = {
        date: today,
        content: content,
        userSenderID: userID,
        chatRoomID: chatID,
        seen: false
      }
      const accessToken = cookie.get(constants.CookieAccessToken);
      const response = await fetch(`http://localhost:3001/api/v1/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(body)
      });
      const respJson = await response.json();
      console.log('sent message', respJson);
      if (respJson.success) {
        $("#message").val('');
        props.addCallback(respJson.Data)
      }
    }
  }

  return (
    <div className='chat-footer'>
      <textarea type='text' id='message' placeholder='¿Que quieres decir?' />
      <FontAwesomeIcon icon={faLessThan} onClick={() => sendMessage()} />
    </div>
  );
}
