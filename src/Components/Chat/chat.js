import React from 'react';
import { ChatFooter } from './chatFooter';
import { ChatHeader } from './chatHeader';
import { ChatMessageBox } from './chatMessageBox';

export const ChatBox = (props) => {
  
  return (
    <div className='chat-main-box'>
      <ChatHeader />
      <ChatMessageBox />
      <ChatFooter />
    </div>
  );
}
