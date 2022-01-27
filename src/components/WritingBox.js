import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import "../styles/WritingBox.css";

const WritingBox = (props) => {
  const [postContent, setPostContent] = useState("");

  const handlePostChange = (e) => {
    setPostContent(e.target.value);
  };

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + props.jwt,
    },
  };

  const handlePostWrite = () => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/add",
        JSON.stringify({ content: postContent }),
        axiosConfig
      )
      .then(() => {
        props.getNewestPosts();
        setPostContent("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="sidebar-box">
      <h2>Napisz post</h2>
      <div className="write-box">
        <textarea onChange={handlePostChange} value={postContent}></textarea>
        <p className="write-post-button" onClick={handlePostWrite}>
          {<FiSend className="icon-follow" />} Zapisz
        </p>
      </div>
    </div>
  );
};

export default WritingBox;
