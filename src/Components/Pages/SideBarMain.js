import { faHome, faMessage, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
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
    title: 'Mensajes',
    path: '/Chat',
    icon: <FontAwesomeIcon icon={faMessage} />,
    cName: 'nav-sidetext'
  }


]