import React, { Component } from 'react'
import { CardImg, Col, Container, Label, Row } from 'reactstrap';

export class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "usuario",
        age: 23,
        gender: 'genero',
        description: "descripcion",
        profilePic: "https://i.imgur.com/bCOjLao.jpeg"
      }
    };
  }

  render() {

    const { age, profilePic, gender } = this.state.data || {};
    
    return (
      <Container>
        <Row>
          <Col md={6}>
            <CardImg
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%"
              }}
              src={profilePic}
            />
          </Col>
          <Col md={6}>
            <Label style={{
              fontWeight: "600",
              fontSize: "20px",
              alignItems: "center",
              color: "hsl(344, 100%, 54%)",
              pading: "10px"
            }}
            >
              {gender}
            </Label>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Label
              style={{
                fontWeight: "800",
                fontFamily: "sans-serif",
                fontSize: "30px",
                textAlign: "center",
                color: "hsl(344, 100%, 54%)",
                pading: "10px"
              }}
            >
              {age ? age + " años" : "no"}
            </Label>
          </Col>
        </Row>
      </Container>
    )
  }

  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
}
