import React from "react"
import {Button, Icon, Label, Table, Modal, Header, Form} from "semantic-ui-react";
import {useForm} from "react-hook-form";
import axios from "axios";

function EvidencijaPredmet({predmet,handler}){
    const[open,setOpen] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => obradiNastavu(data);

    function obradiNastavu(data){

        setOpen(false)
        var datumpocetak = new Date(parseInt(predmet.pocetak.substring(0,4)),
            parseInt(predmet.pocetak.substring(5,7))-1,
            parseInt(predmet.pocetak.substring(8,10)),
            data.satpocetak,data.minutapocetak)
        var datumkraj = new Date(
            parseInt(predmet.kraj.substring(0,4)),
            parseInt(predmet.kraj.substring(5,7))-1,
            parseInt(predmet.kraj.substring(8,10)),
            data.satkraj,data.minutakraj)
        axios.post('http://127.0.0.1:8000/evidencija/editnastava/',{
            id:predmet.id,
            pocetak: datumpocetak,
            kraj: datumkraj,
            brojprisutnih: data.brojprisutnih
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

            predmet.obradjen == true ?
                <Table.Row positive>
                    <Table.Cell>
                        <Label ribbon>{predmet.predmet.naziv}</Label>
                    </Table.Cell>
                    <Table.Cell>{predmet.pocetak.substring(0,10)}
                     <br/><Icon name={'clock'} color={'yellow'}/>
                    {parseInt(predmet.pocetak.substring(11,13))+2}
                    :{predmet.pocetak.substring(14,16)}h</Table.Cell>
                    <Table.Cell>{predmet.kraj.substring(0,10)}
                        <br/><Icon name={'clock'} color={'yellow'}/>
                        {parseInt(predmet.kraj.substring(11,13))+2}
                        :{predmet.kraj.substring(14,16)}h
                    </Table.Cell>
                    <Table.Cell>{predmet.vrsta == 1 ? "Predavanje" : "Laboratorijske vježbe"}</Table.Cell>
                    <Table.Cell>{predmet.brojprisutnih}</Table.Cell>
                    <Table.Cell><Icon name='checkmark' /></Table.Cell>
                </Table.Row> :
                <Table.Row negative>
                    <Table.Cell>
                        <Label ribbon>{predmet.predmet.naziv}</Label>
                    </Table.Cell>
                    <Table.Cell>{predmet.pocetak.substring(0,10)}</Table.Cell>
                    <Table.Cell>{predmet.kraj.substring(0,10)}</Table.Cell>
                    <Table.Cell>{predmet.vrsta == 1 ? "Predavanje" : "Laboratorijske vježbe"}</Table.Cell>
                    <Table.Cell>
                        <Modal as={Form} onSubmit={handleSubmit(onSubmit)}
                            closeIcon
                            open={open}
                            trigger={<Button basic color={'red'} size={"mini"}>Obradi predmet</Button>}
                            onClose={() => setOpen(false)}
                            onOpen={() => setOpen(true)}
                        >
                            <Header>Obradite predmet: {predmet.predmet.naziv}</Header>
                            <Modal.Content>
                                <Form.Field>
                                    <label>Početak nastave:</label>
                                    <input type={'number'} placeholder={'Unesite sat početka nastave'} {...register("satpocetak")}/>
                                </Form.Field>
                                <Form.Field>
                                    <input type={'number'} placeholder={'Unesite minutu početka nastave'} {...register("minutapocetak")}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Kraj nastave:</label>
                                    <input type={'number'} placeholder={'Unesite sat kraja nastave'} {...register("satkraj")}/>
                                </Form.Field>
                                <Form.Field>
                                    <input type={'number'} placeholder={'Unesite minutu kraja nastave'} {...register("minutakraj")}/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Broj prisutnih studenata:</label>
                                    <input type={'number'} placeholder={'Unesite broj prisutnih studenata nastavi'} {...register("brojprisutnih")}/>
                                </Form.Field>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button  type="submit" positive>
                                    Izvršite evidenciju
                                </Button>
                            </Modal.Actions>
                        </Modal>
                    </Table.Cell>
                    <Table.Cell><Icon name='close' /></Table.Cell>
                </Table.Row>

    )
}

export default EvidencijaPredmet