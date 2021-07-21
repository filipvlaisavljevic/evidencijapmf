import logo from './logo.svg';
import './App.css';
import  {Button, Container,Form} from 'semantic-ui-react'
import Zaglavlje from "./components/Zaglavlje";
import Sadrzaj from "./components/Sadrzaj";
import SidebarMenu from "./components/SidebarMenu";
import Podnozje from "./components/Podnozje";
import HorizontalDivider from "./components/HorizontalDivider";

import Login from "./components/Login";
import Register from "./components/Register";
import Evidencija from "./components/Evidencija";
import EvidencijaKuca from "./components/EvidencijaKuca";
import Predmeti from "./components/Predmeti";
import NastavnoOsoblje from "./components/NastavnoOsoblje";
import Postavke from "./components/Postavke";
import StilStranice from "./components/StilStranice";
import React, { useContext, createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import axios from "axios";
import DjangoCSRFToken from "django-react-csrftoken";


function temamain(){
    return import('./index.css')
}

function temazelena(){
    return import('./novatema.css')
}

function temacrvena(){
    return import('./trecatema.css')
}


function App() {
    const[sesija,setSesija] = useState(false);
    const[korisnik,setKorisnik] = useState(JSON.parse(localStorage.getItem('korisnik')) || [])
    const[promjena,setPromjena] = useState(false);

    React.useEffect(() => {
        updateKolacic()
    },[promjena]);

    const handler=()=>{
        setPromjena(!promjena);
    }

    function postaviSesiju(){
        setSesija(true)
    }

    function zavrsiSesiju(){
        setSesija(false)
    }

    function postaviKorisnika(data){
        setKorisnik(data)
        localStorage.setItem('korisnik', JSON.stringify(data));
    }

    function provjeriSesiju(){
        if(localStorage.getItem('korisnik') === null){
            setSesija(false)
            setKorisnik([])
        }else{
            setKorisnik(JSON.parse(localStorage.getItem('korisnik')))
            setSesija(true)
            console.info(korisnik)
        }
    }

    function updateKolacic(){
       if(localStorage.getItem('korisnik') != null){
           axios.post('http://127.0.0.1:8000/evidencija/getuser/',{
               id: korisnik.pk
           }).then(
               (response) =>{
                   console.info("USAO U OVO")
                   console.info(korisnik.pk);
                   console.info(response.data);
                   postaviKorisnika(response.data[0])
                   postaviSesiju()
                   //localStorage.setItem('korisnik', JSON.stringify(response.data[0]));
               },
               (error) =>{
                   console.log(error)
               }
           )
       }
    }

    React.useEffect(() =>{
        provjeriSesiju()
    },[])

    /*React.useEffect(() =>{
        updateKolacic()
    },[korisnik])*/

    return (
          <Router>
              <Container>
                  <Zaglavlje sesija={sesija} korisnik={korisnik.fields} logout={() => zavrsiSesiju()}/>
                  <Switch>
                            <Route path="/evidencija">
                                {sesija ? <EvidencijaPage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/evidencijakuca">
                                  {sesija ? <EvidencijaKucaPage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/predmeti">
                                  {sesija ? <PredmetiPage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/nastavnoosoblje">
                                  {sesija && (korisnik.fields.rank==1 )? <NastavnoOsobljePage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/postavke">
                                  {sesija ? <PostavkePage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/stil">
                                  {sesija ? <StilPage/> : <Redirect to={'/login'}/>}
                              </Route>
                              <Route path="/register">
                                  {!sesija ? <RegisterPage/> : <Redirect to={'/'}/>}
                              </Route>
                              <Route path="/login">
                                  {!sesija ? <LoginPage/> : <Redirect to={'/'}/>}
                              </Route>
                              <Route path="/">
                                  {sesija ? <HomePage/> : <Redirect to={'/login'}/>}
                              </Route>
                  </Switch>
                  <Podnozje/>
              </Container>
          </Router>
  );

    function HomePage(){
        return (
            <Sadrzaj korisnik={korisnik.fields} id={korisnik.pk}/>
        );
    }

    function LoginPage(){
        return(
            <Login postaviSesiju={() => postaviSesiju()} postaviKorisnika={postaviKorisnika} />
        );
    }

    function RegisterPage(){
        return(
            <Register postaviSesiju={() => postaviSesiju()} postaviKorisnika={postaviKorisnika}/>
        );
    }

    function EvidencijaPage(){
        return(
            <Evidencija korisnik={korisnik.fields} id={korisnik.pk} />
        );
    }

    function EvidencijaKucaPage(){
        return(
            <EvidencijaKuca korisnik={korisnik.fields} id={korisnik.pk}/>
        );
    }

    function PredmetiPage(){
        return(
            <Predmeti korisnik={korisnik.fields} id={korisnik.pk}/>
        );
    }

    function NastavnoOsobljePage(){
        return(
            <NastavnoOsoblje korisnik={korisnik.fields}/>
        );
    }

    function PostavkePage(){
        return(
            <Postavke korisnik={korisnik.fields} logout={() => zavrsiSesiju()} handler={() => handler()} id={korisnik.pk}/>
        );
    }

    function StilPage(){
        return(
            <StilStranice prva={temamain} druga={temazelena} treca={temacrvena} korisnik={korisnik}/>
        );
    }
}




export default App;
