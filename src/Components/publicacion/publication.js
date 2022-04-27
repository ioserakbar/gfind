import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Container } from 'reactstrap';
import { PublicationDetail } from './publicationDetail';
import { PublicationHeader } from './publicationHeader';
import { PublicationFooter } from './publicationFooter';

export class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      dataPub: {},
      dataUser: {},
      commentModal: false
    };
  }

  async componentDidMount() {

    if (this.props.dataPub) {
      const response = await fetch(`http://localhost:3001/api/v1/user/${this.props.dataPub.userID}`);
      const respJson = await response.json();

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

  commentCallback = (pState) => {
    this.setState({
      commentModal: pState
    })
    this.props.commentsCallback(this.state.commentModal)
  }

  render() {

    const { content, multimedia } = this.state.dataPub;
    return (
      this.state.status ? (
        <Card className='publication' >
          <CardHeader className='publication-header'>
            <Container>
              <PublicationHeader data={this.state.dataUser} date={this.state.dataPub.date} />
            </Container>
          </CardHeader>
          <CardBody className='publication-body'>
            <PublicationDetail content={content} multimedia={multimedia} />
          </CardBody>
          <CardFooter className='publication-footer'>
            <PublicationFooter commentsCallback={this.commentCallback}/>
          </CardFooter>
        </Card>
      ) : (
        <></>
      )

    );
  }


}

