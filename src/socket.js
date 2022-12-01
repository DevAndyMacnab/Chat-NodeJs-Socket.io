module.exports = (io) => {
    //En lugar de un arreglo se puede sustituir por una base de datos
    let nickNames=[];
  io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    //Al recibir un mensaje recojemos los datos:
    socket.on("enviar mensaje", (datos) => {
      console.log(datos);
      io.sockets.emit("nuevo mensaje", {
        msg: datos,
      });
    });

    socket.on("nuevo usuario", (datos, callback) => {
        console.log("anda por aca")
        if(nickNames.indexOf(datos)!=-1){
            callback(false);

        }else{
            callback(true);
            socket.nickname=datos;

            nickNames.push(socket.nickname);

            io.sockets.emit("usernames", nickNames);

        }

    });
  });
};
