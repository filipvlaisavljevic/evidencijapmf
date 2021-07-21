import React from "react"
import {Button, Card, Header, Modal} from "semantic-ui-react";
import Ucitavanje from "./Ucitavanje";

function PredmetInfo({predavanje}){

    const [open, setOpen] = React.useState(false)

    return(
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <Card>
                    <Card.Content>
                        <Card.Header>Predmet: {predavanje.predmet.naziv}</Card.Header>
                        <Card.Meta>Datum održavanja: {predavanje.pocetak.substring(0,10)}</Card.Meta>
                        <Card.Description>
                            Vrsta nastave: {predavanje.vrsta === 1 ? "Predavanje" : "Laboratorijske vježbe"}
                        </Card.Description>
                    </Card.Content>
                </Card>
            }
        >
            <Modal.Header>Informacije o predmetu</Modal.Header>
            <Modal.Content image>
                <Modal.Description>
                    <Header>Predmet: {predavanje.predmet.naziv}</Header>
                    <p>
                        Datum održavanja: {predavanje.pocetak.substring(0,10)} <br/>
                        Tip nastave: {predavanje.vrsta === 1 ? "Predavanje" : "Laboratorijske vježbe"} <br/>
                        Profesor: {predavanje.predmet.profesor.ime} {predavanje.predmet.profesor.prezime} <br/>
                        Asistent: {predavanje.predmet.asistent.ime} {predavanje.predmet.asistent.prezime} <br/>
                    </p>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Nastavak
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default PredmetInfo