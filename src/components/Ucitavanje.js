import React from "react"
import {Dimmer, Loader, Container, Image, Segment, Grid} from 'semantic-ui-react'
import HorizontalDivider from "./HorizontalDivider";

function Ucitavanje(){
    return(
        <Dimmer.Dimmable as={Segment} dimmed={"active"}>
            <Dimmer active={"active"} inverted >
                <Loader size={"mini"}></Loader>
            </Dimmer>
        </Dimmer.Dimmable>
    );
}

export default Ucitavanje