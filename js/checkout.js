const tabla = document.querySelector("tbody")
const monto = document.querySelector("span#total_pagar")
const botonCompra = document.querySelector("button#boton_comprar")

monto.textContent = calcularTotal();

function FilaHTML(producto) {
    return `<tr>
                <td><img
                src=".${producto.imagen}"
                alt="logo de whatsapp color rosa"
                class="imagen_carrito img-fluid"/></td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td id="${producto.id}" class="eliminar-producto">Quitar</td>
            </tr>`
}

function activarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll("td.eliminar-producto")

    botonesEliminar.forEach((botonEliminar) => {
        botonEliminar.addEventListener("click", () => {
            const idx = carrito.findIndex((producto) => parseInt(producto.id) === parseInt(botonEliminar.id)) 
            carrito.splice(idx, 1)  
            guardarEnLS()
            monto.textContent = calcularTotal();
            cargarProductos()       
        })
    })
}

function calcularTotal(){

    const total = carrito.reduce((acum,producto) => acum + producto.precio,0 );
    return total;
}


function cargarProductos() {
    if (carrito.length > 0) {
        tabla.innerHTML = "";

        carrito.forEach((producto) => tabla.innerHTML += FilaHTML(producto));
        activarBotonesEliminar()
    }
}

cargarProductos();

botonCompra.addEventListener("click", () => {
    Swal.fire({
        title: "¿Confirmar la Compra? ",
        showDenyButton: true,
        confirmButtonText: "Confirmar",
        denyButtonText: "Cancelar"
    })
      .then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                text: "Muchas gracias por su compra. Le enviaremos un mail con numero de seguimiento de su pedido",
                showConfirmButton: false,
                icon: "success",
                timer: 2500
               
            })
            monto.textContent = "0";
            localStorage.removeItem("miCarrito");
            carrito.length = 0;
            tabla.innerHTML = "";
            
            setTimeout(function(){
                location.href = "../index.html";
            }, 3000);
            

        } else if (result.isDenied) {
              Swal.fire({
                text: "Puede seguir comprando otros productos.",
                icon: "info",
                timer: 2500
            })

        }
      });
})

