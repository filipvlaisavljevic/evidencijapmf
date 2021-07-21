import React, {useState} from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Dropdown,Button, Form,Modal,Header,Icon} from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import {useForm} from "react-hook-form";
import axios from "axios";

function DodajEvidenciju({korisnik,predmeti,handler}){

    const [currentDate, setNewDate] = useState(null);
    const onChange = (event, data) => setNewDate(data.value);
    const [open,setOpen] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => dodajNastavu(data);

    function dodajNastavu(data){
        axios.post('http://127.0.0.1:8000/evidencija/dodajnastavu/',{
            predmet: data.predmet,
            datum: data.datum,
            vrsta: data.vrsta
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

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Field>
                    <label>Izaberite predmet:</label>
                    <select  {...register("predmet")} >
                        {console.info(korisnik)}
                        {predmeti.map((predmet) => (
                            <option value={predmet.id} selected>{predmet.naziv} </option>
                        ))}
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Izaberite datum održavanja nastave:</label>
                    <input type={"date"} {...register("datum")}/>
                </Form.Field>

                <Form.Field>
                    <label   >Oblik nastave:</label>
                    <select  {...register("vrsta")} >
                        <option value={1} selected>Predavanje</option>
                        <option value={2}>Laboratorijske vježbe</option>
                    </select>
                </Form.Field>

                <HorizontalDivider/>
                <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                    trigger={<Button type='submit' className={"rasiri"}>Evidentiraj predmet</Button>}
                >
                    <Header icon>
                        <Icon name='checkmark' />
                        Uspješno ste evidentirali nastavu
                    </Header>
                </Modal>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default DodajEvidenciju