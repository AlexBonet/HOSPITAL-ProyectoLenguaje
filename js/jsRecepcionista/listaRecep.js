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

/*PACIENTES*/
export const onGetPaciente = (callback) => onSnapshot(collection(db, 'pacientes'),callback);

const container = document.getElementById('contenedor-pacientes')

window.addEventListener('DOMContentLoaded', async () => {
    onGetPaciente((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .paciente-espera{
                    background-color: rgb(182, 213, 255);
                    margin-bottom:10px;
                    width:97%;
                    height:100px;
                    padding-left:3%;
                }

                .dato{
                    display: inline-block;
                    width: 45%;
                    
                }
            </style>
            
            <div class="paciente-espera">
                <p class="dato">NOM: <i>${task.nom}</i></p>
                <p class="dato">APELLIDOS: <i>${task.apel}</i></p>
                <button class='btn-acp' data-id="${doc.id}">Aceptar</button>
                <p class="dato">TELEFONO: <i>${task.tlf}</i></p>
                <p class="dato">EMAIL: <i>${task.mail}</i></p>
                <button class='btn-delete' data-id="${doc.id}">Denegar</button>
            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',(e) => {
            $.jGrowl("DENEGAR", {theme: 'changeCount'});
        })
    })

    const btnsacept = container.querySelectorAll('.btn-acp');
    btnsacept.forEach(btn => {
        btn.addEventListener('click',(e) => {
            $.jGrowl("ACEPTAR", {theme: 'changeCount'});
        })
    })
    });


});
