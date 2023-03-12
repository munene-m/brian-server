const asyncHandler = require("express-async-handler");
const propertyModel = require("../models/property");
const authModel = require("../models/auth");

//Create property
const createProperty = asyncHandler(async (req, res) => {
  const { name, location, size } = req.body;
  if (!name || !location || !size) {
    res.status(400);
    throw new Error("Please enter all required fields");
  }
  const property = await propertyModel.create({
    name,
    location,
    size,
    user: req.user.id,
  });
  if (property) {
    res.status(200).json({
      _id: property.id,
      name: property.name,
      location: property.location,
      size: property.size,
    });
  } else {
    res.status(400).json({ error: "An error occurred when creating property" });
  }
});

//Update property details
const updateProperty = asyncHandler(async (req, res) => {
  const property = await propertyModel.findById(req.params.id);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const user = await authModel.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const updatedProperty = await propertyModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedProperty);
});

//delete service
const deleteProperty = asyncHandler(async (req, res) => {
  const property = await propertyModel.findById(req.params.id);
  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }

  const user = await authModel.findById(req.user.id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await property.deleteOne({_id: req.params.id})
  res.status(200).json({ id: req.params.id });
});

module.exports = { createProperty, updateProperty, deleteProperty };
