import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


import { Link } from "react-router-dom";
import './movie-view.scss';

import { DirectorFilm } from '../director-view/director-film/director-film';


export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;
    

    if (!movie) return null;

    return (

    <Container>

        <Col className="movie-text text-center border rounded-sm">
        <Row className= "movie-title">
         <Col className= "movie-title display-4">{movie.Title}</Col>
         </Row>
        <Row className= "movie-description border">
        <Col >Description:</Col>
        <Col>{movie.Description}</Col>
        </Row>
        <Row className= "genre border">
        <Col>Genre :  {movie.genre.Name}</Col>
        <Col >{movie.genre.Description}</Col>
        </Row>
        <Row className= "movie-director border">
        <Col>Director  : {movie.director.Name}</Col>
        <Col >Biography    : {movie.director.Bio}</Col>
        </Row>
        <Row>
        <Col>

        <Link to={`/directors/${movie.director.Name}`}>
<Button variant="link">Director</Button>
</Link>

<Link to={`/genres/${movie.genre.Name}`}>
<Button variant="link">Genre</Button>
</Link>
        <Link to={'/'}>
        <Button onClick={this.props.onClick}> Go back to movies' list </Button>
        </Link>
        </Col>

        </Row>

        </Col>

        <Col>
          <img className="pict" src={movie.ImagePath} /></Col>


      </Container>

    );
  }
}

MovieView.propTypes = {
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
