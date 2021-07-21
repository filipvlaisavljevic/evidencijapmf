import React from "react"
import {Header, Label, Menu} from "semantic-ui-react";

function Podnozje(){
    return(
        <Menu stackable width={16}>
            <Menu.Item className={"rasiri text-center"}>
                Sva prava zadržana &copy; Filip Vlaisavljević
            </Menu.Item>
        </Menu>
    );
}

export default Podnozje