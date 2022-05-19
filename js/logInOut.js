import { loguear, salir, getUser, loginCheck } from './firebase.js';

const form = document.getElementById('log-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const mail = form['form-mail']
    const pswd = form['form-passwd']

    loguear(mail.value, pswd.value);
    /*
    if(){//TODO
        console.log('logueado con exito')
        const user = getUser
        window.location.href="../htmlPaciente/index.html";
        
        
    }else{
        console.log('Mal')
    }*/

    form.reset();
})



    const logout = document.getElementById('log-out')
    //const logout2 = document.querySelectorAll('.loggedin')
    logout.addEventListener('submit', (e) => {
        e.preventDefault()
        salir();

    })/*
    logout2.addEventListener('submit', (e) => {
        e.preventDefault()
        salir();

    })*/

window.onload = function () {
    console.log("usuario? " + loginCheck());
  }