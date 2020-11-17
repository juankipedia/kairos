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









return(
<Fragment>
    <form class= "was-validated" onSubmit = {handleSubmit(onSubmit)}>
        <div class="custom-control">

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
                <div class ="invalid-feedback"> debes poner un periodo de tiempo </div>
                <div class="form-group">
                    <label for = "description"> Descripcion del Trabajo realizado</label>
                    <textarea minLength= "5" name = "description" required class='form-control' rows="3" placeholder = "" 
                    ref= {register} />
                    <div class = "valid-feedback">  perfecto! </div>
                    <div class ="invalid-feedback"> debes poner una descripcion</div>
                </div>
    
            </div>

            <button class= "btn btn-primary">Enviar</button>

        </div>

    </form>


</Fragment>
)

}


export default Form_user;