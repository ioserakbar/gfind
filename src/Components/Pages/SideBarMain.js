import { faHome, faMessage, faPeopleCarry, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';



export const SideBarMain = [
  {
    title: 'Home',
    path: '/',
    icon: <FontAwesomeIcon icon={faHome} />,
    cName: 'nav-sidetext'
  },
  {
    title: 'Perfil',
    path: '/Perfil',
    icon: <FontAwesomeIcon icon={faUser} />,
    cName: 'nav-sidetext'
  },
  {
    title: 'Usuarios',
    path: '/users',
    icon: <FontAwesomeIcon icon={faUser} />,
    cName: 'nav-sidetext'
  },
  {
    title: 'Mensajes',
    path: '/Chatrooms',
    icon: <FontAwesomeIcon icon={faMessage} />,
    cName: 'nav-sidetext'
  },
  {
    title: 'Amigos',
    path: '/Friends',
    icon: <FontAwesomeIcon icon={faUserGroup} />,
    cName: 'nav-sidetext'
  }


]