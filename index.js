/**
* @description Index.js manages all HTTP requests
* @class Router
* @requires express, a server framework for Node.js
* @requires body-parser, a parsing middleware for node.js that is needed to read HTTP POST data which is stored in req.body
* @requires uuid, which generates user ids
* @requires morgan, which generates user ids
* @requires mongoose, an object data modeling library (ODM) for MongoDB database
* @requires passport, authentication middleware for Node.js
* @requires cors, Express middleware that manages the CORS settings (Cross-Origin-Resource-Sharing)
* @requires validator, Express middleware that provide validators sanitizer functions
* @requires path, part of Node.js core, manages file and folder paths
*/





const express = require("express"),

bodyParser = require("body-parser"),
uuid = require("uuid"),
morgan = require('morgan'),
mongoose= require('mongoose'),
passport = require('passport'),
cors = require('cors'),
validator = require('express-validator'),
Models = require('./models.js'),
path = require("path");
mongoose.set('useFindAndModify', false);

const app = express();
app.use(validator());
app.use(bodyParser.json());
require('./passport');




// CORS
var allowedOrigins = ['https://myflixdb.herokuapp.com','*','http://localhost:1234'];

app.use(cors({
  origin: function(origin, callback){
     if(!origin) return callback(null, true);
   if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      var message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));




var auth = require('./auth')(app);


///
const port =   3000;
// process.env.PORT ||

const Movies= Models.Movie;
const Users = Models.User;
const Genres = Models.Genre;
const Directors = Models.Director;



// Connect to database
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
 mongoose.connect('mongodb+srv://admin:mongoRemote1@cluster0-c89di.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log("Correctly connected to mongoDB"))
.catch(err => console.log(`MongoDb encountered a problem with following error ${err}`));


// log url request
app.use(morgan('common'));

// link to public static file ( documentation.html)

app.use(express.static('public'));
app.use('/client', express.static(path.join(__dirname, 'client/dist')));



// default homepage
app.get('/', function(req, res) {
  res.send('Hello to My flix, the app to help you sort your favorite films...')
});








/// MOVIE RELATED

 /**
  * @function GET /movies - Return a list of all movies
  * @example http://myflixdb.herokuapp.com/movies
  * @description The request has to bear an authorization token
  * @return Return a JSON file with the data for all the movies in the database.
  *
  */



// return a list of all Movies
app.get("/movies",passport.authenticate('jwt', { session: false }),function(req, res) {   // 

   Movies.find().populate('genre').populate('director').then(movies => res.json(movies));
   // .populate('Genre')
});


//   Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:movie", function (req,res) {   //,passport.authenticate('jwt'{ session: false }),
  Movies.find( { "Title" : req.params.movie}).populate('genre').populate('director').exec ( function(err, movies) {
    return res.end(JSON.stringify(movies))
  } );
});



 /**
  * @function GET /genres/:genre -  Get all the film from a specific genre
  * @param genre {string} - genre id
  * @example http://myflixdb.herokuapp.com/genres/5d4949d0605ef85a13615aa7
  * @description The request has to bear an authorization token
  * @return Return a JSON file with all the movies in the genre
  *
  */

/// Get all the film from a specific genre
app.get("/movies/genres/:genre",function (req,res) {
  Movies.find( { "genre" : req.params.genre}, function(err, movies) {
    return res.end(JSON.stringify(movies));
  } );
});

/**
  * @function GET /directors/:director - Get all the film from a director
  * @param director {string} - director id
  * @example http://myflixdb.herokuapp.com/director/5d494dd9b8ddadac9d0f0606
  * @description The request has to bear an authorization token
  * @return Return a JSON file with all the movies with this director
  *
  */

// get all the film from a director
app.get("/movies/directors/:director",function (req,res) {   //,passport.authenticate('jwt', { session: false })
  Movies.find( { "director" : req.params.director}, function(err, movies) {
    return res.end(JSON.stringify(movies));
  } );
});




//Allow user to add a film to the main list of films

app.post('/movies',passport.authenticate('jwt', { session: false }), function(req, res) {
  req.checkBody('Title', 'A title is required').notEmpty();
  req.checkBody('Description', 'A description is required').notEmpty();
//   req.checkBody('Director:Name', 'Description contains non alphanumeric characters - not allowed.').isAlphanumeric();
//  req.checkBody('Genre: name', 'Description contains non alphanumeric characters - not allowed.').isAlphanumeric();


  // check the validation object for errors
  var errors = req.validationErrors();

  var director_id;
  var genre_id;

  if (errors) {
    return res.status(422).json({ errors: errors });
  }
  

  
  Directors.findOne({ Name : req.body.director })
  .then(function(director) {
    if (director) {
      // console.log(movie);
      director_id=  director._id;        
    } else {    
    Directors.create({
    Name: req.body.director,
    Bio:'',
    Birth: null,
    Death: null
     })
      // .then(function(movie) { return movie })
      .then(function(director) {director_id= director._id })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  })
  .then(function() {
    Genres.findOne({ Name : req.body.genre })
    .then(function(genre) {
      if (genre) {

        genre_id=  genre._id;    
      } else {    
      Genres.create({
        Name: req.body.genre,
        Description: "ouik"
         })
         .then(function(genre) {genre_id= genre._id })
         .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
        })
        }
    
    })
    .then(function() {
      Movies.findOne({ Title : req.body.Title })
      .then(function(movie) {
        if (movie) {              
          console.log(director_id);  
        } else {    
        console.log(director_id);  
        Movies.create({
          Title: req.body.Title,
          Description: req.body.Description,
          ImagePath: req.body.imagePath,
          genre: String(genre_id),
          director: String(director_id)


           })
            .catch(function(error) {
            console.error(error);
            res.status(500).send("Error: " + error);
          })
          }
      
      })
    })
  




    
    res.end('over')


  })


 
  
  
  .catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});









