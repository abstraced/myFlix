import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MovieCard } from '../../movie-card/movie-card';
import Button from "react-bootstrap/Button";


export function FavoriteFilm (movies) {
   

    let deleteButton =( <div>  John 
   <h1>    Further test</h1>




    </div> );
     
    const listFilms=  Object.keys(movies.movies).map((movie) => (
    <div>
    <MovieCard 
    user='yes'
    remov={movies.remove}
    key={movies.movies[movie]} 
    movie={movies.movies[movie]} 
    favMovie={movies.movies[movie]
        
    
    }   /> 
    
   </div>
    )
   
    );

    

   

return (
    <div className="list-films"> 

      {listFilms}
      
     </div>
  
      )

}