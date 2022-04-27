import { faBars, faMagnifyingGlassChart, faSpinner, faUser, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SideBarMain } from './SideBarMain';
import { Container, Row, Col, Label } from 'reactstrap';
import Cookies from 'universal-cookie';
import constants from '../../constants.json'



export const Navbar = (props) => {

  const cookies = new Cookies();
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const navigate = useNavigate();




  const LogOut = () => {
    cookies.set(constants.CookieIsLogedIn, false, { path: '/' });
    cookies.remove(constants.CookieUserID);
  };



  return (
    <>

      <Row className='navbar'>

        {props.isRegistered === 'true' ? (
          <>

            <Col md={1} className='menu-bars mainMenu' >
              <Container>
                <FontAwesomeIcon icon={faBars} onClick={showSidebar} color={'white'} />
              </Container>
            </Col>

            <Col md={7}>
              <Container className='nav-title'>
                <Label onClick={() => navigate('/Home')}> <FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
              </Container>
            </Col>

            <Col md={2} className="nav-text-col">
              <Container className='nav-text' >
                <Link to={`/Profile/${cookies.get(constants.CookieUserID)}`} >
                  <Label ><FontAwesomeIcon icon={faUser} />Perfil</Label>
                </Link>
              </Container>
            </Col>

            <Col md={2} className="nav-text-col">
              <Container className='nav-text' >
                <Link to={'/'} >
                  <Label onClick={LogOut}>Cerrar sesion</Label>
                </Link>
              </Container>
            </Col>

          </>

        ) : (
          <>

            <Col md={6}>
              <Container className='nav-title'>
                <Label onClick={() => navigate('/')}> <FontAwesomeIcon icon={faMagnifyingGlassChart} /> G Find</Label>
              </Container>
            </Col>
            <Col md={2} className="nav-text-col">
              <Link to={'/LogIn'} >
                <Label className='nav-text'><FontAwesomeIcon icon={faUser} /> Iniciar sesion</Label>
              </Link>
            </Col>
            <Col md={2} className="nav-text-col">
              <Link to={'/CreateAccount'} >
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



