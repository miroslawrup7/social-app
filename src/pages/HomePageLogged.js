import React, { useEffect } from "react";
import "../styles/HomePage.css";

import PostBox from "../components/PostBox";
import WritingBox from "../components/WritingBox";
import RecommendedBox from "../components/RecommendedBox";
import FollowersBox from "../components/FollowersBox";

const HomePageLogged = (props) => {
  useEffect(() => {
    return () => {
      props.setPosts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PostBox
        username={props.username}
        jwt={props.jwt}
        posts={props.posts}
        getLatestPosts={props.getLatestPosts}
        handleDeleteFollowed={props.handleDeleteFollowed}
        loaderVisible={props.loaderVisible}
        getNewestPosts={props.getNewestPosts}
      />

      <div className="sidebar">
        <WritingBox jwt={props.jwt} getNewestPosts={props.getNewestPosts} />
        {props.recommendedUsers.length > 0 && (
          <RecommendedBox
            handleAddFollowed={props.handleAddFollowed}
            recommendedUsers={props.recommendedUsers}
          />
        )}
        {props.followedUsers.length > 0 && (
          <FollowersBox
            handleDeleteFollowed={props.handleDeleteFollowed}
            followedUsers={props.followedUsers}
          />
        )}
      </div>
    </>
  );
};

export default HomePageLogged;
