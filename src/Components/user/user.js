import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Label, Row } from 'reactstrap';
import { UserDetail } from './userDetail'
import FormUser from './formUser'
import { UserPlaceholder } from './userPlaceholder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const TYPESHOW = "show";
const TYPEEDIT = "edit";
const TYPEDELETE = "delete";

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      status: false,
      type: TYPESHOW,
      prevType: TYPESHOW,
      data: {},
      fakeData: null
    };
  }

  async componentDidMount() {
    if (this.props.data) {
      
      this.setState({
        status: true,
        data: this.props.data,
      });
      this.forceUpdate();

    } else if (this.props.id) {
      const response = await fetch(`http://localhost:3001/api/v1/user/${this.props.id}`, {method: 'GET',});
      const respJson = await response.json();
      if (respJson.success) {
        this.setState({
          status: true,
          data: respJson.Data,
        });

        this.forceUpdate();
      }

    }
  }

  render() {

    const isEdit = this.state.type === TYPEEDIT;
    const isShow = this.state.type === TYPESHOW;

    const finalData = this.state.fakeData != null ? this.state.fakeData : this.state.data;

    const {name} = finalData;

    const button = 
      isEdit ? <Button color="success" onClick={() => this.saveBDButton(TYPESHOW, TYPEEDIT)}>Guardar</Button> :
      isShow ? <Button color="primary" onClick={() => this.editButton(TYPEEDIT, TYPESHOW)}>Editar</Button> :
      <div></div>

    return (
      this.state.status === true ? (
        <Card
          style={{
            margin: '10px'
          }}
        >
          <CardHeader>
            <Container>
              <Row>
                <Col md={9}><Label>{name}</Label></Col>
                <Col md={3}>
                  <Button
                    style={{
                      background: 'none',
                      border: 'none'
                    }}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} color="hsl(344, 100%, 54%)"></FontAwesomeIcon>
                  </Button>
                </Col>
              </Row>
            </Container>
          </CardHeader>
          <CardBody>
            <Container>
              <Row>
                <Col md={12}>
                  {
                    isEdit ? (
                      <FormUser
                        changeCallback = {this.changeInput.bind(this)}
                      ></FormUser>
                    ) : isShow ? (
                      <UserDetail data = {finalData}></UserDetail>
                    ) : (
                      <div></div>
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {button}
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Card>
      ) : this.state.type === TYPEDELETE ? (
        <div></div>
      ) : (
        <UserPlaceholder></UserPlaceholder>
      )
    )
  }
}
