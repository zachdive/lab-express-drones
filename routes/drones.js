const express = require('express');
const router = express.Router();

const Drone = require("../models/Drone.model")

// require the Drone model here

router.get('/drones', async (req, res,) => {
  const drones = await Drone.find();
  res.render("drones/list", {drones});
});

router.get('/drones/create', (req, res,) => {
  res.render("drones/create-form");
});


router.post('/drones/create', async (req, res,) => {
  const { name, propellers, maxSpeed  } = req.body;
  await Drone.create({ name, propellers, maxSpeed })
  res.redirect("/drones");
});

router.get('/drones/:id/edit', async (req, res) => {
  const drone = await Drone.findById(req.params.id);
  res.render("drones/update-form", drone);
});

router.post('/drones/:id/edit', async (req, res) => {
  const { name, propellers, maxSpeed} = req.body;
  await Drone.findByIdAndUpdate(req.params.id, {
      name,
      propellers,
      maxSpeed,
     
  });
  res.redirect("/drones");
  });


router.post('/drones/:id/delete', async (req, res) => {
  const drone = await Drone.findById(req.params.id);
  console.log(drone);
  await Drone.findByIdAndDelete(req.params.id);
  res.redirect("/drones");
});


module.exports = router;
