import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import $ from 'jquery';
import { Button, Label } from 'reactstrap';

const GameController = () => {

  const [modulesArray, setModulesArray] = useState([]);
  const [globalIndex, setGlobalIndex] = useState(0);
  const [gameIcon, setGameIcon] = useState({});
  const [rankedArrayImg, setRankedsArrayImg] = useState({})


  function gameIconHandler(e) {
    if (e.target.files[0]) {
      const urlGameIcon = URL.createObjectURL(e.target.files[0]);

      const gameIconJson = {
        url: urlGameIcon,
        blob: e.target.files[0]
      }
      setGameIcon(gameIconJson)
    }
  }

  function rankedIconHandler(e, pID) {
    if (e.target.files[0]) {
      const urlRankedIcon = URL.createObjectURL(e.target.files[0]);

      let rankedClone = rankedArrayImg;

      const rankedIconJson = {
        url: urlRankedIcon,
      }
      let rankedIcon = {};
      var reader = new FileReader();
      reader.readAsDataURL(gameIcon.blob);
      reader.onloadend = function () {

        var base64data = reader.result;

        const parts = base64data.split(';')
        const mime = parts[0].split(':')[1].split('/')[1];
        const imgName = "rank";
        const multimediaData = parts[1].split('base64,').pop();

        rankedIcon['name'] = imgName;
        rankedIcon['extention'] = mime;
        rankedIcon['path'] = multimediaData;

        rankedIconJson.multimedia = rankedIcon;
        rankedClone[pID] = rankedIconJson;
        console.log(rankedIconJson);
        setRankedsArrayImg(rankedClone);
      }

    }
  }


  function addModule() {

    let modules = modulesArray;
    modules.push(globalIndex);
    setModulesArray(modules);
    setGlobalIndex(globalIndex + 1);
  }

  function deleteModule(pId) {

    let modules = modulesArray;
    let indexToDelete;
    let index = 0;
    modules.forEach(element => {
      if (element === pId)
        indexToDelete = index
      index++;
    });
    modules.splice(indexToDelete, 1);
    setModulesArray(modules);

  }

  async function saveGame(name, dev, icon, rankeds) {
    const body = {
      name: name,
      developers: dev,
      image: icon,
      ranking: rankeds
    }

    const response = await fetch(`http://localhost:3001/api/v1/game`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const respJson = await response.json();

    console.log(respJson);

  }

  function handleGameForm(e) {
    e.preventDefault();
    const gameName = $("#game-name").val();
    const gameDeveloper = $("#game-developers").val();
    let gameIconMultimedia = {};
    var reader = new FileReader();
    reader.readAsDataURL(gameIcon.blob);
    reader.onloadend = function () {

      var base64data = reader.result;

      const parts = base64data.split(';')
      const mime = parts[0].split(':')[1].split('/')[1];
      const imgName = "game";
      const multimediaData = parts[1].split('base64,').pop();

      gameIconMultimedia['name'] = imgName;
      gameIconMultimedia['extention'] = mime;
      gameIconMultimedia['path'] = multimediaData;

      let ranking = [];
      let index = 0;
      $('.individual-ranked').each(function () {
        const ranked = {}
        ranked.name= $(this).children("input").val();
        ranked.image = rankedArrayImg[index].multimedia;
        ranked.index = index;
        ranking.push(ranked);
        index++;
      });
      console.log(ranking);
      saveGame(gameName, gameDeveloper, gameIconMultimedia, ranking);
    }

  }

  return (
    <>
      <div className='game-controller'>
        <form className='add-game-form' onSubmit={(e) => handleGameForm(e)}>
          {gameIcon.url && (<img className='game-icon left' src={gameIcon.url} alt='img' />)}

          <br></br>
          <Label for='game-name'>Nombre del juego</Label>
          <input type='text' id='game-name' autoComplete='off' required />
          <br></br>
          <Label for='game-developers'>Desarrolladores</Label>
          <input type='text' id='game-developers' autoComplete='off' required />
          <br></br>
          <Label for='game-icon'>Icon image <FontAwesomeIcon icon={faFileArrowUp} /></Label>
          <input type='file' id='game-icon' accept='.jpeg, .jpg, .png, .bmp' required onChange={(e) => gameIconHandler(e)} />
          <br></br>
          <Button type='submit' >Agregar juego</Button>
          {gameIcon.url && (<img className='game-icon right' src={gameIcon.url} alt='img' />)}

          <br></br>
          <br></br>
          <Label> Ranking </Label>
          <br></br>
          <Label> Add Ranking <Button type='button' className='btn-success btn' onClick={() => addModule()}>+</Button></Label>
          <div id='Rankeds'>

            {modulesArray.map((idModule, index) => (

              <div className='individual-ranked' key={index}>
                <Button className='btn btn-sm btn-danger' type="button" onClick={() => deleteModule(idModule)}>x</Button>
                <input type='text' required placeholder='Nombre de ranked' />
                <br></br>
                <Label for={"fileRanked" + idModule}>Ranked icon<FontAwesomeIcon icon={faFileArrowUp} /></Label>
                <input type='file' id={"fileRanked" + idModule} required accept='.jpeg, .jpg, .png, .bmp' onChange={(e) => rankedIconHandler(e, idModule)} />
                <br></br>
                {rankedArrayImg[idModule] && (
                  <img src={rankedArrayImg[idModule].url} alt='imhg' />
                )}

              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
}

export default GameController; 