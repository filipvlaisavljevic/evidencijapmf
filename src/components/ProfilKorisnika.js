import React from "react"
import {Card, Icon, Image, Label} from 'semantic-ui-react'

function ProfilKorisnika({korisnik}){
    return(
        <Card>
            <Image src={korisnik.slika} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{korisnik.ime} {korisnik.prezime}
                </Card.Header>
                <Card.Meta>
                    <span className='date'>{korisnik.email}</span>
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                {
                    korisnik.status == 1 ?
                        <Label  color='green' className={'rasiri center'} center> Aktivan</Label>
                        : korisnik.status == 2 ? <Label  color='red' className={'rasiri center'}> Neaktivan </Label>
                        : korisnik.status == 3 ? <Label  color='yellow' className={'rasiri center'}> Na odmoru</Label>
                            : <Label  color='yellow' className={'rasiri center'}> Na bolovanju</Label>
                }
            </Card.Content>
        </Card>
    );
}

export default ProfilKorisnika