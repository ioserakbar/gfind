import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from 'reactstrap';

export function AboutUsPage() {


  return (
    <>
    <section className='about-us-start'>
      <div className='brand-name'>
        <Label className='title' >
          <Label className='G'>G</Label>
          <Label className='find'>find</Label>
        </Label>
        <br></br>
        <Label className='start'>
          <Link to={'/CreateAccount'} >
            Iniciar
          </Link>
        </Label>
      </div>
      <video autoPlay loop muted playsInline disablePictureInPicture  className='back-video'>
        <source src={require('../../Resources/Videos/backgroundVid.mp4')} />
      </video>
    </section >
    </>
  );
}
