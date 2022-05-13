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

/*CITAS*/
export const saveF = (nom,ape,dni,fh,txt) => //borrar?
    addDoc(collection(db, 'citas'),{nom ,ape ,dni ,fh ,txt})

export const saveCitaGest = (nom,esp,doc,fh,con) => 
    addDoc(collection(db, 'citas'),{nom ,esp ,doc ,fh,con})

export const getTasks = () => getDocs(collection(db, 'citas'));

export const onGetTasks = (callback) => onSnapshot(collection(db, 'citas'),callback);

export const deleteTask = id => deleteDoc(doc(db,'citas', id));

export const getTask = id => getDoc(doc(db,'citas', id));

export const updateTasks = (id,newFields) => updateDoc(doc(db,"citas",id), newFields);


/*PACIENTES*/
export const logPaciente = (nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd) => 
    addDoc(collection(db, 'pacientes'),{nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd})

export const updatePacientes = (id,newFields) => updateDoc(doc(db,"pacientes",id), newFields);

export const onGetPaciente = (callback) => onSnapshot(collection(db, 'pacientes'),callback);

export const getPaciente = id => getDoc(doc(db,'pacientes', id));

export const deletePacientes = id => deleteDoc(doc(db,'pacientes', id));


/*DOCTORES*/
export const logDoctor = (nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd) => 
    addDoc(collection(db, 'doctores'),{nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd})

export const updateDoctor = (id,newFields) => updateDoc(doc(db,"doctores",id), newFields);

export const onGetDoctor = (callback) => onSnapshot(collection(db, 'doctores'),callback);

export const getDoctor = id => getDoc(doc(db,'doctores', id));

export const deleteDoctor = id => deleteDoc(doc(db,'doctores', id));

/*RECEPCIONISTAS*/
export const logRecep = (nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd) => 
    addDoc(collection(db, 'recep'),{nom,apel,dire,pobl,pais,mail,tlf,user,pswd,cpaswd})

export const updateRecep = (id,newFields) => updateDoc(doc(db,"recep",id), newFields);

export const onGetRecep = (callback) => onSnapshot(collection(db, 'recep'),callback);

export const getRecep = id => getDoc(doc(db,'recep', id));

export const deleteRecep = id => deleteDoc(doc(db,'recep', id));
