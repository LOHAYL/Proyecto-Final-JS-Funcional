const tabla = document.querySelector("tbody")

function FilaHTML(producto) {
    return `<tr>
                <td><img
                src=".${producto.imagen}"
                alt="logo de whatsapp color rosa"
                class="imagen_carrito img-fluid"/></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td id="${producto.id}" class="eliminar-producto">⛔️</td>
            </tr>`
}




function cargarProductos() {
    if (carrito.length > 0) {
        tabla.innerHTML = "";

        carrito.forEach((producto) => tabla.innerHTML += FilaHTML(producto));
        //activarBotonesEliminar()
    }
}

cargarProductos();