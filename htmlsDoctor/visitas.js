import { saveVisita, onGetVisita,deleteVisita, getVisita, updateVisita } from '../js/firebase.js';

const form = document.getElementById('log-form');
const container = document.getElementById('cont-visitas');

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-n'].value;
    const ape = form['ape-n'].value;
    const cita = form['cita-n'].value;
    const fec = form['fec-n'].value;
    const nota = form['nota'].value;
    
    if(!editStatus){
        saveVisita(nom ,ape,cita,fec,nota);
        console.log("save")    
    }else{
        updateVisita(id,{nom ,ape,cita,fec,nota});
        editStatus = false;
    }
    console.log("click")
    form.reset()
    form['btn-register'].innerText = 'CREAR VISITA';
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetVisita((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((docu) => {
        const task = docu.data();
        html+=` 
            <style>      
                .visita{
                    width: 95.5%;
                    padding: 10px;
                    border: 2px solid #c53a4a;
                }
                
                .cita-n{
                    display: inline-block;
                }
                
                .fech-n{
                    margin-left: 100px;
                    display: inline-block;
                }
                
                .edit-n{
                    display: inline-block;
                    float: right;
                    margin-right: 10px;
                }
                
                .info-n{
                    margin-top: 10px;
                    display: inline-block;
                }
                
                .dlte-n{
                    display: inline-block;
                    margin-top: 10px;
                    float: right;
                    margin-right: -65px;
                }
            </style>
            <div class="visita">
                <div class="cita-n">${task.cita}</div>
                <div class="fech-n">FECHA: <i>${task.fec}</i></div>
                <div class="edit-n"><button data-id="${docu.id}>EDITAR</button></div>
                <div class="info-n">PACIENTE: <i>${task.nom} ${task.ape}</i></div>
                <div class="dlte-n"><button data-id="${docu.id}>BORRAR</button></div>
            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteVisita(dataset.id)
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const docu = await getVisita(dataset.id)
            const task = docu.data()

            form['nom-n'].value=task.nom;
            form['ape-n'].value=task.nom;
            form['cita-n'].value=task.nom;
            form['fec-n'].value=task.nom;
            form['nota'].value=task.nom;

            editStatus = true;
            id = docu.id;

            form['btn-register'].innerText = 'ACTUALIZAR VISITA';
        })
    })

    });
    
})