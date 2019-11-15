


import React, { useState } from 'react';
import { connect } from 'react-redux';


import {FavoriteFilm} from './favorite-film/favorite-film';
import {InfoView} from './info-view/info-view';
import UpdateView from './update-view/update-view';



import Button from 'react-bootstrap/Button';


import './profile-view.scss';



const mapStateToProps = state => {

  return { user: state.userInfos };
};

function ProfileView (props) {


  const [ isEditing, setIsEditing ] = useState(false);

      


    // Loading pattern
      if (props.user=== undefined){


        return (
         <div>  Loading....</div>

        )
      }



      else {
        
        if ( isEditing === true)  {      

          return (
            <div className="profile">
            <InfoView   user={props.user}/>
            <Button onClick={e=> setIsEditing(false)}> Finish updating Infos    </Button>
            <UpdateView  userId={props.user._id} onDisconnect={() => props.onDisconnect()} />
            <Button onClick={()=>props.onDisconnect()}>  Disconnect</Button>
           
            </div>
          )
                 }
      else {

        return (


            <div className="profile">
            <div>
            <InfoView   user={props.user}/>
            <Button onClick={e=> setIsEditing(true)}> Update Infos    </Button>
            
            </div>
          


            <h1>  {props.user.Username}  's favorite films </h1>
                <FavoriteFilm movies={props.user.FavoriteFilms}    />

           
            </div>



            )



          }




    }



}





export default connect(mapStateToProps)(ProfileView);
