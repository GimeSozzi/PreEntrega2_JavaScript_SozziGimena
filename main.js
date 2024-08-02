/* PRE-ENTREGA 2: Estructura, Variables y Objetos 
Proyecto: Simulador de Pedidos
Alumna: Gimena Sozzi
Curso: JavaScript
Comision: #57745 */

// Clase Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Clase Carrito
class Carrito {
  constructor() {
    this.items = [];
    this.total = 0;
    this.descuento = 0;
  }

  // Método para agregar un producto al carrito
  agregarProducto(producto, cantidad) {
    const precioTotal = producto.precio * cantidad;
    const item = {
      producto: producto.nombre,
      cantidad: cantidad,
      precioTotal: precioTotal,
    };
    this.items.push(item);
    this.total += precioTotal;
    this.actualizarCarrito();
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(indice) {
    const item = this.items[indice];
    this.total -= item.precioTotal;
    this.items.splice(indice, 1);
    this.actualizarCarrito();
  }

  // Método para actualizar la visualización del carrito
  actualizarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    listaCarrito.innerHTML = "";

    this.items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerText = `${item.cantidad} x ${item.producto} - $${item.precioTotal}`;
      const botonEliminar = document.createElement("button");
      botonEliminar.innerText = "Eliminar";
      botonEliminar.className = "btn-eliminar";
      botonEliminar.onclick = () => this.eliminarProducto(index);
      li.appendChild(botonEliminar);
      listaCarrito.appendChild(li);
    });

    const totalConDescuento = this.total - this.descuento;
    document.getElementById("total").innerText =
      totalConDescuento >= 0 ? totalConDescuento.toFixed(2) : 0;
  }

  // Método para aplicar un cupón de descuento
  aplicarCupon(codigoCupon) {
    if (codigoCupon.length === 6 && !isNaN(codigoCupon)) {
      const descuento = this.total * 0.05;
      this.descuento = descuento;
      alert(
        `Felicitaciones, obtuviste un descuento del 5%! Descuento aplicado: $${descuento.toFixed(
          2
        )}`
      );
    } else {
      alert("Cupón inválido. Debe ser un código de 6 números.");
    }
    this.actualizarCarrito();
  }

  // Método para realizar el pedido
  realizarPedido() {
    if (this.items.length === 0) {
      alert("El carrito está vacío.");
    } else {
      const totalConDescuento = this.total - this.descuento;
      alert(
        "Pedido realizado con éxito! Total a pagar: $" +
          (totalConDescuento >= 0 ? totalConDescuento.toFixed(2) : 0)
      );
      this.items = [];
      this.total = 0;
      this.descuento = 0;
      this.actualizarCarrito();
    }
  }
}

// Crear productos
const productos = [
  new Producto("Pizza", 7000),
  new Producto("Hamburguesa", 8000),
  new Producto("Lomo", 10000),
  new Producto("Gaseosa", 1500),
  new Producto("Agua", 1000),
  new Producto("Cerveza", 2000),
];

// Instancia del carrito
const carrito = new Carrito();

// Función para cargar los productos en el menú desplegable
function cargarProductos() {
  const selectProducto = document.getElementById("producto");
  productos.forEach((producto) => {
    const option = document.createElement("option");
    option.value = producto.nombre;
    option.text = `${producto.nombre} - $${producto.precio}`;
    selectProducto.appendChild(option);
  });
}

// Función para agregar productos al carrito desde el formulario
function agregarAlCarrito() {
  const productoSeleccionado = document.getElementById("producto").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const producto = productos.find((p) => p.nombre === productoSeleccionado);
  carrito.agregarProducto(producto, cantidad);
}

// Función para aplicar un cupón de descuento mediante prompt
function aplicarCuponPrompt() {
  const codigoCupon = prompt(
    "Ingrese el código del cupón de descuento (6 números):"
  );
  carrito.aplicarCupon(codigoCupon);
}

// Función para realizar el pedido
function realizarPedido() {
  carrito.realizarPedido();
}

// Cargar los productos en el menú desplegable al cargar la página
window.onload = cargarProductos;
