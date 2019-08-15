import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {
  public render() {
    return (
      <header className='header flex'>
        <NavLink className="header-home header-item header-item-left flex-center-all link" to="/">
          What Are You Drawing
        </NavLink>
        <div className="header-room header-item header-item-left flex-column"></div>
        <div className="header-toggle"></div>
        <div className="header-user header-item header-item-right flex-center-all"></div>
      </header>
    )
  }
}