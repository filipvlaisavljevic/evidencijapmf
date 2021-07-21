import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import { useForm } from "react-hook-form";
import axios from "axios";

function DodajKorisnika({handler}){

    const addUser=(data)=>{
        axios.post('http://127.0.0.1:8000/evidencija/adduser/',
            {
            ime: data.ime,
            prezime: data.prezime,
            username: data.username,
            email: data.email,
                rank:data.rank
            }).then(
            (response) =>{
                console.log(response)
                {
                    handler()
                }
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => addUser(data);
    const[open,setOpen]=React.useState(false)

    return(
        <div>
            <HorizontalDivider/>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field >
                    <label>Ime:</label>
                    <input error='Please enter your last name' placeholder='Ime korisnika kojeg želite dodati' {...register("ime")}/>
                </Form.Field>

                <Form.Field>
                    <label>Prezime: </label>
                    <input placeholder='Prezime korisnika kojeg želite dodati' {...register("prezime")}/>
                </Form.Field>

                <Form.Field>
                    <label>Korisničko ime:</label>
                    <input placeholder='Korisničko ime korisnika kojeg želite dodati' {...register("username")}/>
                </Form.Field>

                <Form.Field>
                    <label>E-mail:</label>
                    <input placeholder='Račun elektronske pošte korisnika kojeg želite dodati' {...register("email")}/>
                </Form.Field>

                <Form.Field>
                    <label>Pozicija korisnika:</label>
                    <select {...register("rank")}>
                        <option value={1}>Šef odsjeka</option>
                        <option value={1}>Dekan</option>
                        <option value={2}>Profesor</option>
                        <option value={3}>Asistent</option>
                    </select>
                </Form.Field>

                <HorizontalDivider/>
                <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                    trigger={<Button type='submit' className={"rasiri"}>Kreiraj korisnika</Button>}
                >
                    <Header icon>
                        <Icon name='checkmark' />
                        Uspješno ste dodali korisnika
                    </Header>
                </Modal>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default DodajKorisnika