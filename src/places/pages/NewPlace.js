import React from "react";

import Input from "../../shared/FormElements/Input";

import './NewPlace.scss'


export default function NewPlace(){
    return (
        <form className="place-form">
            <Input element="input" type="text" />             
        </form>
    )
}
