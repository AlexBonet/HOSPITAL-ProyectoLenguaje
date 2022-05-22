import { saveCitaGest, onGetTasks,deleteTask, getTask, updateTasks } from '../firebase.js';

const form = document.getElementById('cita-form');
const container = document.getElementById('contenedor-cit');

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-c'];
    const dcr = form['dcr-c'];
    const esp = form['esp-c'];
    const fec = form['fec-c'];
    const hor = form['hor-c'];

    if(!editStatus){
        saveCitaGest(nom.value ,esp.value ,dcr.value ,fec.value ,hor.value );
    }else{
        updateTasks(id,{nom:nom.value ,esp:esp.value ,dcr:dcr.value ,fec:fec.value ,hor:hor.value});
        editStatus = false;
    }
       
    form.reset()
    form['btn-register'].innerText = 'CREAR CITAS';
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((docu) => {
        const task = docu.data();
        html+=`
                <style>
                .view{
                    margin-left: 5%;
                    background-color: rgb(52, 94, 52);
                    height: 100px;
                    width: 80%;
                    color: white;
                    border: 1px solid black;
                    margin-bottom:30px;
                }
                .nom{
                    margin-top:35px;
                    margin-left: 25px;
                    width: 33%;
                }
                .doc{
                    margin-top:-75px;
                    margin-left: 35%;
                    width: 28%;
                }
                .esp{
                    margin-left: 35%;
                    width: 28%;

                }
                .fyh{
                    margin-top: -60px;
                    margin-left: 65%;
                    width: 25%;
                }
                .btn-editar{
                    margin-top: -20px;
                    margin-right:60px;
                    float: right;
                    width: 4%;
                }
                .btn-dlt{
                    margin-top: -60px;
                    margin-right:-55px;
                    float: right;
                    width: 4%;
                }
            </style>
            <div class="view">
                <div class="nom"><h1>Sr/a.: <i>${task.nom}</i></h1></div>
                <div class="doc"><h3>Dr/a.: <i>${task.dcr}</i></h3></div>
                <div class="esp"><p><i>${task.esp}</i></p></div>
                <div class="fyh"><h3>Fecha y Hora: <i> ${task.fec} , ${task.hor}</i></h3></div>    
                <div class="btn-editar"><button class='btn-edit' data-id="${docu.id}">Editar</button></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${docu.id}">Borrar</button></div>
            </div>
            
            
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteTask(dataset.id)
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const docu = await getTask(dataset.id)
            const task = docu.data()

            form['nom-c'].value = task.nom;
            form['dcr-c'].value = task.dcr;
            form['esp-c'].value = task.esp;
            form['fec-c'].value = task.fec;
            form['hor-c'].value = task.hor;
           
            editStatus = true;
            id = docu.id;

            form['btn-register'].innerText = 'ACTUALIZAR CITA';
        })
    })

    });
    
})