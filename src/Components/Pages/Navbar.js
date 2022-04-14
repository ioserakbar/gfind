import { faBars, faInfoCircle, faMagnifyingGlassChart, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SideBarMain } from './SideBarMain';
import { Container, Row, Col, Label } from 'reactstrap';




export function Navbar() {

  const [sidebar, setSidebar] = useState(false);
  const [isRegistered, setIsRegistered] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const registerUser = () => setIsRegistered(!isRegistered);

  return (
    <>
      <Row className='navbar'>

        {
          isRegistered ? (
            <>
              <Col md={1} className='menu-bars mainMenu' >
                <Container>
                  <FontAwesomeIcon icon={faBars} onClick={showSidebar} color={'white'} />
                </Container>
              </Col>
              <Col md={7}>
                <Container className='nav-title'>
                  <Link to={'/'} >
                    <Label> <FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
                  </Link>
                </Container>
              </Col>
              <Col md={2} className="nav-text-col">
                <Container className='nav-text' >
                  <Link to={'/Profile'}>
                    <Label ><FontAwesomeIcon icon={faUser} />Perfil</Label>
                  </Link>
                </Container>
              </Col>
              <Col md={2} className="nav-text-col">
                <Container className='nav-text' >
                  <Link to={'/'} >
                    <Label onClick={registerUser}>Cerrar sesion</Label>
                  </Link>
                </Container>
              </Col>
            </>

          ) : (
            <>

              <Col md={6}>
                <Container className='nav-title'>
                  <Link to={'/'} >
                    <Label> <FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
                  </Link>
                </Container>
              </Col>
              <Col md={2} className="nav-text-col">
                <Link to={'/AboutUs'} >
                  <Label className='nav-text' ><FontAwesomeIcon icon={faInfoCircle} /> Sobre nosotros</Label>
                </Link>
              </Col>
              <Col md={2} className="nav-text-col">
                <Link to={'/Session'} >
                  <Label className='nav-text' onClick={registerUser} ><FontAwesomeIcon icon={faUser} /> Iniciar sesion</Label>
                </Link>
              </Col>
              <Col md={2} className="nav-text-col">
                <Link to={'/Session'} >
                  <Label className='nav-text'><FontAwesomeIcon icon={faUser} />Crear cuenta</Label>
                </Link>
              </Col>
            </>
          )
        }

      </Row>

      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items'>
          <li className='navbar-toggle'>
            <div className='menu-bars'>
              <FontAwesomeIcon icon={faX} onClick={showSidebar} />
            </div>
          </li>
          {SideBarMain.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} onClick={showSidebar}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}


/*export class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            status: USERNOTREGISTERED
        };
       
    }
    
    
    render() {
        const isUserRegistered = this.state.status === USERREGISTERED;
        const isUserNotRegistered = this.state.status === USERNOTREGISTERED;

        const NavElement = isUserNotRegistered ? (
            <Row>
                <Col md={2}>
                    <Label style={navTitle}><FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
                </Col>
                <Col md={6}></Col>
                <Col md={1}>
                    <Label style={navElement}><FontAwesomeIcon icon={faUser} /> Iniciar sesion</Label>
                </Col>
                <Col md={2}>
                    <Label style={navElement}><FontAwesomeIcon icon={faPlus} /> Crear cuenta</Label>
                </Col>
            </Row>

        ) : isUserRegistered ? (
            <Row>
                <Col md={2}>
                    <Link to='#' ><Label style={navMenu}><FontAwesomeIcon icon={faBars} /></Label></Link>
                </Col>
                <Col md={7}>
                    <Label style={navTitle}><FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
                </Col>
                <Col md={1}>
                    <Label style={navElement}><FontAwesomeIcon icon={faUser} /> Perfil</Label>
                </Col>
                <Col md={1}>
                    <Label style={navElement}>Cerrar sesion</Label>
                </Col>
            </Row>
        ) : (<div></div>)

        const sideBarElement =

            <nav className={ 'nav-menu'}>
                <ul className ='nav-menu-items'>
                    <li className='navbar-toggle'><Link to="#" className='menu-bars'><FontAwesomeIcon icon={faTimesCircle}/></Link></li>
                </ul>
            </nav>
        ;

        return (
            <>
                <Container style={navBar}>
                    {NavElement}
                </Container>
            </>

        );
    }

    componentDidMount() {
        this.setState({
            someKey: 'otherValue'
        });
    }
}*/

