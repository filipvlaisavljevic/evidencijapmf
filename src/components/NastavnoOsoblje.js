import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Grid, Header,Form,Button,Icon} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import ZaposleniciPrikaz from "./ZaposleniciPrikaz";
import DodajKorisnika from "./DodajKorisnika";
import Ucitavanje from "./Ucitavanje";
import { useForm } from "react-hook-form";
import axios from "axios";

function NastavnoOsoblje({korisnik}){

    async function filtrirajTabelu(unos){
        console.info(unos)
        unos = unos.toUpperCase();
        var status = -1;
        var filter = []
        var aktivan = "Aktivan"
        var neaktivan = "Neaktivan"
        var naodmoru = "Na odmoru"
        var nabolovanju = "Na bolovanju"

        for(var i=0;i<temp.length;++i){
            var predmeti = ""
            var imeprezime = temp[i].ime + " " + temp[i].prezime
            for(var j=0;j<temp[i].predmeti.length;++j){
                predmeti+=temp[i].predmeti[j].naziv + " ";
                console.info("GORNJA")
            }
            console.info(predmeti.includes(unos))
            if(imeprezime.toUpperCase().includes(unos) || predmeti.toUpperCase().includes(unos) ||(temp[i].ime).toUpperCase().includes(unos)  || (temp[i].prezime).toUpperCase().includes(unos)
                || (neaktivan.toUpperCase().includes(unos) && temp[i].status == 2)
            || (aktivan.toUpperCase().includes(unos) && temp[i].status == 1) || (naodmoru.toUpperCase().includes(unos) && temp[i].status == 3)
                || (nabolovanju.toUpperCase().includes(unos) && temp[i].status == 4)
            ){
                console.info("DONJA")
                console.info(predmeti)
                filter.push(temp[i])
            }
        }
        setData(filter)
    }

    const handler = () =>{
        setPromjena(!promjena)
    }

    const [loading,setLoading] = React.useState(true);
    const [data,setData]=React.useState([]);
    const [temp,setTemp] = React.useState([]);
    const [promjena,setPromjena] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => filtrirajTabelu(data.unos);

    const getData=()=>{
        axios.get('http://127.0.0.1:8000/evidencija/getusers/').then(
            (response) =>{
                setData(response.data)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const getTempData=()=>{
        axios.get('http://127.0.0.1:8000/evidencija/getusers/').then(
            (response) =>{
                setTemp(response.data)
                setLoading(false)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    React.useEffect(()=>{
        getData()
    },[])

    React.useEffect(()=>{
        getData()
    },[promjena])

    React.useEffect(() =>{
        getTempData()
    },[])


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
                                    {loading == true ? <Ucitavanje/> : <ZaposleniciPrikaz data={data}/>}
                                    <DodajKorisnika handler={handler}/>
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

export default NastavnoOsoblje