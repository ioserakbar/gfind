import { faCaretSquareDown, faFilm, faGamepad, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Label, Row } from 'reactstrap';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';
import { ProfileFriendsPlaceholder } from './profileFriendsPlaceholder';
import { GamesPlaceholder, ProfileGamesPlaceholder } from './gamesFragment/gamesPlaceholder';
import { PlaysPlaceholder } from './playsFragment/playsPlaceholder';

class ProfilePlaceholder extends React.Component {
  
  constructor() {
    super();
    this.state = {
      mode: 'plays',
      isMine: false
    };
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
          <PublicationPlaceholder />
          <PublicationPlaceholder />
          <PublicationPlaceholder />
          <PublicationPlaceholder />
        </>
      );

    else if (this.state.mode === 'plays')
      content = (
        <>
          <PlaysPlaceholder />
        </>
      );
    else if (this.state.mode === 'games')
      content = (
        <>
          <GamesPlaceholder />
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
        <div className='header'>
          <Row className='cover-image-placeholder' />
          <Label className='bottom-line-profile' />
          <Row className='profile-pic-placecolder' />
          <Row className='profile-content-placeholder'>
            <Row className='name'>
              <Label />
            </Row>
            <Row className='description'>
              <Label />
              <Label />
              <Label />
            </Row>
          </Row>
        </div>
        <Label className='bottom-line-profile end-header-line' />
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

export default ProfilePlaceholder;
