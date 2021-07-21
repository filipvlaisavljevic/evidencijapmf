import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Grid, Header,Message} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import DodajRadOdKuce from "./DodajRadOdKuce";
import ListaZaposlenika from "./ListaZaposlenika";
import DodajRadOdKuceKorisnik from "./DodajRadOdKuceKorisnik";
import KorisnikZahtjevi from "./KorisnikZahtjevi";
import Ucitavanje from "./Ucitavanje";
import axios from "axios";

function EvidencijaKuca({korisnik,id}){
    const [loading,setLoading] = React.useState(false)
    const [zahtjevi,setZahtjevi] = React.useState([])
    const [promjena,setPromjena] = React.useState(false)

    function getZahtjevi(){
        axios.post('http://127.0.0.1:8000/evidencija/getzahtjevi',{
            id:id,
            rank:korisnik.rank
        }).then(
            (response) =>{
                setZahtjevi(response.data)
                console.info(response.data)
                setLoading(false)
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    React.useEffect(() =>{
       getZahtjevi()
    },[])

    React.useEffect(() =>{
        getZahtjevi()
    },[promjena])

    const handler=()=>{
        setPromjena(!promjena);
    }

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
                            {korisnik.rank == 1  ?
                                <Grid.Row columns={1}>
                                    <Grid.Column width={16}>
                                        <Header as={'h4'} className={"oboji rasiri"}>Lista zahtjeva nastavnog osoblja</Header>
                                        <Message
                                            header='Napomena za listu zahtjeva'
                                            content='Ispod je prikazana lista svih zahtjeva nastavnog osoblja. Sivom bojom označeni su obrađeni zahtjevi dok su ostali
                                            zahtjevi neobrađeni i potrebnih ih je ili potvrditi ili odbiti.'
                                        />
                                        {loading == true ?
                                            <Ucitavanje/> :
                                            <ListaZaposlenika zahtjevi={zahtjevi} handler={() => handler()}/>
                                        }
                                        <HorizontalDivider/>
                                        <Header as={'h4'} className={"oboji rasiri"}>Obradi automatski status radnika</Header>
                                        <Message
                                            header='Napomena za zahtjeve'
                                            content='Ukoliko radnik nije u mogućnosti sam popuniti formu moguće je za njega poslati zahtjev koji se
                                            po automatizaciji sam prihvaća i zapisuje u listu iznad.'
                                        />
                                        <DodajRadOdKuce handler={() => handler()} korisnik={korisnik}/>
                                    </Grid.Column>
                                </Grid.Row> :
                                <Grid.Row columns={1}>
                                    <Grid.Column width={16}>
                                        <Header as={'h4'} className={"oboji rasiri"}>Lista zahtjeva</Header>
                                        <KorisnikZahtjevi zahtjevi={zahtjevi} handler={() => handler()}/>
                                        <Header as={'h4'} className={"oboji rasiri"}>Pošalji zahtjev za rad od kuće</Header>
                                        <DodajRadOdKuceKorisnik handler={() => handler()} id={id}/>
                                </Grid.Column>
                                </Grid.Row>
                            }
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <HorizontalDivider/>
        </div>
    );
}

export default EvidencijaKuca