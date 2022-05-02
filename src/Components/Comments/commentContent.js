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

  render() {
    return (
      this.state.hasMultimedia && this.state.hasContent ? (
        <Label>TIENE LOS 2</Label>
      ) : (
        this.state.hasMultimedia ? (
          <Label>TIENE multimedia </Label>
        ) : (
          <Label>TIENE contenido </Label>
        )
      )
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
} 
