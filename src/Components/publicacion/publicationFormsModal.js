import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader, Container, Label } from 'reactstrap';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export function PublicationFormsModal() {

  useEffect(() => {

    let multimedia = []
    $('.add-pub-btn').on('click', function () {

      $('.modal-publication-form').css('display', 'block');
      $('body').css('overflow', 'hidden');

    });

    $('.close-publication-modal').on('click', function () {

      $('.modal-publication-form').css('display', 'none');
      $('body').css('overflow', 'auto');

    })

    function readURL(input) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
          const fileName = input.files[0].name;
          const mime = fileName.replace(/^.*\./, '');

          multimedia.push({
            name: fileName,
            data: e.target.result,
            mime: mime
          });

          $('.publication-multimedia').append('<img src="' + e.target.result + '" alt="publicationMultimedia">');

          console.log(multimedia);

        }
        reader.readAsDataURL(input.files[0]);

      } else {
        console.log('nel');
      }
    }
    $('#file-input').change(function(){
      readURL(this);
    });





  }, [])


  return (
    <div className='modal-publication-form'>
      <Container className='modal-content-publication'>
        <Card>
          <CardHeader className='title'>
            <Label>Publicar</Label>
            <FontAwesomeIcon className='close-publication-modal' icon={faTimesCircle} />
          </CardHeader>
          <CardBody className='body'>
            <form>
              <div className='content-input'>
                <textarea id='content' type='text' rows='5' placeholder='¿Que es lo que nos quieres contar?' />
              </div>
              <div className='publication-multimedia'>
                <video src={require('../../Resources/Videos/videopruebaAREMOVER.mp4')} type='video/mp4' controls />
              </div>
              <Label className='bottom-line-modal'></Label>
              <div className="image-upload">
                <label htmlFor="file-input">
                  <FontAwesomeIcon icon={faFileUpload} />
                </label>
                <input id="file-input" type="file" />
                <input type='submit' className='submit-publication' value='Publicar' />
              </div>
            </form>
          </CardBody>
        </Card>
      </Container>
    </div>

  );


}

