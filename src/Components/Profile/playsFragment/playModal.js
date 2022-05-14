import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
export class PlayModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: false,
      src: '',
      content: '',
      game: '',
    };
  }


  async componentDidMount() {


    await this.setState({
      status: true,
      src: this.props.src,
      content: this.props.content,
      game: this.props.game
    });
  }


  render() {

    const { status } = this.state;
    return (
      status ? (
        <div div className='plays-modal' >
          <Container className='plays-modal-container'>
            <Card>
              <CardHeader className='header'>
                <img src={this.state.game} alt='Game-icon' />
                <Label> Jugada </Label>
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => this.props.closeCallback(false)} />
              </CardHeader> 
              <CardBody className='body'>
                <Label>{this.state.content}</Label>
                <video src={this.state.src} autoPlay controls />
              </CardBody>
            </Card>
          </Container>
        </div>

      ) : (
        <></>
      )
    );
  }




}
