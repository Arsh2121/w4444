/***************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Dhivi Narahari
   ID: 156429219
   Date: 1/20/2023

*
****************************/

const express = require("express");

const cors = require("cors");

const app = express();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

require("dotenv").config();

app.use(cors());

app.use(express.json());

const HTTP_PORT = process.env.PORT || 8080;


app.get("/", function (req, res) {
  res.json({ message: "API Listening" });
});



app.post('/api/movies', (req, res) => {
    const body = req.body;
    db.addNewMovie(body) .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json({ error: err });
        })
});
    

app.get("/api/movies", (req, res)=> {
    db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});



app.get("/api/movies/:id", (req, res)=> {
    db.getMovieById(req.params.id)
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});
    
app.put("/api/movies/:id", (req, res)=> {
    db.updateMovieById(req.body, req.params.id)
    .then((data) => {
        res.status(200).json(data);
    })
    .catch((err) => {
        res.status(500).json(err);  
    });
});


app.delete("/api/movies/:id", (req, res)=> {
    db.deleteMovieById(req.params.id)
    .then(() => {
        res.status(200).json('Movie deleted');      
    })
    .catch((err) => {
        res.status(500).json(err);
    });
});



db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  }).catch((err) => { console.log(err);
  });