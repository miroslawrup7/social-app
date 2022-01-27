import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";

import HomePage from "../pages/HomePage";
import HomePageLogged from "../pages/HomePageLogged";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import ErrorPage from "../pages/ErrorPage";

import "../styles/Page.css";

const Page = (props) => {
  const [posts, setPosts] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [signUpMessage, setSignUpMessage] = useState("");

  const axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + props.jwt,
    },
  };

  let lastPostDate = new Date();

  posts.length > 0 &&
    (lastPostDate = new Date(Date.parse(posts[posts.length - 1].created_at)));

  const getLatestPosts = () => {
    setLoaderVisible(true);

    axios
      .post(
        "https://akademia108.pl/api/social-app/post/older-then",
        JSON.stringify({ date: lastPostDate }),
        axiosConfig
      )
      .then((res) => {
        setPosts((prevValue) => prevValue.concat(res.data));
        setLoaderVisible(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getNewestPosts = () => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/post/newer-then",
        JSON.stringify({ date: lastPostDate }),
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          setPosts(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getRecommendations = () => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/recommendations",
        {},
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          setRecommendedUsers(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getFollows = () => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/allfollows",
        {},
        axiosConfig
      )
      .then((res) => {
        if (res.status === 200) {
          setFollowedUsers(res.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (props.jwt) {
      getRecommendations();
      getFollows();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.jwt]);

  const handleAddFollowed = (followerId) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/follow",
        JSON.stringify({ leader_id: followerId }),
        axiosConfig
      )
      .then((res) => {
        getNewestPosts();
        getRecommendations();
        getFollows();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteFollowed = (followerId) => {
    axios
      .post(
        "https://akademia108.pl/api/social-app/follows/disfollow",
        JSON.stringify({ leader_id: followerId }),
        axiosConfig
      )
      .then((res) => {
        getNewestPosts();
        getRecommendations();
        getFollows();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="page">
        <Switch>
          <Route path="/" exact>
            {props.username ? (
              <HomePageLogged
                username={props.username}
                jwt={props.jwt}
                posts={posts}
                getLatestPosts={getLatestPosts}
                handleDeleteFollowed={handleDeleteFollowed}
                handleAddFollowed={handleAddFollowed}
                recommendedUsers={recommendedUsers}
                followedUsers={followedUsers}
                loaderVisible={loaderVisible}
                getNewestPosts={getNewestPosts}
                setPosts={setPosts}
              />
            ) : (
              <HomePage
                username={props.username}
                posts={posts}
                getLatestPosts={getLatestPosts}
                loaderVisible={loaderVisible}
                setPosts={setPosts}
                loginSubmit={props.loginSubmit}
                loginError={props.loginError}
              />
            )}
          </Route>
          <Route path="/login">
            <LoginPage
              username={props.username}
              loginSubmit={props.loginSubmit}
              loginError={props.loginError}
              signUpMessage={signUpMessage}
            />
          </Route>
          <Route path="/signup">
            <SignUpPage signUpMessage={setSignUpMessage} />
          </Route>
          <Route>
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </>
  );
};

export default Page;
