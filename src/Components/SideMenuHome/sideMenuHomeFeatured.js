import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Col, Label, Row } from 'reactstrap';

class SideMenuHomeFeatured extends React.Component {
  constructor() {
    super();
    var a = Math.round((Math.random() * (2 - 1)) + 1);
    if(a === 1)
      a = false;
    else
      a = true;
    this.state = {
      hasImage: a,
      someKey: 'someValue'
    };
  }

  render() {
    return (
      this.state.hasImage ? (

        <div className='featured-publication'>
          <Row className='featured-image'>
            <img src='https://i.imgur.com/aD2V747.jpeg' alt="publication" />
          </Row>
          <Label className='bottom-line' />
          <Row>
            <Col md={4} className='featured-profile-pic-image'>
              <img src='https://i.imgur.com/aD2V747.jpeg' alt="publication" />
            </Col>
            <Col md={8} className="featured-name">
              <Label className='name'>Igancio Perez Mendosa</Label>
            </Col>
          </Row>
          <Row className='featured-likes'>
            <Label><FontAwesomeIcon icon={faThumbsUp} />100k</Label>
          </Row>
        </div>
      ) : (
        <div className='featured-publication'>
          <Row className='featured-image'>
            <Label> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut eni</Label>
          </Row>
          <Label className='bottom-line' />
          <Row>
            <Col md={4} className='featured-profile-pic-image'>
              <img src='https://i.imgur.com/aD2V747.jpeg' alt="publication" />
            </Col>
            <Col md={8} className="featured-name">
              <Label className='name'>Igancio perez mendosa</Label>
            </Col>
          </Row>
          <Row className='featured-likes'>
            <Label><FontAwesomeIcon icon={faThumbsUp} />100k</Label>
          </Row>
        </div>
      )
    );

  }

}

export default SideMenuHomeFeatured;
