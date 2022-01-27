import React, { useEffect, useState } from "react";

import "../styles/HomePage.css";

import PostBox from "../components/PostBox";
import PopupLogin from "../components/PopupLogin";

const HomePage = (props) => {
  const [timedPopup, setTimedPopup] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setTimedPopup(true);
    }, 10000);
  }, []);

  useEffect(() => {
    return () => {
      props.setPosts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PostBox
        posts={props.posts}
        username={props.username}
        getLatestPosts={props.getLatestPosts}
        loaderVisible={props.loaderVisible}
      />
      <PopupLogin
        trigger={timedPopup}
        setTrigger={setTimedPopup}
        username={props.username}
        loginSubmit={props.loginSubmit}
        loginError={props.loginError}
      />
    </>
  );
};

export default HomePage;
