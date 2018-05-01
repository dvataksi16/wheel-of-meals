const mongoose = require('mongoose');
/*
*Stores information and location of restuarant
*/


const Movie = new mongoose.Schema({
	title: {type: String, required: true},
	genre: {type: String, required: true},
	director: {type: String, required: false},
	year: {type: Number, required: false},
	favorite:Boolean
});
mongoose.model('Movie', Movie);
/*
*Made at Registration time, used to identify users
*/
const User =  new mongoose.Schema ({
    username: {type: String, unique: true, required: true},
    first_name: {type: String, unique: false, required: false},
		last_name: {type: String, unique: false, required: false},
    password: {type: String, unique: true, required: true},
    saved_movies: [Movie]
});


mongoose.model('User', User);

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	 // if we're in PRODUCTION mode, then read the configration from a file
	 // use blocking file io to do this...
	 const fs = require('fs');
	 const path = require('path');
	 const fn = path.join(__dirname, 'config.json');
	 const data = fs.readFileSync(fn);

	 // our configuration file will be in json, so parse it and set the
	 // conenction string appropriately!
	 const conf = JSON.parse(data);
	 dbconf = conf.dbconf;
} else {
	 // if we're not in PRODUCTION mode, then use
	 dbconf = 'mongodb://localhost/dv758';
}
mongoose.connect('mongodb://denisa:denisa@cluster0-shard-00-00-6zr15.mongodb.net:27017,cluster0-shard-00-01-6zr15.mongodb.net:27017,cluster0-shard-00-02-6zr15.mongodb.net:27017/Wheel-of_Meals?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
