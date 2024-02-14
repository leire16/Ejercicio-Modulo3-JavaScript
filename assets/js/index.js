
// Función que obtiene los toppings seleccionados para una categoría
function obtenerTopping(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  const toppings = Array.from(checkboxes).map((checkbox) => checkbox.value);
  return toppings; // Devolver un array de valores seleccionados
}

// Función que desmarca todos los checkboxes de una categoría
function limpiarCheckboxes(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
}

// Función que valida si un campo obligatorio está vacío
function validarCampoObligatorio(input) {
  if (input.value === "") {
    input.classList.add("is-invalid");
    input.classList.add("form-control"); // Agregar clase de Bootstrap
  } else {
    input.classList.remove("is-invalid");
    input.classList.remove("form-control"); // Eliminar clase de Bootstrap
  }
}

// Función que valida la selección de checkboxes
function validarCheckboxes(container) {
  const totalSeleccionados = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;
  // Validar que aparezca el mensaje solo cuando no hay checkboxes seleccionados
  if (totalSeleccionados === 0) {
    mostrarMensajeError(container);
  } else {
    // Si hay al menos un checkbox seleccionado, ocultar el mensaje
    ocultarMensajeError(container);
  }
}

// Función para mostrar el mensaje de error al lado del título "Elige tus ingredientes"
function mostrarMensajeError(container) {
  limpiarMensajesValidacion();

  const mensaje = document.createElement("p");
  mensaje.classList.add("red");
  mensaje.classList.add("aviso");
  mensaje.textContent =
    "Seleccione al menos 1 opción entre las categorías de ingredientes";

  // Obtener el contenedor de mensajes
  const messagesContainer = document.getElementById("messages-container");

  // Insertar el mensaje dentro del contenedor
  messagesContainer.appendChild(mensaje);
}

// Función para ocultar el mensaje de error
function ocultarMensajeError(container) {
  limpiarMensajesValidacion();
}

// Limpia todos los mensajes de validación
function limpiarMensajesValidacion() {
  // Limpiar mensajes de validación de checkboxes
  const invalidMessages = document.querySelectorAll(".red");
  invalidMessages.forEach((message) => message.parentNode.removeChild(message));
}

// Funcion que calcula el precio total
function calcularPrecioTotal() {
  let total = 0;

  // Agregar precios para diferentes productos
  total += sumarPreciosCheckbox("carnes");
  total += sumarPreciosCheckbox("mariscos");
  total += sumarPreciosCheckbox("verduras");
  total += obtenerPrecioMasa("masa");
  total += obtenerPrecioTamaño("tamaño");

  return total;
}

// Función que suma precios de checkboxes seleccionados para una categoría
function sumarPreciosCheckbox(categoria) {
  const checkboxes = document.querySelectorAll(
    `input[name=${categoria}]:checked`
  );
  let totalCategoria = 0;

  checkboxes.forEach((checkbox) => {
    const precio = parseFloat(checkbox.getAttribute("data-price"));
    totalCategoria += precio;
  });

  return totalCategoria;
}

// Función que obtiene el precio de la masa seleccionada
function obtenerPrecioMasa() {
  const select = document.getElementById("masa");
  const selectedOption = select.options[select.selectedIndex];
  const precioMasa = parseFloat(selectedOption.getAttribute("data-price")) || 0;
  return precioMasa;
}

// Función que obtiene el precio del tamaño seleccionado
function obtenerPrecioTamaño() {
  const select = document.getElementById("tamaño");
  const selectedOption = select.options[select.selectedIndex];
  const precioTamaño =
    parseFloat(selectedOption.getAttribute("data-price")) || 0;
  return precioTamaño;
}

// Función para actualizar el precio total en el HTML
function actualizarPrecioTotal() {
  const total = calcularPrecioTotal();
  const formattedTotal = total + "€"; // Agregar signo euro
  document.getElementById("totalValue").textContent = formattedTotal;
}

