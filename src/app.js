const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewRouter = require("./routes/views.router.js");

app.use(express.static("./src/public"));

//motor:
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//rutas
app.use("/realtimeproducts", viewRouter);

//listen
const httpServer = app.listen(PUERTO, () => {
  console.log(`Listening on:${PUERTO}`);
})

const io = socket(httpServer);

const productos = [
  { nombre: "Trufas de Chocolate Oscuro", precio: 12 },
  { nombre: "Barra de Chocolate con Almendras", precio: 3 },
  { nombre: "Bombones Rellenos de Crema de Avellanas", precio: 9 },
  { nombre: "Chocolate Blanco con Fresas", precio: 4 },
  { nombre: "Tableta de Chocolate Amargo 70%", precio: 5 },
  { nombre: "Praliné de Chocolate con Nueces", precio: 7 },
  { nombre: "Chocolate con Leche y Caramelo", precio: 6 },
  { nombre: "Pastel de Chocolate Negro", precio: 15 },
  { nombre: "Galletas de Chocolate y Avena", precio: 8 },
  { nombre: "Brownies de Chocolate Doble", precio: 10 }
];


// Connection handler
io.on('connection', (socket) => {
    console.log("client connected");


    socket.emit("saludo", "Welcome client, I'm the server");


    socket.emit('productos', productos);


    socket.on("mensaje", (data) => {
        console.log(data);
    });


    socket.on('crearProducto', (producto) => {
        productos.push(producto);
        // Emit updated productos to all clients
        io.emit('productos', productos);
    });
});

