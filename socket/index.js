import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

//2. 온라인 사용자 배열 만들기 비어있다고 가정하고
let onlineUsers = [];

//2. 누군가 우리 서버에 연결할 때마다 이를 업데이트 해줄 수 있다
//2. 이렇게 랜덤을 생성되는 소켓아이디와 함께 유저아이디(유저마다의 고유 값)를 부여하면
//2. 유저아이디로 소켓아이디를 찾을 수 있다
// [
//   {
//     username: "john",
//     socketId: "sdsgadgagfagafgfg",
//   },
//   {
//     username: "monika",
//     socketId: "dddgsefsgdsdfsf",
//   },
// ];
//2. 아래의 addNewUser함수를 통해 위의 onlineUsers에 위와 같이 업데이트 되길 바란다
const addNewUser = (username, socketId) => {
  //2. 이미 있는 유저라면 추가하지 않는다
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

//3. app을 종료할때마다 해당 유저를 배열에서 삭제할 것이다
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

//4. 특정 사용자를 지정
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("connection", (socket) => {
  //1. io.emit('이벤트네임','함수 또는 메세지 등')
  //1. 특정 사용자에게 보내고 싶다면 io.to(특정아이디).emit('이벤트네임','함수 또는 메세지 등')
  //1.  io.to.emit("firstEvent", "hello this it test!")

  //5. 소켓 연결 시 위에 생성한 addNewUser함수를 이용해 유저 업데이트
  socket.on('newUser', (username) => {
    //socket콘솔 찍어보면 안에 id있는거 확인가능
    
    addNewUser(username,socket.id);
  })
  //
  socket.on("sendNotification", ({ senderName, receiverName, type }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type,
    });
  });

  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  //6. 연결이 끊어질 시 사용자 소켓 아이디 제거
  socket.on("disconnect", () => {
    removeUser(socket.id)
  });
});

io.listen(5000);
