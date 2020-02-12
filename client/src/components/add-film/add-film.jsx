import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

var API_URL =  'http://www.omdbapi.com/?apikey=93032218&t=';
var Mongoose_URL = 'https://myflixdb.herokuapp.com/'

import axios from 'axios';
import  MovieCard  from '../movie-card/movie-card';


export function AddFilm() {
  
  const [ search, setSearch ] = useState('');
  const [ film, setFilm ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
     
     axios.get(`${API_URL}${search}&plot=full`)
    .then(() => {
       
      axios
      .post(
        `${Mongoose_URL}movies/`,
        {
            headers: { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZUZpbG1zIjpbXSwiX2lkIjoiNWRjZjEzMTc4NDVkNGYwMDE3MWMwZjBlIiwiVXNlcm5hbWUiOiJQaWVycmUiLCJQYXNzd29yZCI6IiQyYiQxMCR3YkUycEpCTk5iSFAzeFR3T05IZXhla3FjOFp5LjBxZVRsc3JRL0o1Q3hiaTFzdnhGRWk1SyIsIkVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIkJpcnRoZGF0ZSI6IjIwMDEtMDEtMjVUMDA6MDA6MDAuMDAwWiIsIl9fdiI6MCwiaWF0IjoxNTgxNTMxNDgxLCJleHAiOjE1ODIxMzYyODEsInN1YiI6IlBpZXJyZSJ9.qgAa-m01M7mx5wK73m0PNDXswlYITTqoGlER6cr20Rg' }
        }
    )
    .then(res => console.log("that far"))
            .catch(err => {
                console.error(err);
            });

      
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