// Añade precios a los productos en forma de span
function createPriceSpan(price) {
  const priceSpan = document.createElement("span");
  priceSpan.textContent = ` - ${price}€`;
  return priceSpan;
}

// Añade los spans de precio a los checkboxes
function addPriceSpansToCheckboxes(checkboxes) {
  checkboxes.forEach(function (checkbox) {
    const price = checkbox.getAttribute("data-price");
    const label = checkbox.parentNode;
    label.appendChild(createPriceSpan(price));
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const resultadoPizza = document.getElementById("resultadoPizza");
  const section2 = document.querySelector(".section2");
  const crearButton = document.querySelector("#crearPizza");

  // Muestra u oculta la sección 2 dependiendo del contenido de resultadoPizza
  if (resultadoPizza.innerHTML.trim() !== "") {
    section2.style.display = "block";
  } else {
    section2.style.display = "none";
  }

  // Evento al hacer clic en el botón de crear pizza
  crearButton.addEventListener("click", function (event) {
    event.preventDefault();

  // Obtener elementos del formulario
    const masaInput = document.getElementById("masa");
    const tamañoInput = document.getElementById("tamaño");

    const toppingCarne = obtenerTopping("carnes");
    const toppingMar = obtenerTopping("mariscos");
    const toppingVerdura = obtenerTopping("verduras");

    const nombrePizzaInput = document.getElementById("nombre-pizza");
    const horaRecogerInput = document.getElementById("hora-recoger");

    const container = document.getElementById("messages-container");

    // Obtener valores del formulario
    const masa = masaInput.value;
    const tamaño = tamañoInput.value;
    const nombrePizza = nombrePizzaInput.value;
    const horaRecoger = horaRecogerInput.value;

     // Limpiar mensajes de validación
     limpiarMensajesValidacion();

     // Validar campos obligatorios
     validarCampoObligatorio(masaInput);
     validarCampoObligatorio(tamañoInput);
     validarCampoObligatorio(nombrePizzaInput);
     validarCampoObligatorio(horaRecogerInput);
 
     // Event listeners para validar campos en tiempo real
     masaInput.addEventListener("change", () => validarCampoObligatorio(masaInput));
     tamañoInput.addEventListener("change", () => validarCampoObligatorio(tamañoInput));
     nombrePizzaInput.addEventListener("input", () => validarCampoObligatorio(nombrePizzaInput));
     horaRecogerInput.addEventListener("input", () => validarCampoObligatorio(horaRecogerInput));
 
     // Limpiar mensajes de validación
     if (container) {
       container.innerHTML = "";
     }
 
     // Validar checkboxes
     validarCheckboxes(container);
 
     // Event listeners para checkboxes
     const checkboxes = document.querySelectorAll('input[type="checkbox"]');
     checkboxes.forEach((checkbox) => {
       checkbox.addEventListener("change", () => {
         validarCheckboxes(container);
       });
     });
 
     // Si hay mensajes de error, no proceder
     if (container.querySelector(".red") || document.querySelector(".is-invalid")) {
       return;
     }
 
     // Crear contenedor principal
     const tweetContainer = document.querySelector(".tweet-container");
     tweetContainer.innerHTML = "";
     const titleContainer = document.createElement("div");
     titleContainer.classList.add("title");
     const infoContainer = document.createElement("div");
     infoContainer.classList.add("info");
 
     const total = calcularPrecioTotal();
     const formattedTotal = total + "€"; // Agregar signo euro
 
     // Crear elementos de información dinámicamente
     const elements = [
       { label: "Tu nombre", value: nombrePizza },
       { label: "Hora de recoger", value: horaRecoger },
       { label: "Tipo de Masa", value: masa },
       { label: "Tamaño escogido", value: tamaño },
       { label: "Toppings de Carne", value: toppingCarne.join(", ") },
       { label: "Toppings de Mar", value: toppingMar.join(", ") },
       { label: "Toppings de Verdura", value: toppingVerdura.join(", ") },
       { label: "Precio a pagar", value: formattedTotal }
     ];
 
     elements.forEach((element) => {
       if (element.value !== undefined && element.value !== "") {
         const p = document.createElement("p");
         p.innerHTML = `<strong>${element.label}:</strong> ${element.value}`;
         infoContainer.appendChild(p);
       }
     });
 
     // Agregar información al contenedor principal
     titleContainer.appendChild(infoContainer);
     tweetContainer.appendChild(titleContainer);
 
     // Limpiar resultados de pizza en la sección correspondiente
     const resultadoPizza = document.querySelector("#resultadoPizza");
     resultadoPizza.innerHTML = "";
 
     // Función para agregar imágenes al contenedor de resultados
     const agregarImagen = (ruta) => {
       const img = new Image();
       img.src = ruta;
       resultadoPizza.appendChild(img);
     };
 
     // Agregar imagen base
     agregarImagen(`./assets/img/imagenBase.jpg`);
 
     // Concatenar y agregar imágenes de toppings
     const imagenesToppings = toppingCarne.concat(toppingMar, toppingVerdura).map(topping => `./assets/img/${topping}.jpg`);
     for (let i = 0; i < imagenesToppings.length; i++) {
       agregarImagen(imagenesToppings[i]);
     }
 
     // Limpiar valores del formulario
     document.getElementById("masa").value = "";
     document.getElementById("tamaño").value = "";
     document.getElementById("nombre-pizza").value = "";
     document.getElementById("hora-recoger").value = "";
     document.getElementById("totalValue").textContent = 0 + "€";
 
     // Limpiar checkboxes
     limpiarCheckboxes("carnes");
     limpiarCheckboxes("mariscos");
     limpiarCheckboxes("verduras");
 
     // Mostrar u ocultar la sección 2 dependiendo del contenido de resultadoPizza
     const section2 = document.querySelector(".section2");
     if (resultadoPizza.innerHTML.trim() !== "") {
       section2.style.display = "block";
     } else {
       section2.style.display = "none";
     }
 
     // Desplazarse suavemente a la sección 2
     section2.scrollIntoView({ behavior: "smooth" });
   });
 
   // Añadir precios a los productos y eventos de cambio
   const createPriceSpan = (price) => {
     const priceSpan = document.createElement("span");
     priceSpan.textContent = ` - ${price}€`;
     return priceSpan;
   };
 
   // Añadir spans de precio a los checkboxes
   const addPriceSpansToCheckboxes = (checkboxes) => {
     checkboxes.forEach(function (checkbox) {
       const price = checkbox.getAttribute("data-price");
       const label = checkbox.parentNode;
       label.appendChild(createPriceSpan(price));
     });
   };
 
   // Categorías de ingredientes
   const ingredientCategories = ["carnes", "mariscos", "verduras"];
 
   // Añadir precios a los checkboxes
   ingredientCategories.forEach(function (categoria) {
     const checkboxes = document.querySelectorAll(`input[name=${categoria}]`);
     addPriceSpansToCheckboxes(checkboxes);
   });
 
   // IDs de los selects
   const selectIds = ["masa", "tamaño"];
 
   // Eventos de cambio en los selects
   selectIds.forEach(function (selectId) {
     const select = document.getElementById(selectId);
     select.addEventListener("change", actualizarPrecioTotal);
 
     // Añadir precios a las opciones de los selects
     const options = select.options;
     for (let i = 0; i < options.length; i++) {
       const option = options[i];
       const price = option.getAttribute("data-price");
 
       if (price) {
         const priceSpan = document.createElement("span");
         priceSpan.className = "price";
         priceSpan.textContent = `    +${price}€`;
 
         option.appendChild(priceSpan);
       }
     }
   });
 
   // Eventos de cambio en los checkboxes
   document
     .querySelectorAll('input[type="checkbox"]')
     .forEach(function (checkbox) {
       checkbox.addEventListener("change", actualizarPrecioTotal);
     });
 });