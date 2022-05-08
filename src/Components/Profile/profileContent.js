import { faCaretSquareDown, faFilm, faGamepad, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row } from 'reactstrap';
import { ProfileFriendsPlaceholder } from './profileFriendsPlaceholder';
import { Plays } from './playsFragment/playFragment';
import { ProfilePublication } from './profilePublications';
import { GamesFragment } from './gamesFragment/gamesFragment';

export class ProfileContent extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'publication',
      isMine: false,
      userID: '',
      games: []
    };
  }

  async componentDidMount() {
    if (this.props.userID) {
      await this.setState({
        userID: this.props.userID,
        isMine: this.props.isMine,
        games: this.props.games
      });
    }
  }

  changeMode(pmode) {
    this.setState({
      mode: pmode
    });
  }

  render() {

    var content;
    if (this.state.mode === 'publication')
      content = (
        <>
          <ProfilePublication owner={this.state.userID} isMine={this.state.isMine} />
        </>
      );
    else if (this.state.mode === 'plays')
      content = (
        <>
          <Plays isMine={this.state.isMine} profileUser={this.state.userID} />
        </>
      );
    else if (this.state.mode === 'games')
      content = (
        <>
          <GamesFragment isMine={this.state.isMine} userID={this.state.userID} games={this.state.games} />
        </>
      );
    else if (this.state.mode === 'friends')
      content = (
        <>
          <ProfileFriendsPlaceholder />
        </>
      );
    else
      content = (<></>);

    return (
      <>
        <div className='content'>
          <Row className='option-bar'>
            <FontAwesomeIcon icon={faCaretSquareDown} onClick={() => this.changeMode('publication')} />
            <FontAwesomeIcon icon={faFilm} onClick={() => this.changeMode('plays')} />
            <FontAwesomeIcon icon={faGamepad} onClick={() => this.changeMode('games')} />
            <FontAwesomeIcon icon={faUserFriends} onClick={() => this.changeMode('friends')} />
          </Row>
          <Row className='profile-data'>
            {content}
          </Row>
        </div>
      </>
    );
  }
}
