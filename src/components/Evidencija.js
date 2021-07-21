import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Card, Grid, Header,Message} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import DodajEvidenciju from "./DodajEvidenciju";
import EvidencijaTabela from "./EvidencijaTabela";
import axios from "axios";
import Ucitavanje from "./Ucitavanje";

function Evidencija({korisnik,id}){
    const [loading,setLoading] = React.useState(false)
    const [odrzananastava,setOdrzananastava] = React.useState([])
    const [svipredmeti,setSviPredmeti] = React.useState([])
    const [promjena,setPromjena] = React.useState(false)

    function getOdrzanaNastava(){
        axios.post('http://127.0.0.1:8000/evidencija/getodrzananastava/',{id:id,rank:korisnik.rank}).then(
            (response) =>{
                console.info(response.data)
                setOdrzananastava(response.data)
                setLoading(false)
            },
            (error) =>{
                console.log(error)
            }
        )
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

    function handler(){
        setPromjena(prevState => !prevState)
    }


    React.useEffect(() =>{
       getSviPredmeti()
    },[])

    React.useEffect(() =>
    {getOdrzanaNastava()},[])

    React.useEffect(() =>{
        getOdrzanaNastava()
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
                                    <Header as={'h4'} className={"oboji rasiri"}>Prikaz završene nastave</Header>
                                    <Message >
                                        <Message.Header>Uputstvo za obradu</Message.Header>
                                        <p>Lista predmeta koji su održani prikazani su ispod. Potrebno je klikom na predmet izvršiti evidenciju
                                        održanog predmeta. Na formi ispod evidencije moguće je zakazati nadolazeće predavanje.</p>
                                    </Message>
                                    {loading == true ?
                                    <Ucitavanje/>:
                                        <EvidencijaTabela predmeti={odrzananastava} handler={() => handler()}/>}
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row columns={1}>
                                <Grid.Column width={16}>
                                    <Header as={'h4'} className={"oboji rasiri"}>Dodaj nadolazeću nastavu</Header>
                                    <DodajEvidenciju korisnik={korisnik} predmeti={svipredmeti} handler={() => handler()}/>
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

export default Evidencija