const form =  document.querySelector('form');

form.addEventListener('submit', function(event){

    event.preventDefault();

    const fecha = document.getElementById('fecha').value;
    const metros = parseInt(document.getElementById('metrosPasto').value) || 0;
    const precio = parseInt(document.getElementById('precio').value) || 0;

    console.log(fecha, metros, precio)

});