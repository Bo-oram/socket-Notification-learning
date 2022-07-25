import React, { useState } from "react";
import "./card.css";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Comment from "../../img/comment.svg";
import Share from "../../img/share.svg";
import Info from "../../img/info.svg";

const Card = ({ post, socket, user }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type) => {
    type === 1 && setLiked(true);

    //소켓 서버로 보낼 함수 senderName는 좋아요를 누른 유저 (나)
    //receiverName는 좋아요를 받은 유저 (게시물 등록 자)
    socket.emit("sendText", {
      senderName: user,
      receiverName: post.username,
      //잘 모르겠지만 아래 클릭 이벤트 준 친구들이 타입이 된다
      text:'hello this is chat message',
    });
  };
  
console.log(user, post.username)
  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            //타입 원
            onClick={() => handleNotification(1)}
          />
        )}

        <img
          src={Comment}
          alt=""
          className="cardIcon"
          //타입 투
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          //타입 쓰리
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
