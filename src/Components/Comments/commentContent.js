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

  //<Label> {this.props.content}</Label>
  async componentDidMount() {

    if (this.props.content || this.props.multimedia) {
      const content = this.props.content;
      const multimedia = this.props.multimedia;

      const hasMultimedia = (multimedia != null);
      const hasContent = (content != null);

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
        <video src={this.state.multimedia.path} />
      ) : (
        <img src={this.state.multimedia.path}  alt='comment-pic' />
      )
    )


    return (
      this.state.status && (
        this.state.hasMultimedia && this.state.hasContent ? (
          <div className="multimedia-content">
            <img src="https://p4.wallpaperbetter.com/wallpaper/162/454/439/mountains-4k-cool-hd-wallpaper-preview.jpg" alt='comment-pic' />
            <Label>{this.state.content}</Label>
          </div>
        ) : (
          this.state.hasMultimedia ? (
            <div className="multimedia">
              <img src="https://p4.wallpaperbetter.com/wallpaper/162/454/439/mountains-4k-cool-hd-wallpaper-preview.jpg" alt='comment-pic' />
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
