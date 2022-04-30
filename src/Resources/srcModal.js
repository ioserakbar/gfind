import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';;

export const SrcModal = (props) => {

  return (

    <div className='src-Modal' >
      <div className='src-container' >
        <FontAwesomeIcon icon={faTimes} onClick={() => props.closeCallback(false)} />
        {props.type === 'video' ? (
          <video src={props.src} controls autoPlay />
        ) : (
          <img src={props.src} alt={'src'} />
        )}
      </div>
    </div>

  );


}

