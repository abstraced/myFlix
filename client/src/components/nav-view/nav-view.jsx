import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';


import { NavLink } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';



import './nav-view.scss';



export function NavView(props) {

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegisterButtonClick();
  };

  const handleDisconnect = () => {
    // e.preventDefault();
    props.onDisconnect();


  }



  return (
  <div className="navi">
  {(props.user) ? (
  <Nav justify variant="tabs" defaultActiveKey="/">
  <Nav.Item>
    <NavLink to="/">MyFlix</NavLink>
  </Nav.Item>
  <Nav.Item>
  <NavLink  to="/my-profile">My Profile </NavLink>
</Nav.Item>
<Nav.Item>
  <NavLink to="/"    onClick={handleDisconnect}> Disconnect</NavLink>
</Nav.Item>
</Nav> )
:(
   <Nav justify variant="tabs" defaultActiveKey="/">
<Nav.Item>
  <NavLink to="/">MyFlix</NavLink>
</Nav.Item>

 <Nav.Item>
  <NavLink to="/register"  >Sign up</NavLink>
 </Nav.Item>

 </Nav>)}

 </div>

  );

}
