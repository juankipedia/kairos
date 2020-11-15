import React, {Fragment, useState} from 'react';
import Individual_accordion from './Individual_accordion.jsx';
import {v4 as uuidv4} from "uuid";




// primero voy a agregar las bases de datos, este archivo guarda las bases de datos temporales y se enlaza con la app
// de este archivo salen los props que se utilizan en el acordeon y estan los datos que simulan a los datos de usuario
// las partes de los datos, supongo que seran remplazadas por la base de datos de Fire base
// sugiero hacerlo por medio de    import axios from "axios";
const Visual =  (props) => {

    const proyectos = [
        {   id: uuidv4(), 
            name: "terminar ediccion video",
         description: "En este trabajo vamos a terminar el video para la clase de los Beatles",
         members : 3,
         t_invertido: 20,
         key: 1  },
         {   id: uuidv4(),
            name: "Estudiar parcial calculo",
         description: "En este componente escribo cuanto tiempo invierto en estudiar",
         members : 3,
         t_invertido: 2000,
        key: 2  },
         {   id: uuidv4(),
            name: "Trabajar proyecto de ciencias de la computacion",
         description: "En este trabajo vamos a poner las horas que invierto en el trabajo de c.c",
         members : 3,
         t_invertido:0,
         key: 3 },
    
    ];

    return (
        <Fragment>

    
            <section>

                {proyectos.map((proyecto) => (
                    <Individual_accordion name= {proyecto.name} description = {proyecto.description} 
                    t_invertido = {proyecto.t_invertido} key = {proyecto.key}  />
                ))}
            

          
            </section>
            
        </Fragment>
        
    )
}

export default Visual;