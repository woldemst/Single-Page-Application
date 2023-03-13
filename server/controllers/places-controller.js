const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

let DUMMMY_PLACES = [
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

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMMY_PLACES.filter((p) => {
    return p.creator === userId;
  });


  if (!places || places.length === 0) {
    return new HttpError(
      "Could not find a place for the provided user id.",
      404
    );
  }

  res.json({ places });
};

const createPlace = (req, res, next) => {
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMMY_PLACES.push(createdPlace); // or unshift(createdPlace)

  res.status(201).json({ place: createdPlace });
  // status 201  if  you successfuly sent somwething
};

const updatePlace = (req, res, next) => {
  const {title, description} = req.body;
  const placeId = req.params.pid; // params is already exsists in express 
  // we can achive thes dynamic url part after the column :pid  and get concret value

  const updatedPlace = {...DUMMMY_PLACES.find(p => p.id === placeId)}
  const placeIndex = DUMMMY_PLACES.findIndex(p => p.id === placeId)
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place:updatePlace})

}


const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  DUMMMY_PLACES = DUMMMY_PLACES.find(p => p.id === placeId)

  res.status(200).json({message: 'Deleted place.'})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace; 
