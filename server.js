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
        app.get('/api/cars', async (req, res) => {
            // Console log to test route is active
            console.log(`Finding cars in database.`)
            // Create a results variable that will hold all the Cars in our database
            const results = await Car.find({});
            // Respond with ok and return all Cars found in results
            res.status(200).send(results);
        })

        // READ ONE (Show 1)
        app.get('/api/cars/:id', async (req, res) => {
            // Console log to test route is active
            console.log(`Finding car with ID#: ${req.params.id}`);
            // Find car result using ID parameter
            const result = await Car.find({_id: req.params.id});
            // Respond with ok if successful and return the result found
            res.status(200).send(result);
        })
        // UPDATE (Update)
        app.patch('/api/cars/:id', async (req, res) => {
            // Console log to test route is active
            console.log(`Finding car with ID# ${req.params.id} to update.`);
            // Find car with specific ID # and update new info from req.body
            await Car.findOneAndUpdate({_id: req.params.id},
                {
                    make: req.body.make,
                    model: req.body.model,
                    year: req.body.year,
                    price: req.body.price,
                    style: req.body.style
                });
            // Response with 200 if successful and send update
            res.status(200).send(`Successfully updated car ID#: ${req.params.id}`)
        });

        // DELETE (Delete)


// LISTENING ON PORT
app.listen(PORT, err => {
    console.log(err || `Server listening on PORT ${PORT}`)
})
