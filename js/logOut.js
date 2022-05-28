import {salir,loginCheck, getUser2} from './firebase.js';

getUser2();

window.onload = function () {
console.log("usuario? " + loginCheck());
}