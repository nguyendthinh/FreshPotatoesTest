module.exports = function(sequelize, DataTypes) {

  var Film = sequelize.define('Films'. {
    title: DataTypes.STRING,
    release_date: DataTypes.DATE,
    tagline: DataTypes.STRING,
    revenue: DataTypes.INTEGER,
    budget: DataTypes.INTEGER,
    runtime: DataTypes.INTEGER,
    original_language: DataTypes.STRING,
    status: DataTypes.STRING,
    genre_id: DataTypes.INTEGER
  });

  return Film;

};