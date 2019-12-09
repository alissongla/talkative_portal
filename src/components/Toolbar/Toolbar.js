import React, { useState, useEffect } from 'react';
import { NavLink as ReactLink } from 'react-router-dom';
import {logout, getToken} from '../../services/auth';
import api from '../../services/api';

import Logo from '../../assets/Talk_Logo.png';
import './Toolbar.css';

//Reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavLink,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


const Toolbar = props => {
  const[isOpen, setIsOpen] = useState(false);
  const[username, setUsername] = useState('');

  const toggle = () => setIsOpen(!isOpen);


  useEffect(() => {
    async function fetchData(){
      const userToken = getToken();
      var userResponse = await api.get('/users', {
        headers: {
          'Authorization': 'Bearer ' + userToken
        }
      })
      setUsername(userResponse.data.username);
    }
    fetchData()
  })

  function handleLogout(){
    logout();
  }

  return (
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">
        <div className='toolbar_logo'><img className='logo' src={Logo} alt="Logo TalkAtive"/></div>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
      <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink tag={ReactLink} to="/app/module">Módulo</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/app/text">Texto</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/app/class">Aula</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={ReactLink} to="/app/exercise">Exercício</NavLink>
            </NavItem>
          </Nav>
          <Nav>
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                <NavLink tag={ReactLink} to="/app/class" onClick={handleLogout}>Sair</NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          </Collapse>
    </Navbar>
    </div>
)
}

export default Toolbar;
