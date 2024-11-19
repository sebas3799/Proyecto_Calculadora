// Esperamos que el documento esté cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", function () {
  // Seleccionamos la pantalla donde se mostrarán los números y operaciones
  const pantalla = document.getElementById("operaciones");

  // Variable para guardar la operación actual
  let operacionActual = "";
  let operadorSeleccionado = false;

  // Función para manejar el clic en los números y operadores
  function manejarClick(valor) {
    // Si es un número o un punto decimal
    if (!isNaN(valor) || valor === ".") {
      // Si la pantalla solo muestra "0", lo reemplazamos
      if (pantalla.innerText === "0" && valor !== ".") {
        pantalla.innerText = ""; // Eliminamos el "0" inicial solo si no es un punto decimal
      }

      // Si se seleccionó un operador previamente, reiniciamos la pantalla
      if (operadorSeleccionado) {
        pantalla.innerText = "";
        operadorSeleccionado = false;
      }

      // Agregamos el número o punto decimal a la pantalla
      pantalla.innerText += valor;
      operacionActual += valor;
    }
    // Si el valor es un operador (+, -, *, /)
    else {
      operacionActual += valor;
      operadorSeleccionado = true;
    }
  }

  // Función para evaluar la operación cuando se hace clic en "="
  function evaluarOperacion() {
    try {
      pantalla.innerText = eval(operacionActual);  // Evaluamos la operación
      operacionActual = pantalla.innerText;        // Actualizamos la operación con el resultado
    } catch (error) {
      pantalla.innerText = "Error";                // Mostramos "Error" si la operación es inválida
      operacionActual = "";
    }
  }

  // Función para borrar la operación actual
  function borrarPantalla() {
    pantalla.innerText = "0";  // Reseteamos la pantalla
    operacionActual = "";      // Reseteamos la operación
  }

  // Seleccionamos todos los botones de la calculadora
  const botones = document.querySelectorAll("#calculadora ul li");

  // Añadimos el evento "click" a cada botón
  botones.forEach((boton) => {
    boton.addEventListener("click", function () {
      const valor = this.innerText;

      // Si el botón es "=", evaluamos la operación
      if (valor === "=") {
        evaluarOperacion();
      } else {
        manejarClick(valor);  // Si no, simplemente manejamos el clic como número u operador
      }
    });
  });

  // Evento para el botón "Borrar"
  const botonBorrar = document.getElementById("borrar");
  botonBorrar.addEventListener("click", borrarPantalla);
});