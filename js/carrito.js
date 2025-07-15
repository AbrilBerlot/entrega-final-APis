
document.addEventListener("DOMContentLoaded", () => {
  const obtenerCarrito = () => JSON.parse(localStorage.getItem("carrito")) || [];

  const renderizarProductos = () => {
    const carrito = obtenerCarrito();
    productosEnCarrito();

    const seccionProductos = document.getElementById("contenedor-carrito");
    seccionProductos.innerHTML = "";

    if (!carrito.length) {
      const mensaje = document.createElement("p");
      mensaje.classList.add("mensaje-carrito");
      mensaje.textContent = "No hay productos en el carrito";
      seccionProductos.appendChild(mensaje);
    } else {
      carrito.forEach((producto, index) => {
        seccionProductos.appendChild(crearTarjetaProducto(producto, index));
      });
    }

    renderizarBotones();
  };

  const crearTarjetaProducto = (producto, index) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto-carrito");

    const img = document.createElement("img");
    img.src = producto.images?.[0] || "img/imagen-default.png";

    const titulo = document.createElement("h3");
    titulo.textContent = producto.title;

    const precio = document.createElement("p");
    precio.textContent = `$${producto.price}`;

    const btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn-eliminar-carrito");
    btnEliminar.classList.add("btn-principal");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => eliminarProductos(index));

    tarjeta.append(img, titulo, precio, btnEliminar);
    return tarjeta;
  };

  const renderizarBotones = () => {
    const carrito = obtenerCarrito();
    const divAcciones = document.getElementById("acciones-carrito");
    divAcciones.innerHTML = "";

    if (carrito.length) {
      const btnVaciar = document.createElement("button");
      btnVaciar.textContent = "Vaciar carrito";
      btnVaciar.classList.add("btn-principal");
      btnVaciar.addEventListener("click", () => {
        if (confirm("¿Estás seguro que querés vaciar el carrito?")) {
          vaciarCarrito();
        }
      });

      const btnFinalizar = document.createElement("button");
      btnFinalizar.textContent = "Finalizar compra";
      btnFinalizar.classList.add("btn-principal");
      btnFinalizar.addEventListener("click", () => {
        const confirmado = confirm("¿Está seguro que desea finalizar la compra?");
        if (confirmado) {
          alert("Gracias por su compra!");
          localStorage.removeItem("carrito");
          window.location.href = "index.html";

        }
      });

      divAcciones.append(btnVaciar, btnFinalizar);
    }
  };

  const productosEnCarrito = () => {
    const carrito = obtenerCarrito();
    const contadorCarrito = document.getElementById("contador-carrito");
    if (contadorCarrito) {
      contadorCarrito.textContent = carrito.length;
    }
  };

  const eliminarProductos = (indice) => {
    const carrito = obtenerCarrito();
    carrito.splice(indice, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarProductos();
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    renderizarProductos();
  };

  renderizarProductos();
});
