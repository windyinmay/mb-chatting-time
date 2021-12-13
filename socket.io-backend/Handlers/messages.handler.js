let currentMessageId = 1;

function createMsg(member, messageText) {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: member.memberId,
      name: member.username,
      avatar: member.avatar,
    },
  };
}

function handleMsg(socket, members) {
  socket.on("message", (messageText) => {
    //send the mess event to all of the socket that is on the server
    const member = members[socket.id];
    const message = createMsg(member, messageText);
    console.log(message);
    //emit() sends messages to sender socket as well
    socket.broadcast.emit("message", message);
  });
}

module.exports = { handleMsg };
