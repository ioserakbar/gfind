import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Label, Row } from 'reactstrap';
import { Comment } from './comment';
import { CommentPlaceholder } from './commentPlaceholder';

export class CommentsModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hasComments: false,
      comments: []
    };
  }


  async componentDidMount() {

    if (this.props.pubID) {

      const response = await fetch(`http://localhost:3001/api/v1/comment/publication/${this.props.pubID}`);
      const respJson = await response.json();

      if (respJson.success) {
        
        await this.setState({
          status: true,
          hasComments: true,
          comments: respJson.Data
        });
      } else {
        await this.setState({
          status: true,
          hasComments: false
        });
      }
    }
    this.forceUpdate();
  }


  render() {

    const { hasComments, status, comments } = this.state;
    return (
      status ? (

        <div div className='comments-modal' >
          <Container className='comment-modal-container'>
            <Card>
              <CardHeader className='header'>
                <Label> Comentarios </Label>
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.props.closeCallback(false)} />
              </CardHeader>
              <CardBody className='body'>
                {hasComments ? (
                  comments.map((comment, index) => (
                    <Comment
                      key={comment._id + index}
                      dataComment={comment}
                      userID={comment.userID}
                    />
                  ))
                ) : (
                  <div className='no-comments'>
                    <Label >Aún no hay comentarios</Label>
                  </div>
                )}
              </CardBody>
            </Card>
          </Container>
        </div>


      ) : (
        <div div className='comments-modal' >
          <Container className='comment-modal-container'>
            <Card>
              <CardHeader className='header'>
                <Label> Comentarios </Label>
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.props.closeCallback(false)} />
              </CardHeader>
              <CardBody className='body'>
                <CommentPlaceholder />
                <CommentPlaceholder />
                <CommentPlaceholder />
                <CommentPlaceholder />
              </CardBody>
            </Card>
          </Container>
        </div>
      )
    );
  }




}
