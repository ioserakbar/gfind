import React, { Component } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { User } from './user';

export class UserList extends Component {
  constructor() {
    super();
    this.state = {
      status: false,
      users: []
    };
  }



  render() {
    return (
      <Container>
        <Row>
          {this.state.users.map((user, index) => (
            <Col key={index} md={"6"}>
              <User
                key={index}
                id={user._id}
                callbackMessage={() => this.props.callbackMessage}
                status={this.state.status}
                data={user}
              />
            </Col>
          ))}
        </Row>
      </Container>
    )
  }


  async componentDidMount() {

      const response = await fetch("http://localhost:3001/api/v1/user/", { method: 'GET', });
      const respJson = response.json();
      if (respJson.success) {
        this.setState({
          status: true,
          data: respJson.Data,
        });

        this.forceUpdate();
      }
  }
}
