const carrito = recuperarCarrito()
let contadorArticulos = carrito.length;

function recuperarCarrito() {  
    return JSON.parse(localStorage.getItem("miCarrito")) || []
}

function guardarEnLS() {
    localStorage.setItem("miCarrito", JSON.stringify(carrito))
}