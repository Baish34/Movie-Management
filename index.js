const express = require("express");
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Movies1 } = require("./models/movie.models");

app.use(cors(corsOptions));
app.use(express.json());

initializeDatabase();

// const newMovie = {
//   title: "Stree",
//   director: "Amar Kaushik",
//   genre: "Horror",
// };

// async function createMovie(newMovie) {
//   try {
//     const movie = new Movies1(newMovie);
//     const saveMovie = await movie.save();
//     console.log("New Movie data:", saveMovie);
//   } catch (error) {
//     throw error;
//   }
// }

// createMovie(newMovie);

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.get("/movies1", async (req, res) => {
  try {
    const allmovies = await Movies1.find();
    res.json(allmovies);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific movie by ID
app.get("/movies1/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const movie = await Movies1.findById(movieId);
    if (!movie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies1", async (req, res) => {
  const { title, director, genre } = req.body;

  try {
    const movieData = new Movies1({ title, director, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})

// Update a movie
app.put("/movies1/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedMovieData = req.body;

  try {
    const updatedMovie = await Movies1.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a movie
app.delete("/movies1/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movies1.findByIdAndRemove(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
