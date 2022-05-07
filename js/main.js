const $controles=document.querySelector(".controles");
const $carousel=document.querySelector(".carousel");
const $botonRetroceder=document.querySelector("#retroceder");
const $botonAvanzar=document.querySelector("#avanzar");
const inputGif=document.querySelector("#input-gif");
const $botonPlay=document.querySelector("#play");
const $botonStop=document.querySelector("#stop");
const $imagen=document.querySelector("#imagen");
//const $mesaje=document.querySelector("#mesaje");

//$mesaje.style.display= "none";
$controles.style.display= "none";
$carousel.style.display= "none";
$botonStop.style.display= "none";

const TIEMPO_INTERVALO_MILESIMAS_SEG = 3400;
let posicionActual = 0;
let IMAGENES = [];
let intervalo;

// inputGif.addEventListener("keyup", search);
inputGif.addEventListener("change", customGif);
$botonPlay.addEventListener('click', playIntervalo);
$botonStop.addEventListener('click', stopIntervalo);
$botonAvanzar.addEventListener('click', pasarFoto);
$botonRetroceder.addEventListener('click', retrocederFoto);

function customGif(event){
    removeGif();
    const url="https://g.tenor.com/v1/search?";
    const key="	O9A2IB8AL44X";
    const query=(`q=${event.target.value}`)
    const limit="&limit=16";

    fetch(`${url}${query}&key=${key}${limit}`)
    .then(response=> response.json())
    .then(data=> {createGif(data)})
}

function createGif(data){
    data.results.map(gif=>{
        IMAGENES.push(gif.media[0].mediumgif.url);      
    })
    console.log(IMAGENES);
    renderizarImagen();
}

function removeGif(){  
    $controles.style.display= "";
    $carousel.style.display= "";
    IMAGENES.splice(0,IMAGENES.length)
}

function pasarFoto() {
    if(posicionActual >= IMAGENES.length - 1) {
        posicionActual = 0;
    } else {
        posicionActual++;
    }
    console.log(posicionActual);
    renderizarImagen();
}

function retrocederFoto() {
    if(posicionActual <= 0) {
        posicionActual = IMAGENES.length - 1;
    } else {
        posicionActual--;
    }
    console.log(posicionActual);
    renderizarImagen();
}

function renderizarImagen () {
    while ($imagen.firstChild) {
        $imagen.removeChild($imagen.firstChild);
    } 
    const image = document.createElement('img')
    image.src  = `${IMAGENES[posicionActual]}`
    $imagen.appendChild(image)
}

function playIntervalo() {
    $botonStop.style.display= ""
    $botonPlay.style.display= "none"
    intervalo = setInterval(pasarFoto, TIEMPO_INTERVALO_MILESIMAS_SEG);
    // Desactivamos los botones de control
    $botonAvanzar.setAttribute('disabled', true);
    $botonRetroceder.setAttribute('disabled', true);
    $botonPlay.setAttribute('disabled', true);
    $botonStop.removeAttribute('disabled');
}

function stopIntervalo() {
    $botonPlay.style.display= ""
    $botonStop.style.display= "none"
    clearInterval(intervalo);
    // Activamos los botones de control
    $botonAvanzar.removeAttribute('disabled');
    $botonRetroceder.removeAttribute('disabled');
    $botonPlay.removeAttribute('disabled');
    $botonStop.setAttribute('disabled', true);
}

// function search() {
//     $botonStop.style.display= "";
// }