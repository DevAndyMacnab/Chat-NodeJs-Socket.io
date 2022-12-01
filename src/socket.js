module.exports = (io)=>{
    io.on("connection",socket=>{
        console.log("Nuevo usuario conectado")

        //Al recibir un mensaje recojemos los datos:
        socket.on('enviar mensaje',(datos)=>{
            console.log(datos);
        })

    })
}