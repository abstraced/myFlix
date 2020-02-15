import React, { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';


var API_URL = 'http://www.omdbapi.com/?apikey=93032218&t=';
var Mongoose_URL = 'https://myflixdb.herokuapp.com/'

import axios from 'axios';
import MovieCard from '../movie-card/movie-card';

const mapStateToProps = state => {

    return { user: state.userInfos,
            movies: state.movies
     };
  };


 function AddFilm (props) {




    const headers = {
        Authorization: `Bearer ${localStorage.token}`
    }

    const [searchedFilm, setSearchedFilm] = useState('');
    const [searchedYear,setSearchedYear]= useState('');
    const [movie, setMovie] = useState('');
   

    var yearOut = () => {
        var outYear;
       
    if  (!searchedYear) {
        outYear= '';
    }
    else {
        outYear= `&y=${searchedYear}`;
        
    }
    return outYear;
        }
    
    
  
    
    const handleSearch = (e) => {
        e.preventDefault();

        axios.get(`${API_URL}${searchedFilm}${yearOut()}`)
            .then((res) => {
               let movie= { 
                    Title: res.data.Title,
                Description: res.data.Plot,
                genre: res.data.Genre,
                director: res.data.Director,
                Actor: res.data.Actors,
                imagePath: res.data.Poster,
                Featured: "no"    
               };
                axios({
                    method: 'post',
                    url: `${Mongoose_URL}movies/`,
                    headers: headers,
                    data: movie
                })
                    // .then(res => console.log(res))
                    .catch(err => {
                        console.error(err);
                    });

              
            
            })
            .then((res) => {
           

            // console.log(res)
               
 
             })
            
            .catch(e => {
                console.log('no such film')
            });


    };

    return (
        <div>
        <Form>
            <Form.Group controlId="formBasicUsername">
                <Form.Label>Add film</Form.Label>
                <Form.Control type="text" placeholder="Type the film you want to add" value={searchedFilm} onChange={e => setSearchedFilm(e.target.value)} />
                <Form.Control type="text" placeholder="Type the year the film was released" value={searchedYear} onChange={e => setSearchedYear(e.target.value)} />
            </Form.Group>


            <Button variant="primary" type="submit" onClick={handleSearch}>
                Search
          </Button>
          </Form>
          { movie? <MovieCard movie={movie} /> : <div> No film selected</div>}
          </div>
    )
}


export default connect(mapStateToProps,{setMovies})(AddFilm);



