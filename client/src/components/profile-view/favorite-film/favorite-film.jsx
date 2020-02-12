import React, { useState, useEffect } from "react";
import  MovieCard  from '../../movie-card/movie-card';



export function FavoriteFilm (props) {
   

    
     


    
  if ( !props.movies) {
   return (
   <div> Loading .....</div>

   )


  }
   
  const listFilms=  Object.keys(props.movies).map((movie) =>{
    //
        
        return (         
   
        <div>
    <MovieCard 
    // user='yes'
    remove={props.movies.remove}
    key={props.movies[movie]} 
    movie={props.movies[movie]} 
    favMovie={props.movies[movie]  }  /> 
    </div>


    )});

return (
    <div className="list-films"> 

     
      {listFilms}
     </div>
  
      )

}


