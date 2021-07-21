import React from "react"
import {Button, Checkbox, Container, Form, Grid, Header} from 'semantic-ui-react'
import HorizontalDivider from "./HorizontalDivider";
import SidebarMenu from "./SidebarMenu";
import {useForm} from "react-hook-form";
import axios from "axios";
import  { Redirect } from 'react-router-dom'

function Login({postaviSesiju,postaviKorisnika}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => provjeriLogin(data);

    const provjeriLogin=(data)=>{
        axios.post('http://127.0.0.1:8000/evidencija/login/',{
            username:data.username,
            password:data.password
        }).then(
            (response) =>{
               if(response.data == 'False'){
                   alert('Nije validan login.')
               }else{
                   postaviKorisnika(response.data[0])
                   console.info(response.data[0].fields)
                   postaviSesiju()
               }
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <div>
            <HorizontalDivider/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Vaše korisničko ime:</label>
                    <input placeholder='Korisničko ime' {...register("username")}/>
                </Form.Field>
                <Form.Field>
                    <label>Vaša lozinka: </label>
                    <input type={"password"} placeholder='Lozinka' {...register("password")}/>
                </Form.Field>
                <HorizontalDivider/>
                <Button type='submit' className={"rasiri"}>Loguj se</Button>
            </Form>
            <HorizontalDivider/>
        </div>


    );
}

export default Login