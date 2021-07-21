import React from "react"
import {Button, Dropdown, Form} from "semantic-ui-react";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import HorizontalDivider from "./HorizontalDivider";
import {useForm} from "react-hook-form";
import axios from "axios";

function DodajRadOdKuceKorisnik({handler,id}){

    const [currentRange, setNewRange] = React.useState([]);
    const onChange = (event, data) => setNewRange(data.value);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => obradiFormu(data);

    const obradiFormu=(data)=>{
        console.log(data)
        axios.post('http://127.0.0.1:8000/evidencija/posaljizahtjev/',{
            korisnik: id,
            opis: data.aktivnost,
            pocetak: currentRange[0],
            kraj: currentRange[1]
        }).then(handler())
    }

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Field>
                    <label>Izaberite datum:</label>
                    <SemanticDatepicker onChange={onChange} showToday={true} type={"range"}/>
                </Form.Field>

                <Form.Group grouped>
                    <label>Aktivnosti zaposlenika:</label>
                    <Form.Field label='Priprema ispita' control='input' type='checkbox' value={"Priprema ispita"} name={"pripremaispita"} {...register("aktivnost")}/>
                    <Form.Field label='Ispravljanje ispita' control='input' type='checkbox' value={"Ispravljanje ispita"} name={"ispravljaneispita"} {...register("aktivnost")}/>
                    <Form.Field label='NI rad' control='input' type='checkbox' value={"NI rad"} name={"nirad"} {...register("aktivnost")}/>
                    <Form.Field label='Rad na disertaciji' control='input' type='checkbox' value={"Rad na disertaciji"} name={"disertacija"} {...register("aktivnost")}/>
                    <Form.Field label='Online konsultacije' control='input' type='checkbox' value={"Online konsultacije"} name={"konsultacije"} {...register("aktivnost")}/>
                    <Form.Field label='Ostalo' control='input' type='checkbox' value={"Ostalo"} name={"ostalo"} {...register("aktivnost")}/>
                </Form.Group>

                <HorizontalDivider/>
                <Button type='submit' className={"rasiri"}>Evidentiraj zaposlenika</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    )
}

export default DodajRadOdKuceKorisnik