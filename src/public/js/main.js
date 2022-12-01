$(function () {
  const socket = io();

  //Accedemos a los elementos del DOM:
  const messageForm = $("#message-form");
  const messageBox = $("#message");
  const chat = $("#chat");

  //Eventos
  //Enviamos un mensaje al servidor
  messageForm.submit((evento) => {
    evento.preventDefault();
    socket.emit("enviar mensaje", messageBox.val());
    messageBox.val("");
  });
});
