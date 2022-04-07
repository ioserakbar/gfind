import React from 'react';

export class AboutUsPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return <p>About Us TODO</p>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}
