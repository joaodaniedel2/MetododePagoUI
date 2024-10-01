const productos = document.querySelectorAll('.producto');
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');

let carrito = [];

productos.forEach(producto => {
   producto.querySelector('.producto-checkbox').addEventListener('change', (e) => {
       const id = producto.dataset.id;
       const precio = parseFloat(producto.dataset.precio);

       if (e.target.checked) {
           carrito.push({id, precio});
       } else {
           carrito = carrito.filter(item => item.id !== id);
       }
       actualizarCarrito();
   });
});

function actualizarCarrito() {
   listaCarrito.innerHTML = '';
    
   let total = carrito.reduce((accum, item) => accum + item.precio, 0);

   carrito.forEach(item => {
       const div = document.createElement('div');
       div.textContent = `Producto ID: ${item.id}, Precio: $${item.precio.toFixed(2)}`;
        
       // Botón para eliminar el producto del carrito
       const btnEliminar = document.createElement('button');
       btnEliminar.textContent = 'Eliminar';
       btnEliminar.addEventListener('click', () => {
           carrito = carrito.filter(cartItem => cartItem.id !== item.id);
           actualizarCarrito();
       });
        
       div.appendChild(btnEliminar);
       listaCarrito.appendChild(div);
   });

   totalElement.textContent = total.toFixed(2);
}

document.getElementById('vaciar-carrito').addEventListener('click', () => {
   carrito = [];
   actualizarCarrito();
});

// Funcionalidad del botón Pagar
document.getElementById('btn-pagar').addEventListener('click', () => {
   if (carrito.length === 0) {
       alert('Tu carrito está vacío.');
   } else {
       alert(`Pago procesado con éxito! Total a pagar: $${totalElement.textContent}`);
       carrito = []; // Limpiar el carrito después del pago
       actualizarCarrito();
   }
});
            