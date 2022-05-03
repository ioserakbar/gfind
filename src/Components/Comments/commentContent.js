import React from "react";
import { Label } from "reactstrap";
import { SrcModal } from "../../Resources/srcModal";

export class CommentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      hasMultimedia: false,
      hasContent: false,
      content: '',
      multimedia: [],
      srcModal: false,
      srcType: ''
    };
  }

  async componentDidMount() {

    if (this.props.content || this.props.multimedia) {
      const content = this.props.content;
      const multimedia = this.props.multimedia;

      const hasMultimedia = (multimedia != null);
      let hasContent = (content != null);
      if (content === '')
        hasContent = false;

      let typee;
      if (hasMultimedia) {
        const type = this.props.multimedia.extention;
        if (type === 'mp4' || type === 'mkv')
          typee = 'video'
        else
          typee = 'image'
      }

      await this.setState({
        status: true,
        hasMultimedia: hasMultimedia,
        hasContent: hasContent,
        content: content,
        multimedia: multimedia,
        srcType: typee
      });
    }
    this.forceUpdate();
  }

  srcModal = (pState) => {

    this.setState({
      srcModal: pState
    })
  }


  render() {

    const multimedia = this.state.multimedia && (
      this.state.multimedia.extention === 'mp4' || this.state.multimedia.extention === 'mkv' ? (
        <video src={this.state.multimedia.path} muted onClick={() => this.srcModal(true)} />
      ) : (
        <img src={this.state.multimedia.path} alt='comment-pic' onClick={() => this.srcModal(true)} />
      )
    )

    return (

      this.state.status && (
        <>
          {this.state.srcModal && (<SrcModal type={this.state.srcType} src={this.state.multimedia.path} closeCallback={this.srcModal} />)}
          {this.state.hasMultimedia && this.state.hasContent ? (
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
          )}
        </>


      )
    );
  }


} 
