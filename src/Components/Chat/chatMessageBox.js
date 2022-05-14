import React from 'react';
import { ChatMessage } from './chatMessage';
export const ChatMessageBox = (props) => {
  return (
    <div className='chat-message-box'>
      <ChatMessage isMine={false} hasDate = {true}/>
      <ChatMessage isMine={true}  hasDate = {true}/>
      <ChatMessage isMine={false} hasDate = {true}/>
      <ChatMessage isMine={true}  hasDate = {true}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
      <ChatMessage isMine={true}  hasDate = {false}/>
    </div>
  );
}
