
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import { GenreFilm } from "./genre-film/genre-film";

export function GenreView (props) {

 

    return (
      <div>
      <Card >
        <Card.Body>
          <Card.Title>{props.genre.Name}</Card.Title>
          <Card.Text>Description: {props.genre.Description}</Card.Text>
          
          <Link to={'/'}>
          <Button variant="primary" type="button">
          Back
          </Button>
        </Link>
        </Card.Body>
      </Card>
      <div><h2> List of {props.genre.Name} Film  </h2>
      <GenreFilm   id={props.genre._id} />  
      </div>       
       </div>
    );
  }


GenreView.propTypes = {
  director: PropTypes.shape ({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }).isRequired
}
