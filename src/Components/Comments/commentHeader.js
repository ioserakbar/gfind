import React from 'react';
import { Col, Label, Row } from 'reactstrap';

export class CommentHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataUser: {},
      status: false
    };
  }

  async componentDidMount() {

    if (this.props.userID) {
      console.log('porp userid', this.props.userID);
      const response = await fetch(`http://localhost:3001/api/v1/user/${this.props.userID}`);
      const respJson = await response.json();
      
      if (respJson.success) {
        await this.setState({
          status: true,
          dataUser: respJson.Data
        });
      }
    }
    this.forceUpdate();
  }

  render() {

    const { profilePic, name } = this.state.dataUser;
    return (
      this.state.status ? (
        <Row className='info'>
          <Col md={1} className='profile-pic'>
            <img src={profilePic.path} alt='profile-pic' />
          </Col>
          <Col className='nombre'>
            <Label>{name}</Label>
          </Col>
          <Col className='fecha'>
            <Label> 15/04/21  3:50pm</Label>
          </Col>
        </Row>
      ) : (
        <></>
      )

    );
  }


}
