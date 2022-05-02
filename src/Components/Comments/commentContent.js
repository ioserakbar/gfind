import React from "react";
import { Label } from "reactstrap";

export class CommentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: false,
      hasMultimedia: false,
      hasContent: false 
    };
  }

  //<Label> {this.props.content}</Label>
  async componentDidMount() {

    if(this.state.content || this.state.multimedia){
      const content = this.props.content;
      const multimedia = this.state.multimedia;

      const hasMultimedia = multimedia;

      await this.setState({
        someKey: 'otherValue'
      });
    }

   
  }



  render() {
    return (
      this.state.hasMultimedia && this.state.hasContent ? (
        <Label>TIENE LOS 2</Label>
      ) : (
        this.state.hasMultimedia ? (
          <Label>TIENE multimedia </Label>
        ) : (
          <Label>{this.state.content}</Label>
        )
      )
    );
  }

  
} 
