import React from "react"
import HorizontalDivider from "./HorizontalDivider";
import {Grid, Header,Button,Checkbox} from "semantic-ui-react";
import SidebarMenu from "./SidebarMenu";

function StilStranice({prva,druga,treca,korisnik}){

    return(
        <div>
            <HorizontalDivider/>
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column width={4}>
                        <Header as={'h4'} className={"oboji"}>Sadržaj stranice</Header>
                        <SidebarMenu korisnik={korisnik}/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Grid stackable>
                            <Grid.Row columns={1}>
                                <Grid.Column width={16}>
                                    <Header as={'h4'}>Prva tema:</Header>
                                    <Checkbox toggle onClick={() => window.location.reload(false)}/>
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <Header as={'h4'}>Druga tema:</Header>
                                    <Checkbox toggle onClick={druga}/>
                                </Grid.Column>
                                <Grid.Column width={16}>
                                    <Header as={'h4'}>Treca tema:</Header>
                                    <Checkbox toggle onClick={treca}/>
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

export default StilStranice