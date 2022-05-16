import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { ChatMessage } from './chatMessage';
import constants from '../../constants.json'
export const ChatMessageBox = (props) => {


  const [messages, setMessages] = useState(props.mensajes);
  const [messageArray, setMessageArray] = useState([]);
  const [state, setState] = useState(false);


  useEffect(() => {
    generateMessageArray();
  })

  function generateMessageArray() {

    let arrayToPush = [];
    const cookies = new Cookies();

    const userID = cookies.get(constants.CookieUserID);

    messages.forEach((message) => {
      let objToPush = {};
      const date = new Date(message.date);
      const hour = getAMPM(date);

      objToPush.content = message.content;
      objToPush.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${hour} `;
      if (userID === message.userSenderID)
        objToPush.isMine = true;
      else
        objToPush.isMine = false;

      arrayToPush.push(objToPush);
    });

    setMessageArray(arrayToPush);
    setState(true);
  }

  function getAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }




  return (
    state ? (
      <div className='chat-message-box'>
        {messageArray.map((message, index) => (
          <ChatMessage
            key={index}
            isMine={message.isMine}
            hasDate={true}
            content={message.content}
            date={message.date}
          />
        ))};
      </div>
    ) : (
      <></>
    )

  );
}
