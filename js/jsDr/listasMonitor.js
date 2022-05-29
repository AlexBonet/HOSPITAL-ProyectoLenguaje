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

export const onGetTasks = (callback) => onSnapshot(collection(db, 'citas'),callback);
export const onGetConsulta = (callback) => onSnapshot(collection(db, 'consulta'),callback);
export const deleteTask = id => deleteDoc(doc(db,'citas', id));

const container = document.getElementById('contenedor-citas');
const containerC = document.getElementById('contenedor-consultas');


/*LISTA DE ESPERA*/
window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {

    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .myDiv {
                    position: relative;
                    background-color: rgb(182, 213, 255);
                    width: 100%;
                    text-align: center;
                    color:black;
                    margin-top:10px;
                
                }
                .myDiv p {
                    display: inline-block;
                    font-size: larger;

                }
                .cnom{
                    width: 40%;
                }
                .cfec{
                    width: 40%;

                }
                .cdr{
                    width: 40%;

                }
                .cesp{
                    width: 40%;

                }

            </style>
            <div class="myDiv">
                <p class="cnom">Nombre: ${task.nom}</p>
                <p class="cfec">FECHA Y HORA: ${task.fec}, ${task.hor} </p>
                <p class="cdr">Doctor: ${task.dcr}</p>
                <p class="cesp">Especialidad: ${task.esp}</p>
                <div class="btn-next">
                    <button class='btn-delete' data-id="${doc.id}">SIGUIENTE</button>
                </div>

            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteTask(dataset.id)
            $.jGrowl("Que pase... ", {theme: 'changeCount'});
        })
    })
    });
    
})


/*LISTA DE CONSULTAS*/
window.addEventListener('DOMContentLoaded', async () => {
    onGetConsulta((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <style>
                .contenedor-especilidad{
                    width: 98%;
                    height: 40px;
                    padding-bottom:10px;
                    border: 3px solid  rgb(58, 197, 181);
                    margin-top: 10px;
                    color:black;
                }

                .nom-esp{
                    width: 30%;
                    display: inline-block;
                    margin-top:-20px;
                    height:40px;
                    line-height:40px;
                }

                .nom-esp-dr{
                    width: 68%;
                    display: inline-block;
                }

            </style>
            <div class="contenedor-especilidad">
                <div class="nom-esp"><h3>Puerta: <i>${task.num}</i></h3></div>
                <div class="nom-esp-dr"><h3>Dr:  <i>${task.dr}</i></h3></div>
            </div>
        `;
    });

    containerC.innerHTML = html ;

    });
    
})
