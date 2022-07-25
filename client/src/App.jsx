import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import { posts } from "./data";
import { io } from "socket.io-client";
import { useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);
  
  //사용자를 서버로 보내기
  useEffect(() => {
    //서버부분에 만들어진 유저 업데이트 이벤트
    socket?.emit("newUser", user);
  }, [socket, user]);

  //소켓을 사용하는 컴포넌트에 프롭스로 넘겨준다
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}

          <span className="username"> {user} </span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
