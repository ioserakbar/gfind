import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { User } from '../user/user';
import { UserList } from '../user/userList';
import { UserViewer } from '../user/userViewer';

const linkStyle = {
  fontWeight: 800,
  fontSize: "30px",
  color: "hsl(344, 100%, 54%)"
};

const navStyle = {
  padding: "15px",
  margin: "5px"
};

export class UsersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
        <Container>
          <Row>
            <Col md={6} style={navStyle}>
              <Link to={'/'} style={linkStyle}>
                <Button outline color='info' size='lg'
                  style={{
                    float: 'left'
                  }}
                >
                  <FontAwesomeIcon icon={faHome} /> Homepage
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Container>
                <Row>
                  <Col md={6}>
                    <User
                      id={'6247866e4f2609979cf9a3d7'}
                      callbackMessage={this.cllbkUserMessage}
                    >
                    </User>
                  </Col>
                  <Col md={6}>
                    <User
                      id={'6247866e4f2609979cf9a3d7'}
                      callbackMessage={this.cllbkUserMessage}
                    >
                    </User>
                  </Col>
                </Row>
                <Row>
                  <UserList callbackMessage={this.cllbkUserMessage}></UserList>
                </Row>
                <Row>
                  <User callbackMessage={this.cllbkUserMessage} />
                </Row>
              </Container>
            </Col>
            <Col md={6}>
              <UserViewer data={this.state.userData} />
            </Col>
          </Row>
        </Container>
    )
  }

}

