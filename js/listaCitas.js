import { getTasks, onGetTasks,deleteTask, getTask, updateTasks } from './firebase.js';

const container = document.getElementById('contenedor-citas');

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
            .myDiv {
                position: relative;
                background-color: rgb(58, 197, 181);
                width: 100%;
                text-align: center;
            }
            </style>
            <div class="myDiv">
                <p>Nombre: ${task.nom}</p>
                <p>FECHA Y HORA: ${task.fh}</p>
                <p>Doctor: ${task.doc}</p>
                <p>Consulta: ${task.cons}</p>
            </div>
        `;
    });

    container.innerHTML = html ;

    });
    
})