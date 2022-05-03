import React from "react";
import { Label } from "reactstrap";

export class CommentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hasMultimedia: false,
      hasContent: false,
      content: '',
      multimedia: []
    };
  }

  async componentDidMount() {

    if (this.props.content || this.props.multimedia) {
      const content = this.props.content;
      const multimedia = this.props.multimedia;

      const hasMultimedia = (multimedia != null);
      let hasContent = (content != null);
      if(content === '')
        hasContent = false;

      await this.setState({
        status: true,
        hasMultimedia: hasMultimedia,
        hasContent: hasContent,
        content: content,
        multimedia: multimedia
      });
    }
    this.forceUpdate();
  }
 
  render() {

    const multimedia = this.state.multimedia && (
      this.state.multimedia.extention === 'mp4' || this.state.multimedia.extention === 'mkv' ? (
        <video src={this.state.multimedia.path} muted />
      ) : (
        <img src={this.state.multimedia.path} alt='comment-pic' />
      )
    )


    return (
      this.state.status && (
        this.state.hasMultimedia && this.state.hasContent ? (
          <div className="multimedia-content">
            {multimedia}
            <Label>{this.state.content}</Label>
          </div>
        ) : (
          this.state.hasMultimedia ? (
            <div className="multimedia">
              {multimedia}
            </div>
          ) : (
            <div className="content">
              <Label>{this.state.content}</Label>
            </div>
          )
        )
      )
    );
  }


} 
