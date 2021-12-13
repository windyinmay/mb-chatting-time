//tutorial page https://socket.io/get-started/chat/
const io = require("socket.io")();
const messageHandler = require("./event-handlers/message.handler");

let currentUserId = 2;
const users = {};

function createProfilePicURL() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

//12dec socket still working, io-client installed
io.on("connection", (socket) => {
  console.log("a socket connected!");
  console.log(socket.id);
  users[socket.id] = { userId: currentUserId++ };
  //12Dec worked
  socket.on("join", (username) => {
    users[socket.id].username = username;
    users[socket.id].avatar = createProfilePicURL();
    messageHandler.handleMsg(socket, users);
  });
});
io.listen(3030);
