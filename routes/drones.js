const express = require("express");
const router = express.Router();
const importedDroneSchema = require("../models/Drone.model.js");

router.get("/drones", (req, res, next) => {
  importedDroneSchema
    .find({})
    .then((droneData) => {
      //  console.log(droneData);
      res.render("drones/list", { droneData });
    })
    .catch((error) => `Error while fetching all drones: ${error}`);
});

//"/drones/create" => page url // drones/create-form => reference to hbs page
router.get("/drones/create", (req, res, next) => {
  res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
  // Creating the properties for the new drone using the "name" in form input
  const { name, propellers, maxSpeed } = req.body; //this is a POST so we use rq.body to get the data
  importedDroneSchema
    .create({ name, propellers, maxSpeed })
    .then(() => res.redirect("/drones"))
    .catch((error) => {
      res.redirect("/drones/create");
    });
});

router.get("/drones/:droneId/edit", (req, res, next) => {
  const { droneId } = req.params;

  importedDroneSchema.findById(droneId).then((droneToModify) => {
    //console.log("here is your data:", droneToModify);
    res.render("drones/update-form", { droneToModify });
  });
});

router.post("/drones/:droneId/edit", (req, res, next) => {
  const { droneId } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  importedDroneSchema
    .findByIdAndUpdate(
      droneId,
      {
        name,
        propellers,
        maxSpeed,
      },
      { new: true }
    )
    .then((updatedDrone) => {
      console.log("this is the drone we want", updatedDrone);
      res.redirect("/drones");
    })
    .catch(() => {
      res.redirect(`/drones/${droneId}/edit`);
    });
});

router.post("/drones/:droneId/delete", (req, res, next) => {
  const { droneId } = req.params;

  importedDroneSchema
    .findByIdAndDelete(droneId)
    .then(() => res.redirect("/drones"))
    .catch((error) => `Error while deleting drone: ${error}`);
});

module.exports = router;
