import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Label } from 'reactstrap';
export const ChatSearchBar = (porps) => {

  return (
    <div className='search-bar-container'>
        <Label>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Buscar personas
        </Label>
    </div>
  );
}
