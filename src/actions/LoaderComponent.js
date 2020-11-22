import react, {useState, Fragment}from "react";
import {Spinner} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css" 
import { css } from "styled-components";
import "../css/Loading.css";




function Loader () {
    const [Loader , setLoader]= useState(false);

    const cambiarEstado=() => {
        setLoader (true);
        setTimeout (()=>{
            setLoader(false);

        }, 5000);
    }

if (Loader){
    return (
        <Fragment>
        <div className = "divPadre">
            <div className= "divHijo">

            <Spinner color = "info" className= "Spinner"/>
            <br></br>
            <br></br>

            
            </div>

        </div>
    

        </Fragment>
    )
    }
    return (
        <div className= "divHijo">
            <button className= "btn btn-primary" onClick= {() => cambiarEstado ()} > cargar Info</button>
        </div>
    )

    
}



export default Loader;