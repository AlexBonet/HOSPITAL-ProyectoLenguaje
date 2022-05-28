import { saveEspecialidad, onGetEspecialidad,deleteEspecialidad, getEspecialidad, updateEspecialidad } from '../firebase.js';

const form = document.getElementById('log-form');
const container = document.getElementById('contenedor-esp');

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const especia = form['form-especialidad'].value;
    const dr = form['form-dr'].value;
    
    if(!editStatus){
        saveEspecialidad(especia ,dr);
        $.jGrowl("Especialidad creada con existo", {theme: 'changeCount'});
        console.log("save")    
    }else{
        updateEspecialidad(id,{especia ,dr});
        $.jGrowl("Especialidad actualizada con existo", {theme: 'changeCount'});
        editStatus = false;
    }
    console.log("click")
    form.reset()
    form['btn-register'].innerText = 'CREAR ESPECIALIDAD';
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetEspecialidad((querySnapshot) => {
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
                <div class="nom-esp"><h2>ESPECIALIDAD: <i>${task.especia}</h2></div>
                <div class="nom-esp-dr">
                    <h4>Dr :  
                        <i>${task.dr}
                    </h4>
                </div>
                <div class="btn-editar"><button class='btn-edit' data-id="${docu.id}">Editar</button></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${docu.id}">Borrar</button></div>
            </div>
            
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteEspecialidad(dataset.id)
            $.jGrowl("Especialidad eliminada con existo", {theme: 'changeCount'});
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const docu = await getEspecialidad(dataset.id)
            const task = docu.data()

            form['form-especialidad'].value = task.especia;
            form['form-dr'].value = task.dr;
           
            editStatus = true;
            id = docu.id;

            form['btn-register'].innerText = 'ACTUALIZAR ESPECIALIDAD';
        })
    })

    });
    
})