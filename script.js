const form = document.querySelector('form');
const totalElement = document.getElementById('total');
const listaElement = document.getElementById('lista-productos');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const metros = parseInt(document.getElementById('metros').value) || 0;
    const servicio = document.getElementById('servicio').value;
    const mesas = parseInt(document.getElementById('mesas').value) || 0;
    const sillas = parseInt(document.getElementById('sillas').value) || 0;
    const decoracion = document.getElementById('decoracion').value;
    const pasto = parseInt(document.getElementById('pasto').value) || 0;
    const pista = parseInt(document.getElementById('pista').value) || 0;
    const mesaMisXv = document.getElementById('mesaMisXv').checked; 
    const mesa15 = document.getElementById('mesa15').checked;
    const mesaLove = document.getElementById('mesaLove').checked;
    const invitacion = document.getElementById('invitacion').checked;
    const juegos = document.getElementById('juegos').checked;
    const baños = document.getElementById('baños').checked;
    const loza = parseInt(document.getElementById('loza').value) || 0;
    const meseros = parseInt(document.getElementById('meseros').value) || 0;

    //Definicion de los costos
    const costos = {
        normal: { metro: 240, mesa: 0 },
        frances: { metro: 240, mesa: 80 },
        imperial: { metro: 240, mesa: 460 }
    };

    const costosDecoraciones = {
        normal: { metro: 50, completa: 0 },
        plafon: { metro: 0, completa: 3000 },
        flor: { metro: 0, completa: 1500 }
    }

    const costoMetroPasto = 17;
    const costoModuloPista = 250;
    const costoLoza = 17;
    const costoMesero = 350;

    let total = 0;
    let mensajeError = '';

    if (costos[servicio] && mesas <= metros) {
        const sillasRequeridas = mesas * 10;  // Por cada mesa hay 10 sillas
        if (sillas !== sillasRequeridas) {
            mensajeError = `El número de sillas debe ser ${sillasRequeridas} para ${mesas} mesas.`;
        } else {
            total = (metros * costos[servicio].metro) + (mesas * costos[servicio].mesa);

            if (costosDecoraciones[decoracion]) {
                if (decoracion === 'normal') {
                    total += metros * costosDecoraciones[decoracion].metro;
                } else {
                    total += costosDecoraciones[decoracion].completa;
                }
            }

            console.log(total);

            if (pasto > 0) {
                total += (pasto * 8) * costoMetroPasto;
            }

            if (pista > 0) {
                total += pista * costoModuloPista;
            }

            if (loza > 0){
                total += loza * costoLoza;
            }

            if (meseros > 0){
                total += meseros * costoMesero;
            }

            if (mesaMisXv) {
                total += 1500;
            }
            if (mesa15) {
                total += 1000;
            }
            if (mesaLove) {
                total += 2000;
            }

            if (invitacion){
                total += 400;
            }

            if (juegos){
                total += 600;
            }

            if (baños){
                total += 2200;
            }

            console.log(total);
        }
    } else if (mesas > metros) {
        mensajeError = `La cantidad de mesas seleccionadas no caben en ${metros} metros`;
    } else {
        mensajeError = "Ocurrió un error y no sabemos por qué, intentalo de nuevo";
    }

    listaElement.textContent = '';

    const cotizacion = [
        { label: `Metros de carpa: 8 x ${metros} `, value: metros },
        { label: `Cantidad de mesas: ${mesas}`, value: mesas },
        { label: `Cantidad de sillas: ${sillas} `, value: sillas },
        { label: `Servicio: ${servicio}`, value: servicio },
        { label: `Decoracion: ${decoracion}`, value: decoracion },
        { label: `Metros de pasto: ${pasto} `, value: pasto },
        { label: `Modulos de pista: ${pista} `, value: pista },
        { label: `1 Mesa MisXV con un trono`, value: mesaMisXv },
        { label: `1 Mesa 15`, value: mesa15 },
        { label: `1 Mesa LOVE con 2 tronos`, value: mesaLove },
        { label: `1 Invitacion Digital`, value: invitacion },
        { label: `1 Baños Moviles`, value: baños },
        { label: `1 Juego`, value: juegos },
        { label: `Meseros: ${meseros}`, value: meseros },
        { label: `Loza para: ${loza} personas`, value: loza },
    ];

    cotizacion.forEach(item => {
        if (item.value > 0 || item.value) {
            listaElement.append(item.label, document.createElement('br'));
        }
    });

    totalElement.textContent = mensajeError || `${total}`


});

document.getElementById('enviarCotizacion').addEventListener('click', function () {

    const listaElement = document.getElementById('lista-productos');
    const mensajeBase = listaElement.textContent.trim();
    const totalElementC = document.getElementById('total').textContent; 

    const mensaje = `Le tengo la siguiente cotizacion: \n${mensajeBase}\n Total: $${totalElementC}`;

    const mensajeCodificado = encodeURIComponent(mensaje);

    const enlaceWhatsApp = `https://wa.me/?text=${mensajeCodificado}`;

    window.open(enlaceWhatsApp, '_blank');
    

});
