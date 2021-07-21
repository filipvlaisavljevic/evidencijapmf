import React from "react"
import {Label, Table,List,Item,Icon} from "semantic-ui-react";
import Ucitavanje from "./Ucitavanje";

function ZaposleniciPrikaz({data}){

    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Ime</Table.HeaderCell>
                    <Table.HeaderCell>Prezime</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Predmeti</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {data.map((user) => (
                    <Table.Row className={
                        user.status == 1 ? "positive" : user.status == 2 ? "negative" : user.status == 3 ? "warning" : "warning"
                    }>
                        <Table.Cell>{user.ime}</Table.Cell>
                        <Table.Cell>{user.prezime}</Table.Cell>
                        <Table.Cell>{user.status == 1 ? "Aktivan" : user.status == 2 ? "Neaktivan" : user.status == 3 ? "Na odmoru" : "Na bolovanju"}</Table.Cell>
                        <Table.Cell>
                            <List>
                                {user.predmeti.map((predmet) =>(
                                    <List.Item><Icon name='right triangle' />{predmet.naziv}</List.Item>
                                ))}
                            </List>
                        </Table.Cell>
                    </Table.Row>
                ))}



            </Table.Body>

        </Table>

    );

}

export default ZaposleniciPrikaz