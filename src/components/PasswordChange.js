import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form, Header} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function PasswordChange({korisnik,logout}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => promijeniSifru(data);

    function promijeniSifru(data){
        if(data.password1 === data.password2){
            axios.post('http://127.0.0.1:8000/evidencija/changepassword/',{
                username:korisnik.username,
                password:data.password1
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
        else{
            alert('Lozinke se ne podudaraju.')
        }
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Nova lozinka naloga:</label>
                    <input placeholder='Nova lozinka' {...register("password1")}/>
                </Form.Field>
                <Form.Field>
                    <label>Potvrdite novu lozinku:</label>
                    <input placeholder='Potvrda nove lozinke' {...register("password2")}/>
                </Form.Field>
                <Button type='submit' className={"rasiri"}>Potvrdi</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default PasswordChange