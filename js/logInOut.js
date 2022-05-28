import { loguear, salir, getUser, loginCheck } from './firebase.js';

const form = document.getElementById('log-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const mail = form['form-mail']
    const pswd = form['form-passwd']
    
    loguear(mail.value, pswd.value);

    form.reset();
})



    const logout = document.getElementById('log-out')
    logout.addEventListener('submit', (e) => {
        e.preventDefault()
        salir();

    })


window.onload = function () {
    console.log("usuario? " + loginCheck());
  }