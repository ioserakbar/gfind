import { faFileUpload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React,{ Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Label, Row } from 'reactstrap';
import '../../App.css'

export class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: "",
      id: 'ola'
    };
  }

  componentWillMount() {
    if (this.props.img) {
      console.log("si entro")
      this.setState({
        img: this.props.img
      });
      this.forceUpdate();
    }

    console.log(this.props);
  }


  render() {

    const hasImage = this.state.img ? true : false;
    return (
      <Card className='publication'>
        <CardHeader className='publication-header'>
          <Container>
            <Row className='publication-header-row'>
              <Col md={1} className='user-img' >
                <img src='https://i.imgur.com/bCOjLao.jpeg' alt="pfp" />
              </Col>
              <Col md={7} className='user-name'>
                <Label>Ignacio perez</Label>
                <br ></br>
                <small>hace aproximadamente 1 año</small>
              </Col>
              <Col md={3} className="publication-date" >
                <Label>El 2 de Octubre de 2021</Label>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody className='publication-body'>
          <Row>
            {
              hasImage ? (
                <>
                  <Col md={6} className='publication-multimedia'>
                    <img src={this.state.img} alt="pfp"/>
                  </Col>
                  <Col md={6} className='publication-description-image'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Col>
                </>
              ) : (
                <>
                  <Col md={12} className='publication-description-image'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                  </Col>
                </>
              )
            }
          </Row>
        </CardBody>
        <CardFooter className='publication-footer'>
          <Row className='publication-footer-row'>
            <Col md={6} className="publication-footer-input">
              <input type="text" placeholder='Añadir comentario' />
            </Col>
            <Col md={3} className="publication-footer-sendbtns" >
              <Button>Enviar</Button>
              <FontAwesomeIcon icon={faFileUpload} />
            </Col>
            <Col md={3} className="publication-footer-likes">
              <Label><FontAwesomeIcon icon={faThumbsUp} />0</Label>
              <Label><FontAwesomeIcon icon={faThumbsDown} />99k</Label>
            </Col>
          </Row>
        </CardFooter>
      </Card>

    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

