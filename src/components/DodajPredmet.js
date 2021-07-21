import React from "react"
import {Button, Select, Dropdown, Form, Header, Icon, Modal} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import HorizontalDivider from "./HorizontalDivider";
import {useForm} from "react-hook-form";
import axios from "axios";

function DodajPredmet({profesori,asistenti,handler}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const[open,setOpen]=React.useState(false)
    const onSubmit = data => dodajPredmet(data);

    const dodajPredmet=(data) =>{
        axios.post('http://127.0.0.1:8000/evidencija/addpredmet/',{
            naziv: data.naziv,
            godina: data.godina,
            sifra: data.sifra,
            ects: data.ects,
            semestar: data.semestar,
            profesor: data.profesor,
            asistent: data.asistent
        }).then(handler())
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Field>
                    <label>Unesite naziv predmeta:</label>
                    <input placeholder='Naziv predmeta kojeg želite dodati' {...register("naziv")}/>
                </Form.Field>

                <Form.Field>
                    <label>Unesite akademsku godinu predmeta:</label>
                    <input type={"number"} placeholder='Akademska godina u kojoj će predmet biti aktivan' {...register("godina")}/>
                </Form.Field>

                <Form.Field>
                    <label>Unesite šifre predmeta:</label>
                    <input placeholder='Šifra predmeta koja će bilježiti predmet' {...register("sifra")}/>
                </Form.Field>

                <Form.Field>
                    <label>Unesite ECTS bodove predmeta:</label>
                    <input type={"number"} placeholder='Broj ECTS bodova predmeta kojeg želite dodati' {...register("ects")}/>
                </Form.Field>

                <Form.Field>
                    <label>Izaberite semestar u kojem će predmet biti aktivan: </label>
                    <select clearable  {...register("semestar")}>
                        <option value={1}>I semestar</option>
                        <option value={2}>II semestar</option>
                        <option value={3}>III semestar</option>
                        <option value={4}>IV semestar</option>
                        <option value={5}>V semestar</option>
                        <option value={6}>VI semestar</option>
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Izaberite profesora koji će predavati na predmetu:</label>
                    <select placeholder={"Iz liste nastavnog osoblja odaberite zaposlenika"} clearable {...register("profesor")}>
                        {profesori.map((profesor) => (
                            <option value={profesor.id}>{profesor.ime} {profesor.prezime}</option>
                        ))}
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Izaberite asistenta koji će predavati na predmetu:</label>
                    <select placeholder={"Iz liste nastavnog osoblja odaberite zaposlenika"} clearable{...register("asistent")}  >
                        {asistenti.map((asistent) => (
                            <option value={asistent.id}>{asistent.ime} {asistent.prezime}</option>
                        ))}
                    </select>
                </Form.Field>


                <HorizontalDivider/>
                <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                    trigger={<Button type='submit' className={"rasiri"}>Dodaj predmet</Button>}
                >
                    <Header icon>
                        <Icon name='checkmark' />
                        Uspješno ste dodali predmet
                    </Header>
                </Modal>
            </Form>
        <HorizontalDivider/>
    </div>
    )
}

export default DodajPredmet