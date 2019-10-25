import React  from 'react';
import { connect } from 'react-redux';


import {FavoriteFilm} from './favorite-film/favorite-film';
import {InfoView} from './info-view/info-view';
import {UpdateView} from './update-view/update-view';

import './profile-view.scss';



const mapStateToProps = state => {
  
  return { user: state.userInfos };
};

function ProfileView (props) {
  const { movies } = props;



  let accessToken = localStorage.getItem('token');
 


  
    // Loading pattern 
      if (props.user=== undefined){
    
    
        return (
         <div>  Loading....</div>
    
        )
      }
    
    
    
      else {
    
     
        return (
    
    
            <div className="profile">   
            <div> 
            <InfoView   user={props.user}/>
            <UpdateView  userId={props.user._id} onDisconnect={() => this.onDisconnect()} />
            </div>
    
    
            <h1>  {props.user.Username}  's favorite films </h1>
                <FavoriteFilm movies={props.user.FavoriteFilms}    />
            </div>
            
            
            
            )
            
    
    
    
    
    
    
    
    }
    


}





export default connect(mapStateToProps)(ProfileView);


