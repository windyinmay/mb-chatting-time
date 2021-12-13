let currentMsgId = 1;
function createMsg(user, messageText) {
  return {
    _id: currentMsgId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar,
    },
  };
}
function handleMsg(socket, users) {
  socket.on("message", (messageText) => {
    //console.log(messageText); => later for checking
    //send back all the msg to client
    const user = users[socket.id];
    const message = createMsg(user, messageText);
    console.log(message);
    socket.broadcast.emit("message", message);
  });
}

module.exports = { handleMsg };
