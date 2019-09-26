const mongoose= require('mongoose');
const bcrypt = require('bcrypt');


var movieSchema = mongoose.Schema({
Title:{type:String, required:true},
Description: {type:String, required: true},
genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
Actors: [{type: String, required:true}],
//
ImagePath: String,
Featured: String
},
{ collection: 'movies' }

);

var userSchema= mongoose.Schema({
Username: {type: String, required:true},
Password:{ type: String, required: true},
Email: { type: String, required: true},
Birthdate: Date,
FavoriteFilms:[
 {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});


var genreSchema= mongoose.Schema({
Name: {type: String, required:true},
Description:{ type: String, required: true},
});

var directorSchema= mongoose.Schema({
Name: {type: String, required:true},
Bio: String,
Birth: Date,
Death: Date,
});


userSchema.statics.hashPassword = function(password) {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.Password); };



var Movie= mongoose.model('Movie', movieSchema);
var User= mongoose.model('User',userSchema);
var Genre= mongoose.model('Genre',genreSchema);
var Director= mongoose.model('Director',directorSchema);

module.exports.Movie= Movie;
module.exports.User= User;
module.exports.Genre= Genre;
module.exports.Director= Director;
