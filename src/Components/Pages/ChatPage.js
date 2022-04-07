import React from 'react';

export class ChatPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return <p>MESSAGES TODO</p>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

