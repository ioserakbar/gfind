import React from 'react';
import { ChatSearchBar } from './chatSearchBar';
import { ChatSideBarBody } from './chatSideBarBody';

export const ChatSideBar = (props) => {

  return (

    <div className='chat-side-bar'>
      <ChatSearchBar />
      <ChatSideBarBody />
    </div>
  );

}

