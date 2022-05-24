import {onGetTasks,onGetConsulta} from '../firebase.js';

const container = document.getElementById('contenedor-citas');
const containerC = document.getElementById('contenedor-consultas');


window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {

    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
            .myDiv {
                position: relative;
                /*background-color: rgb(58, 197, 181);*/
                background-color: rgb(182, 213, 255);
                width: 100%;
                text-align: center;
                color:black
            }
            </style>
            <div class="myDiv">
                <p>Nombre: ${task.nom}</p>
                <p>FECHA Y HORA: ${task.fec}, ${task.hor} </p>
                <p>Doctor: ${task.dcr}</p>
                <p>Especialidad: ${task.esp}</p>

            </div>
        `;
    });

    container.innerHTML = html ;

    });

    

    
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetConsulta((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .contenedor-especilidad{
                    width: 98%;
                    height: 40px;
                    padding-bottom:10px;
                    border: 3px solid  rgb(58, 197, 181);
                    margin-top: 10px;
                    color:black;
                }

                .nom-esp{
                    width: 40%;
                    display: inline-block;
                    margin-top:-20px;
                    height:40px;
                    line-height:40px;
                    

                }

                .nom-esp-dr{
                    width: 40%;
                    display: inline-block;

                }

            </style>
            <div class="contenedor-especilidad">
                <div class="nom-esp"><h3>Puerta: <i>${task.num}</h3></div>
                <div class="nom-esp-dr"><h3>Dr:  <i>${task.dr}</h3></div>
            </div>
        `;
    });

    containerC.innerHTML = html ;

    });
    
})
