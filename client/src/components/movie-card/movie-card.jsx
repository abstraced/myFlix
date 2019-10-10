import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

import { Link } from "react-router-dom";
import {SwitchFavorite} from "./switch_favorite/switch_favorite";


export class MovieCard extends React.Component {
  constructor(props) {
super(props);

this.addFilm =this.addFilm.bind(this);
console.log(props);
  }

  componentDidMount() {
  
   
  }

  addFilm () {
    let accessToken = localStorage.getItem('token');
    
    var ca = accessToken;
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));


    http://localhost:3000/user/${decodedValue._id}/movies/${this.props.movie._id}` );
    
    axios({
      method: 'post',
      url: `http://localhost:3000/user/${decodedValue._id}/movies/${this.props.movie._id}`,
      headers: { Authorization: `Bearer ${accessToken}` },
      
  })
           .catch(e => {
              console.log('no such user')
            });




  }



  render() {
    const { movie } = this.props;

     
  let testButton   = <div>  </div>
  
  
    
    if (this.props.user === 'yes'){
    
      testButton= <Button value={movie._id} onClick={(e)=>{ this.props.remov(e,movie._id)}} > Remove film from Favorites</Button>



    }
   else {

    testButton= <Button onClick={this.addFilm}>    Add film to favorite </Button>




   }
    




    return (
      <Card >
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link"> View</Button>
           
          </Link>
          {testButton}
          {/* <SwitchFavorite favMovie={movie.Title} ></SwitchFavorite > */}
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
  }).isRequired
};
