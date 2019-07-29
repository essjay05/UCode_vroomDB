// Require DOTENV file
require('dotenv').config();

// Require constants:
const 
    express = require('express'),
    app = express(),
    Car = require('./models/carSchema'),
    bodyParser = require('body-parser'),
    path = require('path'),
    PORT = process.env.PORT || 8000;

// Connect to database:
require('./db/mongoose');

// MIDDLEWARE connection:
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public/views'));

// ROUTES
    // HOME Route
    app.get('/', (req, res) => {
        res.json({ Success : true})
    });
    // API Root ROUTE
    app.get('/api', (req, res)=> {
        res.json({ message : `API Root`})
    });
    // CRUD Routes: Create (POST), Read (GET), Update (PATCH/PUT), Delete(DELETE/DESTROY)
        // CREATE ROUTE
        app.post('/api/cars', async (req, res) => {
            // Test to make sure your route is working
            console.log(req.body);
            // Create a new instance of Car by assigning the keys to the req.body keys
            const car = new Car({
                make: req.body.make,
                model: req.body.model,
                year: req.body.year,
                price: req.body.price,
                style: req.body.style
            });
            // Save the new instance of Car
            await car.save();
            // Response 
            res.status(200).send(`Car successfully posted: ${car}`)
        });

        // READ ALL (Index)

        // READ ONE (Show 1)

        // UPDATE (Update)

        // DELETE (Delete)


// LISTENING ON PORT
app.listen(PORT, err => {
    console.log(err || `Server listening on PORT ${PORT}`)
})
