import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { InicioSession } from '../Session/inicioSession';

export class SessionPage extends Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Container className='session-container'>
        <InicioSession />
      </Container>
    );
  }
}

