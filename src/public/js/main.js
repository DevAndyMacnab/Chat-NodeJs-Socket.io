$(function () {
  const socket = io();
  var nick = "";
  //Accedemos a los elementos del DOM:
  const messageForm = $("#message-form");
  const messageBox = $("#message");
  const chat = $("#chat");

  const nickForm = $("#nick-form");
  const nickError = $("#nick-error");
  const nickName = $("#nick-name");
  const usernames = $("#usernames");

  //Eventos
  //Enviamos un mensaje al servidor
  messageForm.submit((evento) => {
    evento.preventDefault();
    socket.emit("enviar mensaje", messageBox.val());
    messageBox.val("");
  });

  socket.on("nuevo mensaje", function (datos) {
    chat.append(
      `<div class="msg-area mb-2"><p class="msg">${datos.msg}</p></div>`
    );
  });

  //Nuevo usuario:
  nickForm.submit((evento) => {
    evento.preventDefault();
    console.log("si funciona");
    socket.emit("nuevo usuario", nickName.val(), (datos) => {
      if (datos) {
        nick = nickName.val();
        $("#nick-wrap").hide();
        $("#content-wrap").show();
      } else {
        nickError.html(
          '<div class="alert alert-danger">El usuario ya existe</div>'
        );
      }
      console.log("Llegamos por aqui");
      nickName.val("");
    });
  });
});

//Obtenemos respuesta del servidor
