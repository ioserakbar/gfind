import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { CreateAccount } from '../Session/createAccount';

export class CreateAccountPage extends Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Container className='session-container'>
        <CreateAccount/>
      </Container>
    );
  }
}

