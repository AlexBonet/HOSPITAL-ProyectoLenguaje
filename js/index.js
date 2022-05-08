import { saveF, getTasks, onGetTasks,deleteTask, getTask, updateTasks } from './firebase.js';

const form = document.getElementById('cita-form')
const container = document.getElementById('contenedor-citas')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-pc']
    const ape = form['ape-pc']
    const dni = form['dni-pc']
    const fh = form['fh-pc']
    const txt = form['txt-pc']

    saveF(nom.value ,ape.value ,dni.value ,fh.value ,txt.value )

    form.reset()
})

window.addEventListener('DOMContentLoaded', async () => {
    onGetTasks((querySnapshot) => {
    let html ="";

    querySnapshot.forEach((doc) => {
        const task = doc.data();
        html+=`
            <div>
                <h3>${task.nom}</h3>
                <p>${task.ape}</p>
                <p>${task.dni}</p>
                <p>${task.fh}</p>
                <p>${task.txt}</p>
                <button class='btn-delete' data-id="${doc.id}">Borrar</button>
                <button class='btn-edit' data-id="${doc.id}">Editar</button>
            </div>
        `;
    });

    container.innerHTML = html ;

    const btnsDelete = container.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
        btn.addEventListener('click',({target: {dataset}}) => {
            deleteTask(dataset.id)
        })
    })

    const btnsEdit = container.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
        btn.addEventListener('click',async ({target: {dataset}}) => {
            const doc = await getTask(dataset.id)
            const task = doc.data()

            form['nom-pc'].value = task.nom;
            form['ape-pc'].value = task.ape;
            form['dni-pc'].value = task.dni;
            form['fh-pc'].value = task.fh;
            form['txt-pc'].value = task.txt;
           
//            editStatus = true;
  //          id = doc.id;

    //        form['btn-pc'].innerText = 'Update'
        })
    })

    });
    
})