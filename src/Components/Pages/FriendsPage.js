import React from 'react';

export class FriendsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return <p>FRIENDS PAGE TODO</p>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

