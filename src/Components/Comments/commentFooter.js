import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Label } from 'reactstrap';
import constants from '../../constants.json';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class CommentFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someKey: 'someValue',
      hasLiked: false,
      hasDisliked: false,
      likes: 0,
      dislikes: 0,
      commentID: ''
    };
  }

  async componentDidMount() {

    if (this.props.stats) {
      const stats = this.props.stats;
      this.calculateStats(stats)
      const isLogedIn = (cookies.get(constants.CookieIsLogedIn) === 'true');
      await this.setState({
        isLogedIn: isLogedIn,
        commentID: this.props.commentID
      });
    }

  }
  async addStatToComment(stat) {

    const userID = cookies.get(constants.CookieUserID);
    const body = {
      statOption: stat,
      userID: userID
    }
    const cookie = new Cookies();
    const accessToken = cookie.get(constants.CookieAccessToken);
    const response = await fetch(`http://localhost:3001/api/v1/comment/${this.state.commentID}/statsChange`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(body)
    });
    const respJson = await response.json()

    if (!respJson.success) {
      alert('Ocurrio un error al intentar actualizar la información, Por favor intentelo de nuevo mas tarde')
    }

    this.calculateStats(respJson.Data.Modificado);
  }

  likeComment() {


    if (!this.state.isLogedIn) {
      alert('Necesitas iniciar sesion para dar un me usta')
      return;
    }
    if (this.state.hasLiked)
      this.addStatToComment('delete');
    else
      this.addStatToComment('like');
  }

  dislikeComment() {

    if (!this.state.isLogedIn) {
      alert('Necesitas iniciar sesion para dar un no me gusta')
      return;
    }

    if (this.state.hasDisliked)
      this.addStatToComment('delete');
    else
      this.addStatToComment('dislike');
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

  render() {
    return (
      <>
        {this.state.hasLiked ? (
          <Label><FontAwesomeIcon icon={faThumbsUp} className='activeButton' onClick={() => this.likeComment()} /> {this.state.likes}</Label>

        ) : (
          <Label><FontAwesomeIcon icon={faThumbsUp} onClick={() => this.likeComment()} /> {this.state.likes}</Label>

        )}

        {this.state.hasDisliked ? (
          <Label> <FontAwesomeIcon icon={faThumbsDown} className='activeButton' onClick={() => this.dislikeComment()} /> {this.state.dislikes}</Label>

        ) : (
          <Label> <FontAwesomeIcon icon={faThumbsDown} onClick={() => this.dislikeComment()} /> {this.state.dislikes}</Label>
        )}
      </>
    );
  }

}

export default CommentFooter;
