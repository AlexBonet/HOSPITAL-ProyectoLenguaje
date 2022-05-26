import {salir,loginCheck } from './firebase.js';

const logout = document.getElementById('log-out')
logout.addEventListener('click', (e) => {
    e.preventDefault()
    salir();

})


window.onload = function () {
console.log("usuario? " + loginCheck());
}