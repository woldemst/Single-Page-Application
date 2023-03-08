const express = require('express');

const router = express.Router();

const DUMMMY_PLACES = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484405,
      lng: -73.9878584
    },
    creator: 'u1'
  },
] 

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid // params already exists in the express
  // we can achive thes dynamic url part after the column :pid  and get concret value
  const place = DUMMMY_PLACES.find(p => {
    return p.id === placeId;
  })
  res.json({ place }); // => { place } => { place: place }
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const place = DUMMMY_PLACES.find(p => {
    return p.creator === userId;
  });
  res.json({ place  });
});



module.exports = router;