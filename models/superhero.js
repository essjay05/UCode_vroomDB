// Require mongoose
const mongoose = require('mongoose');

// Create Quote Schema
const quoteSchema = new mongoose.Schema({ 
    line: String 
}, { timestamps: true });

// Create Superhero Schema
const superheroSchema = new mongoose.Schema({
    heroName: { type: String, required: true},
    alias: { type: String, required: true},
    placeOfBirth: { type: String},
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
    quotes: [quoteSchema]
}, { timestamps: true });

// Make this a Model
const Superhero = mongoose.model('Superhero', superheroSchema);

// Make exportable
module.exports = Superhero;