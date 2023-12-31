
const productos = [];
const URL = "https://6580a5293dfdd1b11c41e22b.mockapi.io/Productos";
const contador = document.querySelector("div.point");
const sectionContenedor = document.querySelector("div.productos");




function armarCardHTML({id,nombre,precio,imagen}){

    return `<div class="carta_producto" data-aos="flip-left">
                <img src="${imagen}" />
                <div class="producto_nombre">${nombre}</div>
                <div class="importe">$ ${precio}</div>
                <button id="${id}" class="button_card button_shop">Agregar</button>
            </div>`

}

function armarCardError() {
    return `<div class="error">
    <div class="error__icon">
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z" fill="#393a37"></path></svg>
    </div>
    <div class="error__title">Ocurrió un error al momento de cargar los productos. Intente nuevamente mas tarde.</div>
</div>`
}



function cargarProductos(array){
    sectionContenedor.innerHTML = "";

    if (array.length > 0) {
        array.forEach((producto) => sectionContenedor.innerHTML += armarCardHTML(producto))
        agregarClickEnBtnCards()
    } else {

        divContenedor.innerHTML = armarCardError()
        
    }

}

function notificacion(mensaje, tiempo, color) {
    Toastify({
        text: mensaje || "Producto agregado al carrito",
        position: "center",
        stopOnFocus: true,
        gravity: "top",
        duration: tiempo || 2000,
        style: { background: color, }
    }).showToast()
}

function actualizarContador(){
    return `<p>${contadorArticulos}</p>`
}

function agregarClickEnBtnCards() {
    const botonesAgregar = document.querySelectorAll("button.button_shop")
    if (botonesAgregar.length > 0) {
        botonesAgregar.forEach((boton)=> {
            boton.addEventListener("click", ()=> {
                let productoSeleccionado = productos.find((producto)=> parseInt(producto.id) === parseInt(boton.id))
                carrito.push(productoSeleccionado)
                contadorArticulos++;
                contador.innerHTML = actualizarContador();
                notificacion(`${productoSeleccionado.nombre} agregado al carrito`, 1500, '#9c50ff')
                guardarEnLS()
                
            })
        })
    }
}

function obtenerProductos(){
    fetch(URL)
    .then((response)=> response.json())
    .then((data)=> productos.push(...data) )
    .then (()=> cargarProductos(productos) )
    .then(()=> {
        contadorArticulos = carrito.length;
        contador.innerHTML = actualizarContador();
    })
    .catch((error)=> sectionContenedor.innerHTML = armarCardError() )

}

obtenerProductos();
