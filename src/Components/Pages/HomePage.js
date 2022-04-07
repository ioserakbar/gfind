import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { Publication } from '../publicacion/publication';
import { PublicationPlaceholder } from '../publicacion/publicationPlaceholder';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      publications: []
    };
  }

  async componentDidMount() {

    const response = await fetch(`http://localhost:3001/api/v1/publication/`)
    const respJson = await response.json();
    if (respJson.success) {
      this.setState({
        status: true,
        publications: respJson.Data
      })
    }
    this.forceUpdate();
  }

  render() {
    return (

      <Container>
        <Row>
          <Col md={3} >

          </Col>
          {this.state.status ? (
            <Col md={6} >
              {this.state.publications.map((publication, index) => (
                <Publication key={index} id={publication._id} dataPub={publication} userID={publication.userID} />
              ))}
            </Col>
          ) : (
            <Col md={6} >
              <PublicationPlaceholder />
              <PublicationPlaceholder />
              <PublicationPlaceholder />
              <PublicationPlaceholder />
              <PublicationPlaceholder />
              <PublicationPlaceholder />
            </Col>
          )}
          <Col md={3} >

          </Col>
        </Row>
      </Container>

    );
  }

}

