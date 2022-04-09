import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Publication } from '../Publicacion/publication';
import {PublicationForms} from '../Publicacion/publicationForms';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';
import { SideMenuHome } from '../SideMenuHome/sideMenuHome';


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
      <>
        <Container >

          <Row className='Publications'>
            <Col md={3} >
              <SideMenuHome />
            </Col>
            {this.state.status ? (
              <Col md={6} >
                <Row className='search-bar add-pub-btn'>
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profilePic' />
                  </Col>
                  <Col md={1} />
                  <Col md={10}>
                    <Button>Crear publicación</Button>
                  </Col>
                </Row>
                <Row>
                  {this.state.publications.map((publication, index) => (
                    <Publication key={index} id={publication._id} dataPub={publication} userID={publication.userID} />
                  ))}
                </Row>
              </Col>
            ) : (
              <Col md={6} >
                <Row >
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profilePic' />
                  </Col>
                  <Col md={1} />
                  <Col md={10}>
                    <Button className='search-bar add-pub-btn'>Crear publicación</Button>
                  </Col>
                </Row>
                <Row>
                  <PublicationPlaceholder />
                  <PublicationPlaceholder />
                  <PublicationPlaceholder />
                  <PublicationPlaceholder />
                  <PublicationPlaceholder />
                  <PublicationPlaceholder />
                </Row>
              </Col>
            )
            }
            <Col md={3} >
            </Col>
          </Row>
        </Container>
        <PublicationForms/>
      </>
    );
  }

}