///// USER RELATED



/**
  * @function GET /user/:user_id - Display user info
  * @param user_id {string} - user id 
  * @example http://myflixdb.herokuapp.com/user/5d494dd9b8ddadac9d0f0606
  * @description The request has to bear an authorization token
  * @return Return a JSON file with all the data about the user ( username,favorites films, mail address)
  *
  */

// Display user info

app.get("/user/:user_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find( {_id : req.params.user_id}).populate({
    path: 'FavoriteFilms',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: {path:'director', path:'genre' }
  })
  .then(users => res.json(users));

});


/**
  * @function POST /users/ -  Allow user to register
  * @param user_id {string} - user id 
  * @example http://myflixdb.herokuapp.com/users
  * Messsage body:
  * {
  * "Username":"userexemple",
  * "Password":"password",
  * "Email":"test@test.com",
  * "Birthdate":"2001-01-25"
  * }
  * 
  *  
  * @return Return a JSON file with all the data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */


//Allow new users to register
app.post('/users', function(req, res) {



  // Validation logic here for request
 req.checkBody('Username', 'Username is required').notEmpty();
 req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric()
 req.checkBody('Password', 'Password is required').notEmpty();
//  req.checkBody('Email', 'Email is required').notEmpty();
 req.checkBody('Email', 'Email does not appear to be valid').isEmail();
 req.checkBody('Birthdate', 'Is not a valid date. The format is YYYY-MM-DD').isISO8601();

 // check the validation object for errors
 var errors = req.validationErrors();

 if (errors) {
   return res.status(422).json({ errors: errors });
 }

   var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: hashedPassword,
        Email: req.body.Email,
        Birthdate: req.body.Birthdate
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});



// USER UPDATE


/**
  * @function PUT /user/username/:user_id - Update username
  * @param user_id {string} - user id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/username/5d494dd9b8ddadac9d0f0606
  * Messsage body:
  * {
  * "Username":"new username exemple",
  * }
  * 
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */




