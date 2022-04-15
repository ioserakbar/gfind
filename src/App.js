import React from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/Pages/HomePage';
import { UsersPage } from './Components/Pages/UsersPage';
import { PublicationPage } from './Components/Pages/PublicationPage';
import { AboutUsPage } from './Components/Pages/AboutUsPage';
import { FriendsPage } from './Components/Pages/FriendsPage';
import { ChatPage } from './Components/Pages/ChatPage';
import { CreateAccountPage } from './Components/Pages/CreateAccount'
import { ProfilePage } from './Components/Pages/ProfilePage'
import { Navbar } from './Components/Pages/Navbar';
import { LogInPage } from './Components/Pages/LogInPage';

export function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
          <Route exact path='/Publication' element={<PublicationPage />}></Route>
          <Route exact path='/users' element={<UsersPage />}></Route>
          <Route exact path='/AboutUs' element={<AboutUsPage />}></Route>
          <Route exact path='/Friends' element={<FriendsPage />}></Route>
          <Route exact path='/Chat' element={<ChatPage />}></Route>
          <Route exact path='/CreateAccount' element={<CreateAccountPage />}></Route>
          <Route exact path='/LogIn' element={<LogInPage />}></Route>
          <Route exact path='/Profile' element={<ProfilePage />}></Route>
        </Routes>
      </Router>
    </div>
  )

};

