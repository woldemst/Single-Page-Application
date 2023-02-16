import React from "react";
// import Card from "../../shared/UIElements/Card";

import UserItem from "./UserItem";
import Card from "../../shared/UIElements/Card";

import './UserList.scss'

export default function UserList(props) {

    if (props.items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No user found</h2>
                </Card>
            </div>
        )
    }

    return (
        <ul className="users-list">
            {props.items.map(user => (
                <UserItem 
                    key={user.id} 
                    id={user.id} 
                    name={user.name} 
                    image={user.image} 
                    placeCount={user.places} 
                />
            ))}
        </ul>
    )
}