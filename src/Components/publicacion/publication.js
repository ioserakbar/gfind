import React, { Component } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Container } from 'reactstrap';
import { PublicationDetail } from './publicationDetail';
import { PublicationHeader } from './publicationHeader';
import { PublicationFooter } from './publicationFooter';
import { CommentsModal } from '../Comments/commentsModal';

export class Publication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      dataPub: {},
      dataUser: {},
      commentsModal: false
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

  srcCallback = (pState, pSrc, pType) => {

    this.props.srcCallback(pState, pSrc, pType)
  }

  commentsModal = (pState) => {
    this.setState({
      commentsModal: pState
    })
  }

  render() {

    const { content, multimedia, date, stats, _id } = this.state.dataPub;
    return (
      this.state.status ? (
        <>
          {this.state.commentsModal && (
            <CommentsModal closeCallback={this.commentsModal} pubID={_id}/>
          )}
          <Card className='publication' >
            <CardHeader className='publication-header'>
              <Container>
                <PublicationHeader data={this.state.dataUser} date={date} />
              </Container>
            </CardHeader>
            <CardBody className='publication-body'>
              <PublicationDetail
                multimedia={multimedia}
                content={content}
                srcCallback={this.srcCallback}
              />
            </CardBody>
            <CardFooter className='publication-footer'>
              <PublicationFooter openComments={() => this.commentsModal(true)} stats={stats} pubID={_id} />
            </CardFooter>
          </Card>
        </>
      ) : (
        <></>
      )

    );
  }


}

