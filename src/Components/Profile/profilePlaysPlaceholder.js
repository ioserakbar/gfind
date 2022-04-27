import React from 'react';
import { Container, Label } from 'reactstrap';

export class ProfilePlaysPlaceholder extends React.Component {


  render() {
    const comp = (
      <Container className='play-placeholder'>
        <Label />
      </Container>
    );
    return (
      <Container className='plays-container'>
        {comp}
        {comp}
        {comp}
        {comp}
        {comp}
        {comp}
      </Container>
    );
  }


}
