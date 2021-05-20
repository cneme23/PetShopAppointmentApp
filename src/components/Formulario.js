import React, {useState} from "react";
import shortid from "shortid";

const Formulario = ({crearCita}) => {
    //Aca creamos el state de citas
    //El primer parametro contiene el estado inicial
    //El segundo parametro va a ser el encargado de contener la funcion que se encarga de modifcar ese estado 
    //En este caso agregamos un objeto porquen en el vamos a agregar todos los campos del formulario que tenemos
    //Para ello, las "key" de este objeto deben coincidir con el "name" de cada campo del form
    //por lo pronto 
    const [cita,actualizarCita]= useState({
        mascota:" ",
        propietario:"",
        fecha:"",
        hora:"",
        sintomas:""
    })

//Aca creo un estado para ir manejando los errores
    const [error,actualizarError]=useState(false);
    

    //Esta funcion se va a ejecutar cada vez que modifiquemos el estado, mediante el evento onChange que va a ser incluido como propiedad dentro de cada Tag del formulario
    const actualizarState= (e) =>{
        //Aca estoy ejecutando la funcion que se va  aencargar de modificar el estado. Si o si tengo que usar esta funcion para hacerlo
        actualizarCita({
            //En esta parte estamos copiando el array que venia desde antes en el estado original y luego lo vamos modificandoo
            //Haciendo esto puedo leer los valores de cada input
        
            ...cita,
            [e.target.name]:e.target.value
        })
    }

    //Aca voy a empezar a extraer los valores del formulario

    const {mascota,propietario,fecha,hora,sintomas} = cita;
//Aca defino la funcion que voy a usar cuando el usuario quiera agregar una cita

let submitCita = e => {
    //Aca estoy previniendo el comportamiento por defecto del formulario de enviar la informacion  
     e.preventDefault();
    console.log("enviando formulario")
//validar
//Aca puedo llamar a cada key sin incluir el cita.mascota por ej , ya que en la linea 34 hice el destructuring de las variables
if(mascota.trim()==="" || propietario.trim()==="" || fecha.trim() === "" || hora.trim() ==="" || sintomas.trim() === ""){
    return actualizarError(true)
 }
 //Eliminar mensaje previo:

 actualizarError(false);
//asignar un id
cita.id=shortid();
//Crear la cita
crearCita(cita)
//Reiniciar el Form
actualizarCita({
mascota:"",
propietario:"",
fecha:"",
hora:"",
sintomas:""

})

}
    return (
       <> 
        <h2>Crear cita</h2>
        {/* Aca creamos el evento onSubmit para configurar el envio de info a traves del formulario
        Aca le mostramos el error en caso de que exista. Hay que tener en cuenta que en JSX no se puede usar if sino solo ternarios */}
        {error ? <p className="alerta-error">Todos los campos son obligatorios</p> :null}

        <form onSubmit={submitCita}>
            <label>Nombre de la mascota</label>
            <input type="text"
                   name="mascota"
                   className="u-full-width"
                   placeholder="Nombre Mascota"
                   onChange={actualizarState}
                   value= {mascota}        

            />

            <label>Nombre del dueño </label>
            <input type="text"
                   name="propietario"
                   className="u-full-width"
                   placeholder="Nombre del dueño"
                   onChange={actualizarState}
                   value={propietario}
            />

            <label>Fecha</label>
            <input type="date"
                   name="fecha"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={fecha}
               
            />

            <label>Hora de la cita</label>
            <input type="time"
                   name="hora"
                   className="u-full-width"
                   onChange={actualizarState}
                   value={hora} 
            />

            <label>Sintomas</label>
            <textarea className="u-full-width"
                      name="sintomas" 
                      onChange={actualizarState}
                      value= {sintomas}  />
        
            <button type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}>
                    Agregar cita</button>
                
                         


        </form>
    
        </>
    
    );

}


export default Formulario;
