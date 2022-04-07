import React from 'react';
import { Col, Label, Row } from 'reactstrap';


export class PublicationHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      data: {},
      since: '',
      date: ''
    };
  }


  async componentDidMount() {
    if (this.props.data) {
      await this.setState({
        status: true,
        data: this.props.data
      })

      console.log(this.props.data)
      this.forceUpdate();
    }
  }

  render() {

    const { profilePic, name } = this.state.data;
    return (
      this.state.status ? (
        <Row className='publication-header-row'>
          <Col md={1} className='user-img' >
            <img src={profilePic} alt="pfp" />
          </Col>
          <Col md={7} className='user-name'>
            <Label>{name}</Label>
            <br ></br>
            <small>hace aproximadamente 1 año</small>
          </Col>
          <Col md={3} className="publication-date" >
            <Label>El 2 de Octubre de 2021</Label>
          </Col>
        </Row>
      ) : (
        <div> Placeholder</div>
      )
    );
  }


}

