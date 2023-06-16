import "./App.css";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import LoginPage from "./components/Login";
import AllSnippets from "./components/AllSnippets";
import MyPage from "./components/MyPage";
import Home from "./components/Home";
import PostPageTest from "./components/PostPageTest";
import Snippet from "./components/Snippet";
import MySnippets from "./components/MySnippets";
import UpdatePost from "./components/UpdatePost";
import { NotFound } from "./components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolid,
  faCode,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const MainLogo = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
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
      // fetch(`http://localhost:8123/authors/${data.id}`)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setUser(data);
      //   })
      //   .catch((error) => console.error(error));
      setUser(data);
    }
  }, []);
  // console.log(user);

  const emptyRef = useRef(null);
  const [search, setSearch] = useState(false);

  // console.log(user);

  return (
    <div className="App">
      {/* 메인페이지 */}
      <div className="main-page">
        {/* 내비게이션 바 */}
        <div className="header">
          <MainLogo
            className={"logo"}
            onClick={() => {
              navigate("/");
            }}
          >
            <span className="highlight">SNIppeT Hub</span>
          </MainLogo>
          <div className="header-menu">
            <Link to={"/snippets"} className="link">
              <FontAwesomeIcon icon={faList} />
            </Link>
            <Link to={"/post-test"} className="link">
              <FontAwesomeIcon icon={faCode} />
            </Link>

            <div className="search-bar">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ cursor: "pointer", zIndex: "10", color: "#5f5e5e" }}
                onClick={() => {
                  setSearch(!search);
                }}
              />
              <input
                type="text"
                placeholder="Search"
                className={`nav-input ${search ? "active" : ""}`}
              ></input>
            </div>
            <Link></Link>
          </div>
          <div className="empty" ref={emptyRef}></div>

          {user.isLogin ? (
            <div className="profile-container">
              <div className="profile">
                <img
                  src={
                    user.photo
                      ? `http://localhost:8123/authors/profile/${user.photo}`
                      : "/user.png"
                  }
                  className="profile-img"
                ></img>
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
                      <a
                        onClick={() => {
                          navigate("/my-page");
                        }}
                      >
                        <span className="highlight-1">마이페이지</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/post-test");
                        }}
                      >
                        <span className="highlight-1">글쓰기</span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/");
                        }}
                      >
                        <span className="highlight-1">설정</span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="login-btn"
                        onClick={() => {
                          localStorage.removeItem("account");
                          window.location.reload();
                          navigate("/");
                        }}
                      >
                        <span className="highlight-1">로그아웃</span>
                      </a>
                    </li>
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <a
              className="link"
              id="login-btn"
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
          {/* <Aside /> */}

          <Routes>
            {/* 홈 */}
            <Route path="/" element={<Home />} />
            {/* all snippets */}
            <Route path="/snippets" element={<AllSnippets />}></Route>
            {/* snippet */}
            <Route path="/snippets/:id" element={<Snippet />}></Route>
            {/* 글쓰기 페이지 */}
            <Route path={`/post-test`} element={<PostPageTest />}></Route>
            {/* 마이페이지 */}
            <Route path={`/my-page`} element={<MyPage />}></Route>
            {/* 나의 코드 페이지 */}
            <Route
              path="/my-page/:id/snippets"
              element={<MySnippets />}
            ></Route>
            {/* 로그인페이지 */}
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
