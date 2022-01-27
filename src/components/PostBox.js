import React, { useEffect, useRef } from "react";
import Post from "../components//Post";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import preloader from "../images/preloader.png";

import "../styles/PostBox.css";

const PostBox = (props) => {
  const endOfPageRef = useRef(null);
  const [isIntercepting, setLastPostRefState] = useIntersectionObserver({
    threshold: 1,
  });

  let latestPostsHtml = props.posts.map((post) => {
    let isLiked = false;
    for (let like of post.likes) {
      if (props.username === like.username) {
        isLiked = true;
        break;
      }
    }

    return (
      <Post
        key={post.id}
        username={props.username}
        jwt={props.jwt}
        post={post}
        getLatestPosts={props.getLatestPosts}
        handleDeleteFollowed={props.handleDeleteFollowed}
        handleDeletePost={props.handleDeletePost}
        isLiked={isLiked}
        getNewestPosts={props.getNewestPosts}
      />
    );
  });

  useEffect(() => {
    if (isIntercepting) {
      setTimeout(() => {
        props.getLatestPosts();
      }, 300);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntercepting]);

  return (
    <>
      <div className="posts-wrapper">
        {latestPostsHtml}
        <div
          className="loader-wrapper"
          ref={(node) => {
            endOfPageRef.current = node;
            setLastPostRefState(endOfPageRef);
          }}
        >
          {props.loaderVisible && (
            <div className="loader">
              <img src={preloader} alt="preloader" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PostBox;
