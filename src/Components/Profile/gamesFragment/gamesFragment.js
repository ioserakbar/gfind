import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Label, Row } from 'reactstrap';
import { GamesPlaceholder } from './gamesPlaceholder';

export const GamesFragment = (props) => {


  const [games, setGames] = useState([]);
  const [state, setState] = useState(false);
  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    async function getGames(){

    }
  }, [])
  



  return (

    state ? (
      <>
        <div className='profile-publications'>
          {isMine && (
            <Row className='search-bar'>
              <Col md={11}>
                <Button className='search-bar add-pub-btn'> Agregar juego </Button>
              </Col>
            </Row>
          )}
          <Container className='games-container'>
            <Container className='game'>
              <Col md={2} className='game-img'>
                <Label className='game-img-placeholder' />
              </Col>
              <Col md={10}>
                <Row className='title-placeholder'>
                  <Label></Label>
                </Row>
                <Row className='rango-placeholder'>
                  <Label className='ranked-img-placeholder' />
                  <div className='rango'>
                    <Label></Label>
                    <Label></Label>
                    <Label></Label>
                  </div>
                </Row>
              </Col>
            </Container>
          </Container>
        </div>
      </>
    ) : (
      <GamesPlaceholder />
    )

  );

}

