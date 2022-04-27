import { faThumbsDown, faThumbsUp, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Label, Row } from 'reactstrap';

export class CommentsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      publicationID: '',
      state: false
    };
  }



  render() {

    const comment = (
      <>
        <div className='comment-container'>
          <Row className='comment'>
            <Row className='info'>
              <Col md={1} className='profile-pic'>
                <img src='https://i.imgur.com/f1zGwOP.jpeg' alt='profile-pic' />
              </Col>
              <Col className='nombre'>
                <Label>Fulanito manganito 3 </Label>
              </Col>
              <Col className='fecha'>
                <Label> 15/04/21  3:50pm</Label>
              </Col>
            </Row>
            <Row className='comment-content'>
              <Label>
                la verdad si mija te mamas ugu
                la verdad si mija te mamas ugu
              </Label>
            </Row>
            <Row className='buttons' >
              <Label><FontAwesomeIcon icon={faThumbsUp} /> 300</Label>
              <Label> <FontAwesomeIcon icon={faThumbsDown} /> 300</Label>
            </Row>
          </Row>
        </div>
        <Label className='bottom-line-comments' />
      </>

    )
    return (
      <div className='comments-modal'>
        <Container className='comment-modal-container'>
          <Card>
            <CardHeader className='header'>
              <Label> Comentarios </Label>
              <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.props.closeCallback(false)} />
            </CardHeader>
            <CardBody className='body'>
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
              {comment}
            </CardBody>
          </Card>
        </Container>
      </div>

    );
  }




}
