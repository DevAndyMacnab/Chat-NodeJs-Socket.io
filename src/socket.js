module.exports = (io) => {
  //En lugar de un arreglo se puede sustituir por una base de datos
  let nickNames = [];
  io.on("connection", (socket) => {
    //Al recibir un mensaje recojemos los datos:
    socket.on("enviar mensaje", (datos) => {
      io.sockets.emit("nuevo mensaje", {
        msg: datos,
        usernames: socket.nickname,
      });
    });

    socket.on("nuevo usuario", (datos, callback) => {
      if (nickNames.indexOf(datos) != -1) {
        callback(false);
      } else {
        callback(true);
        socket.nickname = datos;

        nickNames.push(socket.nickname);

        io.sockets.emit("usernames", nickNames);
      }
    });

    socket.on("disconnect", (datos) => {
      if (!socket.nickname) {
        return;
      } else {
        nickNames.splice(nickNames.indexOf(socket.nickname), 1);
        io.sockets.emit("usernames", nickNames);
      }
    });
  });
};
