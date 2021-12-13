const io = require("socket.io")();
// then invoke the io

//const server = http.createServer();
//const io = socketIO(server, {});

const { v4: uuidv4 } = require("uuid");
const messageHandler = require("./Handlers/messages.handler");

const members = {};

function memberProfilePicUrl() {
  const random1 = Math.round(Math.random() * 200 + 100);
  const random2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${random1}/${random2}/any`;
}
function getOnlineMembers() {
  //create users list (all the users) -> contacts
  const values = Object.values(members);
  const onlyWithUsernames = values.filter((u) => u.username !== undefined);
  return onlyWithUsernames;
}

io.on("connection", (socket) => {
  //ask for support => 28 Nov done
  console.log("a socket connected!", socket.id);
  members[socket.id] = { memberId: uuidv4(), username: null, avatar: null };

  socket.on("disconnect", () => {
    delete members[socket.id];
    io.emit("action", {
      type: "members_online",
      data: getOnlineMembers(),
    });
  });
  socket.on("action", (action) => {
    switch (action.type) {
      case "server/join":
        console.log("Got join event", action.data);
        members[socket.id].username = action.data;
        members[socket.id].avatar = memberProfilePicUrl();
        //socket emit only emits back to the current, io.emit emits to all sockets connected
        // socket.emit("action", {
        io.emit("action", {
          type: "members_online",
          data: getOnlineMembers(),
        });
        socket.emit("action", {
          type: "self_member",
          data: members[socket.id],
        });
        break;
      case "server/private_message":
        const conversationId = action.data.conversationId;
        const from = members[socket.id].memberId;
        const memberValues = Object.values(members);
        const socketIds = Object.keys(members);
        for (let i = 0; i < memberValues.length; i++) {
          if (memberValues[i].memberId === conversationId) {
            const socketId = socketIds[i];
            //io.sockets.emit(); send to all connected clients (same as socket.emit)
            io.sockets.sockets[socketId].emit("action", {
              type: "private_message",
              data: {
                ...action.data,
                conversationId: from,
              },
            });
            break;
          }
        }
        break;
    }
  });
});
const port = 3030;
io.listen(3030);
console.log("listening on ", port);
/* socket.on("newbie", (username) => {
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
        socket.emit("action", { type: "message", data: "Demonstration" });
        break;
      case "server/join":
        console.log("Got join event", action.data);
        members[socket.id].username = action.data;
        members[socket.id].avatar = memberProfilePicUrl();

        //socket emit only emits back to the current, io.emit emits to all sockets connected
        // socket.emit("action", {
        io.emit("action", {
          type: "members_online",
          data: getOnlineMembers(),
        });
        break;
    }
  });
//const port = 3030;
//console.log("Listening on", port);
//server.listen(port);*/
