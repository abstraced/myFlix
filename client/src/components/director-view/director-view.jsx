
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';
import { DirectorFilm } from "./director-film/director-film";

export function DirectorView (props) {


    return (
      <div>
      <Card >
        <Card.Body>
          <Card.Title>{props.director.Name}</Card.Title>
          <Card.Text>Biography: {props.director.Bio}</Card.Text>
          <Card.Text>Date of birth: {props.director.Birth}</Card.Text>
          <Card.Text>Date of death: {props.director.Death}</Card.Text>
          <Link to={'/'}>
          <Button variant="primary" type="button">
          Back
          </Button>
        </Link>
        </Card.Body>
      </Card>
      <div><h2> List of Film by {props.director.Name} </h2>
      <DirectorFilm   id={props.director._id} />  
      </div>       
       </div>
    );
  }


DirectorView.propTypes = {
  director: PropTypes.shape ({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }).isRequired
}
