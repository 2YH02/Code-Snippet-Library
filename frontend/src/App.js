import "./App.css";
import { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./components/Login";
import Aside from "./components/Aside";
import AllSnippets from "./components/AllSnippets";
import MyPage from "./components/MyPage";
import Home from "./components/Home";
import PostPage from "./components/PostPage";
import UpdatePost from "./components/UpdatePost";
import { NotFound } from "./components/NotFound";

const Profile = styled.div`
  display: flex;
  margin-left: 20px;
`;
const ProfileImg = styled.img`
  border-radius: 50%;
  width: 40%;
`;
const ProfileName = styled.div`
  display: flex;
  align-items: center;
  margin: 0 50px 0 10px;
`;

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: null,
    email: null,
    photo: null,
    isLogin: false,
  });
  const [myModal, setMyModal] = useState(false);
  const [isActive, setIsActive] = useState("");

  const toggleMyModal = () => {
    if (myModal) {
      setMyModal(false);
      setIsActive("");
    } else {
      setMyModal(true);
      setIsActive("isActive");
    }
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("account"));
    if (data === null || data.isLogin === false) {
      let copy = { ...user };
      copy.isLogin = false;
      setUser(copy);
    } else {
      setUser(data);
    }
  }, []);

  return (
    <div className="App">
      {/* 배경화면 */}
      <div className="video-bg">
        <video muted autoPlay loop>
          <source src="/main-bg.mp4" type="video/mp4" />
          <strong>Your browser does not support the video tag.</strong>
        </video>
      </div>

      {/* 메인페이지 */}
      <div className="main-page">
        {/* 내비게이션 바 */}
        <div className="header">
          <div
            className={"logo"}
            onClick={() => {
              navigate("/");
            }}
          >
            Main Logo
          </div>
          <div className="header-menu">
            <Link to={"/admin"} className="link">
              link1
            </Link>
            <a className="link">link2</a>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              className="nav-input"
            ></input>
          </div>

          {user.isLogin ? (
            <div className="profile-container">
              <div className="profile">
                <img src={user.photo} className="profile-img"></img>
                <p className="profile-name">{user.name}</p>
                <div
                  className={`profile-btn ${isActive}`}
                  onClick={() => {
                    toggleMyModal();
                  }}
                >
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              {myModal ? (
                <div className="my-modal">
                  <ul>
                    <li>
                      <a>마이페이지</a>
                    </li>
                    <li>
                      <a>설정</a>
                    </li>
                    <li>
                      <a
                        className="login-btn"
                        onClick={() => {
                          localStorage.removeItem("account");
                          window.location.reload();
                        }}
                      >
                        로그아웃
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <a
              className="login-btn link"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </a>
          )}
        </div>

        {/* 메인컨텐츠 */}
        <div className="main-content">
          {/* 사이드 바 */}
          <Aside />

          <Routes>
            {/* 홈 */}
            <Route path="/" element={<Home />} />
            {/* all snippets */}
            <Route path="/snippets" element={<AllSnippets />}></Route>
            {/* 마이페이지 */}
            <Route path={`/my-page`} element={<MyPage />}></Route>
            {/* 로그인페이지 */}
            <Route path="/login" element={<LoginPage />}></Route>
            {/* 글쓰기 페이지 */}
            <Route path={`/post`} element={<PostPage />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

{
  /* <div>
              <a
                className="login-btn"
                onClick={() => {
                  localStorage.removeItem("account");
                  window.location.reload();
                }}
              >
                로그아웃
              </a>
            </div> */
}
