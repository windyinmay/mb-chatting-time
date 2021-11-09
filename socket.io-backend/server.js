const io = require("socket.io")();

io.on("connection", (socket) => {
  //ask for support
  console.log("a user connected!");
  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", message);
  });
});

io.listen(3030, function () {
  console.info("This is running on 3030");
});
