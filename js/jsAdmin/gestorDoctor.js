import { logDoctor, onGetDoctor, deleteDoctor, getDoctor, updateDoctor, autentifiacar } from '../firebase.js';

const form = document.getElementById('log-form')
const container = document.getElementById('contenedor-doc')

let editStatus = false;
let id = '';

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['form-nom']
    const apel = form['form-apel']
    const dire = form['form-dire']
    const pobl = form['form-pobl']
    const pais = form['form-pais']
    const mail = form['form-mail']
    const tlf = form['form-tlf']
    const user = form['form-user']

    if(!editStatus){
        logDoctor(nom.value,apel.value, dire.value, pobl.value,pais.value,mail.value,tlf.value,user.value,"123456","123456");
        autentifiacar(mail.value, "123456");
        $.jGrowl("Doctore creade con existe", {theme: 'changeCount'});

    }else{
        updateDoctor(id,{nom:nom.value,apel:apel.value, dire:dire.value, pobl:pobl.value, pais:pais.value,mail:mail.value,tlf:tlf.value,user:user.value});
        editStatus = false;
        $.jGrowl("Doctore actualizade con existe", {theme: 'changeCount'});
    }

    form.reset();
    form['btn-register'].innerText = 'CREAR DOCTOR'
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetDoctor((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .view{
                    background-color: rgb(52, 94, 52);
                    margin-left: 10%;
                    height: 120px;
                    width: 80%;
                    font-size: larger;
                    color: white;
                    border: 1px solid black;
                    margin-bottom:30px;
                }
                .nom{
                    margin-left: 15px;
                    width: 40%;
                }
                .ubic{
                    margin-left: 15px;
                    width: 40%;
                    margin-top: -5px;
                }
                .mail{
                    position: relative;
                    margin-left: 45%;
                    margin-top: 20px;
                    width: 40%;
                }
                .user{
                    position: relative;
                    margin-top: -90px;
                    margin-left: 45%;
                    width: 40%;
                }
                .btn-dlt{
                    position: static;
                    margin-top: -90px;
                    float: right;
                    width: 5%;
                }
                .btn-edt{
                    position: static;
                    margin-top: -50px;
                    float: right;
                    width: 5%;
                }
                
            </style>
            <div class="view">
                <div class="nom"><h2>Sr/a.: <i>${task.nom} ${task.apel}</i></h2></div>
                <div class="ubic"><p><i> ${task.dire} , ${task.pobl} , ${task.pais} </i></p></div>
                <div class="user"><p>Usuario: <i>${task.user}</i></p></div> 
                <div class="mail"><p>Email: <i>${task.mail}</i></p></div>
                <div class="btn-dlt"><button class='btn-delete' data-id="${doc.id}">Borrar</button></div>
                <div class="btn-edt"><button class='btn-edit' data-id="${doc.id}">Editar</button></div>
            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteDoctor(dataset.id)
            $.jGrowl("Doctore eliminade con existe", {theme: 'changeCount'});
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit');
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const doc = await getDoctor(dataset.id);
            const task = doc.data();

            

            form['form-nom'].value = task.nom;
            form['form-apel'].value = task.apel;
            form['form-dire'].value = task.dire;
            form['form-pobl'].value = task.pobl;
            form['form-pais'].value = task.pais;
            form['form-mail'].value = task.mail;
            form['form-tlf'].value = task.tlf;
            form['form-user'].value = task.user;
            
            editStatus = true;
            id = doc.id;

            form['btn-register'].innerText = 'Actualizar';
        })
    })

    });
    
})