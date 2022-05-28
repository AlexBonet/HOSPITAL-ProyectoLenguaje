import { logPaciente,autentifiacar } from '../firebase.js';

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
    $.jGrowl("Usuario registrado con existo", {theme: 'changeCount', life: 20000 });
    window.location.href="./identificarse.html";
})
