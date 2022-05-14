import React from 'react';
import { Label } from 'reactstrap';

export const ChatMessage = (props) => {

  const isMine = props.isMine;
  const hasDate = props.hasDate;

  return (
    isMine ? (
      <>
        <div className='message-container ' >
          <div className='message mine'>
            {hasDate && (
              <div className='date'>
                <Label>20/05/2022</Label>
              </div>
            )}

            <div className='message-content'>
              <Label>es mio</Label>
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
                <Label>20/05/2022 - tu mama en </Label>
              </div>
            )}
            <div className='message-content'>
              <Label>Hola</Label>
            </div>
          </div>
        </div>
      </>
    )

  );
}