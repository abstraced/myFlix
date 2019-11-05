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




  /// wait for props
  useEffect(() => {
   if (props.user.FavoriteFilms ) {
        if  ( props.user.FavoriteFilms.some(movie => movie._id === props.movie._id) ) {
        setIsFavorite(true);

      }

   }
  },[props]);



  ///remove favorite film
  function removeFilm () {
    let accessToken = localStorage.getItem('token');

    var ca = accessToken;
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));





    axios({
      method: 'delete',
      url: `${API_URL}user/${decodedValue._id}/movies/${props.movie._id}`,
      headers: { Authorization: `Bearer ${accessToken}` },

  })

  //remove the film from redux
  .then(response => {
    // Assign the result to the state
    let updatedUser =   {
          Username:  props.user.Username,
          FavoriteFilms: props.user.FavoriteFilms,
          Email: props.user.Email,
          Birthdate: props.user.Birthdate
            };
    

          let newArray=  updatedUser.FavoriteFilms.filter( (movie) => {
            return (   movie._id !== props.movie._id);


          }  
            
            
            
         
          )
    
          console.log(newArray);
          console.log( updatedUser.FavoriteFilms);
    
    
    props.setUserInfos({Username : updatedUser.Username,
      FavoriteFilms: newArray,
      Email:  updatedUser.Email,
      Birthdate: updatedUser.Birthdate
      
    
    
    } );
  
  
    
  })



   .catch(e => {
              // console.log('no such user');
              console.log(e);
            });
  }




  ///add favorite film
  function addFilm () {
    let accessToken = localStorage.getItem('token');

    var ca = accessToken;
    var base64Url = ca.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));





    axios({
      method: 'post',
      url: `${API_URL}user/${decodedValue._id}/movies/${props.movie._id}`,
      headers: { Authorization: `Bearer ${accessToken}` },

  })
    //add the film to redux store
  .then(response => {
   
    let updatedUser =   {
          Username:  props.user.Username,
          FavoriteFilms: props.user.FavoriteFilms,
          Email: props.user.Email,
          Birthdate: props.user.Birthdate
            };
    

            updatedUser.FavoriteFilms.push(props.movie     
          )
    
    
    
    props.setUserInfos({Username : updatedUser.Username,
      FavoriteFilms: updatedUser.FavoriteFilms,
      Email:  updatedUser.Email,
      Birthdate: updatedUser.Birthdate

     
    
    
    
    });
  
  
    
  })
  .catch(function (error) {
    console.log(error);
  });




  };




  function toggleFav () {
   setIsFavorite(!isFavorite);
   isFavorite ? (removeFilm ()) :
   (addFilm ());



  };


    return (

        <div className="custom-control custom-switch" >
        <input  checked={isFavorite}  onClick={toggleFav}   type="checkbox" className="custom-control-input" id={`customSwitch${props.movie._id}`}   ></input>
       <label className="custom-control-label"  htmlFor={`customSwitch${props.movie._id}`} >Add  {props.favMovie} as favorite </label>
           </div>

    )







}

export default connect(mapStateToProps,{setUserInfos})(SwitchFavorite);
