import React from "react"
import {Button, Label, Form, Table, Modal, Image, Select,Header, Message,Container, Grid} from "semantic-ui-react";
import Ucitavanje from "./Ucitavanje";
import HorizontalDivider from "./HorizontalDivider";
import VerticalDivider from "./VerticalDivider";
import {useForm} from "react-hook-form";
import PredmetTabela from "./PredmetTabela";

function ListaPredmeta({predmeti,profesori,asistenti,handler,korisnik}){


    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Šifra</Table.HeaderCell>
                    <Table.HeaderCell>Naziv predmeta</Table.HeaderCell>
                    <Table.HeaderCell>Akademska godina</Table.HeaderCell>
                    <Table.HeaderCell>ECTS</Table.HeaderCell>
                    <Table.HeaderCell>Semestar</Table.HeaderCell>
                    <Table.HeaderCell>Profesor</Table.HeaderCell>
                    <Table.HeaderCell>Asistent</Table.HeaderCell>
                    {korisnik.rank ==1 ? <Table.HeaderCell></Table.HeaderCell> : <div></div>}
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {/*Kupljenje podataka iz baze podataka*/}
                {
                        predmeti.map((predmet) =>(
                            <PredmetTabela predmet={predmet} profesori={profesori} asistenti={asistenti} handler={handler} korisnik={korisnik}/>
                        ))
                    }
            </Table.Body>

        </Table>
    )
}

export default ListaPredmeta