import React from 'react';
import { Container, Label } from 'reactstrap';

export const PlaysPlaceholder = () => {
  return (
    <div className='profile-publications'>
      <Container className='plays-container'>
        <Container className='play-placeholder'>
          <Label />
        </Container>
        <Container className='play-placeholder'>
          <Label />
        </Container>
        <Container className='play-placeholder'>
          <Label />
        </Container>
        <Container className='play-placeholder'>
          <Label />
        </Container>
      </Container>
    </div >
  );
}
