import React, { useState, useEffect } from "react";
import axios from 'axios';


import  MovieCard  from '../../movie-card/movie-card';


var API_URL = 'http://myflixdb.herokuapp.com/'




export function DirectorFilm(props) {



    const [movies, setMovies] = useState([]);


    useEffect(() => {
    function getDirectorFilm() {
        axios
            .get(
                `${API_URL}movies/directors/${props.id}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.token}` }
                }
            )
                     
            .then(res => setMovies(res.data))
            .catch(err => {
                console.error(err);
            });
    }

    
           getDirectorFilm();
    }, []);



      const listFilms=  Object.keys(movies).map((movie) => 
      <MovieCard key={movies[movie]._id}
       movie={movies[movie]} 
       movie_id={movies[movie]._id}  /> );
    


    return (
  <div className="list-films"> 

    {listFilms}
   </div>

    )

}
