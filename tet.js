// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
import { getFirestore
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-database.js";


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

const dba = getDatabase();
const postListRef = ref(dba, 'doctores');
const newPostRef = push(postListRef);
set(newPostRef, {
    
});

export const getAlgo = ()  => postListRef;
export const getAlgo2 = ()  => newPostRef;