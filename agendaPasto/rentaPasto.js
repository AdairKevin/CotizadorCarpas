const form = document.querySelector('form');
const totalElement = document.getElementById('total');

form.addEventListener('submit', function (event) {

  event.preventDefault();

  const fecha = document.getElementById('fecha').value;
  const metros = parseInt(document.getElementById('metrosPasto').value) || 0;
  const precio = parseInt(document.getElementById('precio').value) || 0;

  

});

document.getElementById('cotizar').addEventListener('click', function () {


  const metros = parseInt(document.getElementById('metrosPasto').value) || 0;
  const precio = parseInt(document.getElementById('precio').value) || 0;


  let total = 0;
  let mensajeError = '';

  if (metros && precio) {
    total = (metros * 8) * precio;
  }else{
    mensajeError = 'Los valores tienen que ser mayores a 0'
  }

  totalElement.textContent = total || mensajeError;


});

const tablaBody = document.querySelector(".tabla tbody");

const apiUrl = "https://apicolmar-production.up.railway.app/api/rentas";

async function obtenerRentas() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }

    const datos = await response.json();
    console.log(datos);

    tablaBody.innerHTML = "";

    datos.forEach(item => {
      const fila = document.createElement("tr"); // Crear fila

      const fechaFormateada = new Date(item.fecha).toISOString().split("T")[0];

      // Crear las celdas y asignarles el contenido
      const celdaFecha = document.createElement("td");
      celdaFecha.textContent = fechaFormateada;
      celdaFecha.setAttribute("data-label", "Fecha");

      const celdaMetros = document.createElement("td");
      celdaMetros.textContent = item.metros;
      celdaMetros.setAttribute("data-label", "Metros");

      const celdaPrecio = document.createElement("td");
      celdaPrecio.textContent = item.precio;
      celdaPrecio.setAttribute("data-label", "Precio");

      const celdaTotal = document.createElement("td");
      celdaTotal.textContent = (item.metros * 8) * 17;
      celdaTotal.setAttribute("data-label", "Total");

      // Crear una celda para acciones (puedes personalizarla después)
      const celdaAcciones = document.createElement("td");
      celdaAcciones.innerHTML = `<button class="editar">Editar</button> <button class="eliminar">Eliminar</button>`;

      // Añadir las celdas a la fila
      fila.appendChild(celdaFecha);
      fila.appendChild(celdaMetros);
      fila.appendChild(celdaPrecio);
      fila.appendChild(celdaTotal);
      fila.appendChild(celdaAcciones);

      // Añadir la fila al cuerpo de la tabla
      tablaBody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al consumir la API:", error.message);
  }


}

obtenerRentas();




