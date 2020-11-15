import React, {Fragment, useState, useEffect} from 'react';
import {useForm} from "react-hook-form";





const Form_user = () => {

    const[Entradas, setEntradas] = useState(
        
     
        
                [{
            actividad: "",
            etiqueta: "",
            tiempo : "",
            descrpcion: ""
                }]


        
        )

    
    const {register, handleSubmit} = useForm () ;
    const onSubmit = (datos, e) =>{
        
        console.log (datos)
        setEntradas ([...Entradas, datos])
        
        e.target.reset()
    }
 
    const savedata = useEffect ((onSubmit) => {
        localStorage.setItem ("Entradas",onSubmit);
    }, [onSubmit])   

    

    

    


    return(
        <Fragment>
            <form class= "was-validated" onSubmit = {handleSubmit(onSubmit)}>
                <div class="custom-control">
                    <label for = "actividad">Actividad Realizada </label>
                    <input
                    name= "actividad" required
                    type = "text"
                    class = "form-Control"
                    placeholder= ""
                    minLength = "5" ref = {register}></input>
                    <div class = "valid-feedback">  perfecto! </div>
                    <div class ="invalid-feedback"> debes poner una actividad</div>

                    <label for="EtiquetaActividad"> En que etiqueta esta catalogada dicha actividad  </label>
                    <select
                    class = "custom-select" required
                    name = 'etiqueta'
                    ref = {register}                   
                    >
                        <option value = ""> seleccionar categoria</option>
                        <option value = "Tiempo libre">Tiempo libre</option>
                        <option value = "Trabajo">Trabajo</option>
                        <option value = 'proyecto individual'>proyecto individual</option>
                        <option value = "Estudio Universidad">Estudio Universidad</option>
                        <option value = "actividades familiares"> actividades familiares</option>                       
                    </select>
                    <div class = "valid-feedback">  perfecto! </div>
                    <div class ="invalid-feedback"> debes poner una actividad</div>

                    <div class = "form-group">
                        <label for = "tiempo dedicado">  cuantas horas le dedicaste a dicha actividad?</label>

                        <select
                            class = "custom-select" required
                            name = 'tiempo'
                            ref = {register}                        
                        > 
                            <option value = ""> selecciona un periodo de tiempo</option>
                            <option value = "1" > 1 hora</option>
                            <option value = "2">2 horas </option>
                            <option value = "3">3 horas</option>
                            <option value = "4 ">4 horas</option>
                            <option value = "5">5 horas</option>                                               
                        </select>
                        <div class = "valid-feedback">  perfecto! </div>
                        <div class ="invalid-feedback"> debes poner una actividad</div>

                        <div class="form-group">
                            <label for = "descripcion"> descripcion de la actividad realizada </label>
                            <textarea  minLength= "5" name= "descripcion" required class= "form-control"
                            rows= "4" placeholder= "" ref = {register}> </textarea>
                        <div class = "valid-feedback">  perfecto! </div>
                        <div class ="invalid-feedback"> debes poner una actividad</div>

                        </div>
            
                    </div>

                    <button class= "btn btn-primary">Enviar</button>

                </div>

            </form>


        </Fragment>
    )

}

export default Form_user;