import React from 'react';
import {NavLink} from 'react-router-dom';
import {logout} from '../../services/auth';
import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
      drawerClasses = 'side-drawer open';
    }
    function handleLogout(){
      logout();
    }
    return (<nav className={drawerClasses}>
      <ul>
          <li><NavLink to="/app/module">Módulo</NavLink></li>
          <li><NavLink to="/app/text">Texto</NavLink></li>
          <li><NavLink to="/app/class">Aula</NavLink></li>
          <li><NavLink to="/app/exercise">Exercício</NavLink></li>
          <li className='logout_button'><a href="#" onClick={handleLogout}>SAIR</a></li>
      </ul>
    </nav>
)};

export default sideDrawer;
