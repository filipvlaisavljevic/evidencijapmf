import React from "react"
import {Input,Button, Form, Header, Icon, Label, Message, Modal, Table} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function PredmetTabela({korisnik,predmet,profesori,asistenti,handler}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues:
            {
                naziv: predmet.naziv,
                profesor: predmet.profesor.id,
                asistent: predmet.asistent.id,
                id: predmet.id,
                godina: predmet.godina,
                ects:predmet.ects,
                sifra:predmet.sifra,
                semestar:predmet.semestar
            }
    });
    const onSubmit = data => obradiFormu(data);
    const [open,setOpen] = React.useState(false)

    const obrisiPredmet=()=>{
        setOpen(false)
        console.info("TEST")
        axios.post('http://127.0.0.1:8000/evidencija/deletepredmet/',{
            id:predmet.id
        }).then(
            (response) =>{
                console.log(response)
                {
                    handler()
                }
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    const obradiFormu=(data)=>{
        setOpen(false)
        console.info(data)
        axios.post('http://127.0.0.1:8000/evidencija/editpredmet/',{
            naziv:data.naziv,
            profesor:data.profesor,
            asistent:data.asistent,
            id:predmet.id,
            godina:data.godina,
            ects:data.ects,
            sifra:data.sifra,
            semestar:data.semestar
        }).then(
            (response) =>{
                console.log(response)
                {
                    handler()
                }
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <Table.Row>
            <Table.Cell>
                <Label ribbon>{predmet.sifra}</Label>
            </Table.Cell>
            <Table.Cell>{predmet.naziv}</Table.Cell>
            <Table.Cell>{predmet.godina}.</Table.Cell>
            <Table.Cell>{predmet.ects}</Table.Cell>
            <Table.Cell>{predmet.semestar}.</Table.Cell>
            <Table.Cell>{predmet.profesor.ime} {predmet.profesor.prezime}</Table.Cell>
            <Table.Cell>{predmet.asistent.ime} {predmet.asistent.prezime}</Table.Cell>
            {korisnik.rank ==1 ?
                <Modal as={Form} onSubmit={handleSubmit(onSubmit)} trigger={<Table.Cell><Button size={"mini"} primary>Uredi predmet</Button></Table.Cell>}
                       onClose={() => setOpen(false)}
                       onOpen={() => setOpen(true)}
                       open={open}
                       size="small">
                    <Header content={'Izvršite izmjenu predmeta: ' + predmet.naziv} />
                    <Modal.Content>
                        <Form.Field>
                            <Message info>
                                <Message.Header>Napomena za popunjavanje</Message.Header>
                                <p>
                                    Možete izmijeniti samo ona polja koja želite. Nije potrebno popunjavati sva polja kako bi forma bila validna.
                                    Polja koja ne želite izmijenite ostavite prazna i automatski će biti popunjena.
                                </p>
                            </Message>
                        </Form.Field>
                        <Form.Field>
                            <label>Naziv predmeta:</label>
                            <input {...register("naziv")} fluid  label="Naziv predmeta:" placeholder={predmet.naziv} />
                        </Form.Field>
                        <Form.Field>
                            <label>Šifra predmeta:</label>
                            <input fluid  placeholder={predmet.sifra} {...register("sifra")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Akademska godina predmeta:</label>
                            <input fluid   type={"number"} placeholder={predmet.godina} {...register("godina")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Semestar predmeta:</label>
                            <input fluid   type={"number"} placeholder={predmet.semestar} {...register("semestar")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Broj ECTS bodova predmeta:</label>
                            <input fluid type={"number"}    placeholder={predmet.ects} {...register("ects")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Profesor na predmetu:</label>
                            <select {...register("profesor")}>
                                <option disabled selected hidden >{predmet.profesor.ime} {predmet.profesor.prezime}</option>
                                {profesori.map((profesor) => (
                                    <option value={profesor.id}>{profesor.ime} {profesor.prezime}</option>
                                ))}
                            </select>
                        </Form.Field>
                        <Form.Field>
                            <label>Asistent na predmetu:</label>
                            <select {...register("asistent")}>
                                <option disabled selected hidden  >{predmet.asistent.ime} {predmet.asistent.prezime}</option>
                                {asistenti.map((asistent) => (
                                    <option value={asistent.id}>{asistent.ime} {asistent.prezime}</option>
                                ))}
                            </select>
                        </Form.Field>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic color="grey" onClick={() => setOpen(false)} type="button">
                            Odustanite
                        </Button>
                        <Button basic color="red" onClick={() => obrisiPredmet()} type="button">
                            Obriši predmet
                        </Button>
                        <Button  type="submit" positive>
                            Izvršite izmjenu
                        </Button>
                    </Modal.Actions>
                </Modal>:<div></div>
            }


        </Table.Row>
    )
}

export default PredmetTabela