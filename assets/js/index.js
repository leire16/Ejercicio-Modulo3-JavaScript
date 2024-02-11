/*function crearPizza() {
    // Obtener la imagen base de la pizza
    const basePizza = 'img/base_pizza.jpg';
  
    // Obtener las imágenes de los toppings según las elecciones del usuario
    const toppingCarne = obtenerTopping('carnes');
    const toppingMar = obtenerTopping('mariscos');
    const toppingVerdura = obtenerTopping('verduras');
  
    // Crear un lienzo para superponer las imágenes
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Cargar la imagen base
    const imgBase = new Image();
    imgBase.onload = function () {
      canvas.width = imgBase.width;
      canvas.height = imgBase.height;
  
      // Dibujar la imagen base en el lienzo
      ctx.drawImage(imgBase, 0, 0);
  
      // Dibujar las superposiciones de los toppings
      dibujarTopping(ctx, toppingCarne);
      dibujarTopping(ctx, toppingMar);
      dibujarTopping(ctx, toppingVerdura);
  
      mostrarResultado(canvas.toDataURL('image/png'));
    };
    imgBase.src = basePizza;
  }*/
  
  function obtenerTopping(categoria) {
    const checkboxes = document.querySelectorAll(`input[name=${categoria}]:checked`);
    const toppings = Array.from(checkboxes).map(checkbox => checkbox.value);
    return toppings.join('_'); // Concatenar nombres de toppings con guiones bajos
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
  
  function mostrarResultado(urlImagen) {
    // Mostrar la imagen generada
    document.getElementById('pizzaImage').src = urlImagen;
  }

  window.addEventListener("DOMContentLoaded", () => {
    console.log("Hello, the DOM content is loaded!");
  
    const crearButton = document.querySelector("#crearPizza");
    const masa = document.getElementById('masa').value;
    const tamaño = document.getElementById('tamaño').value;
  
    // Obtener las imágenes de los toppings según las elecciones del usuario
    const toppingCarne = obtenerTopping('carnes');
    const toppingMar = obtenerTopping('mariscos');
    const toppingVerdura = obtenerTopping('verduras');
  
    crearButton.addEventListener("click", (event) => {
      event.preventDefault();
  
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
          </div>
        </div> 
      `;
  
      // Mostrar las imágenes solo si las rutas son válidas
      const pizzaImageContainer = document.querySelector("#resultadoPizza");
      pizzaImageContainer.innerHTML = ""; // Limpiar cualquier contenido previo
  
      // Función para agregar una imagen al contenedor si la ruta es válida
      const agregarImagen = (ruta) => {
        const img = new Image();
        img.onload = function() {
          pizzaImageContainer.appendChild(img);
        };
        img.src = ruta;
      };
  
      // Agregar la imagen base
      agregarImagen(`./assets/img/imagenBase.jpg`);
  
      // Agregar las imágenes de los toppings solo si las rutas son válidas
      agregarImagen(`./assets/img/${toppingCarne}.jpg`);
      agregarImagen(`./assets/img/${toppingMar}.jpg`);
      agregarImagen(`./assets/img/${toppingVerdura}.jpg`);
    });
  });
  