const palabras = ["STAN", "SOOS", "BILL", "FORD", "JEFF", "TOBY", "DIPPER", "GIDEON", "ROBBIE", "GRENDA", "MANLY", "MABEL", "WENDY", "CANDY", "SUSAN"];
let palabraSeleccionada = '';
let intentosRestantes = 10;
let intentosFallidos = 0;
let intentosExitosos = 0;
let juegosGanados = 0;
let juegosPerdidos = 0;

const botonEmpezar = document.getElementById('boton-empezar');
const palabraOcultaElemento = document.getElementById('palabra-oculta');
const intentosFallidosElemento = document.getElementById('intentos-fallidos');
const intentosExitososElemento = document.getElementById('intentos-exitosos');
const intentosRestantesElemento = document.getElementById('intentos-restantes');
const imagenAhorcado = document.getElementById('imagen-ahorcado');
const botonesAlfabeto = document.getElementById('botones-alfabeto');
const resultadoJuegoElemento = document.getElementById('resultado-juego');
const juegosGanadosElemento = document.getElementById('juegos-ganados');
const juegosPerdidosElemento = document.getElementById('juegos-perdidos');
const audio = document.getElementById("audio");

function empezarJuego() {
    // Reiniciar estado del juego
    intentosRestantes = 10;
    intentosFallidos = 0;
    intentosExitosos = 0;
    palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)];
    
    // Actualizar la interfaz de usuario
    palabraOcultaElemento.innerHTML = '_ '.repeat(palabraSeleccionada.length);
    intentosFallidosElemento.innerHTML = intentosFallidos;
    intentosExitososElemento.innerHTML = intentosExitosos;
    intentosRestantesElemento.innerHTML = intentosRestantes;
    botonesAlfabeto.innerHTML = '';
    resultadoJuegoElemento.innerHTML = '';
    imagenAhorcado.src = ``;

    // Crear botones del alfabeto
    const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < alfabeto.length; i++) {
        const boton = document.createElement('button');
        boton.innerHTML = alfabeto[i];
        boton.addEventListener('click', () => manejarAdivinanza(alfabeto[i]));
        botonesAlfabeto.appendChild(boton);
    }
}

function manejarAdivinanza(letra) {
    let adivinanzaCorrecta = false;
    let nuevoArregloPalabraOculta = palabraOcultaElemento.innerHTML.split(' ');  // Crear un arreglo de la palabra oculta actual

    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            nuevoArregloPalabraOculta[i] = letra;
            adivinanzaCorrecta = true;
        }
    }

    palabraOcultaElemento.innerHTML = nuevoArregloPalabraOculta.join(' ');  // Unir el arreglo en una cadena con espacios entre letras

    if (adivinanzaCorrecta) {
        intentosExitosos++;
        intentosExitososElemento.innerHTML = intentosExitosos;
    } else {
        intentosFallidos++;
        intentosRestantes--;
        intentosFallidosElemento.innerHTML = intentosFallidos;
        intentosRestantesElemento.innerHTML = intentosRestantes;
        imagenAhorcado.src = `img/base${intentosFallidos + 0}.png`;
        if(intentosFallidos == 10){
            audio.play();
        }
    }
    if(intentosFallidos != 0){

    }
    event.target.disabled = true;

    if (!nuevoArregloPalabraOculta.includes('_')) {
        resultadoJuegoElemento.innerHTML = '¡Ganaste! La palabra era: ' + palabraSeleccionada;
        juegosGanados++;
        juegosGanadosElemento.innerHTML = juegosGanados;
        botonesAlfabeto.innerHTML = '';
    } else if (intentosRestantes === 0) {
        resultadoJuegoElemento.innerHTML = 'Perdiste. La palabra era: ' + palabraSeleccionada;
        juegosPerdidos++;
        juegosPerdidosElemento.innerHTML = juegosPerdidos;
        botonesAlfabeto.innerHTML = '';
    }
}

botonEmpezar.addEventListener('click', empezarJuego);
