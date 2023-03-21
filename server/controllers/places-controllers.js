// const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");

// let DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Empire State Building",
//     description: "One of the most famous sky scrapers in the world!",
//     location: {
//       lat: 40.7484474,
//       lng: -73.9871516,
//     },
//     address: "20 W 34th St, New York, NY 10001",
//     creator: "u1",
//   },
// ];

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }

  // const place = DUMMY_PLACES.find(p => {
  //   return p.id === placeId;
  // });

  let place;
  try {
    // const place = Place.findById().exac() to return a prommmice
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find place.",
      500
    );
    return next(error);
  }

  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided id.",
      404
    );
    return next(error);
  }

  // development
  // res.json({ place }); // => { place } => { place: place }

  // moved to normal js object
  res.json({ place: place.toObject({ getters: true }) });
};

// function getPlaceById() { ... }
// const getPlaceById = function() { ... }

// http://localhost:5000/api/places/user/userId
const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // const places = DUMMY_PLACES.filter((p) => {
  //   return p.creator === userId;
  // });

  let places;

  try {
    // if you want to return a prommise
    // places = await Place.find(userId).exec();
    //find return all places

    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find places for the provided user id.", 404)
    );
  }

  // .find() returns an array and we can't use .toObject() method
  //that why we use a .map() method atfirst
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title;
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  //  createdPlace.save();
  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)

    ) 
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;

  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  // used DUMMY DEV
  // const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  // updatedPlace.title = title;
  // updatedPlace.description = description;

  //used for mongodb
  place.title = title;
  place.description = description;

  // used DUMMY DEV
  // DUMMY_PLACES[placeIndex] = updatedPlace;

  //used for mongodb
  try {
    place.save(); // mongoose method
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update place.",
      500
    );
    return next(error);
  }

  // DUMMY DEV
  // res.status(200).json({ place: updatedPlace });

  // mongo. convert mongoose obj to normal JS obj.
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  // DUMMY DEV
  // if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
  //   throw new HttpError("Could not find a place for that id.", 404);
  // }
  // DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  // res.status(200).json({ message: "Deleted place." });

  let place;
  try {
    place = await Place.findById(placeId);
    // const place = await Place.findByIdAndDelete(placeId);

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  
  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  try {
    await place.deleteOne();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete place.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted place.' });
};


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
