import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form, Header} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function UsernameChange({korisnik,logout}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => promijeniUsername(data);

    function promijeniUsername(data){
        axios.post('http://127.0.0.1:8000/evidencija/changeusername/',{
            stariusername:korisnik.username,
            username:data.username
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
                    <label>Novo korisničko ime:</label>
                    <input placeholder='Korisničko ime' {...register("username")}/>
                </Form.Field>
                <Button type='submit' className={"rasiri"}>Potvrdi</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default UsernameChange