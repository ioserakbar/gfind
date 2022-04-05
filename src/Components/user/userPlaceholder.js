import React from 'react';
import styled from 'styled-components';

const ContainerPlacecholder = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  text-align: center;
  padding: 10px;
  margin: 10px;
  border-radius: 50px;
  background-color: hsl(139, 36%, 78%);
`;

const ContentPlaceHolder = styled.label`
  position: relative;
  font-weight: 800;
  display: inline-block;
  text-align: center;
  padding: 10px;
  color: black;
`;

export const UserPlaceholder = () => {
  return (
    <ContainerPlacecholder>
      <ContentPlaceHolder>CARGANDO...</ContentPlaceHolder>
    </ContainerPlacecholder>
  );
}
