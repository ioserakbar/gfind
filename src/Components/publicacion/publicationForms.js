import React, { useEffect } from 'react';
import { Button, Container } from 'reactstrap';
import $ from 'jquery';

export function PublicationForms() {

  useEffect(() => {

    $('.add-pub-btn').on('click', function () {

      $('.modal-publication-form').css('display', 'block');
      $('body').css('overflow', 'hidden');

    });

    $('.close-publication-modal').on('click', function () {

      $('.modal-publication-form').css('display', 'none');
      $('body').css('overflow', 'auto');

    })

  }, [])




  return (
    <div className='modal-publication-form'>
      <Container className='modal-content-publication'>
        modalito bonito
        <Button className='close-publication-modal'>Cancelar</Button>
      </Container>
    </div>

  );


}

