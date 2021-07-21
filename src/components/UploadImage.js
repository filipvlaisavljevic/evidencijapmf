import React, {useState} from "react"
import {Button, Form,Image} from "semantic-ui-react";
import HorizontalDivider from "./HorizontalDivider";
import {useForm} from "react-hook-form";
import axios from "axios";
import {CloudinaryContext} from "cloudinary-react";

function UploadImage({handler,korisnik,id}){

    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");

    const uploadImage = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "tutorial")
        data.append("cloud_name","breellz")
        fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload",{
            method:"post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                console.info(url);
                promijeniSliku(data.url);
            })
            .catch(err => console.log(err))
    }

    function promijeniSliku(link){
        axios.post('http://127.0.0.1:8000/evidencija/promijenisliku/',{
            id:id,
            link: link,
        }).then(
            (response) =>{
                console.info("DOSLI");
                handler();
                console.info(link);
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <div>
            <Form>
                <Form.Field>
                    <label>Nova profilna slika:</label>
                    <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input>
                </Form.Field>
                <Button type='submit' className={"rasiri"} onClick={uploadImage}>Upload</Button>
            </Form>
            <HorizontalDivider/>
        </div>
    )
}

export default UploadImage