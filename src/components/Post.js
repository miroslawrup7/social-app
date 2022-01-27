import React from "react";
import axios from "axios";
import "../styles/PostBox.css";
import { FaRegThumbsUp } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { RiCloseFill } from "react-icons/ri";
import { ImSad } from "react-icons/im";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import "../styles/Post.css";

const Post = (props) => {
  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + props.jwt,
    },
  };

  const changeDateFormat = (dateString) => {
    return dateString.substr(0, 10) + " " + dateString.substr(11, 5);
  };

  const handleDeletePost = (postId) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/delete",
        JSON.stringify({ post_id: postId }),
        axiosConfig
      )
      .then(() => {
        props.getNewestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAddLike = (postId) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/like",
        JSON.stringify({ post_id: postId }),
        axiosConfig
      )
      .then(() => {
        props.getNewestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleRemoveLike = (postId) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/dislike",
        JSON.stringify({ post_id: postId }),
        axiosConfig
      )
      .then(() => {
        props.getNewestPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="post-box">
      <div className="wrapper">
        <div className="post-header">
          <div className="post-avatar">
            <img
              className="user-avatar"
              src={props.post.user.avatar_url}
              alt="user-avatar"
            ></img>
            {props.username && props.post.user.username !== props.username && (
              <div
                className="stop-follow"
                onClick={() => props.handleDeleteFollowed(props.post.user.id)}
              >
                {<TiDelete />}
              </div>
            )}
          </div>
          <div className="post-info">
            <p className="post-user">{props.post.user.username}</p>
            <p className="post-date">
              {changeDateFormat(props.post.created_at)}
            </p>
          </div>
          {props.post.user.username === props.username && (
            <div
              className="delete-button"
              onClick={() => handleDeletePost(props.post.id)}
            >
              {<RiCloseFill />}
            </div>
          )}
          {!props.username && (
            <>
              <div className="post-likes-counter-logout">
                {<AiOutlineHeart className="icon-heart" />}{" "}
                <span className="likes-quantity">
                  {props.post.likes.length}
                </span>
              </div>
            </>
          )}
        </div>
        <div className="post-content">{props.post.content}</div>

        {props.username && (
          <>
            <hr />
            <div className="post-like-module">
              <div className="like-button-wrapper">
                {!props.isLiked ? (
                  <button
                    className="like-button"
                    onClick={() => handleAddLike(props.post.id)}
                  >
                    {<FaRegThumbsUp className="icon-like" />} Lubię to!
                  </button>
                ) : (
                  <button
                    className="unlike-button"
                    onClick={() => handleRemoveLike(props.post.id)}
                  >
                    {<ImSad className="icon-like" />} Usuń Polubienie
                  </button>
                )}
              </div>

              <div className="post-likes-counter">
                {props.isLiked ? (
                  <AiFillHeart className="icon-heart" />
                ) : (
                  <AiOutlineHeart className="icon-heart-off" />
                )}
                <span className="likes-quantity">
                  {props.post.likes.length}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Post;
