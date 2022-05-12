// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export const saveF = (nom,ape,dni,fh,txt) => 
    addDoc(collection(db, 'citas'),{nom ,ape ,dni ,fh ,txt})

export const saveCitaGest = (nom,esp,doc,fh,con) => 
    addDoc(collection(db, 'citas'),{nom ,esp ,doc ,fh,con})

export const getTasks = () => getDocs(collection(db, 'citas'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'citas'),callback);

export const deleteTask = id => deleteDoc(doc(db,'citas', id));

export const getTask = id => getDoc(doc(db,'citas', id));

export const updateTasks = (id,newFields) => updateDoc(doc(db,"citas",id), newFields);

export const logPaciente = (nom,ape,dir,pob,pais,mail,tlf,user,pswd,cpaswd) => 
    addDoc(collection(db, 'pacientes'),{nom,ape,dir,pob,pais,mail,tlf,user,pswd,cpaswd})