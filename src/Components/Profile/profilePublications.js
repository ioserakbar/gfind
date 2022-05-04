import React, { useEffect, useState } from 'react';
import { CommentsModal } from '../Comments/commentsModal';
import { Publication } from '../Publicacion/publication';
import { PublicationPlaceholder } from '../Publicacion/publicationPlaceholder';


export function ProfilePublication(props) {


  const [state, setState] = useState(false)
  const [userID, setUserID] = useState('')
  const [publications, setPublications] = useState([]);
  const [isMine, setIsMine] = useState(false);
  const [gotInfo, setGotInfo] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [commentFormModal, setCommentFormModal] = useState(false);



  useEffect(() => {
    async function getPublications() {


      setUserID(props.owner);
      const response = await fetch(`http://localhost:3001/api/v1/publication/user/${userID}`);
      const respJson = await response.json();

      if (respJson.sucess) {
        setState(false);
        setIsMine(props.isMine());
        setPublications(respJson.Data)
      }
      setGotInfo(true);
    }

    if (!gotInfo)
      getPublications();


  }, [])


  return (
    commentModal && (
      <CommentsModal />
    ),
    commentFormModal && (
      <commentFormModal />
    ),
    state ? (
      <>
        {publications.map((publication, index) => (
          <Publication
            key={index}
            id={publication._id}
            dataPub={publication}
            userID={publication.userID}
            commentsCallback={this.commentsModal}
            srcCallback={this.srcModal}
          />
        ))}

      </>
    ) : (
      <>
        <PublicationPlaceholder />
      </>
    )

  );

}
