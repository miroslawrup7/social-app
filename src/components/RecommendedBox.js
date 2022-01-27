import React from "react";
import { RiUserFollowLine } from "react-icons/ri";
import "../styles/RecommendedBox.css";

const RecommendedBox = (props) => {
  let recommendedUsersHtml = props.recommendedUsers.map((element) => {
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
            className="user-follow"
            onClick={() => props.handleAddFollowed(element.id)}
          >
            {<RiUserFollowLine className="icon-follow" />} Dodaj
          </p>
        </div>
      </li>
    );
  });

  return (
    <div className="sidebar-box">
      <h2>Rekomendacje</h2>
      <ul className="users">{recommendedUsersHtml}</ul>
    </div>
  );
};

export default RecommendedBox;
