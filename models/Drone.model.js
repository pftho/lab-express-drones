// Iteration #1

// set every we need to do the Schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Define Schema -> HOW THE COLLECTION LOOKS LIKE 
const droneSchema = new Schema({
  name: { type: String },
  propellers: { type: Number },
  maxSpeed: { type: Number },
});

// Naming the collection -> CREATING THE COLLECTION IN THE DATA BASE
const Drone = mongoose.model("Drone", droneSchema);

// Making the Model accessible to other files in VSCODE
module.exports = Drone;
