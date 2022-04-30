import React from 'react';
import { Col, Label, Row } from 'reactstrap';


export class PublicationHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      data: {},
      since: '',
      date: '',
    };
  }


  async componentDidMount() {
    if (this.props) {
      const date = this.calcDate(this.props.date);

      await this.setState({
        status: true,
        data: this.props.data,
        date: date
      })
      this.forceUpdate();
    }
  }

  calcDate(pDate) {
    var date = new Date(pDate);
    const monthString = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

    const day = date.getDate();
    const month = monthString[date.getMonth()];
    const year = date.getFullYear();

    return `El ${day} de ${month} de ${year}`;
  }

  calcDateSince(pDate){

  }


  render() {

    const { profilePic, name } = this.state.data;
    return (
      this.state.status ? (
        <Row className='publication-header-row'>
          <Col md={1} className='user-img' >
            <img src={profilePic.path} alt="pfp" />
          </Col>
          <Col md={7} className='user-name'>
            <Label>{name}</Label>
            <br ></br>
            <small>hace aproximadamente 1 año</small>
          </Col>
          <Col md={3} className="publication-date" >
            <Label>{this.state.date}</Label>
          </Col>
        </Row>
      ) : (
        <div> Placeholder</div>
      )
    );
  }


}

