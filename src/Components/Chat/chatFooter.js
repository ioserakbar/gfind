import { faFileCirclePlus, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
export const ChatFooter = (props) => {

  return (
    <div className='chat-footer'>
      <textarea type='text' placeholder='¿Que quieres decir?'/>
      <FontAwesomeIcon icon={faLessThan} />
      <FontAwesomeIcon icon={faFileCirclePlus} />
    </div>
  );
}
