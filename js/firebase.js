// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc,
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged , sendSignInLinkToEmail,sendPasswordResetEmail 
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js"

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

/*AUTENTIFICACION*/
const auth = getAuth();
export const autentifiacar  = (mail, pswd) =>
    createUserWithEmailAndPassword (auth, mail, pswd)
        .then((userCredential) => {
        // Signed in
        console.log('usuario registrado')
        sendSignInLinkToEmail(auth, mail, actionCodeSettings)
            .then(() => {
                window.localStorage.setItem('emailForSignIn', mail);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        });

export const loguear  = (mail,pswd)  =>
    signInWithEmailAndPassword(auth, mail, pswd)
        .then((userCredential) => {
        // Signed in
        console.log('usuario logueado')
        const usua = getUser();
        });

export const salir  = ()  =>
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('saliendo')
        window.location.href="../htmls/index.html"
    }).catch((error) => {
        // An error happened.
    });

export const getUser = ()  =>
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('auth: usuario logueado ' + user.email)//esto pilla el user
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
            if(user.email == 'admin@admin.admin'){
                window.location.href="../htmlsAdmin/index.html";
            }else{
                const uid = user.uid;   
                $.jGrowl("Usuario logueado: " + user.email, {theme: 'changeCount'});
                loginCheck(user)    
                window.location.href="../htmlPaciente/index.html";
            }
        } else {
        // User is signed out
            loginCheck(user)    
            console.log('auth: no hay usuario logueado')
        
        }
    }); 

    export const getUser2 = ()  =>
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('auth: usuario logueado ' + user.email)//esto pilla el user
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;   
            loginCheck(user)    
        
        } else {
        // User is signed out
            loginCheck(user)    
            console.log('auth: no hay usuario logueado')
        
        }
    }); 

export const loginCheck = user => {
    const loggedIn = document.querySelectorAll('.loggedIn')
    const loggedOut = document.querySelectorAll('.loggedOut')

    if(user){
        console.log('UserCheck: ' + user.email)
        
        loggedIn.forEach(link => link.style.display = 'block' );
        loggedOut.forEach(link => link.style.display = 'none' );
    }else{
        loggedIn.forEach(link => link.style.display = 'none' );
        loggedOut.forEach(link => link.style.display = 'block' );
    }

}

export const obtenerCorreos = ()  =>
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('auth: usuario logueado ' + user.email)
        $.jGrowl("Usuario logueado: " + user.email, {theme: 'changeCount'});
        const uid = user.uid;            
    
    } else {
    // User is signed out
        console.log('auth: no hay usuario logueado')
    
    }
}); 

export const cambiarPasswd = (email)=> {
    sendPasswordResetEmail(email);
    $.jGrowl("Correo enviado", {theme: 'changeCount'});
}

/*CITAS*/
export const saveCitaGest = (nom,esp,dcr,fec,hor) => 
    addDoc(collection(db, 'citas'),{nom ,esp ,dcr ,fec,hor})

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

/*ESPECIALIDADES*/
export const saveEspecialidad = (especia,dr) => 
    addDoc(collection(db, 'especialidad'),{especia,dr})

export const updateEspecialidad = (id,newFields) => updateDoc(doc(db,"especialidad",id), newFields);

export const onGetEspecialidad = (callback) => onSnapshot(collection(db, 'especialidad'),callback);

export const getEspecialidad = id => getDoc(doc(db,'especialidad', id));

export const deleteEspecialidad = id => deleteDoc(doc(db,'especialidad', id));

/*CONSULTAS*/
export const saveConsulta = (num,dr) => 
    addDoc(collection(db, 'consulta'),{num,dr})

export const updateConsulta = (id,newFields) => updateDoc(doc(db,"consulta",id), newFields);

export const onGetConsulta = (callback) => onSnapshot(collection(db, 'consulta'),callback);

export const getConsulta = id => getDoc(doc(db,'consulta', id));

export const deleteConsulta = id => deleteDoc(doc(db,'consulta', id));

/*CONTRASEÑAS*/
let simbolos = "$#_-.,'¿?!¡%&/()";
let mayusculas = "ABCDEFGHIJKLMOPQRSTUVWXYZ";
let minusculas = "abcdefghijklmnopqrsetuvwxyz";
let numeros = "1234567890";

let random = simbolos+mayusculas+minusculas+numeros;

let haveMayus = false;
let haveMinus = false;
let havaNum = false;
let haveSim = false;

let contrasenya = '';
let i = 0;

let str = "";

function passwordDoIt(){
    do{
        i = getRandomNum();
        contrasenya = random.charAt(i);
        if(simbolos.includes(contrasenya)){
            haveSim = true;
            i++;
        }
        if(mayusculas.includes(contrasenya)){
            haveMayus = true;
            i++;
        }
        if(minusculas.includes(contrasenya)){
            haveMinus = true;
            i++;
        }
        if(numeros.includes(contrasenya)){
            havaNum = true;
            i++;
        }
        str += contrasenya;
        if(str.length > 9){
            str ="";
            contrasenya = '';
            haveMayus = false;
            haveMinus = false;
            havaNum = false;
            haveSim = false;
        }
    }while(str.length < 8 && (haveMayus = true) && (haveMinus = true) && (havaNum = true) && (haveSim = true));
    console.log(str);
    return str;
}

function getRandomNum(){
    let u =Math.floor((Math.random()*(random.length-0+1)+0)) 
    return u;
}