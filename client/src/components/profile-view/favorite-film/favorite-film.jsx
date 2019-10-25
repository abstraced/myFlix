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
    remov={props.movies.remove}
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



 
    // const listFilms=  Object.keys(props.movies).map((movie) =>{
    //     console.log( "test");
    //     console.log( movie); 
        
    //     return (

    //         <div> frfrfrf</div>
    
   
    // //     <div>
    // // <MovieCard 
    // // user='yes'
    // // remov={movies.remove}
    // // key={movies[movie]} 
    // // movie={movies[movie]} 
    // // favMovie={movies[movie]  }  /> 
    // // </div>


    // )
    