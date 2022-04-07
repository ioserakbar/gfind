import { faFileUpload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Label, Row } from 'reactstrap';

export class PublicationPlaceholder extends React.Component {
  constructor() {
    super();
    const randomValue = Math.round((Math.random() * (2 - 1)) + 1);
    const labelNum = Math.round((Math.random() * (7 - 1)) + 1);
    const labels = [];
    if (randomValue === 1)
      for (let index = 0; index < labelNum; index++) {
        labels[index] = {
          size: Math.round((Math.random() * (250 - 190)) + 190)
        }
      };
    if (randomValue === 2)
      for (let index = 0; index < labelNum; index++) {
        labels[index] = {
          size: Math.round((Math.random() * (560 - 500)) + 500)
        }
      };
    console.log(labels);
    this.state = {
      mode: randomValue,
      labels: labels
    };
  }

  render() {

    let hasImage = false;
    if (this.state.mode === 1)
      hasImage = true

    return (
      <Card className='publication'>
        <CardHeader className='publication-header'>
          <Container>
            <Row className='publication-header-row'>
              <Col md={1} className='user-img-placeholder' >
              </Col>
              <Col md={7} className='user-name-placeholder'>
                <Label></Label>
                <br ></br>
                <Label className='since-placeholder'></Label>
              </Col>
              <Col md={3} className="publication-date-placeholder" >
                <Label></Label>
              </Col>
            </Row>
          </Container>
        </CardHeader>
        <CardBody className='publication-body'>
          {
            hasImage ? (
              <Row className='card-body-row'>
                <Col md={6} className='publication-multimedia-placeholder'>
                </Col>
                <Col md={6} className='publication-description-image-placeholder'>
                  {this.state.labels.map((label, index) => (
                    <Label key={index} style={{ width: label.size }}></Label>
                  ))}
                </Col>
              </Row>
            ) : (
              <Row className='card-body-row'>
                <Col md={12} className='publication-description-image-placeholder'>
                  {this.state.labels.map((label, index) => (
                    <Label key={index} style={{ width: label.size }}></Label>
                  ))}
                </Col>
              </Row>
            )
          }
        </CardBody>
        <CardFooter className='publication-footer'>
          <Row className='publication-footer-row'>
            <Col md={6} className="publication-footer-input">
              <input type="text" placeholder='Añadir comentario' />
            </Col>
            <Col md={3} className="publication-footer-sendbtns-placeholder">
              <Button>Enviar</Button>
              <FontAwesomeIcon icon={faFileUpload} />
            </Col>
            <Col md={3} className="publication-footer-likes-placeholder">
              <Label><FontAwesomeIcon icon={faThumbsUp} /></Label>
              <Label><FontAwesomeIcon icon={faThumbsDown} /></Label>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

