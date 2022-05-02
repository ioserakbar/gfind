import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Label, Row } from 'reactstrap';

export function CommentPlaceholder() {



  return (
    <>
      <div className='comment-container'>
        <Row className='comment-placeholder'>
          <Row className='info'>
            <Col md={1} className='profile-pic-placeholder'>
            </Col>
            <Col className='nombre'>
              <Label></Label>
            </Col>
            <Col className='fecha'>
              <Label></Label>
            </Col>
          </Row>
          <Row className='comment-content-placeholder'>
            <Label></Label>
            <Label></Label>
          </Row>
          <Row className='buttons' >
            <Label><FontAwesomeIcon icon={faThumbsUp} /> </Label>
            <Label> <FontAwesomeIcon icon={faThumbsDown} /> </Label>
          </Row>
        </Row>
      </div>
      <Label className='bottom-line-comments' />
    </>
  );
}

