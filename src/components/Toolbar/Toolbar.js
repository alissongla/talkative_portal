import React, { useState } from 'react';
import {NavLink} from 'react-router-dom';
import {logout} from '../../services/auth';

import Logo from '../../assets/Talk_Logo.png';
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const Toolbar = props => {
  function handleLogout(){
    logout();
  }

  return (<header className='toolbar'>
    <nav className='toolbar_navigation'>
      <div className='toolbar_toggle_button'>
        <DrawerToggleButton click={props.drawerClickHandler}/>
      </div>
      <div className='toolbar_logo'><a href="/"><img className='logo' src={Logo} alt="Logo TalkAtive"/></a></div>
      <div className="spacer"></div>
      <div className='toolbar_navigation_items'>
        <ul>
          <li><NavLink to="/app/module">Módulo</NavLink></li>
          <li><NavLink to="/app/text">Texto</NavLink></li>
          <li><NavLink to="/app/class">Aula</NavLink></li>
          <li><NavLink to="/app/exercise">Exercício</NavLink></li>
          <li className='logout_button'><a href="#" onClick={handleLogout}>SAIR</a></li>
        </ul>
      </div>
    </nav>
  </header>)
}

export default Toolbar;
