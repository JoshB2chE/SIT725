console.log('Hello from the client side!');

const socket = io('ws://localhost:3000', { autoConnect: false });

const messages = [];

const pushMessage = (msg) => {
  messages.push(msg);
  $("#messages").html(messages.map(msg => `<li>${msg}</li>`).join(""));
};

socket.on('connect', () => {
  $("#connect").addClass('disabled');
  $("#disconnect").removeClass('disabled');
  $("#send").removeClass('disabled');
  
  pushMessage('Connected to the server');
});

socket.on('disconnect', () => {
  $("#connect").removeClass('disabled');
  $("#disconnect").addClass('disabled');
  $("#send").addClass('disabled');

  pushMessage('Disconnected from the server');
});

socket.on('message', (msg) => {
  pushMessage(msg);
});

$("#connect").click(() => {
  socket.connect();
});

$("#disconnect").click(() => {
  socket.disconnect();
});

$("#send").click(() => {
  const message = $("#message").val().trim();

  if (!message) {
    return;
  }

  $("#message").val("");
  pushMessage(`You: ${message}`);

  socket.emit('message', message);
});

