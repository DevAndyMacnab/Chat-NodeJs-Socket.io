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
    let color = "#f4f4f4";

    if (nick == datos.usernames) {
      color = "#9ff4c5";
    }
    chat.append(
      `<div class="msg-area mb-2" style="background-color:${color}"><p class="msg"><b>${datos.usernames} </b> <br>${datos.msg}</p></div>`
    );
  });

  //Nuevo usuario:
  nickForm.submit((evento) => {
    evento.preventDefault();
    
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
      
      nickName.val("");
    });
  });

  //Obtenemos el array de usuario conectados
  socket.on("usernames", (datos) => {
    let html = "";
    let color = "";
    let salir = "";
    for (let i = 0; i < datos.length; i++) {
      if (nick == datos[i]) {
        color = "#027f43";
        salir = '<a class="enlace-salir" href="/">Salir</a>';
      } else {
        color = "#000";
        salir = "";
      }
      html += `<p style="color: ${color};">${datos[i]} ${salir}</p>`;
    }
    usernames.html(html);
  });
});
