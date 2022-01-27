import React from "react";
import { RiUserUnfollowLine } from "react-icons/ri";
import "../styles/FollowersBox.css";

const FollowersBox = (props) => {
  let followUsersHtml = props.followedUsers.map((element) => {
    return (
      <li key={element.id}>
        <div className="post-header">
          <div className="post-avatar">
            <img
              className="user-avatar"
              src={element.avatar_url}
              alt="user-avatar"
            ></img>
          </div>
          <p className="post-user">{element.username}</p>
          <p
            className="user-unfollow"
            onClick={() => props.handleDeleteFollowed(element.id)}
          >
            {<RiUserUnfollowLine className="icon-follow" />} Usuń
          </p>
        </div>
      </li>
    );
  });

  return (
    <div className="sidebar-box">
      <h2>Subskrypcje</h2>
      <ul className="users">{followUsersHtml}</ul>
    </div>
  );
};

export default FollowersBox;
