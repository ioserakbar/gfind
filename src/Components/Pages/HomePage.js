import React from 'react';
import { Button,  Col, Container, Row } from 'reactstrap';
import { SrcModal } from '../../Resources/srcModal';
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
      modal: false,
      publicationModalID: '',
      srcModal: false,
      activeSrc: '',
      srcType: ''
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

  publicationModal = (pState) => {
    this.setState({
      modal: pState
    })
  }

  srcModal = (pState, pSrc, pType) => {
    this.setState({
      srcModal: pState,
      activeSrc: pSrc,
      srcType: pType
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
                
                <Row className='search-bar ' >
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profile-pic' />
                  </Col>
                  <Col md={10}>
                    <Button onClick={() => this.publicationModal(true)} className='search-bar add-pub-btn'> Crear publicacion </Button>
                  </Col>
                </Row>

                <Row>
                  {this.state.publications.map((publication, index) => (
                    <Publication
                      key={index}
                      id={publication._id}
                      dataPub={publication}
                      userID={publication.userID}
                      commentsCallback={this.commentsModal}
                      srcCallback={this.srcModal}
                    />
                  ))}
                </Row>

              </Col>
            ) : (
              <Col md={6} >
                <Row className='search-bar' >
                  <Col md={1}>
                    <img src='https://i.imgur.com/aD2V747.jpeg' alt='profile-pic' />
                  </Col>
                  <Col md={10}>
                    <Button className='search-bar add-pub-btn' onClick={() => this.publicationModal(true)}>Crear publicación</Button>
                  </Col>
                </Row>
                <Row>
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
        {this.state.modal && (
          <PublicationFormsModal closeCallback={this.publicationModal} />
        )}
        {this.state.srcModal && (
          <SrcModal src={this.state.activeSrc} type={this.state.srcType} closeCallback={this.srcModal}/>
        )
        }
      </>
    );
  }

}

