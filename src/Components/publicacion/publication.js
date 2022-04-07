import { faFileUpload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Label, Row } from 'reactstrap';
import { PublicationDetail } from './publicationDetail';
import '../../App.css'
import { PublicationHeader } from './publicationHeader';
import { PublicationFooter } from './publicationFooter';

export class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      dataPub: {},
      dataUser: {}
    };
  }

  async componentDidMount() {

    if (this.props.dataPub) {
      const response = await fetch(`http://localhost:3001/api/v1/user/${this.props.dataPub.userID}`);
      const respJson = await response.json();
      console.log(respJson);
      if (respJson.success) {
        await this.setState({
          status: true,
          dataPub: this.props.dataPub,
          dataUser: respJson.Data
        });
      }
      this.forceUpdate();
    }

  }


  render() {

    const { content, multimedia } = this.state.dataPub;
    return (
      this.state.status ? (
        <Card className='publication'>
          <CardHeader className='publication-header'>
            <Container>
              <PublicationHeader data={this.state.dataUser} date={this.state.dataPub.date} />
            </Container>
          </CardHeader>
          <CardBody className='publication-body'>
            <PublicationDetail content={content} multimedia={multimedia} />
          </CardBody>
          <CardFooter className='publication-footer'>
            <PublicationFooter />
          </CardFooter>
        </Card>
      ) : (
        <></>
      )

    );
  }


}

