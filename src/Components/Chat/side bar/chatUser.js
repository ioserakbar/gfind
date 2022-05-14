import React from 'react';
import { Label } from 'reactstrap';
export const ChatUser = (porps) => {

  return (
    <div className='chat-user'>
      <div className='user-info'>
        <div className='profile-pic'>
          <img src={require('../../../Resources/Imgs/user.png')} alt='profile-pic' />
        </div>
        <div className='name'>
          <Label>Igancio Mendes de los pitos</Label>
        </div>
      </div>
      <div className='last-message'>
        <Label style={{ fontWeight: 600 }} >Ola miamor, estas viendo porno solo?Ola miamor, estas viendo porno solo?Ola miamor, estas viendo porno solo?</Label>
      </div>
    </div>
  );
}

