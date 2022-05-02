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
      commentID: ''
    };
  }

  async componentDidMount() {

    if (this.props.dataComment) {
      const comment = this.props.dataComment;

      await this.setState({
        content: comment.content,
        stats: comment.stats,
        userID: comment.userID,
        commentID: comment._id,
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
              <CommentHeader userID={this.state.userID} />
              <Row className='comment-content'>
                <CommentContent content={this.state.content} />
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

