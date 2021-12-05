const io = require("socket.io")();
// then invoke the io

const messageHandler = require("./Handlers/messages.handler");
//start from our side
let currentMemberId = 2;
const members = {};

function memberProfilePicUrl() {
  const random1 = Math.round(Math.random() * 200 + 100);
  const random2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${random1}/${random2}/any`;
}
//server side
io.on("connection", (socket) => {
  //ask for support => 28 Nov done
  console.log("a socket connected!");
  console.log(socket.id);
  members[socket.id] = { memberId: currentMemberId++ };
  socket.on("newbie", (username) => {
    //with memberIds => dont need to become a newbie to send mess
    //messageHandler.handleMsg(socket, memberIds);
    //required to create a username to chat
    members[socket.id].username = username;
    members[socket.id].avatar = memberProfilePicUrl();
    messageHandler.handleMsg(socket, members);
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/index":
        console.log("Got hello event", action.data);
        socket.emit("action", { type: "message", data: "Demonstration date!" });
        break;
      case "server/join":
        console.log("Got join event", action.data);
        users[socket.id].username = action.data;
        members[socket.id].avatar = memberProfilePicUrl();
        break;
    }
  });
});

io.listen(3030);
