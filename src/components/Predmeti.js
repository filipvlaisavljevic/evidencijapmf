import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Button, Form, Grid, Header} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import ListaPredmeta from "./ListaPredmeta";
import DodajPredmet from "./DodajPredmet";
import PredmetiKorisnik from "./PredmetiKorisnik";
import Ucitavanje from "./Ucitavanje";
import axios from "axios";
import {useForm} from "react-hook-form";

function Predmeti({korisnik,id}){
    const [svipredmeti,setSviPredmeti] = React.useState([]);
    const [loading,setLoading] = React.useState(true);
    const [temp,setTemp] = React.useState([]);
    const [profesori,setProfesori] = React.useState([])
    const [asistenti,setAsistenti] = React.useState([])
    const [promjena,setPromjena] = React.useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => filtrirajTabelu(data.unos);

    async function filtrirajTabelu(unos){
        console.info(unos)
        unos = unos.toUpperCase();
        var filter = []
        console.info(temp)
        for(var i=0;i<temp.length;++i){
            var imeprezimeprof = temp[i].profesor.ime + " " + temp[i].profesor.prezime
            var imeprezimeasis = temp[i].asistent.ime + " " + temp[i].asistent.prezime
            if(imeprezimeprof.toUpperCase().includes(unos) || temp[i].naziv.toUpperCase().includes(unos)
                || String(temp[i].semestar).includes(unos) || String(temp[i].godina).includes(unos) ||
                String(temp[i].ects).includes(unos) || String(temp[i].sifra).includes(unos)
                || imeprezimeasis.toUpperCase().includes(unos)
            ){
                filter.push(temp[i])
            }
        }
        setSviPredmeti(filter)
    }

    const getSviPredmeti=()=>{
        axios.post('http://127.0.0.1:8000/evidencija/getpredmeti/',{id:id,rank:korisnik.rank}).then(
            (response) =>{
                console.info(response.data)
                setSviPredmeti(response.data)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const getProfesori=()=>{
        axios.get('http://127.0.0.1:8000/evidencija/getprofesori/').then(
            (response) =>{
                console.info(response.data)
                setProfesori(response.data)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const getAsistenti=()=>{
        axios.get('http://127.0.0.1:8000/evidencija/getasistenti/').then(
            (response) =>{
                console.info(response.data)
                setAsistenti(response.data)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const getTempData=()=>{
        axios.post('http://127.0.0.1:8000/evidencija/getpredmeti/',{id:id,rank:korisnik.rank}).then(
            (response) =>{
                console.info("RESPONSE")
                console.info(response.data)
                setTemp(response.data)
                setLoading(false)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const handler = () =>{
        setPromjena(!promjena)
    }


    React.useEffect(() => {
        getTempData();
    },[])

    React.useEffect(() => {
       getProfesori()
    },[])

    React.useEffect(() => {
       getAsistenti()
    },[])

    React.useEffect(() => {
        getSviPredmeti();
    },[promjena])


    return(
        <div>
            <HorizontalDivider/>
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Header as={'h4'} className={"oboji"}>Sadržaj stranice</Header>
                        <SidebarMenu korisnik={korisnik}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid stackable>
                            <Grid.Row columns={1}>
                                <Grid.Column width={16}>
                                    <Form onChange={handleSubmit(onSubmit)}>
                                        <Form.Group>
                                            <Form.Input placeholder={"Unesite pojam za pretragu"} {...register("unos")}></Form.Input>
                                            <Button>Potvrdi</Button>
                                        </Form.Group>
                                    </Form>
                                    {loading == true ? <Ucitavanje/> :
                                        <ListaPredmeta predmeti={svipredmeti} profesori={profesori} asistenti={asistenti} handler={handler} korisnik={korisnik}/>}
                                        <HorizontalDivider/>
                                    {korisnik.rank ==1 ?
                                        loading == true ?<Ucitavanje/> : <DodajPredmet profesori={profesori} asistenti={asistenti} handler={handler}/>
                                        :<div></div>
                                    }

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <HorizontalDivider/>
        </div>
    );
}

export default Predmeti;