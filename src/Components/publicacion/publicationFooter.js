import { faEye, faFileUpload, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Label, Row, Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import constants from '../../constants.json';
const cookies = new Cookies();

export class PublicationFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      dislikes: 0,
      hasLiked: false,
      hasDisliked: false,
      pubID: '',
      isLogedIn: false
    };
  }

  async componentDidMount() {
    const isLogedIn = (cookies.get(constants.CookieIsLogedIn) === 'true');
    if (this.props.stats.length > 0) {

      const stats = this.props.stats;
      await this.calculateStats(stats);
    } else {
      await this.setState({
        pubID: this.props.pubID
      });
    }
    await this.setState({
      isLogedIn: isLogedIn
    })

    this.forceUpdate();
  }

  async calculateStats(pStats) {
    let plikes = 0;
    let pdislikes = 0;
    let hasDisliked = false;
    let hasLiked = false;

    const actualUserID = cookies.get(constants.CookieUserID);
    if (pStats.length && pStats.length > 0) {

      for (let i = 0; i < pStats.length; i++) {

        if (pStats[i].like) {
          if (pStats[i].userID === actualUserID) {
            hasLiked = true;
          }
          plikes++;
        }

        else if (pStats[i].dislike) {
          if (pStats[i].userID === actualUserID) {
            hasDisliked = true;
          }
          pdislikes++;
        }
      }

    }

    await this.setState({
      likes: plikes,
      dislikes: pdislikes,
      hasLiked: hasLiked,
      hasDisliked: hasDisliked,
      pubID: this.props.pubID
    });
  }

  async addStatToPublication(stat) {

    const userID = cookies.get(constants.CookieUserID);
    const body = {
      statOption: stat,
      userID: userID
    }

    const response = await fetch(`http://localhost:3001/api/v1/publication/${this.state.pubID}/statsChange`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const respJson = await response.json()
    if (!respJson.success) {
      alert('Ocurrio un error al intentar actualizar la información, Por favor intentelo de nuevo mas tarde')
    }

    this.calculateStats(respJson.Data.Modificado);
  }

  likePublication() {


    if (!this.state.isLogedIn) {
      alert('Necesitas iniciar sesion para dar un me usta')
      return;
    }
    if (this.state.hasLiked)
      this.addStatToPublication('delete');
    else
      this.addStatToPublication('like');
  }

  dislikePublication() {

    if (!this.state.isLogedIn) {
      alert('Necesitas iniciar sesion para dar un no me gusta')
      return;
    }

    if (this.state.hasDisliked)
      this.addStatToPublication('delete');
    else
      this.addStatToPublication('dislike');
  }

  async uploadTextComment(e) {

    const contentVal = e.target.parentElement.parentElement.children[0].children[0].value;
    const today = new Date().toISOString();
    if (!this.state.isLogedIn) {
      alert('Necesita iniciar sesion para comentar');
      return;
    } else if (contentVal === '') {
      return;
    }

    const userID = cookies.get(constants.CookieUserID);

    const body = {
      publicationID: this.state.pubID,
      userID: userID,
      content: contentVal,
      date: today
    }

    const response = await fetch(`http://localhost:3001/api/v1/comment/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const respJson = await response.json()
    if (respJson.success) {
      e.target.parentElement.parentElement.children[0].children[0].value = '';
      this.props.openComments(true)
    }
  }

  render() {
    return (
      <Row className='publication-footer-row'>
        <Col md={6} className="publication-footer-input">
          <input type="text" id='comment-content' placeholder='Añadir comentario' autoComplete='off' />
        </Col>
        <Col md={3} className="publication-footer-sendbtns" >
          <Button onClick={(e) => this.uploadTextComment(e)}>Enviar</Button>
          <FontAwesomeIcon icon={faFileUpload}  onClick={() => this.props.openFormComment(true)} />
          <FontAwesomeIcon icon={faEye} onClick={() => this.props.openComments(true)} />
        </Col>
        <Col md={3} className="publication-footer-likes">
          {
            this.state.hasLiked ? (
              <Label><FontAwesomeIcon className='activeButton' icon={faThumbsUp} onClick={() => this.likePublication()} />{this.state.likes}</Label>
            ) : (
              <Label><FontAwesomeIcon icon={faThumbsUp} onClick={() => this.likePublication()} />{this.state.likes}</Label>
            )
          }

          {
            this.state.hasDisliked ? (
              <Label><FontAwesomeIcon className='activeButton' icon={faThumbsDown} onClick={() => this.dislikePublication()} />{this.state.dislikes}</Label>
            ) : (
              <Label><FontAwesomeIcon icon={faThumbsDown} onClick={() => this.dislikePublication()} />{this.state.dislikes}</Label>
            )
          }
        </Col>
      </Row>
    );
  }


}

