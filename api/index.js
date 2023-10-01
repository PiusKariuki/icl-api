const {indexRoutes} = require("../routes");
const app = require('express')()
const mongoose = require("mongoose")
// middleware
const cors = require("cors")
const bodyParser = require("body-parser");

// load .env file into environment object
require("dotenv").config()


app.use(cors())

// Parse JSON data in request body
app.use(bodyParser.json())


/**
 * Mounting our routes
 */
app.use('/api', indexRoutes)

// for vercel
app.use('/api', (req, res, next) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
});


/**
 * Database connection
 */
mongoose
    .connect(process.env.DATABASE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Database connected')
    })
    .catch((err) => console.log(err));


module.exports = app