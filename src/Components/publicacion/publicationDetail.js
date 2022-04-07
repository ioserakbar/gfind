import React from 'react';
import { Col, Row } from 'reactstrap';



export class PublicationDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      multimedia: [],
      content: ""
    };
  }

  componentDidMount() {
    
    if (this.props.content) {
      this.setState({
        status: true,
        multimedia: this.props.multimedia,
        content: this.props.content
      });
      this.forceUpdate();
    }

  }

  render() {

    const hasImage = this.state.multimedia[0] ? true : false;
    return (
      this.state.status ? (
        <Row className='card-body-row'>
          {
            hasImage ? (
              <>
                <Col md={6} className='publication-multimedia'>
                  <img src={this.state.multimedia[0].path} alt={this.state.multimedia[0].name} />
                </Col>
                <Col md={6} className='publication-description-image'>
                  {this.state.content}
                </Col>
              </>
            ) : (
              <>
                <Col md={12} className='publication-description-image'>
                  {this.state.content}
                </Col>
              </>
            )
          }
        </Row>
      ) : (
          <div>placeholder</div>
      )
    );
  }

}


