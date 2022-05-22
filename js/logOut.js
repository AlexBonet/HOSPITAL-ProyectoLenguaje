import {salir,loginCheck } from './firebase.js';

const logout = document.getElementById('log-out')
logout.addEventListener('submit', (e) => {
    e.preventDefault()
    salir();

})


window.onload = function () {
console.log("usuario? " + loginCheck());
}