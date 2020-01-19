import React from 'react';

import './Navbar.scss'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
} from 'reactstrap';
import Auth from '../Auth'
import Modal from '../Modal'
import Form from '../Form'

import { isAuthenticated } from '../../utils/helper'

const Header = () => {
  return (
    <div className='nav-bar'>
      <Navbar color="dark" light expand="md">
        <NavbarBrand href="/" className="text-white">Like-Machine</NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
          </Nav>
          { !isAuthenticated() 
            ? <Auth />
            : <div className='nav-bar__left'>
              <Modal buttonLabel='Create Link' modalTitle='Create Link'><Form /></Modal>
              <Auth type="logout"/>
            </div>
          }
          
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header
