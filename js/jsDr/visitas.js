// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import {  getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,} from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA9LXWrf2aFYUPm31gIcsPu8hmzPHR-Yxs",
    authDomain: "proyectolm3-37b1a.firebaseapp.com",
    projectId: "proyectolm3-37b1a",
    storageBucket: "proyectolm3-37b1a.appspot.com",
    messagingSenderId: "1009871135607",
    appId: "1:1009871135607:web:506cb01da5221884513772"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()

/*Visita*/
export const saveVisita = (nom,ape,cita,fec,nota) => 
    addDoc(collection(db, 'visita'),{nom,ape,cita,fec,nota})
export const updateVisita = (id,newFields) => updateDoc(doc(db,"visita",id), newFields);
export const onGetVisita = (callback) => onSnapshot(collection(db, 'visita'),callback);
export const getVisita = id => getDoc(doc(db,'visita', id));
export const deleteVisita = id => deleteDoc(doc(db,'visita', id));

const form = document.getElementById('visitas-form');
const container = document.getElementById('cont-visitas');

let editStatus = false;
let id = '';

/*ENVIAR FORMULARIO CREA Y ACTUALIZA*/ 
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-n'].value;
    const ape = form['ape-n'].value;
    const cita = form['cit-n'].value;
    const fec = form['fec-n'].value;
    const nota = form['txt-n'].value;
    
    if(!editStatus){
        saveVisita(nom ,ape,cita,fec,nota);
        $.jGrowl("Nota creada con existo", {theme: 'changeCount'});
        console.log("save")    
    }else{
        updateVisita(id,{nom ,ape,cita,fec,nota});
        $.jGrowl("Nota actualizada con existo", {theme: 'changeCount'});
        editStatus = false;
    }
    console.log("click")
    form.reset()
    form['log-form'].innerText = 'CREAR VISITA';
})

/*Visitas anteriores:*/
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
                <div class="edit-n"><button class='btn-edit' data-id="${docu.id}>EDITAR</button></div>
                <div class="info-n">PACIENTE: <i>${task.nom} ${task.ape}</i></div>
                <div class="dlte-n"><button class='btn-delete' data-id="${docu.id}}>BORRAR</button></div>
            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteVisita(dataset.id)
            $.jGrowl("Nota eliminda con existo", {theme: 'changeCount'});
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

            form['log-form'].innerText = 'ACTUALIZAR VISITA';
        })
    })

    });
    
})