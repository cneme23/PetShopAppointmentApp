import React, {useState,useEffect} from 'react';
import Formulario from "./components/Formulario.js";
import Cita from "./components/Cita.js";
import PropTypes from "prop-types";
function App() {
//Citas en local storage
let citasIniciales = JSON.parse(localStorage.getItem("citas"));
if(!citasIniciales){
  citasIniciales=[];
}

//Arreglo de citas
//Aca estamos creando un State que se va a encargar de almacenar las citas que vamos agregando. 
const [citas,guardarCitas]=useState(citasIniciales);

//Use effect para realizar ciertas operaciones cuando el state cambia
useEffect( () => {
if(citasIniciales){
  localStorage.setItem("citas",JSON.stringify(citas))
}else{
  localStorage.setItem("citas",JSON.stringify([]));
}
}, [citas,citasIniciales]);


//Aca tenemos que crear una funcion que guarde las citas anteriores y agregue las nuevas

let crearCita= cita=>{
  
  guardarCitas([...citas,cita])
  
}

//Funcion que elimina cita por su id
const eliminarCita= id => {
const nuevasCitas =citas.filter(cita=>cita.id !== id);
guardarCitas(nuevasCitas);

}

//Mensaje condicional
const titulo = citas.length === 0 ? "No hay citas":"Administra tus citas";


  return (
    <>
    <h1>Administrador de pacientes </h1>
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <Formulario crearCita={crearCita}/>
        </div>
        <div className="one-half column">
          <h2>{titulo}</h2>
          {citas.map(cita =>(
            <Cita key={cita.id} 
                  cita={cita}
                  eliminarCita={eliminarCita}/>
          ))}
          </div>
      </div>

    </div>
    </>
  );
}
Formulario.propTypes={
  crearCita:PropTypes.func.isRequired
}

export default App;
