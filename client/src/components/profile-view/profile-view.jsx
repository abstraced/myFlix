import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import axios from 'axios';


import {FavoriteFilm} from './favorite-film/favorite-film';
import {InfoView} from './info-view/info-view';
import {UpdateView} from './update-view/update-view';


export function ProfileView(user)  {

  const [ refresh, setRefresh ] = useState('');

  let accessToken = localStorage.getItem('token');
   


 
  console.log( user);

  const removeSubmit = ( e,_id) => {
    axios({
      method: 'delete',
      url: `http://localhost:3000/user/${user.user._id}/movies/${_id}`,
      headers: { Authorization: `Bearer ${accessToken}` }
  })
  .then(
    window.location.reload(false)
  )
  
           .catch(e => {
              console.log('no such user')
            });
  

    
    };



    

//    Loading pattern 
  if (user.user=== undefined){


    return (
     <div>  Loading....</div>

    )
  }



  else {

    console.log(user.user.FavoriteFilms)
    return (


        <div>   
        <div> 
        <InfoView   user={user.user}/>
        <UpdateView  userId={user.user._id} onDisconnect={() => this.onDisconnect()} />
        </div>


        <h1>  {user.user.Username}  's favorite films </h1>
            <FavoriteFilm movies={user.user.FavoriteFilms}   remove={removeSubmit} />
        </div>
        
        
        
        )
        



}



}
