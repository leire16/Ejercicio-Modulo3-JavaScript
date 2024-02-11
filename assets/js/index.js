function obtenerTopping(categoria) {
  const checkboxes = document.querySelectorAll(`input[name=${categoria}]:checked`);
  const toppings = Array.from(checkboxes).map(checkbox => checkbox.value);
  return toppings; // Devolver un array de valores seleccionados
}

function limpiarCheckboxes(categoria) {
  const checkboxes = document.querySelectorAll(`input[name=${categoria}]:checked`);
  checkboxes.forEach(checkbox => checkbox.checked = false);
}
  
function dibujarTopping(ctx, topping) {
  if (topping) {
    const imgTopping = new Image();
    imgTopping.onload = function () {
      ctx.drawImage(imgTopping, 0, 0);
    };
    imgTopping.src = `img/${topping}.jpg`;
  }
}

function validarCampoObligatorio(input) {
  if (!input.value) {
    input.classList.add("is-invalid");
    input.classList.add("form-control"); // Agregar clase de Bootstrap
  } else {
    input.classList.remove("is-invalid");
    input.classList.remove("form-control"); // Eliminar clase de Bootstrap
  }
}

function validarCheckboxes(container) {
  const totalSeleccionados = document.querySelectorAll('input[type="checkbox"]:checked').length;
  if (totalSeleccionados === 0) {
    const mensaje = document.createElement("p");
    mensaje.classList.add("red");
    mensaje.textContent = "Seleccione al menos 1 opción entre las categorías";
    container.appendChild(mensaje);
  }
}

function limpiarMensajesValidacion() {
  // Limpiar mensajes de validación de checkboxes
  const invalidMessages = document.querySelectorAll(".red");
  invalidMessages.forEach(message => message.parentNode.removeChild(message));
}

window.addEventListener("DOMContentLoaded", () => {
  const crearButton = document.querySelector("#crearPizza");

  crearButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Obtener los inputs del formulario
    const masaInput = document.getElementById('masa');
    const tamañoInput = document.getElementById('tamaño');

    // Obtener las imágenes de los toppings según las elecciones del usuario
    const toppingCarne = obtenerTopping('carnes');
    const toppingMar = obtenerTopping('mariscos');
    const toppingVerdura = obtenerTopping('verduras');

    const nombrePizzaInput = document.getElementById('nombre-pizza');
    const horaRecogerInput = document.getElementById('hora-recoger');

    // En tu script JavaScript
    const container = document.getElementById("messages-container");

    //Obtener los valores del formualrio
    const masa = masaInput.value;
    const tamaño = tamañoInput.value;
    const nombrePizza = nombrePizzaInput.value;
    const horaRecoger = horaRecogerInput.value;

    // Limpiar mensajes de validación anteriores
    limpiarMensajesValidacion();

    // Validar que los campos obligatorios no estén vacíos
    validarCampoObligatorio(masaInput);
    validarCampoObligatorio(tamañoInput);
    validarCampoObligatorio(nombrePizzaInput);
    validarCampoObligatorio(horaRecogerInput);

    if (container) {
      container.innerHTML = ""; // Limpiar mensajes anteriores
    }

    validarCheckboxes(container);

    // Si hay mensajes de validación o algún campo obligatorio está vacío, detener el proceso
    if (container.querySelector(".red") || document.querySelector(".is-invalid")) {
      return;
    }

    // Mostrar los textos
    const tweetContainer = document.querySelector(".tweet-container");
    tweetContainer.innerHTML = `
      <div class="title">
        <div class="info">
          <h4 id="masa" class="name">${masa}</h4>
          <p id="tamaño">${tamaño}</p>    
          <p id="toppingCarne">${toppingCarne}</p>  
          <p id="toppingMar">${toppingMar}</p>  
          <p id="toppingVerdura">${toppingVerdura}</p>   
          <p id="nombrePizza">${nombrePizza}</p>
          <p id="horaRecoger">${horaRecoger}</p>   
        </div>
      </div> 
    `;

    // Mostrar las imágenes solo si las rutas son válidas
    const pizzaImageContainer = document.querySelector("#resultadoPizza");
    pizzaImageContainer.innerHTML = ""; // Limpiar cualquier contenido previo

    // Función para agregar una imagen al contenedor si la ruta es válida
    const agregarImagen = (ruta) => {
      const img = new Image();
      img.src = ruta;
      pizzaImageContainer.appendChild(img);
    };

    // Agregar la imagen base
    agregarImagen(`./assets/img/imagenBase.jpg`);

    // Agregar las imágenes de los toppings solo si las rutas son válidas
    toppingCarne.forEach(topping => agregarImagen(`./assets/img/${topping}.jpg`));
    toppingMar.forEach(topping => agregarImagen(`./assets/img/${topping}.jpg`));
    toppingVerdura.forEach(topping => agregarImagen(`./assets/img/${topping}.jpg`));

    // Limpiar los inputs
    document.getElementById('masa').value = "";
    document.getElementById('tamaño').value = "";
    document.getElementById('nombre-pizza').value = "";
    document.getElementById('hora-recoger').value = "";

    // Limpiar los checkboxes de carne, mariscos y verduras
    limpiarCheckboxes('carnes');
    limpiarCheckboxes('mariscos');
    limpiarCheckboxes('verduras');
  });
});
