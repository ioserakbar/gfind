import React from 'react';
import { Container, Label, Row } from 'reactstrap';
import SideMenuHomeFeatured from './sideMenuHomeFeatured';
import SideMenuHomeFriends from './sideMenuHomeFriends';
import { SideMenuHomePlaceholder } from './sideMenuHomePlaceholder';

export class SideMenuHome extends React.Component {
  constructor() {
    super();
    this.state = {
      status: true,
      someKey: 'someValue'
    };
  }

  render() {

    return (
      this.state.status ? (
        <>
          <Container className='home-side-bar'>
            <Row className='featured-title title'>
              <Label>Destacados</Label>
              <Label className='bottom-line-title' />
            </Row>
            <Row className='featured'>
              <SideMenuHomeFeatured />
              <SideMenuHomeFeatured />
            </Row>
            <Row className='friends-title title'>
              <Label>Amigos</Label>
              <Label className='bottom-line-title' />
            </Row>
            <SideMenuHomeFriends />
            <SideMenuHomeFriends />
            <SideMenuHomeFriends />
            <SideMenuHomeFriends />
            <Row className='friends-title'>
              <Label></Label>
            </Row>
          </Container>
        </>
      ) : (
        <SideMenuHomePlaceholder />

      )
    );
  }

  componentDidMount() {
    this.setState({
      someKey: 'otherValue'
    });
  }
}
