import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { Publication } from '../Publicacion/publication';
import { PublicationFormsModal } from '../Publicacion/publicationFormsModal';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';
import constants from '../../constants.json'
import Cookies from 'universal-cookie';

export function ProfilePublication(props) {


  const [state, setState] = useState(false)
  const [userID, setUserID] = useState('')
  const [publications, setPublications] = useState([]);
  const [isMine, setIsMine] = useState(true);
  const [gotInfo, setGotInfo] = useState(false);
  const [publicationFormModal, setPublicationFormModal] = useState(false);

  useEffect(() => {
    async function getPublications() {


      setUserID(props.owner);
      const cookie = new Cookies();
      const accessToken = cookie.get(constants.CookieAccessToken);
      const response = await fetch(`http://localhost:3001/api/v1/publication/user/${userID}`, {
        headers: { 'authorization': `Bearer ${accessToken}` },
      });
      const respJson = await response.json();

      if (respJson.success) {
        setState(true);
        setIsMine(props.isMine);
        setPublications(respJson.Data)
        setGotInfo(true);
      }
    }

    if (!gotInfo)
      getPublications();
  })


  const publicationModal = () => {
    setPublicationFormModal(!publicationFormModal);
  }


  return (
    state ? (
      <>
        {publicationFormModal && (
          <PublicationFormsModal closeCallback={publicationModal} />
        )}
        <div className='profile-publications'>
          {isMine && (
            <>
              <Row className='search-bar' >
                <Col md={11}>
                  <Button onClick={publicationModal} className='search-bar add-pub-btn'> Crear publicacion </Button>
                </Col>
              </Row>
            </>
          )}
          {publications.map((publication, index) => (
            <Publication
              key={index}
              id={publication._id}
              dataPub={publication}
              userID={publication.userID}
            />
          ))}
        </div>
      </>
    ) : (
      <>
        <PublicationPlaceholder />
      </>
    )

  );

}
