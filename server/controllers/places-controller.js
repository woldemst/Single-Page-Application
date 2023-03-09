const uuidv4 = require('uuidv4')

const HttpError = require("../models/http-error");

const DUMMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1", 
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.pid; // params already exists in the express
  // we can achive thes dynamic url part after the column :pid  and get concret value
  const place = DUMMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place }); // => { place } => { place: place }
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place) {
    return new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }

  res.json({ place });
};

const createPlace = (req, res, next) => {
    const {title, description, coordinates, address, creator} = req.body; 

    const createdPlace = {
        id: uuidv4(),
        title, 
        description, 
        location: coordinates, 
        address, 
        creator
    }

    DUMMMY_PLACES.push(createdPlace) // or unshift(createdPlace)

    res.status(201).json({place: createdPlace})
     // status 201  if  you successfuly sent somwething 

}

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;