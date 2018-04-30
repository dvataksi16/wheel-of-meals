require('./db');
require('./auth');
const express = require('express');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movie');
const User = mongoose.model('User');

const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const auth = require('./auth.js');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));


const expresssession = require('express-session')
const sessionOptions = {
  secret: 'secret for signing session id',
  saveUninitialized: false,
  resave: false
}
app.use(session(sessionOptions));

app.use(function(req, res, next){
	res.locals.user = req.session.user;
	next();
});

app.get('/', (req, res) => {
	res.render('index');

});
app.post('/', (req,res) =>{

});

app.get('/decision', (req, res) => {
	res.render('decision');

});

app.post('/decision', (req, res) => {
    const genre = req.body.genre;
    console.log("inside decision ", genre);
    Movie.find({}, function(err, movies){
      //None selected
      if(genre === undefined){
        console.log(movies.length);
        const len = movies.length
        const pick = Math.floor(Math.random() * len);
        console.log(movies[pick].favorite);
        res.render('decision',{movie:movies[pick]});
      }
      //More than one selected
      else if(genre.constructor.name === "Array"){
        const newMovies = [];
        movies.forEach(function(e){
          for(let i = 0; i < genre.length; i++){
              if(e.genre === genre[i]){
                console.log(e);
                newMovies.push(e);
              }
          }
        });
        const pick = Math.floor(Math.random() * newMovies.length);
        // console.log(newMovies[pick] + "  " + newMovies.length);
        res.render('decision',{movie:newMovies[pick]});
      }
      //Only one selected -- genre is a string
      else{
        const newMovies = [];
        movies.forEach(function(e){
          if(e.genre === genre){
            newMovies.push(e);
          }
        });
        const pick = Math.floor(Math.random() * newMovies.length);
        // console.log(newMovies[pick] + "  " + newMovies.length);
        res.render('decision',{movie:newMovies[pick]});
      }
    });
});
//allows user to refresh page with movie without crashing the site
app.get('/decision/:slug', (req,res) => {
  Movie.findOne({_id:req.params.slug}, function(err,movie) {
    res.render("decision", {movie:movie,refresh:true});
  });
});

app.post('/decision/:slug', (req,res) => {
  Movie.findOne({_id: req.params.slug}, function(err,movie) {
    if(movie.favorite !== undefined){
      movie.favorite = !movie.favorite;
      res.render('decision',{movie:movie,refres:true});
    }
    else{
      movie.favorite = true;
      res.render('decision',{movie:movie, refresh:true});
    }
    movie.save((err,movie) => {
      if(err){
        console.log(err);
      }
      else{
        console.log("Favorited ", movie);
      }
    });
  });
});
app.get('/mine', (req, res) => {
  Movie.find({favorite:true},function(err, movies){
    res.render('mine',{movies:movies});
  });
});

app.post('/mine', (req, res) => {
  new Movie({
    title: req.body.title,
    genre: req.body.genre,
    director: req.body.director,
    year: req.body.year,
    favorite: true
  }).save(function(err) {
		if(err){
			res.send(err);
		}
		else{
			res.redirect('/mine');
		}
	});
});
app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	auth.register(req.body.username, req.body.email, req.body.password, req.body.first_name, req.body.last_name, (err) => {
		res.render('register', {message: err.message});
	},
	(user) => {auth.startAuthenticatedSession(req, user, (err) => {
			if (!err) {
				console.log("user registered -- redirecting");
				res.redirect('/');
			}
		});
	});
});
app.get('/login', (req, res) => {
	res.render('login');
});
app.post('/login', (req, res) => {
	auth.login(req.body.username, req.body.password, (err) => {
		res.render('login', {message: err.message});
	},
	(user) => {auth.startAuthenticatedSession(req, user, (err) => {
			if (!err) {
				console.log("user recognized-- redirecting");
				res.redirect('/');
			}
		});
	});
});

app.listen(process.env.PORT || 3000 || || process.env.MONGODB_URI);
console.log('Server started');
