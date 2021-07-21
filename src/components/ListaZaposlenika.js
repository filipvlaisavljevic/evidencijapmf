import React from "react"
import {Label, Table,Button,Modal,Image,Header,Icon} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function ListaZaposlenika({zahtjevi,handler}){
    const [open, setOpen] = React.useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => obradiZahtjev(data);
    const onSubmit2 = data => obradiZahtjev2(data);

    function obradiZahtjev(data){
        console.info("ID ZAHTEJVA")

        axios.post("http://127.0.0.1:8000/evidencija/obradizahtjev/",{
            id:data.id,
            tip:1
        }).then(
            (response) =>{
                console.info("USAO U ODOBRENJE")
                handler();
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    function obradiZahtjev2(data){
        console.info("ID ZAHTEJVA")

        axios.post("http://127.0.0.1:8000/evidencija/obradizahtjev/",{
            id:data.idd,
            tip:2
        }).then(
            (response) =>{
                console.info("USAO U ODBIJANJE")
                handler();
            },
            (error) =>{
                console.log(error)
            }
        )
    }

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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <input type={"hidden"} value={zahtjev.id} {...register("id")}/>
                                    <Button size={"mini"} basic color={'green'}>Odobri</Button>
                                </form>
                                <form onSubmit={handleSubmit(onSubmit2)}>
                                    <input type={"hidden"} value={zahtjev.id} {...register("idd")}/>
                                    <Button size={"mini"} basic color={'red'}>Odbij</Button>
                                </form>
                            </Table.Cell>

                        </Table.Row>
                ))}


            </Table.Body>

        </Table>
    );
}

export default ListaZaposlenika