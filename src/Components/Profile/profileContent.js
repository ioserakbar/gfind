import { faCaretSquareDown, faFilm, faGamepad, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Row } from 'reactstrap';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';
import { ProfileFriendsPlaceholder } from './profileFriendsPlaceholder';
import { ProfileGamesPlaceholder } from './profileGamesPlaceholder';
import { ProfilePlaysPlaceholder } from './profilePlaysPlaceholder';

export class ProfileContent extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'publication',
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
        </>
      );

    else if (this.state.mode === 'plays')
      content = (
        <>
          <ProfilePlaysPlaceholder/>
        </>
      );
    else if (this.state.mode === 'games')
      content = (
        <>
          <ProfileGamesPlaceholder/>
        </>
      );
    else if (this.state.mode === 'friends')
      content = (
        <>
          <ProfileFriendsPlaceholder/>
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
