import React from 'react';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './Components/Pages/HomePage';
import { UsersPage } from './Components/Pages/UsersPage';
import { AboutUsPage } from './Components/Pages/AboutUsPage';
import { FriendsPage } from './Components/Pages/FriendsPage';
import { ChatPage } from './Components/Pages/ChatPage';
import { CreateAccountPage } from './Components/Pages/CreateAccount'
import { ProfilePage } from './Components/Pages/ProfilePage'
import { Navbar } from './Components/Pages/Navbar';
import { LogInPage } from './Components/Pages/LogInPage';
import Cookies from 'universal-cookie';
import constants from './constants.json'

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      isLogedIn: false
    })
    this.count = 0;
  }

  componentDidMount() {
    const cookies = new Cookies();

    this.interval = setInterval(() => {
      this.setState({
        isLogedIn: (cookies.get(constants.CookieIsLogedIn))
      })
    }, 1000);
  }


  render() {
    return (
      <div className='App'>
        <Router>
          <Navbar isRegistered={this.state.isLogedIn} />
          <Routes> 
            <Route exact path='/Home' element={<HomePage />}></Route>
            <Route exact path='/users' element={<UsersPage />}></Route>
            <Route exact path='/' element={<AboutUsPage />}></Route>
            <Route exact path='/Friends' element={<FriendsPage />}></Route>
            <Route exact path='/Chat' element={<ChatPage />}></Route>
            <Route exact path='/CreateAccount' element={<CreateAccountPage />}></Route>
            <Route exact path='/LogIn' element={<LogInPage />}></Route>
            <Route path='/Profile/:userID' element={<ProfilePage />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }

};

