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
    addDoc(collection(db, 'ci'),{nom ,ape ,dni ,fh ,txt})

export const getTasks = () => getDocs(collection(db, 'ci'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'ci'),callback);

export const deleteTask = id => deleteDoc(doc(db,'ci', id));

export const getTask = id => getDoc(doc(db,'ci', id));

export const updateTasks = (id,newFields) => updateDoc(doc(db,"ci",id), newFields);

