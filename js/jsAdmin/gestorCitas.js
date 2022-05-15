import { saveCitaGest, onGetTasks,deleteTask, getTask, updateTasks } from '../firebase.js';

const form = document.getElementById('cita-form');
const container = document.getElementById('contenedor-cit');

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-gp'];
    const doc = form['doc-gp'];
    const esp = form['esp-gp'];
    const con = form['con-gp'];
    const fh = form['fh-gp'];

    if(!editStatus){
        saveCitaGest(nom.value ,esp.value ,doc.value ,fh.value ,con.value );
    }else{
        updateTasks(id,{nom:nom.value ,esp:esp.value ,doc:doc.value ,fh:fh.value ,con:con.value});
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
                    margin-left: 15px;
                    width: 30%;
                }
                .doc{
                    margin-left: 15px;
                    margin-top:-10px;
                    width: 20%;
                }
                .esp{
                    margin-left: 21%;
                    margin-top: -40px;
                    width: 20%;
                }
                .fyh{
                    margin-top: -60px;
                    margin-left: 42%;
                    width: 23%;
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
                .con{
                    width: 20%;
                    margin-left: 67%;
                    margin-top: -42.5px;
                }
            </style>
            <div class="view">
                <div class="nom"><h2>Sr/a.: <i>${task.nom}</i></h2></div>
                <div class="doc"><h3>Dr/a.: <i>${task.doc}</i></h3></div>
                <div class="esp"><p><i>${task.esp}</i></p></div>
                <div class="fyh"><h3>Fecha y Hora: <i> ${task.fh}</i></h3></div>    
                <div class="btn-editar"><button class='btn-edit' data-id="${docu.id}">Editar</button></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${docu.id}">Borrar</button></div>
                <div class="con"><h3>Consulta: <i> ${task.con}</i></h3></div>
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

            form['nom-gp'].value = task.nom;
            form['doc-gp'].value = task.doc;
            form['esp-gp'].value = task.esp;
            form['con-gp'].value = task.con;
            form['fh-gp'].value = task.fh;
           
            editStatus = true;
            id = docu.id;

            form['btn-register'].innerText = 'ACTUALIZAR CITA';
        })
    })

    });
    
})