import React, { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


//Redux
import  {setUserInfos}  from '../../../actions/actions';
import { connect } from 'react-redux';

var API_URL =  'http://myflixdb.herokuapp.com/';



const mapStateToProps = state => {

  return { user: state.userInfos,
          movies: state.movies
   };
};






 function SwitchFavorite (props) {



  const [ isFavorite, setIsFavorite ] = useState(false);



  useEffect(() => {
   if (props.user.FavoriteFilms ) {
        if  ( props.user.FavoriteFilms.some(movie => movie._id === props.movie_id) ) {
        setIsFavorite(true);

      }

   }
  },[props]);


  function removeFilm () {
    let accessToken = localStorage.getItem('token');

    var ca = accessToken;
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));





    axios({
      method: 'delete',
      url: `${API_URL}user/${decodedValue._id}/movies/${props.movie_id}`,
      headers: { Authorization: `Bearer ${accessToken}` },

  })
  .then(response => {
    // Assign the result to the state
    props.setUserInfos(response.data);
      // this.props.setUserInfos(null);
      // console.log( "");



  })
 .catch(e => {
              // console.log('no such user');
              console.log(e);
            });











  }





  function addFilm () {
    let accessToken = localStorage.getItem('token');

    var ca = accessToken;
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));





    axios({
      method: 'post',
      url: `${API_URL}user/${decodedValue._id}/movies/${props.movie_id}`,
      headers: { Authorization: `Bearer ${accessToken}` },

  })
  .then(response => {
     props.setUserInfos(response.data);




  })
           .catch(e => {
              console.log('no such user')
            });




  };




  function toggleFav () {
   setIsFavorite(!isFavorite);
   isFavorite ? (removeFilm ()) :
   (addFilm ());



  };


    return (

        <div className="custom-control custom-switch" >
        <input  checked={isFavorite}  onClick={toggleFav}   type="checkbox" className="custom-control-input" id={`customSwitch${props.movie_id}`}   ></input>
       <label className="custom-control-label"  htmlFor={`customSwitch${props.movie_id}`} >Add  {props.favMovie} as favorite </label>
           </div>

    )







}

export default connect(mapStateToProps,{setUserInfos})(SwitchFavorite);
