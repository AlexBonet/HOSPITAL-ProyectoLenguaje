setInterval(() => { //Ejecutar fecha cada segundo
    let fecha = new Date();
    const meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    const dias = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    const year = fecha.getFullYear();
    const mes = meses[fecha.getMonth()];
    const dia = dias[fecha.getDay()];
    const diaN = fecha.getDate();
    const horas = (String(fecha.getHours()).length == 2) ? fecha.getHours() : `0${fecha.getHours()}`;
    const minutos = (String(fecha.getMinutes()).length == 2) ? fecha.getMinutes() : `0${fecha.getMinutes()}`;
    const segundos = (String(fecha.getSeconds()).length == 2) ? fecha.getSeconds() : `0${fecha.getSeconds()}`;

    //Mostrando fecha
    document.getElementById('year').innerHTML = year
    document.getElementById('mes').innerHTML = mes
    document.getElementById('dia').innerHTML = diaN;
    document.getElementById('diaSemana').innerHTML = dia;
    document.getElementById('horas').innerHTML = horas;
    document.getElementById('minutos').innerHTML = minutos;
    document.getElementById('segundos').innerHTML = segundos;
}, 1000);
