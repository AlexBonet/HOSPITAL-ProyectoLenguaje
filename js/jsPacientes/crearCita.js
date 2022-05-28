import { saveCitaGest} from '../firebase.js';

const form = document.getElementById('cita-form');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const nom = form['nom-c'];
    const esp = form['esp-c'];
    const dcr = form['dcr-c'];
    const fec = form['fec-c'];
    const hor = form['hor-c'];

    saveCitaGest(nom.value , esp.value , dcr.value , fec.value , hor.value );
    $.jGrowl("Cita registrada con existo", {theme: 'changeCount'});
    form.reset()
})