import React from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/Pages/HomePage';
import { UsersPage } from './Components/Pages/UsersPage';
import { PublicationPage } from './Components/Pages/PublicationPage';
import Navbar from './Components/Pages/Navbar';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage/>}></Route>
          <Route exact path='/publication' element={<PublicationPage />}></Route>
          <Route exact path='/users' element={<UsersPage />}></Route>
        </Routes>
      </Router>
    </div>
  )

};


export default App;
