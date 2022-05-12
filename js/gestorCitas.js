import { saveCitaGest, getTasks, onGetTasks,deleteTask, getTask, updateTasks } from './firebase.js';

const form = document.getElementById('cita-form')
const container = document.getElementById('contenedor-cit')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-gp']
    const doc = form['doc-gp']
    const esp = form['esp-gp']
    const con = form['con-gp']
    const fh = form['fh-gp']

    saveCitaGest(nom.value ,esp.value ,doc.value ,fh.value ,con.value )

    form.reset()
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
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
                    width: 20%;
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
                <div class="nom"><h2>Sr/a.: ${task.nom}</h2></div>
                <div class="doc"><h3>Dr/a.: ${task.doc}</h3></div>
                <div class="esp"><p>${task.esp}</p></div>
                <div class="fyh"><h3>Fecha y Hora: ${task.fh}</h3></div>    
                <div class="btn-editar"><button class='btn-edit' data-id="${doc.id}">Editar</button></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${doc.id}">Borrar</button></div>
                <div class="con"><h3>Consulta: ${task.con}</h3></div>
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
            const doc = await getTask(dataset.id)
            const task = doc.data()

            form['nom-pc'].value = task.nom;
            form['ape-pc'].value = task.ape;
            form['dni-pc'].value = task.dni;
            form['fh-pc'].value = task.fh;
            form['txt-pc'].value = task.txt;
           
//            editStatus = true;
  //          id = doc.id;

    //        form['btn-pc'].innerText = 'Update'
        })
    })

    });
    
})