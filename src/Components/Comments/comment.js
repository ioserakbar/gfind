import React from 'react';
import { Label, Row } from 'reactstrap';
import { CommentContent } from './commentContent';
import CommentFooter from './commentFooter';
import { CommentHeader } from './commentHeader';

export class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      content: '',
      stats: '',
      status: false,
      commentID: '',
      multimedia: '',
      date: ''
    };
  }

  async componentDidMount() {

    if (this.props.dataComment) {
      const comment = this.props.dataComment;

      await this.setState({
        content: comment.content,
        multimedia: comment.multimedia,
        stats: comment.stats,
        userID: comment.userID,
        commentID: comment._id,
        date:comment.date,
        status: true
      });
    }
    this.forceUpdate();
  }

  render() {
    return (
      this.state.status ? (
        <>
          <div className='comment-container'>
            <Row className='comment'>
              <CommentHeader userID={this.state.userID} date={this.state.date}/>
              <Row className='comment-content'>
                <CommentContent content={this.state.content} multimedia={this.state.multimedia}/>
              </Row>
              <Row className='buttons' >
                <CommentFooter stats={this.state.stats} commentID={this.state.commentID} />
              </Row>
            </Row>
          </div>
          <Label className='bottom-line-comments' />
        </>
      ) : (
        <></>
      )


    );
  }


}

