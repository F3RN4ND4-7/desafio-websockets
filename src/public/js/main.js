console.log("It's alive!");

const socket = io();

socket.emit("mensaje", "Hello world, I'm the client");


socket.on("productos", (data) => {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = "";

    data.forEach(producto => {
        listaProductos.innerHTML += `<li>${producto.nombre} - ${producto.precio}</li>`;
    });
});
