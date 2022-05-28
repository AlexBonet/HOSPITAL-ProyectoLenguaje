import { saveConsulta, onGetConsulta,deleteConsulta, getConsulta, updateConsulta } from '../firebase.js';

const form = document.getElementById('log-form');
const container = document.getElementById('contenedor-cons');

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const num = form['form-num'].value;
    const dr = form['form-dr'].value;
    
    if(!editStatus){
        saveConsulta(num ,dr);
        $.jGrowl("Consulta creada amb exit", {theme: 'changeCount'});
        console.log("save")    
    }else{
        updateConsulta(id,{num ,dr});
        $.jGrowl("Consulta actualitzada amb exit", {theme: 'changeCount'});
        editStatus = false;
    }
    console.log("click")
    form.reset()
    form['btn-register'].innerText = 'CREAR CONSULTA';
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetConsulta((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((docu) => {
        const task = docu.data();
        html+=`
            <style>
                .contenedor-especilidad{
                    padding: 10px;
                    width:80%;
                    margin-left: 10%;
                    height: 100px;
                    margin-top: 10px;
                    background-color: rgb(52, 94, 52);
                    height: 100px;
                    width: 80%;
                    color: white;
                    border: 1px solid black;
                    margin-bottom:30px;
                }
                
                .nom-esp{
                    width: 70%;
                    margin-left:20px;
                }
                
                .nom-esp-dr{
                    width: 70%;
                    margin-left:20px;
                }
                .btn-editar{
                    margin-top: -45px;
                    margin-right:60px;
                    float: right;
                    width: 4%;
                }
                .btn-dlt{
                    margin-top: -90px;
                    margin-right:62px;
                    float: right;
                    width: 4%;
                }
            </style>
            <div class="contenedor-especilidad">
                <div class="nom-esp"><h2>Consulta numero: <i>${task.num}</h2></div>
                <div class="nom-esp-dr"><h4>Doctor:  <i>${task.dr}</h4></div>
                <div class="btn-editar"><button class='btn-edit' data-id="${docu.id}">Editar</button></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${docu.id}">Borrar</button></div>
            </div>
            
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteConsulta(dataset.id)
            $.jGrowl("Consulta eliminada amb exit", {theme: 'changeCount'});
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const docu = await getConsulta(dataset.id)
            const task = docu.data()

            form['form-num'].value = task.num;
            form['form-dr'].value = task.dr;
           
            editStatus = true;
            id = docu.id;

            form['btn-register'].innerText = 'ACTUALIZAR CONSULTA';
        })
    })

    });
    
})