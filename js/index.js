const productos = [];
const URL = "https://6580a5293dfdd1b11c41e22b.mockapi.io/Productos";

const sectionContenedor = document.querySelector("div.productos");


function armarCardHTML({id,nombre,precio,imagen}){

    return `<div class="carta_producto" data-aos="flip-left">
                <img src="${imagen}" />
                <div class="producto_nombre">${nombre}</div>
                <div class="importe">$ ${precio}</div>
                <button id="${id}" class="button_card">Agregar</button>
            </div>`

}

function cargarProductos(array){
    sectionContenedor.innerHTML = "";

    if (array.length > 0) {
        array.forEach((producto) => sectionContenedor.innerHTML += armarCardHTML(producto))
        //agregarClickEnBtnCards()
    // } else {
    //     divContenedor.innerHTML = armarCardError()
    //     mostrarNotificacion(`Error al cargar productos`, 2500, 'darkred')
    }

}


function obtenerProductos(){
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> productos.push(...data) )
    .then (()=> cargarProductos(productos) )
    // .catch((error)=> divContenedor.innerHTML = armarCardError() )

}

obtenerProductos();