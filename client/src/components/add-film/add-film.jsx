import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

var API_URL =  'http://www.omdbapi.com/?apikey=93032218&t=';
var Mongoose_URL = 'http://myflixdb.herokuapp.com/'

import axios from 'axios';
import  MovieCard  from '../movie-card/movie-card';


export function AddFilm() {
  
  const [ search, setSearch ] = useState('');
  const [ film, setFilm ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
     
     axios.get(`${API_URL}${search}&plot=full`)
    .then(response => {
      axios.post(
        `${Mongoose_URL}movies/`,
        {
            headers: { Authorization: `Bearer ${localStorage.token}` },
            body:{
              Title: "paoz6tri",
              Description: " a description",
              genre:"Crnhnime",
              director:"Rohnhhzhzjuzuzuznjhj tghtpaul",
              Actor:"oy",
              ImagePath: "test",
              Featured:"no"

            }
        }
    )

      const data = response.data;
      console.log(data);
      setFilm(data);
      console.log(film.Title);
    })
    .catch(e => {
      console.log('no such film')
    });


    };


    return (
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Add film</Form.Label>
          <Form.Control type="text" placeholder="Type the film you want to add" value={search} onChange={e => setSearch(e.target.value)} />
        </Form.Group>
  
        
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
          </Button>
         
          
      </Form>
    )
  }


  // { film? <MovieCard movie={film} /> : <div> No film selected</div>}