// Update username
app.put("/user/username/:_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  };


  Users.findOneAndUpdate({ _id : req.params._id }, {

    $set :
    {
      Username : req.body.Username,
      
    }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      console.log("test");
      res.json(updatedUser)
    }
  })
});


/**
  * @function PUT /user/password/:user_id - Update password
  * @param user_id {string} - user id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/password/5d494dd9b8ddadac9d0f0606
  * Messsage body:
  * {
  * "Password":"new password",
  * }
  * 
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */

// update password
app.put("/user/password/:_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  
  req.checkBody('Password', 'Password is required').notEmpty();
  

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

 var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ _id : req.params._id }, {

    $set :
    {
    
      Password : hashedPassword,
      
    }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      console.log("test");
      res.json(updatedUser)
    }
  })
});

/**
  * @function PUT /user/email/:user_id - Update mail address
  * @param user_id {string} - user id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/email/5d494dd9b8ddadac9d0f0606
  * Messsage body:
  * {
  * "Email":"new email",
  * }
  * 
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */




// update mail adress
app.put("/user/email/:_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

 
  Users.findOneAndUpdate({ _id : req.params._id }, {

    $set :
    {
     
      Email : req.body.Email
      
    }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      console.log("test");
      res.json(updatedUser)
    }
  })
});

/**
  * @function PUT /user/birthdate/:user_id - Update birthdate
  * @param user_id {string} - user id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/birthdate/5d494dd9b8ddadac9d0f0606
  * Messsage body:
  * {
  * "Birthdate":"11.01.1980",
  * }
  * 
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */

// update birthdate
app.put("/user/birthdate/:_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  
  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

  Users.findOneAndUpdate({ _id : req.params._id }, {

    $set :
    {
      
      Birthdate : req.body.Birthdate
    }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      console.log("test");
      res.json(updatedUser)
    }
  })
});


/**
  * @function DELETE /user/:user_id
  * @param user_id {string} - user id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/5d494dd9b8ddadac9d0f0606
  *  
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */


// Delete a user by username
app.delete('/user/:_id',passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndRemove({ _id: req.params._id })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params._id + " was not found");
    } else {
      res.status(200).send(req.params._id + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
  });
});






// return a list of all users
app.get("/users",passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find().populate({
    path: 'FavoriteFilms',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: { path: 'genre', path:'director' }
  }).then(users => res.json(users));

});






/// USERS FAVORITE FILM

/**
  * @function POST /user/:user_id/movies/:MovieID - Update birthdate
  * @param user_id {string} - user id 
  * @param MovieID {string} - movie id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/5d494dd9b8ddadac9d0f0606/movies/23232f2323d23e232
  *  
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */




/// Allow users to add a movie to their list of favorites
app.post('/user/:user_id/movies/:MovieID',passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ _id : req.params.user_id }, {
    $push : { FavoriteFilms : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});



/**
  * @function DELETE /user/:user_id/movies/:MovieID - Update birthdate
  * @param user_id {string} - user id 
  * @param MovieID {string} - movie id 
  * @description The request has to bear an authorization token
  * @example http://myflixdb.herokuapp.com/user/5d494dd9b8ddadac9d0f0606/movies/23232f2323d23e232
  *  
  *  
  * @return Return a JSON file with all the updated data about the user ( id, username,favorites films, mail address, birthdate)
  *
  */


// Allow users to remove a movie from their list of favorites
app.delete('/user/:user_id/movies/:MovieID',passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.findOneAndUpdate({ _id : req.params.user_id }, {
    $pull : { FavoriteFilms: req.params.MovieID
    }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});













// all error handler via express
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!  '   + err);
});



// listen for requests
app.listen(port,"0.0.0.0", () =>
console.log(` Server running on port ${port}`)
);
