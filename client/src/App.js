import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Card from "./components/card/Card";
import {posts} from './data'

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  console.log(user);
  return (
    <div className="container">
      {user ? (
        <>
          <Navbar />
          {
            posts.map((post) => (
              <Card key={post.id} post={post}/>
            ))
          }
          
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
