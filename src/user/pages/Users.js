import React from "react"
import UserList from "../components/UsersList"

export default function Users(){
    const USERS = [
        {
            id: 'u1',
            name: 'Max Schwartz', 
            image: 'https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png',
            places: 3
        }
    ]

    return (
        <UserList items={USERS} />
    )
}