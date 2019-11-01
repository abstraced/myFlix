

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
var allowedOrigins = ['http://myflixdb.herokuapp.com'];

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

app.use('/client', express.static(path.join(__dirname, 'dist')));

// app.get("/client/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "client/dist", "index.html"));
// });


// default homepage
app.get('/', function(req, res) {
  res.send('Hello to My flix, the app to help you sort your favorite films...')
});















/// MOVIE RELATED


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



/// Get all the film from a specific genre
app.get("/movies/genres/:genre",function (req,res) {
  Movies.find( { "genre" : req.params.genre}, function(err, movies) {
    return res.end(JSON.stringify(movies));
  } );
});






//Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/genres/:genre",function (req,res) {
  // ,passport.authenticate('jwt', { session: false })
  Genres.find( { "Name" : req.params.genre}, function(err, movies) {

    return res.end(JSON.stringify(movies));
  } );
 });


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
  req.checkBody('Director:Name', 'Description contains non alphanumeric characters - not allowed.').isAlphanumeric();
 req.checkBody('Genre: name', 'Description contains non alphanumeric characters - not allowed.').isAlphanumeric();








  // check the validation object for errors
  var errors = req.validationErrors();

  if (errors) {
    return res.status(422).json({ errors: errors });
  }

  Movies.findOne({ Title : req.body.Title })
  .then(function(movie) {
    if (movie) {
      return res.status(400).send(req.body.Title + " already exists");
    } else {
      Movies.create({
        Title: req.body.Title,
        Description: req.body.Description,
        Genre: {
          Name: req.body.Genre.Name,
          genre_id: req.body.Genre.genre_id
        },
        Director: {
          Name: req.body.Director.Name,
          director_id: req.body.Genre.director_id
        },
        Actors: [],
        ImagePath: req.body.ImagePath,
        Featured: req.body.Featured
      })


      .then(function(movie) {res.status(201).json(movie) })
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






///// USER RELATED


// display all  data about a user
// app.get("/users/:username",passport.authenticate('jwt', { session: false }),function(req, res) {   // 

//   Users.findOne(Username: req.params.username).then(movies => res.json(movies));     
  
// });
// app.get("/users/:usernameId",passport.authenticate('jwt', { session: false }),function(req, res) {   // 
// if (req.headers && req.headers.authorization) {
//       var authorization = req.headers.authorization.split(' ')[1],
//           decoded;
//       try {
//           decoded = jwt.verify(authorization, secret.secretToken);
//       } catch (e) {
//           return res.status(401).send('unauthorized');
//       }
//       var userId = decoded.id;
//       // Fetch the user by id 
//       Users.findOne({_id: userId}).then(function(user){
//           // Do something with the user
//           return res.send(200);
//       });
//   }
//   return res.send(500);


//   // Users.find({Username:req.params.username}).populate('FavoriteFilms').then(movies => res.json(movies));
//   // // .populate('Genre')
// });


// Display user info


app.get("/user/:user_id",passport.authenticate('jwt', { session: false }), function(req, res) {
  Users.find( {_id : req.params.user_id}).populate({
    path: 'FavoriteFilms',
    // Get friends of friends - populate the 'friends' array for every friend
    populate: {path:'director', path:'genre' }
  })
  .then(users => res.json(users));

});



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
//update   all
// app.put("/users/:Username",passport.authenticate('jwt', { session: false }), function(req, res) {
//   req.checkBody('Username', 'Username is required').notEmpty();
//   req.checkBody('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric();
//   req.checkBody('Password', 'Password is required').notEmpty();
//   req.checkBody('Email', 'Email is required').notEmpty();
//   req.checkBody('Email', 'Email does not appear to be valid').isEmail();

//   // check the validation object for errors
//   var errors = req.validationErrors();

//   if (errors) {
//     return res.status(422).json({ errors: errors });
//   }

//  var hashedPassword = Users.hashPassword(req.body.Password);
//   Users.findOneAndUpdate({ Username : req.params.Username }, {

//     $set :
//     {
//       Username : req.body.Username,
//       Password : hashedPassword,
//       Email : req.body.Email,
//       Birthdate : req.body.Birthdate
//     }
//   },
//   { new : true },
//   function(err, updatedUser) {
//     if(err) {
//       console.error(err);
//       res.status(500).send("Error: " +err);
//     } else {
//       console.log("test");
//       res.json(updatedUser)
//     }
//   })
// });




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













// all error handler via express
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!  '   + err);
});



// listen for requests
app.listen(port,"0.0.0.0", () =>
console.log(` Server running on port ${port}`)
);
