import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Formulario from './Formulario_Us'


//este fue el unico que hice con clases xD, los demas los hice con Hooks 


class mod_1 extends React.Component {

    state = {
        open: false        
    };

    OpenModal = () => {
        this.setState ({open: !this.state.open})


    }

         


    render(){
        return (
            <>
             <div >
             <div >
            <Button color='success' onClick = {this.OpenModal}> Abrir formulario</Button>
            </div></div>


                <Modal isOpen= {this.state.open}>
                    <ModalHeader>
                        Ingrese Horas trabajadas
                    </ModalHeader>
                    <ModalBody>
                        
                        <Formulario/>
                        



                    </ModalBody>
                    <ModalFooter>
                        <Button color = "primary"> Enviar Formulario </Button>
                        <Button color = "secondary" onClick = {this.OpenModal}>cerrar formulario </Button>

                    </ModalFooter>
                </Modal>
                

                </>   
                )
    }
}
  

 export default mod_1;