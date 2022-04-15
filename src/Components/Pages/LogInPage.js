import React from 'react';
import { Container } from 'reactstrap';
import { LogIn } from '../Session/logIn';

export class LogInPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Container>
        <LogIn/>
      </Container>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

