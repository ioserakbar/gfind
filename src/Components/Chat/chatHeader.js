import React from 'react';
import { Label } from 'reactstrap';
export const ChatHeader = (props) => {

  return (
    <div className='chat-header'>
      <div className='profile-pic'>
        <img src={require('../../Resources/Imgs/user.png')} alt='profile-pic' />
      </div>
      <div className='name'>
        <Label>Igancio perez hernandez </Label>
      </div>
    </div>
  );
}