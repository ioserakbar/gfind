import React from 'react';
import { Label } from 'reactstrap';

export const ChatMessage = (props) => {

  const isMine = props.isMine;
  const hasDate = props.hasDate;
  const date = props.date;
  const content = props.content;


  return (
    isMine ? (
      <>
        <div className='message-container ' >
          <div className='message mine'>
            {hasDate && (
              <div className='date'>
                <Label>{date}</Label>
              </div>
            )}
            <div className='message-content'>
              <Label>{content}</Label>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='message-container ' >
          <div className='message not-mine'>
            {hasDate && (
              <div className='date'>
                <Label>{date}</Label>
              </div>
            )}
            <div className='message-content'>
              <Label>{content}</Label>
            </div>
          </div>
        </div>
      </>
    )

  );
}