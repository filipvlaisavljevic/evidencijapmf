import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";

function Register({postaviSesiju,postaviKorisnika}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => napraviKorisnika(data);

    function napraviKorisnika(data){
        axios.post('http://127.0.0.1:8000/evidencija/adduser/',{
            ime: data.ime,
            prezime: data.prezime,
            password: data.password,
            email: data.email,
            username: data.username
        }).then(
            (response) =>{
                postaviSesiju()
                console.info(response.data[0].fields)
                postaviKorisnika(response.data[0].fields)
                return <Redirect to={'/'}/>
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
                    <label>Vaše ime:</label>
                    <input placeholder={"Unesite Vaše ime"} {...register("ime")}/>
                </Form.Field>
                <Form.Field>
                    <label>Vaše prezime:</label>
                    <input  placeholder={"Unesite Vaše prezime"} {...register("prezime")}/>
                </Form.Field>
                <Form.Field>
                    <label>Vaša e-mail adresa:</label>
                    <input placeholder={"Unesite Vašu e-mail adresu"} {...register("email")}/>
                </Form.Field>
                <Form.Field>
                    <label>Željeno korisničko ime:</label>
                    <input placeholder={"Unesite željeno korisničko ime"} {...register("username")}/>
                </Form.Field>
                <Form.Field>
                    <label>Željena lozinka:</label>
                    <input  type={"password"} placeholder={"Unesite željenu lozinku"} {...register("password")}/>
                </Form.Field>
                <HorizontalDivider/>
                <Button type='submit' className={"rasiri"}>Napravi korisnički nalog</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default Register