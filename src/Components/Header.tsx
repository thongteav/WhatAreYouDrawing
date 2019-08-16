import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from './../drawguesslogo.png';
import Home from '@material-ui/icons/Home';
import AccountIcon from '@material-ui/icons/AccountCircle'

export default class Header extends React.Component {

  public render() {
    const name = localStorage.getItem('playerName');
    return (
      <header className='header flex'>
        <NavLink className="header-home header-item header-item-left flex-center-all link" to="/">
          <Home className="header-room header-item header-item-left flex-column" />
          <div className="header-room header-item header-item-left flex-column">
            <img src={logo} alt="Draw & Guess" height="30em" />
          </div>
        </NavLink>
        <div className="header-toggle"></div>
        <div className="header-user header-item header-item-right flex-center-all">
          <AccountIcon />
          {
            name ? name : ''
          }
        </div>
      </header>
    )
  }
}