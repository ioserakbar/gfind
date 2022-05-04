import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Label, Row } from 'reactstrap';


export function PublicationHeader(props) {

  const [status, setStatus] = useState(false);
  const [data, setData] = useState({});
  const [since, setSince] = useState('');
  const [datePub, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setData(props.data);
    setDate(calcDate(props.date));
    setStatus(true);
  }, [props])

  const toProfile = () => {
    navigate(`/Profile/${this.state.data._id}`);
  }

  function calcDate(pDate) {
    var date = new Date(pDate);
    const monthString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const day = date.getDate();
    const month = monthString[date.getMonth()];
    const year = date.getFullYear();

    return `El ${day} de ${month} de ${year}`;
  }

  async function calcDateSince(pDate) {
    var date = new Date(pDate);
    const dateNow = new Date();

    var dateNowString = `${dateNow.getFullYear()}-${dateNow.getMonth()}-${dateNow.getDate()}`;
    var dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;

    const date1 = new Date(dateNowString);
    const date2 = new Date(dateString);

    var result = date1 - date2;
    const diffDays = Math.ceil(result / (1000 * 60 * 60 * 24));

    date1.setHours(dateNow.getHours());
    date1.setMinutes(dateNow.getMinutes());
    date1.setSeconds(dateNow.getSeconds());

    date2.setHours(date.getHours());
    date2.setMinutes(date.getMinutes());
    date2.setSeconds(date.getSeconds());

    result = date1 - date2;
    var diffSeconds = result / 1000;
    let sinceMessage = '';

    if (diffDays === 0) {//PUBLICADO EL MISMO DIA
      const minutes = Math.round(diffSeconds / 60);
      const hours = Math.round(minutes / 60);
      if (diffSeconds < 60) {
        if (diffSeconds === 1)
          sinceMessage = 'Hace un segundo';
        else
          sinceMessage = `Hace ${diffSeconds} segundos`;
      }
      else if (minutes > 0 && minutes < 60) {
        if (minutes === 1)
          sinceMessage = 'Hace un minuto';
        else
          sinceMessage = `Hace ${minutes} minutos`;
      } else if (hours > 0 && hours < 24) {
        if (hours === 1)
          sinceMessage = 'Hace una hora';
        else
          sinceMessage = `Hace ${hours} horas`;
      }
    }
    else if (diffDays <= 7) { //PUBLICADO HACE 1-7 DIAS
      if (diffDays === 1)
        sinceMessage = 'Ayer';
      else if (diffDays === 2)
        sinceMessage = 'Antier';
      else if (diffDays === 7)
        sinceMessage = `La semana pasada`;
      else
        sinceMessage = `Hace ${diffDays} dias`;
    }
    else if (diffDays <= 30) { //PUBLICADO HACE MENOS DE 30 DIAS
      if (diffDays > 7 && diffDays <= 14)
        sinceMessage = `La semana antepasada`;
      else if (diffDays > 14 && diffDays <= 21)
        sinceMessage = `Hace 3 semanas`;
      else if (diffDays === 30)
        sinceMessage = `Hace un mes`;
      else
        sinceMessage = `Hace 4 semanas`;
    }
    else if (diffDays > 30 && diffDays <= 365) { //PUBLICADO HACE MAS DE 30 DIAS
      const daysinMonths = Math.round(diffDays / 30);
      if (daysinMonths === 1)
        sinceMessage = `Hace un mes`;
      else if (daysinMonths === 2)
        sinceMessage = `El mes pasado`;
      else if (daysinMonths === 3)
        sinceMessage = `El mes antepasado`;
      else if (daysinMonths === 12)
        sinceMessage = `Hace un año`;
      else
        sinceMessage = `Hace ${daysinMonths} meses`;
    } else {
      const daysInYears = Math.round(diffDays / 365);
      if (daysInYears === 1)
        sinceMessage = `Hace un año`
      else if (daysInYears === 2)
        sinceMessage = `El año pasado`
      else if (daysInYears === 3)
        sinceMessage = `El año antepasado`
      else
        sinceMessage = `Hace ${daysInYears} años`
    }

    setSince(sinceMessage);
  }


  return (
    status ? (
      <Row className='publication-header-row'>
        <Col md={1} className='user-img' >
          <img src={data.profilePic.path} alt="pfp" onClick={toProfile} />
        </Col>
        <Col md={7} className='user-name'>
          <Label>{data.name}</Label>
          <br ></br>
          <small>{calcDateSince(since)}</small>
        </Col>
        <Col md={3} className="publication-date" >
          <Label>{datePub}</Label>
        </Col>
      </Row>
    ) : (
      <div> Placeholder</div>
    )
  );
}




