import React from 'react';
import { ChatBox } from '../Chat/chat';
import { ChatSideBar } from '../Chat/side bar/chatSideBar';

export const ChatPage = () => {

  return (
    <div className='chat'>
      <ChatSideBar />
      <ChatBox />
    </div>
  );

}

