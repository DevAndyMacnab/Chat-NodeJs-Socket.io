const express = require("express");
const path = require("path");
const app = express();
const server = require("http").Server(app);

//VINCULAMOS SOCKETio A NUESTRO SERVIDOR
const socketio = require("socket.io")(server);

app.set("port", process.env.PORT || 4000);

//Ejecutamos la funcion de socket.js
require("./socket.js")(socketio);

app.use(express.static(path.join(__dirname, "public")));
server.listen(app.get("port"), () =>
  console.log(`Example app listening on port ${app.get("port")}!`)
);
