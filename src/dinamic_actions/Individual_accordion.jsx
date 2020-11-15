import React from 'react'
import {Accordion, Card} from "react-bootstrap";
import mod_1 from './mod_1';





const Individual_accordion = (props) => {

    //funciones que estan relacionadas con el formulario y la recoleccion de la informacion
        


    return (
        <Accordion>
            <Accordion.Toggle as = {Card.Header} eventKey= 'defaultActiveKey' >
                {props.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey = 'defaultActiveKey'  >
                <Card.Body>
                    <ul>
                        <li>holi </li>
                       <li>{props.description} </li> 
                       <li> horas invertidas en este proyecto: {props.t_invertido}</li>
                       <li>< mod_1/> </li>
                    </ul> 
                </Card.Body>
            </Accordion.Collapse>
        </Accordion>
    )
    
}

export default Individual_accordion;