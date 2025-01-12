const form = document.querySelector('form');
const totalElement = document.getElementById('total');

document.getElementById('cotizar').addEventListener('click', function () {


  const metros = parseInt(document.getElementById('metrosPasto').value) || 0;
  const precio = parseInt(document.getElementById('precio').value) || 0;


  let total = 0;
  let mensajeError = '';

  if (metros && precio) {
    total = (metros * 8) * precio;
  } else {
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

      const botonEditar = document.createElement("button");
      botonEditar.textContent = "Editar";
      botonEditar.classList.add("editar");
      botonEditar.style.backgroundColor = "blue";
      botonEditar.style.color = "white";
      botonEditar.style.marginRight = "5px";

      // Botón Eliminar
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.classList.add("eliminar");
      botonEliminar.style.backgroundColor = "red";
      botonEliminar.style.color = "white";
      botonEliminar.setAttribute("data-id", item.id); // Agregar atributo data-id con el ID del registro

      // Agregar botones a la celda de acciones
      celdaAcciones.appendChild(botonEditar);
      celdaAcciones.appendChild(botonEliminar);

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

form.addEventListener('submit', async function (event) {

  event.preventDefault();

  const formData = new FormData(event.target);

  const fecha = document.getElementById('fecha').value;
  const metros = parseInt(document.getElementById('metrosPasto').value) || 0;
  const precio = parseInt(document.getElementById('precio').value) || 0;

  let total = (metros * 8) * precio;

  formData.append("fecha", fecha);
  formData.append("metros", metros);
  formData.append("precio", precio);
  formData.append("total", total);

  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  try {
    // Envía los datos a la API usando fetch
    const response = await fetch("https://apicolmar-production.up.railway.app/api/rentas", {
      method: "POST", // O "PUT", según la API
      headers: {
        "Content-Type": "application/json", // Indica que envías datos en formato JSON
      },
      body: JSON.stringify(data), // Convierte el objeto a JSON
    });

    // Manejo de la respuesta
    if (response.ok) {
      const respuestaJson = await response.json();
      console.log("Éxito:", respuestaJson);
      alert("Formulario enviado con éxito");
    } else {
      console.error("Error al enviar:", response.status);
      alert("Error al enviar los datos.");
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("No se pudo conectar con la API.");
  }

});

tablaBody.addEventListener("click", async (event) => {
  if (event.target.classList.contains("eliminar")) {
    const id = event.target.getAttribute("data-id"); // Obtener el ID del registro
    console.log("ID del registro a eliminar:", id);

    // Confirmar antes de eliminar
    if (!confirm(`¿Estás seguro de eliminar el registro con ID ${id}?`)) {
      return;
    }

    try {
      // Solicitud DELETE al backend
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Registro eliminado correctamente.");

        // Eliminar la fila del DOM
        const fila = event.target.closest("tr"); // Buscar la fila más cercana
        if (fila) fila.remove(); // Eliminar la fila de la tabla
      } else {
        console.error(`Error al eliminar: ${response.status}`);
        alert("No se pudo eliminar el registro.");
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      alert("Hubo un problema al eliminar el registro.");
    }
  }
});



