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

app.post("/movies1", async (req, res) => {
  const { title, author, genre } = req.body;

  try {
    const movieData = new Movies1({ title, author, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
