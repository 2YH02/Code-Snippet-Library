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

const MainLogo = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
`;
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
      setUser(data);
    }
  }, []);

  const emptyRef = useRef(null);
  const inputBoxRef = useRef(null);
  const inputRef = useRef(null);
  const focusHandler = () => {
    if (window.innerWidth > 830) {
      emptyRef.current.style.flex = "-1";
      inputBoxRef.current.style.flex = "3 1 100%";
      inputRef.current.style.width = "100%";
    } else {
      emptyRef.current.style.flex = "-1";
      inputBoxRef.current.style.flex = "700 1 100%";
      inputRef.current.style.width = "100%";
    }
  };
  const blurHandler = () => {
    if (window.innerWidth > 830) {
      emptyRef.current.style.flex = "3";
      inputBoxRef.current.style.flex = "1";
      inputRef.current.style.width = "350px";
    } else {
      emptyRef.current.style.flex = "-1";
      inputBoxRef.current.style.flex = "700 1 100%";
      inputRef.current.style.width = "100%";
    }
  };

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
            <span>CoDE sNIppeT</span>
            <span>LiBRaRY</span>
          </MainLogo>
          <div className="header-menu">
            <Link to={"/snippets"} className="link">
              코드
            </Link>
            <Link to={"/post-test"} className="link">
              코드생성
            </Link>
          </div>
          <div className="empty" ref={emptyRef}></div>
          <div className="search-bar" ref={inputBoxRef}>
            <input
              type="text"
              placeholder="Search"
              className="nav-input"
              ref={inputRef}
              onFocus={focusHandler}
              onBlur={blurHandler}
            ></input>
          </div>

          {user.isLogin ? (
            <div className="profile-container">
              <div className="profile">
                <img src={"/user.png"} className="profile-img"></img>
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
                        마이페이지
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/post-test");
                        }}
                      >
                        글쓰기
                      </a>
                    </li>
                    <li>
                      <a>설정</a>
                    </li>
                    <li>
                      <a
                        className="login-btn"
                        onClick={() => {
                          navigate("/");
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
