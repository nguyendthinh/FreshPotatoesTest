const sqlite = require('sqlite'),
      Sequelize = require('sequelize'),
      request = require('request'),
      express = require('express'),
      app = express();

var db = require('./models/index');
const { PORT=3000, NODE_ENV='development', DB_PATH='./db/database.db' } = process.env;

// START SERVER
Promise.resolve()
  .then(() => app.listen(PORT, () => console.log(`App listening on port ${PORT}`)))
  .catch((err) => { if (NODE_ENV === 'development') console.error(err.stack); });

// ROUTES
app.get('/films/:id/recommendations', getFilmRecommendations);

// ROUTE HANDLER
function getFilmRecommendations(req, res) {

  db.Films.findAll({
    where: {
      id: req.params.id
    }

  }).then(function(film){
    var genreID = film[0].genre_id;
    var releaseYear = parseInt(film[0].release_date.substring(0,4));
    // var releaseDate = film[0].release_date;
    // var releaseYear = parseInt(releaseDate.substring(0,4));
    var fifteenYearsBefore = (releaseYear - 15);
    var fifteenYearsAfter = (releaseYear + 15);
    var recommendedFilms = [];

    db.Films.findAll({
      where: {
        genre_id: genreID
      }

    }).then(function(selectedFilms){

      for (var i = 0; i < selectedFilms.length; i++){
        var grabYear = parseInt(selectedFilms[i].release_date.substring(0, 4));
        if (grabYear <= fifteenYearsAfter && grabYear >= fifteenYearsBefore){
          recommendedFilms.push(selectedFilms[i]);
        }
      }

      res.json({'recommendations': recommendedFilms});

    })

  })
}

module.exports = app;
