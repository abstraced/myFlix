import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav'

import './nav-view.scss';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';



export function NavView(props) {

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegisterButtonClick();
  };

  const handleDisconnect = (e) => {
    // e.preventDefault();
    props.onDisconnect();


  }
  
  

  return (
  <div className="navi">
  {(props.user) ? (
  <Nav justify variant="tabs" defaultActiveKey="/">
  <Nav.Item>
    <Nav.Link href="/">MyFlix</Nav.Link>
  </Nav.Item>
  <Nav.Item>
 <Link to={'/profile'}><Button variant="outline-dark">Profile</Button></Link>
  <Nav.Link href="/my-profile" eventKey="link-1">My Profile</Nav.Link>
</Nav.Item>
<Nav.Item>
  <Nav.Link href="/"  eventKey="link-2"  onClick={handleDisconnect}> Disconnect</Nav.Link>
</Nav.Item>
</Nav> ) 
:( <Nav justify variant="tabs" defaultActiveKey="/home">
<Nav.Item>
  <Nav.Link href="/">MyFlix</Nav.Link>
</Nav.Item> <Nav.Item>
  <Nav.Link onClick={handleRegister} eventKey="link-1">Sign up</Nav.Link>
 </Nav.Item>
 
 </Nav>)}
  
 </div>

  );

}

