import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famos sky srapers in the world!', 
        imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484445,
            lng: 73.9878531
        },
        creator:'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famos sky srapers in the world!', 
        imageUrl: 'https://marvel-b1-cdn.bc0a.com/f00000000179470/www.esbnyc.com/sites/default/files/styles/small_feature/public/2019-10/home_banner-min.jpg?itok=uZt-03Vw',
        address: '20 W 34th St., New York, NY 10001, United States',
        location: {
            lat: 40.7484445,
            lng: 73.9878531
        },
        creator: 'u2'
    }
]

export default function UserPlaces(){

    return <PlaceList items={DUMMY_PLACES} /> 
}