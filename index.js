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
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send("Server is running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
  socket.on("declineCall", ({ from, name }) => {
    console.log("declineCall triggered");
    console.log(`name: ${name}`);
    console.log(`from: ${from}`);
    io.to(from).emit("declineCall");
  });
  socket.on("sendMessage", (message, name, room, callback) => {
    io.to(room).emit("message", { user: name, text: message });
    callback();
  });
  socket.on("join", ({ name, room }, callback) => {
    socket.join(room);
    callback();
  });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
