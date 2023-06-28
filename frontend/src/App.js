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
import FixModal from "./components/FixModal";
import { NotFound } from "./components/NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faList,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { resetUserData } from "./features/userSlice";

const Main = styled.div`
  & .link:hover {
    border-bottom-color: ${(props) => (!props.mode ? "#333333" : "#f7f7f7")};
  }
`;
const MainLogo = styled.div`
  // border: 1px solid red;
  display: flex;
  flex-direction: column;
`;

function App() {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const modeInfo = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  const [myModal, setMyModal] = useState(false);
  const [fixModal, setFixModal] = useState(false);
  const [isActive, setIsActive] = useState("");

  const exitModal = () => {
    setMyModal(false);
    setIsActive("");
  };

  const toggleMyModal = () => {
    if (myModal) {
      setMyModal(false);
      setIsActive("");
    } else {
      setMyModal(true);
      setIsActive("isActive");
    }
  };

  const emptyRef = useRef(null);
  const [search, setSearch] = useState(false);

  return (
    <div className="App">
      {/* 메인페이지 */}
      <Main className="main-page" mode={modeInfo.mode ? "true" : undefined}>
        {/* 내비게이션 바 */}
        <div
          className="header"
          style={{
            backgroundColor: modeInfo.mode ? "#333333" : null,
            color: modeInfo.mode ? "#E0E0E0" : null,
          }}
        >
          <MainLogo
            className={"logo"}
            onClick={() => {
              navigate("/");
            }}
            style={{ color: modeInfo.mode ? "#f7f7f7" : null }}
          >
            <span className="highlightWrap">
              SNIppeT Hub
              <div
                className="highlight"
                style={{ backgroundColor: modeInfo.mode ? "grey" : null }}
              ></div>
            </span>
          </MainLogo>
          <div className="header-menu">
            <Link
              to={"/snippets"}
              className="link"
              style={{ color: modeInfo.mode ? "#c4c4c4" : null }}
            >
              <FontAwesomeIcon icon={faList} />
            </Link>
            <Link
              to={"/post-test"}
              className="link"
              style={{ color: modeInfo.mode ? "#c4c4c4" : null }}
            >
              <FontAwesomeIcon icon={faCode} />
            </Link>

            <div className="search-bar">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{
                  cursor: "pointer",
                  zIndex: "10",
                  color: modeInfo.mode ? "#c4c4c4" : "#5f5e5e",
                }}
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

          {userInfo.isLogin ? (
            <div className="profile-container">
              <div className="profile">
                <img
                  src={
                    userInfo.photo
                      ? `http://localhost:8123/authors/profile/${userInfo.photo}`
                      : "/user.png"
                  }
                  className="profile-img"
                ></img>
                <p className="profile-name">{userInfo.name}</p>
                <div
                  className={`profile-btn ${isActive}`}
                  onClick={() => {
                    toggleMyModal();
                  }}
                >
                  <div
                    style={{
                      backgroundColor: modeInfo.mode ? "#f7f7f7" : null,
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: modeInfo.mode ? "#f7f7f7" : null,
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: modeInfo.mode ? "#f7f7f7" : null,
                    }}
                  ></div>
                </div>
              </div>
              {myModal ? (
                <div
                  className="my-modal"
                  style={{ backgroundColor: modeInfo.mode ? "#272727" : null }}
                >
                  <ul>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/my-page");
                          exitModal();
                        }}
                      >
                        <span className="highlight-1-wrap">
                          마이페이지
                          <div
                            className="highlight-1"
                            style={{
                              background: modeInfo.mode ? "grey" : null,
                            }}
                          ></div>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          navigate("/post-test");
                          exitModal();
                        }}
                      >
                        <span className="highlight-1-wrap">
                          글쓰기
                          <div
                            className="highlight-1"
                            style={{
                              background: modeInfo.mode ? "grey" : null,
                            }}
                          ></div>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setFixModal(true);
                          exitModal();
                        }}
                      >
                        <span className="highlight-1-wrap">
                          설정
                          <div
                            className="highlight-1"
                            style={{
                              background: modeInfo.mode ? "grey" : null,
                            }}
                          ></div>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        className="login-btn"
                        onClick={() => {
                          localStorage.removeItem("account");
                          dispatch(resetUserData());
                          exitModal();
                          navigate("/");
                        }}
                      >
                        <span className="highlight-1-wrap">
                          로그아웃
                          <div
                            className="highlight-1"
                            style={{
                              background: modeInfo.mode ? "grey" : null,
                            }}
                          ></div>
                        </span>
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
        <div
          className="main-content"
          style={{
            backgroundColor: modeInfo.mode ? "#212121" : null,
            color: modeInfo.mode ? "#BDBDBD" : null,
          }}
        >
          {fixModal ? <FixModal setFixModal={setFixModal} /> : null}
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
      </Main>
    </div>
  );
}

export default App;
