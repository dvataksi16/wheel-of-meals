# The Wheel of Movies

## Overview

I'm here to answer the million dollar question: "What movie are we watching tonight?" So much time is spent deciding, debating arguing over what to watch. Now, with The Wheel of Movies, you can let go of the responsibility of deciding on what to watch and leave it to fate. You, your friends, family, and coworkers and choose a movie you'll enjoy with confidence!

The Wheel of Movies is a web app that will allow users to randomly get assigned to a movie. Once a user logins, they can look at their saved movies, add a movie to be put in the random pool, look at nearby theaters, or pick a movie. Users also have an option to filter through their preferred genres for more accurate results. Once a movie is picked the user can also choose to pick again, or favorite the movie.

## Data Model

The Wheel of Movies will store Users and Food Establishments.

* each user stores information
* each restaurant list stores information

User Schema will include the following info. The user general info is stored as entered, except for their password, which is encrypted and hashed in to the database to preserve safety and user protection.

An Example User:

```javascript
{
  first_name: 'dwight',
  last_name: 'shrute',
  username: "beetfarmer123",
  hash: // a password hash,
}
```


Restaurant Schema will include the following. The latitude and longitude data is stored to integrate with the Google Map.

An Example Movie:

```javascript
{
  title: "Legally Blonde",
  director: "Denisa Vataksi",
  genre: "Comedy", //used to filter
  year: "3018",
  favorite: true //used to show user favorites on mine page
}
```
(note to graders: I changed my idea from meals to movies, which is why the wireframes are about food, I'd like to change that one day to coincide with movies)

## [Link to Commented First Draft Schema](src/db.js)

## User Stories or Use Cases

1. as a user, I can log in to the site
2. as non-registered user, I can make an account
3. as a user, I can check off my favorite genres
4. as a user, I can check off no genres
5. as a user, I can have a movie picked for me
6. as a user, I can favorite the movie
7. as a user, I can spin again and have a different movie picked for me
8. as a user, I can go into my account page view my favorite Movies
9. as a user, I can add a movie to the random pool
10. as a user, I look at nearby (near Downtown NYC) movie theaters on a Google Maps


## [Link to Initial Main Project File](src/app.js)

## Annotations / References Used
1. [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/) - (add link to source code that was based on this)
