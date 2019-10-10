import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-bootstrap';
import { Link } from "react-router-dom";

import './nav-view.scss';
// import { Link } from "react-router-dom";


export function NavView(props) {

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegisterButtonClick();
  };

  const handleDisconnect = (e) => {
    e.preventDefault();
    props.onDisconnect();


  }
  
  

  return (


    <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
    <div className="container">

    
    <a className="navbar-brand" href="/">MyFlix</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
    <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="mobile-nav">


    <ul className="navbar-nav ml-auto">
    <li className="nav-item">
    <a className="nav-link" href="/my-profile" >My Profile</a>
  </li>
  {(props.user) ? (<li className="nav-item" >
  <Link to={`/`}>
       <a className="nav-link" componentclass={Link} 
       href="http://localhost:1234/" 
       to="http://localhost:1234/" 
       onClick={handleDisconnect}>Disconnect</a> 
       </Link>
      </li>):(<li className="nav-item">
    <a className="nav-link" href="" onClick={handleRegister}>Sign Up</a>
  </li>)}
     
  
       
   
    </ul>
    </div>
    </div>
    </nav>
  );

}
