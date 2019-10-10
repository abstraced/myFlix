import React, { useState, useEffect } from "react";
import { MovieCard } from '../../movie-card/movie-card';



export function FavoriteFilm (movies) {
   

        
    const listFilms=  Object.keys(movies.movies).map((movie) => (
    <div>
    <MovieCard 
    user='yes'
    remov={movies.remove}
    key={movies.movies[movie]} 
    movie={movies.movies[movie]} 
    favMovie={movies.movies[movie]  }  /> 
    </div>


    )
    );

    

   

return (
    <div className="list-films"> 

      {listFilms}
      
     </div>
  
      )

}