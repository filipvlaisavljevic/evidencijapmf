import React, {useState} from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Dropdown,Button, Form} from "semantic-ui-react";
import SemanticDatepicker from 'react-semantic-ui-datepickers';
import 'react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css';
import axios from "axios";
import {useForm} from "react-hook-form";

function DodajRadOdKuce({handler,korisnik}){
    //Prikaz samo dekanu ili šefu odsjeka
    const [data,setData]=React.useState([]);
    const [currentRange, setNewRange] = useState([]);
    const onChange = (event, data) => setNewRange(data.value);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => obradiFormu(data);

    const obradiFormu=(data)=>{
        console.log(data)
        axios.post('http://127.0.0.1:8000/evidencija/posaljizahtjev/',{
            korisnik: data.idr,
            rank: korisnik.rank,
            opis: data.aktivnost,
            pocetak: currentRange[0],
            kraj: currentRange[1]
        }).then(handler())
    }

    const getData=()=>{
        axios.get('http://127.0.0.1:8000/evidencija/getusers/').then(
            (response) =>{
                setData(response.data)
                console.info("PODACI")
                console.info(data)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    React.useEffect(() =>{
        getData()
    },[])

    return(
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Field>
                    <label>Izaberite zaposlenika:</label>
                    <select {...register("idr")}>
                        {data.map((user) =>(
                            <option value={user.id} > {user.ime} {user.prezime}</option>
                        ))}
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Izaberite datum:</label>
                    <SemanticDatepicker onChange={onChange} showToday={true} type={"range"}/>
                </Form.Field>

                <Form.Group grouped>
                    <label>Aktivnosti zaposlenika:</label>
                    <Form.Field label='Priprema ispita' control='input' type='radio' value={"Priprema ispita"} name={"pripremaispita"} {...register("aktivnost")}/>
                    <Form.Field label='Ispravljanje ispita' control='input' type='radio' value={"Ispravljanje ispita"} name={"ispravljaneispita"} {...register("aktivnost")}/>
                    <Form.Field label='NI rad' control='input' type='radio' value={"NI rad"} name={"nirad"} {...register("aktivnost")}/>
                    <Form.Field label='Rad na disertaciji' control='input' type='radio' value={"Rad na disertaciji"} name={"disertacija"} {...register("aktivnost")}/>
                    <Form.Field label='Online konsultacije' control='input' type='radio' value={"Online konsultacije"} name={"konsultacije"} {...register("aktivnost")}/>
                    <Form.Field label='Ostalo' control='input' type='radio' value={"Ostalo"} name={"ostalo"} {...register("aktivnost")}/>
                </Form.Group>

                <HorizontalDivider/>
                <Button type='submit' className={"rasiri"}>Evidentiraj zaposlenika</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    );
}

export default DodajRadOdKuce