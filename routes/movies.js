const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

//creating new movie details
router.post('/', async (req, res) => {
    const movie = new Movie({
        name: req.body.name,
        img: req.body.img,
        summary: req.body.summary
    });
    try {
        const savedMovie = await movie.save();
        res.status(201).json(savedMovie);
    }catch (err) {
        res.status(400).json({message: err.message});
    }
});


//it will gets all data from the server
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


//it will get movie details based on the id
router.get('/:id', getMovie, (req, res) => {
    res.json(res.movie);
});


//it will update the movie details based on the id
router.patch('/:id', getMovie, async (req, res) => {
    if (req.body.name != null) {
        res.movie.name = req.body.name;
    }
    if (req.body.img != null){
        res.movie.img = req.body.img;
    }
    if (req.body.summary != null) {
        res.movie.summary = req.body.summary;
    }
    try {
        const updatedMovie = await res.movie.save();
        res.json(updatedMovie);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


//it will delete movie based on the id
router.delete('/:id', getMovie, async (req, res) => {
    try {
        await res.movie.deleteOne(); 
        res.json({ message: 'Deleted Movie' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//middleWare function
async function getMovie(req, res, next) {
    let movie;
    try {
        movie = await Movie.findById(req.params.id);
        if (movie == null) {
            return res.status(400).json({message: 'Cannot find movie'});
        }
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

    res.movie = movie;
    next();
}

module.exports = router;