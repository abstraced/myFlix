import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


import { MovieCard } from '../../movie-card/movie-card';
import ListGroup from "react-bootstrap/ListGroup";

var API_URL = 'http://localhost:3000/directors'


export function GenreFilm(props) {



    const [movies, setMovies] = useState([]);


    useEffect(() => {
        function getGenreFilm() {
            axios
                .get(
                    `http://localhost:3000/movies/genres/${props.id}`,
                    {
                        headers: { Authorization: `Bearer ${localStorage.token}` }
                    }
                )
                // .then(function (response) {
                //     console.log(response);
                //   })
                .then(res => setMovies(res.data))

                .catch(err => {
                    console.error(err);
                });
        }

        getGenreFilm();
    }, []);



      const listFilms=  Object.keys(movies).map((movie) => <MovieCard key={movies[movie]._id} movie={movies[movie]}   /> );
    

// var testparse = JSON.parse(movies);  
//     console.log( testparse);

    return (
  <div className="list-films"> 
  {/* <h1> List of Films by {movies..Title} </h1>    */}
    {listFilms}
   </div>

    )

}


