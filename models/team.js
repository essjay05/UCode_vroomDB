// REQUIRE MONGOOSE
const mongoose = require('mongoose');

// Create TEAM schema
const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Superhero'}]
}, { timestamps: true });

// Make exportable... creating "name to call" and template/schema for team
module.exports = mongoose.model('Team', teamSchema);