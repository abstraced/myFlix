const express = require("express"),

bodyParser = require("body-parser"),
uuid = require("uuid"),
morgan = require('morgan'),
mongoose= require('mongoose'),
passport = require('passport'),
cors = require('cors'),
validator = require('express-validator'),
Models = require('./models.js');

const path = require("path");

mongoose.set('useFindAndModify', false);

const app = express();
app.use(validator());
app.use(bodyParser.json());
require('./passport');

// CORS
var allowedOrigins = ['http://myflixdb.herokuapp.com','*','http://localhost:1234'];

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
const port =  process.env.PORT || 3000;

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

// app.use('/client', express.static(path.join(__dirname, 'client/dist')));
app.use('/client', express.static(path.join(__dirname, 'dist')));

app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/dist", "index.html"));
});




// default homepage
app.get('/', function(req, res) {
  res.send('Hello to My flix, the app to help you sort your favorite films...')
});





///// USER RELATED


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
      return res.status(400).send(req.body.Username + " already exists");
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


// Display user info


app.get("/user/:user_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find( {_id : req.params.user_id}).populate({
    path: 'FavoriteFilms',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: {path:'director', path:'genre' }
  })
  .then(users => res.json(users));

});






// USER UPDATE
//update   all
app.put("/user/all/:user_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  req.checkBody('Username', 'Username is required').notEmpty();
  req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
  req.checkBody('Password', 'Password is required').notEmpty();
  req.checkBody('Email', 'Email is required').notEmpty();
  req.checkBody('Email', 'Email does not appear to be valid').isEmail();

  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

 var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOneAndUpdate({ _id : req.params.user_id }, {

    $set :
    {
      Username : req.body.Username,
      Password : hashedPassword,
      Email : req.body.Email,
      Birthdate : req.body.Birthdate
    }
  },
  { new : true },
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
        res.json(updatedUser)
    }
  })
});




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
       res.json(updatedUser)
    }
  })
});




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
        res.json(updatedUser)
    }
  })
});

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
      
      res.json(updatedUser)
    }
  })
});



// update birthdate
app.put("/user/birthdate/:_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  // req.checkBody('Birthdate', 'Cannot be empty').notEmpty();
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
      
      res.json(updatedUser)
    }
  })
});




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




/// MOVIE RELATED


// return a list of all Movies
app.get("/movies",passport.authenticate('jwt', { session: false }),function(req, res) {   // 

   Movies.find().populate('genre').populate('director').then(movies => res.json(movies));
   // .populate('Genre')
});


//   Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:movie_id", function (req,res) {   //,passport.authenticate('jwt'{ session: false }),
  Movies.find( { "_id" : req.params.movie_id}).populate('genre').populate('director').exec ( function(err, movies) {
    return res.end(JSON.stringify(movies))
  } );
});



/// Get all the film from a specific genre
app.get("/movies/genres/:genre",function (req,res) {
  Movies.find( { "genre" : req.params.genre}).populate('genre').populate('director').exec ( function(err, movies) {
    return res.end(JSON.stringify(movies));
  } );
});

// get all the film from a director
app.get("/movies/directors/:director",function (req,res) {   //,passport.authenticate('jwt', { session: false })
  Movies.find( { "director" : req.params.director}).populate('genre').populate('director').exec ( function(err, movies) {
    return res.end(JSON.stringify(movies));
  } );
});




















/// USERS FAVORITE FILM

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




app.get("/movies/directors/:director",passport.authenticate('jwt', { session: false }),function (req,res) {   //
  Movies.find( { "director" : req.params.director}).populate('genre').populate('director').exec ( function(err, movies) {
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
        Description: ""
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
            
        } else {    
        
        Movies.create({
          Title: req.body.Title,
          Description: req.body.Description,
          ImagePath: req.body.imagePath,
          genre: String(genre_id),
          director: String(director_id)
          })
          .then(function(movie) { console.log (movie._id)  })
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














// all error handler via express
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!  '   + err);
});



// listen for requests
app.listen(port,"0.0.0.0", () =>
console.log(` Server running on port ${port}`)
);