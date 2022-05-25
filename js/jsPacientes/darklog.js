import { loginCheck } from '../firebase.js';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged 
        } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-auth.js"

const form = document.getElementById('log-form')
const btnLogin = document.getElementById('btn-login')

var elNUMERO = 0;
console.log(elNUMERO)


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const mail = form['form-mail']
    const pswd = form['form-passwd']

    loguear(mail.value, pswd.value,elNUMERO);


    form.reset();
})

window.onload = function () {
    console.log("usuario? " + loginCheck());
  }


const btnAdm = document.getElementById('btn-adm')
btnAdm.addEventListener('click', (e) => {
      e.preventDefault();
      btnLogin.innerText = 'IDENTIFICARSE COMO ADMINISTRADOR';
      elNUMERO = 1;
      console.log(elNUMERO)      
  })

  const btndr = document.getElementById('btn-dr')
    btndr.addEventListener('click', (e) => {
        e.preventDefault();
        btnLogin.innerText = 'IDENTIFICARSE COMO DOCTOR';
        elNUMERO = 2;
        console.log(elNUMERO)    
    })

    
    const btnrecp = document.getElementById('btn-recp')
    btnrecp.addEventListener('click', (e) => {
        e.preventDefault();
        btnLogin.innerText = 'IDENTIFICARSE COMO RECEPCIONISTA';
        elNUMERO = 3;
        console.log(elNUMERO)   
    })


/**/
const loguear  = (mail,pswd, nuum)  =>
    signInWithEmailAndPassword(getAuth(), mail, pswd)
        .then((userCredential) => {
        // Signed in
        console.log('usuario logueado')
        
        const usua = getDarkUser(nuum);
        console.log('usuario: ' + usua)
    });

    export const getDarkUser = (nuum)  =>
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            console.log('auth: usuario logueado')
            const uid = user.uid;   
                
            if(nuum==1){
                    //window.location.href="../htmlsAdmin/index.html";
                    console.log("usuario? " + loginCheck());


            }else if(nuum==2){
                    //window.location.href="../htmlsDoctor/visitasDr.html";
                    console.log("usuario? " + loginCheck());


            }else if(nuum==3){
                    //window.location.href="../recepcion/recepcionista.html";
                    console.log("usuario? " + loginCheck());


            }else{
                    console.log("no tenemos tipo");
                    console.log("usuario? " + loginCheck());

            }
            
        }; 
    });
