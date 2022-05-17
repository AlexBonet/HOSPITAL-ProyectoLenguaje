import { loguear, salir, getUserPaciente } from './firebase.js';

const form = document.getElementById('log-form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const mail = form['form-mail']
    const pswd = form['form-passwd']

    //loguear(mail.value, pswd.value);
    if(loguear(mail.value, pswd.value)){//TODO
        console.log('logueado con exito')
        //window.location.href="../htmlPaciente/index.html";
    }else{
        console.log('Mal')
    }

    form.reset();
})


if(document.getElementById('log-out')!=null){
    const logout = document.getElementById('log-out')
    logout.addEventListener('submit', (e) => {
        e.preventDefault()
        salir();

    })
}

