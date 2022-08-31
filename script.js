const contenedorJuego = document.querySelector(".contenedor-juego");
const juego = document.querySelector(".juego");
const botonGenerar = document.querySelector(".btn-generar");
const result = document.querySelector(".result");
const bomb = document.querySelector(".bomba");

let width = 10;
let numBombas = 20;
let finPartida = false;

//Creamos tablero
botonGenerar.addEventListener("click", () => {
  result.classList.remove("hidden");
  result.classList.add("oculto");
  finPartida = false;

  if (contenedorJuego.classList.contains("hidden")) {
    contenedorJuego.classList.remove("hidden");
  } else {
    juego.innerHTML = "";
  }

  CrearJuego();
});

//Comprobar si hay bomba
function bomba(casillaClickeada) {
  finPartida = true;
  casillaClickeada.classList.add("back-red");
  result.classList.remove("oculto");
  result.classList.remove("hidden");
}

//Despintar casilla
function click(casilla) {
  // Comprobamos si la casilla no es clickeable
  if (finPartida) return;

  if (casilla.classList.contains("bomba")) {
    bomba(casilla);
  } else {
    casilla.classList.add("marcada");
  }
}

//Definimos dimenciones y lo iniciamos
const CrearJuego = () => {
  width = parseInt(document.getElementById("tamaño").value);
  numBombas = parseInt(document.getElementById("num-bombas").value);

  juego.style.width = width * 30 + "px";

  for (let i = 0; i < width * width; i++) {
    const casilla = document.createElement("div");
    juego.appendChild(casilla);
    const arrayBombas = Array(numBombas).fill("bomba");
    const arrayVacios = Array(width * width - numBombas).fill("vacio");
    const arrayCompleto = arrayVacios.concat(arrayBombas);
    arrayCompleto.sort(() => Math.random() - 0.5);
    casilla.classList.add(arrayCompleto[i]);

    casilla.addEventListener("click", () => {
      click(event.target);
    });
  }
};
