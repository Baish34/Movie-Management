const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  genre: String,
});

const Movies1 = mongoose.model("Movies1", movieSchema);

module.exports = { Movies1 };
