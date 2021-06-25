const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const { addUser, removerUser, getUser, getUsersInRoom } = require("./users");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
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

  socket.on("join", ({ name, room }) => {
    const { user, error } = addUser({ id: socket.id, name, room });
    // if (error) return callback(error);
    console.log(`${user.name} has joined`);
    socket.emit("message", { user: "admin", text: `${user.name}, welcome!` });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the call`,
    });
    socket.join(user.room);
    // callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });
});

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
