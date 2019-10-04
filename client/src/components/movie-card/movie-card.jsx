import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import {SwitchFavorite} from "./switch_favorite/switch_favorite";


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link"> View</Button>
           
          </Link>
          <SwitchFavorite favMovie={movie.Title}></SwitchFavorite >
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
  Title: PropTypes.string.isrequired,
   Description: PropTypes.string.isRequired,
   ImagePath: PropTypes.string.isRequired,
   Featured: PropTypes.bool.isRequired,
   genre: PropTypes.shape({
      Name: PropTypes.string.isrequired,
      Description: PropTypes.string.isrequired
    }).isRequired,
    director: PropTypes.shape({
      Bio: PropTypes.string.isrequired,
      Birth: PropTypes.instanceOf(Date).isrequired,
      Death: PropTypes.instanceOf(Date).isrequired,
      Name: PropTypes.string.isrequired

    }).isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
