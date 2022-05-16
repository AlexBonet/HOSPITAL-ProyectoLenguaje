import { logPaciente,autentifiacar } from './firebase.js';

const form = document.getElementById('log-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['form-nom']
    const ape = form['form-apel']
    const dir = form['form-dire']
    const pob = form['form-pobl']
    const pais = form['form-pais']
    const mail = form['form-mail']
    const tlf = form['form-tlf']
    const user = form['form-user']
    const pswd = form['form-passwd']
    const cpaswd = form['form-confpass']

    logPaciente(nom.value,ape.value,dir.value,pob.value,pais.value,mail.value,tlf.value,user.value,pswd.value,cpaswd.value);
    autentifiacar(mail.value, pswd.value);

    form.reset();
    window.location.href="./identificarse.html";
})

/*
const singup = document.querySelector('');

singup.addEventListener('submit', (e) => {
    e.preventDefault();

    const mail = form['form-mail']
    const pswd = form['form-passwd']

    auth.createUserWhithEmailAndPassword(mail.value, pswd.value)
        .then((userCredential) => {
        // Signed in
        console.log('usuario registrado')
        //const user = userCredential.user;
        // ...
      })

    
})*/