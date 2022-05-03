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

      const response = await fetch(`http://localhost:3001/api/v1/user/${this.props.userID}`);
      const respJson = await response.json();

      var date = new Date(this.props.date);
      var hour = this.getAMPM(date);
      date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} - ${hour}`

      if (respJson.success) {
        await this.setState({
          status: true,
          dataUser: respJson.Data,
          date: date
        });
      }
    }
    this.forceUpdate();
  }

  getAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
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
            <Label>{this.state.date}</Label>
          </Col>
        </Row>
      ) : (
        <></>
      )
    );
  }


}
