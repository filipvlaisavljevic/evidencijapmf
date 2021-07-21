import React from "react"
import {Label, Icon, Table, Button} from "semantic-ui-react";

function KorisnikZahtjevi({zahtjevi,handler}){
    return(
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Ime zaposlenika</Table.HeaderCell>
                    <Table.HeaderCell>Prezime zaposlenika</Table.HeaderCell>
                    <Table.HeaderCell>Početak rada od kuće</Table.HeaderCell>
                    <Table.HeaderCell>Kraj rada od kuće</Table.HeaderCell>
                    <Table.HeaderCell>Zahtjev</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {/*Kupljenje podataka iz baze podataka*/}

                {zahtjevi.map((zahtjev) =>(
                    zahtjev.obradjen == true && zahtjev.odobren == true?
                        <Table.Row positive>
                            <Table.Cell>
                                <Label ribbon>{zahtjev.korisnik.ime}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Label ribbon>{zahtjev.korisnik.prezime}</Label>
                            </Table.Cell>
                            <Table.Cell>{zahtjev.pocetak.substring(0,10)}</Table.Cell>
                            <Table.Cell>{zahtjev.kraj.substring(0,10)}</Table.Cell>
                            <Table.Cell>{zahtjev.opis}</Table.Cell>
                            <Table.Cell>{zahtjev.odobren == 1 ?
                                <span><Icon name={'checkmark'}/> Odobren</span> :
                                <span><Icon name={'close'}/> Odbijen</span>
                            }</Table.Cell>
                        </Table.Row> :
                        zahtjev.obradjen == true && zahtjev.odobren == false ?
                            <Table.Row negative>
                                <Table.Cell>
                                    <Label ribbon>{zahtjev.korisnik.ime}</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    <Label ribbon>{zahtjev.korisnik.prezime}</Label>
                                </Table.Cell>
                                <Table.Cell>{zahtjev.pocetak.substring(0,10)}</Table.Cell>
                                <Table.Cell>{zahtjev.kraj.substring(0,10)}</Table.Cell>
                                <Table.Cell>{zahtjev.opis}</Table.Cell>
                                <Table.Cell>{zahtjev.odobren == 1 ?
                                    <span><Icon name={'checkmark'}/> Odobren</span> :
                                    <span><Icon name={'close'}/> Odbijen</span>
                                }</Table.Cell>
                            </Table.Row>
                            :
                            <Table.Row>
                                <Table.Cell>
                                    <Label ribbon>{zahtjev.korisnik.ime}</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    <Label ribbon>{zahtjev.korisnik.prezime}</Label>
                                </Table.Cell>
                                <Table.Cell>{zahtjev.pocetak.substring(0,10)}</Table.Cell>
                                <Table.Cell>{zahtjev.kraj.substring(0,10)}</Table.Cell>
                                <Table.Cell>{zahtjev.opis}</Table.Cell>
                                <Table.Cell>
                                    <span><Icon name={'clock'}/>Na čekanju</span>
                                </Table.Cell>

                            </Table.Row>
                ))}


            </Table.Body>

        </Table>
    );
}

export default KorisnikZahtjevi