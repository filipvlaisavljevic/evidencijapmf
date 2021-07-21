import React from "react"
import { Icon, Label, Menu, Table,Button } from 'semantic-ui-react'
import EvidencijaPredmet from "./EvidencijaPredmet";

function EvidencijaTabela({predmeti,handler}){
    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv predmeta</Table.HeaderCell>
                    <Table.HeaderCell>Početak nastave</Table.HeaderCell>
                    <Table.HeaderCell>Kraj nastave</Table.HeaderCell>
                    <Table.HeaderCell>Oblik nastave</Table.HeaderCell>
                    <Table.HeaderCell>Broj prisutnih studenata</Table.HeaderCell>
                    <Table.HeaderCell>Obrađen</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {/*Kupljenje podataka iz baze podataka*/}
                {predmeti.map((predmet) =>(
                    <EvidencijaPredmet predmet={predmet} handler={handler}/>
                    )
                )}


            </Table.Body>

        </Table>
    );
}

export default EvidencijaTabela