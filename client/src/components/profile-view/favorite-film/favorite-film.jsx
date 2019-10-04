import React, { useState, useEffect } from "react";
import axios from 'axios';
import { MovieCard } from '../../movie-card/movie-card';


export function FavoriteFilm (movies) {




    const [toggle, setToggle] = useState(false);

var test = movies.movies;
//    console.log(movies.length);
   console.log(movies);
   console.log(movies.movies);
   var listFilms= <div>    TEST</div>
//    listFilms=  Object.keys(test).map((movie.movies) => <MovieCard key={test[movie]._id} movie={test[movie]} favMovie={test[movie]._id}  /> );


//  console.log( test.length);


//    if (test === undefined || test.length == 0) {

//     console.log(" pas bon")
//     // array empty or does not exist
// }
//    if (movies) {

//     console.log(movies[0].Description);
// const listFilms=  Object.keys(test).map((movie) => <MovieCard key={movies[movie]._id} movie={movies[movie]} favMovie={movies[movie]._id}  /> );
    
// const listFilms= 

//    }
// //     let array1= (props.movies);
// //     console.log("array1");   
// //     console.log(typeof array1);
// // console.log(typeof props.movies);
// //     console.log(array1);

//     // const test= Object.keys(this.props);
        // const listFilms=  Object.keys(test).map((movie) =>({console.log("test")}  
//         <div> deded  {movie} </div>) );


     
        // const listFilms=  this.movies).map((movie) =><div> deded</div> );

    // const listFilms = array1.map (movie => console.log(movie))

// var testparse = JSON.parse(movies);  
//     console.log( testparse);

return (
    <div className="list-films"> 
    {/* <h1> List of Films by {movies..Title} </h1>    */}
      {listFilms}
     </div>
  
      )

}