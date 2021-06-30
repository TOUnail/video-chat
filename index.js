const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
// const { addUser, removerUser, getUser, getUsersInRoom } = require("./users");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  wsEngine: require("ws").Server,
});

app.use(cors());

const PORT = process.env.PORT || 5000;
// app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    // console.log("callUser room");
    // console.log(userToCall);
    //socket.join(userToCall);
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
    // socket.join(userToCall);
    // socket.emit("message", {
    //   user: "admin",
    //   text: `${name} has joined the room`,
    // });
  });

  socket.on("answerCall", (data) => {
    // console.log("answerCall room");
    // console.log(data.room);

    // socket.join(data.room);
    io.to(data.to).emit("callAccepted", data.signal);
    // socket.join(data.room);
    // socket.emit("message", {
    //   user: "admin",
    //   text: `${data.name} has joined the room`,
    // });
  });
  socket.on("sendMessage", (message, name, room, callback) => {
    // console.log(room);
    // console.log(`${name}: ${message}`);
    io.to(room).emit("message", { user: name, text: message });
    callback();
  });
  socket.on("join", ({ name, room }, callback) => {
    //console.log(`${user.name} has joined with ${user.id}`);
    socket.join(room);
    // socket.emit("message", { user: "admin", text: `${name}, welcome!` });
    // socket.broadcast.to(name).emit("message", {
    //   user: "admin",
    //   text: `${name} has joined the call`,
    // });
    callback();
  });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
