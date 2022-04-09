import React from 'react';
import { Container } from 'reactstrap';
import Profile from '../Profile/profile';

export class ProfilePage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Container>
        <Profile/>
      </Container>
      
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

