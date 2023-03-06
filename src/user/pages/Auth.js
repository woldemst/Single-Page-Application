import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

import './Auth.css'

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_MINLENGTH, VALIDATOR_EMAIL} from "../../shared/util/validators";


const Auth = () => {

    const [formState, inputHandler, setFormData] = useForm(
        {
          email: {
            value: '',
            isValid: false
          },
          password: {
            value: '',
            isValid: false
          }
        },
        false
      );

    const authSubmitHandler = event => {
        event.preventDefault()
        console.log(formState.inputs);
    }


    return (
        <Card className="authentication" >
            <h2>Login required</h2>
            <hr />
            <form onSubmit={authSubmitHandler} >

                <Input
                    id="email"
                    type="email"
                    element="input"
                    label="Email"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email address."
                    onInput={inputHandler}

                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="Password"
                    validators={[VALIDATOR_MINLENGTH(5)]}
                    errorText="Please enter a valid password, at least 5 charachters."
                    onInput={inputHandler}

                />
                <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
            </form>
        </Card>
    )
}

export default Auth