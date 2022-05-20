import {  onGetEspecialidad} from '../firebase.js';

const container = document.getElementById('contenedorEspec');

window.addEventListener('DOMContentLoaded', async () => {
    onGetEspecialidad((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .contenedor-especilidad{
                    padding: 10px;
                    width: 97.5%;
                    background-color: rgb(182, 213, 255);;
                    height: 100px;
                    border: 3px solid rgb(99, 71, 155);
                    margin-top: 10px;
                    margin-left:35%;
                }

                .nom-esp{
                    width: 70%;
                }

                .nom-esp-dr{
                    width: 70%;
                }

                .btn-esp-go{
                    display: inline-block;
                    width: 20%;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    border: 2px solid rgb(99, 71, 155);
                    float: right;
                    margin-top: -85px;
                    font-size: large;
                }

                .btn-esp-go:hover{
                    background-color: rgb(99, 71, 155);
                    border: 2px solid rgb(99, 71, 155);
                    color: rgb(209, 240, 255);
                    
                }
            </style>
            <div class="contenedor-especilidad">
                <div class="nom-esp"><h2>Dr: <i>${task.especia}</h2></div>
                <div class="nom-esp-dr"><h4>ESPECIALIDAD:  <i>${task.dr}</h4></div>
                <a href=""><div class="btn-esp-go"><b>Pedir cita</b></div></a>
            </div>
        `;
    });

    container.innerHTML = html ;

    });
    
})