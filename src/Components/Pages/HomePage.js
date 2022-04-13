import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, CardHeader, Col, Container, Label, Row } from 'reactstrap';
import { Publication } from '../Publicacion/publication';
import { PublicationFormsModal } from '../Publicacion/publicationFormsModal';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';
import { SideMenuHome } from '../SideMenuHome/sideMenuHome';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      publications: [],
      modal: false
    };
  }

  async componentDidMount() {

    const response = await fetch(`http://localhost:3001/api/v1/publication/`)
    const respJson = await response.json();
    if (respJson.success) {
      this.setState({
        status: true,
        publications: respJson.Data,
        modal: false
      })
    }
    this.forceUpdate();
  }

  openModal = () => {
    this.setState({
      modal: true
    })
  }

  closeModal = () => {
    this.setState({
      modal: false
    })
  }

  render() {
    return (
      <>
        <Container>
          <Row className='Publications'>
            <Col md={3} >
              <SideMenuHome />
            </Col>
            {this.state.status ? (
              <Col md={6} >
                <Row className='search-bar add-pub-btn' >
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profilePic' />
                  </Col>
                  <Col md={11}>
                    <Button onClick={this.openModal} >Crear publicacion</Button>
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
                <Row className='search-bar'>
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profilePic' />
                  </Col>
                  <Col md={10}>
                    <Button onClick={this.openModal} className='search-bar add-pub-btn'>Crear publicación</Button>
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
        {this.state.modal ? (
          <div className='modal-publication-form'>
            <Container className='modal-content-publication'>
              <Card>
                <CardHeader className='title'>
                  <Label>Publicar</Label>
                  <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} onClick={this.closeModal} />
                </CardHeader>
                <PublicationFormsModal />
              </Card>
            </Container>
          </div>
        ) : (
          <></>
        )}
      </>
    );
  }

}

