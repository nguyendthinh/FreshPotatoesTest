const fs = require('fs'),
      path = require('path'),
      sqlite = require('sqlite'),
      Sequelize = require('sequelize');

var db = {};
var modelPath = path.join(__dirname + '/../models');
var sequelize = new Sequelize( {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './db/database.db'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

fs.readdirSync(modelPath).filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
  var model = sequelize.import(path.join(modelPath, file));
  db[model.name] = model;
})

module.exports = db;
