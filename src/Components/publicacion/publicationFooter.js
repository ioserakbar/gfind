import { faEye, faFileUpload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Label, Row, Button} from 'reactstrap';

export class PublicationFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someKey: 'someValue'
    };
  }

  render() {
    return (
      <Row className='publication-footer-row'>
        <Col md={6} className="publication-footer-input">
          <input type="text" placeholder='Añadir comentario' />
        </Col>
        <Col md={3} className="publication-footer-sendbtns" >
          <Button>Enviar</Button>
          <FontAwesomeIcon icon={faFileUpload} />
          <FontAwesomeIcon icon={faEye} onClick={ () => this.props.commentsCallback(true)}/>
        </Col>
        <Col md={3} className="publication-footer-likes">
          <Label><FontAwesomeIcon icon={faThumbsUp} />0</Label>
          <Label><FontAwesomeIcon icon={faThumbsDown} />99k</Label>
        </Col>
      </Row>
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}

