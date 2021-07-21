import React from "react"
import {Button, Label, Table} from "semantic-ui-react";

function PredmetiKorisnik(){
    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Naziv predmeta</Table.HeaderCell>
                    <Table.HeaderCell>Termin održavanja predavanja</Table.HeaderCell>
                    <Table.HeaderCell>Termin održavanja vježbi</Table.HeaderCell>
                    <Table.HeaderCell>Profesor</Table.HeaderCell>
                    <Table.HeaderCell>Asistent</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {/*Kupljenje podataka iz baze podataka*/}
                <Table.Row>
                    <Table.Cell>
                        <Label ribbon>Strukture podataka i algoritmi</Label>
                    </Table.Cell>
                    <Table.Cell>15:00h - 18:00h, Ponedjeljak</Table.Cell>
                    <Table.Cell>12:00h - 13:00h, Utorak</Table.Cell>
                    <Table.Cell>Esmir Pilav</Table.Cell>
                    <Table.Cell>Beširević</Table.Cell>
                </Table.Row>


            </Table.Body>

        </Table>
    );
}

export default PredmetiKorisnik