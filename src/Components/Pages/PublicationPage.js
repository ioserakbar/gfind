import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const linkStyle = {
  fontWeight: 800,
  fontSize: "30px",
  color: "hsl(344, 100%, 54%)"
}

export class PublicationPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return <div>PUBLICATION DETAIL TODO</div>;
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

