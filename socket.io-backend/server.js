const io = require("socket.io")();
// then invoke the io

//server side
io.on("connection", (socket) => {
  //ask for support
  console.log("a socket connected!");
  socket.on("message", (message) => {
    console.log(message);
    //send the mess event to all of the socket that is on the server
    io.emit("message", message);
  });
});

io.listen(3030);
