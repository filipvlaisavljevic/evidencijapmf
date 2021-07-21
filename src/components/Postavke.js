import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Grid, Header} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";
import ProfilKorisnika from "./ProfilKorisnika";
import UsernameChange from "./UsernameChange";
import PasswordChange from "./PasswordChange";
import EmailChange from "./EmailChange";
import UploadImage from "./UploadImage";

function Postavke({korisnik,logout,handler,id}){
    return(
        <div>
            <HorizontalDivider/>
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Header as={'h4'} className={"oboji"}>Sadržaj stranice </Header>
                        <SidebarMenu korisnik={korisnik}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid stackable>
                            <Grid.Row columns={2}>
                                <Grid.Column width={6}>
                                    <ProfilKorisnika korisnik={korisnik}/>
                                </Grid.Column>
                                <Grid.Column width={10}>
                                    <div>
                                        <UsernameChange korisnik={korisnik} logout={logout}/>
                                        <PasswordChange korisnik={korisnik} logout={logout}/>
                                        <EmailChange korisnik={korisnik} logout={logout}/>
                                        <UploadImage handler={() => handler()} korisnik={korisnik} id={id}/>
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <HorizontalDivider/>
        </div>
    );
}

export default Postavke