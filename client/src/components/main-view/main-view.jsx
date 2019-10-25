

import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';


import PropTypes from 'prop-types';


import { setMovies } from '../../actions/actions';
import { setUserInfos } from '../../actions/actions';



import { BrowserRouter as Router, Route } from "react-router-dom";


var API_URL =  'http://myflixdb.herokuapp.com/';
// 'http://localhost:3000/movies';


import MoviesList from '../movies-list/movies-list';


import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { NavView } from '../nav-view/nav-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  ProfileView  from '../profile-view/profile-view';





export class MainView extends React.Component {
  constructor() {
   
    super();
    this.onBackButtonClick = this.onBackButtonClick.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    // Initialize the state to an empty object so we can destructure it later
    this.state = {
      selectedMovie: null,
      user: null,
      register: false,
     
    };
  }

  componentDidMount() {


    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getInfos(accessToken);
    }

    
  }






  getInfos(token) {
    var base64Url = token.split('.')[1];
    var decodedValue = JSON.parse(window.atob(base64Url));
    axios.get(`${API_URL}user/${decodedValue._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setUserInfos(response.data[0]);
      
      
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 



  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }


  onLoggedIn(authData) {
    
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }


  

  onDisconnect() {
    this.setState({
      user: null,
      movies: [],
      userInfo: null
    });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
   


  }

  getMovies(token) {
    axios.get(`${API_URL}movies`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
    
      this.props.setMovies(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  





  onBackButtonClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onRegisterButtonClick() {
    this.setState({
      register: true
    });

  }


  render() {
    


   
    let { movies } = this.props;
   
    

    const {  user, register } = this.state;

    if (register === true) return (<div><NavView user={this.state.register} register={this.state.register} onRegisterButtonClick={() => this.onRegisterButtonClick()} onDisconnect={() => this.onDisconnect()} /> <div className="main-view">  < RegistrationView onLoggedIn={user => this.onLoggedIn(user)} /> </div></div>);


    if (!movies) return <div className="main-view"/>;

    return (
      <Router basename="/client">

        <NavView user={this.state.user} register={this.state.register} onRegisterButtonClick={() => this.onRegisterButtonClick()} onDisconnect={() => this.onDisconnect()} />
       
        <Route exact path="/" render={() => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
          return <MoviesList movies={movies}/>;
         }} />

        <Route path="/register" render={() => <RegistrationView />} />

        <Route path="/my-profile" render={() => <ProfileView  />} />

        <Route path="/movies/:movieId" render={({ match }) => <MovieView movie={movies.find(m => m._id === match.params.movieId)} />} />
       
             
       
       
       
        <Route path="/directors/:id" render={({ match }) => {
          if (!movies) return <div className="main-view" />;
          return <DirectorView director={movies.find(m => m.director._id === match.params.id).director} />
        }
        } />
        <Route path="/genres/:name" render={({ match }) => {
          if (!movies) return <div className="main-view" />;
          return <GenreView genre={movies.find(m => m.genre._id === match.params.name).genre} />
        }
        } />
      </Router>
    );
  }
}
  // 
     let mapStateToProps = state => {
    return { movies: state.movies }
}


/// Proptype
MainView.propTypes = {
  director: PropTypes.shape ({
    Name: PropTypes.string,
    Bio: PropTypes.string
  }).isRequired
}





export default connect(mapStateToProps, { setMovies,setUserInfos } )(MainView);

