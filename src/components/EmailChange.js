import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form, Header} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function EmailChange({korisnik,logout}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => promijeniEmail(data);

    function promijeniEmail(data){
        axios.post('http://127.0.0.1:8000/evidencija/changeemail/',{
            username:korisnik.username,
            email:data.email
        }).then(
            (response) =>{
                console.log(response)
                logout()
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Nova e-mail adresa:</label>
                    <input placeholder='E-mail adresa' {...register("email")}/>
                </Form.Field>
                <Button type='submit' className={"rasiri"}>Potvrdi</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default EmailChange