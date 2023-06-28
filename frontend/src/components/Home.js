import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData, resetUserData } from "../features/userSlice";
const Main = styled.div`
  // border: 1px solid red;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  height: calc(100vh - 56px);
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  & > div {
    // border: 1px solid blue;
    height: 950px;
    margin: 0 auto;
  }
`;
const First = styled.div`
  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  background-color: #e8eaf6;
  // background-color: grey;
  position: relative;
  width: 100%;
  height: calc(100vh - 56px);
  & > .start-link {
    font-size: 3vw;
    font-weight: bold;
    position: fixed;
    bottom: 17vh;
    left: 23vw;
    // opacity: 0;
    & > a {
      z-index: 12;
      position: relative;
      pointer-events: all;
      cursor: pointer;
    }
    & .highlight-3 {
      z-index: 11;
      width: 0;
      height: 1.5vw;
      background-color: ${(props) => (!props.mode ? "#82f888" : "grey")};
      position: absolute;
      bottom: 0;
      left: 0;
      transition: width 0.2s;
    }
    & > a:hover + .highlight-3 {
      width: 100%;
      transition: width 0.2s;
    }
    @media (max-width: 768px) {
      left: 20vw;
      bottom: 19vw;
      font-size: 4vw;
    }
    @media (max-width: 570px) {
      left: 17vw;
      bottom: 20vw;
      font-size: 5vw;
    }
    @media (max-width: 505px) {
      width: 10rem;
      left: 50%;
      transform: translateX(-50%);
      bottom: 4rem;
      font-size: 2rem;
      padding: 0.5rem 1rem;
    }
  }
  & > div {
    // border: 1px solid red;
    z-index: 5;
    position: fixed;
    pointer-events: none;
    transition: all 0.5s;
  }
  & > div:nth-child(3) {
    top: 12.8vw;
    left: -900px;
    width: 33vw;
    height: 2.5vw;
    background: #82f888;
    @media (max-width: 768px) {
      top: 15.5vw;
    }
    @media (max-width: 570px) {
      top: 19.5vw;
    }
    @media (max-width: 505px) {
      top: 10rem;
      width: 17.5rem;
      height: 1rem;
    }
  }
  & > div:nth-child(4) {
    top: 25.3vw;
    left: -900px;
    width: 17vw;
    height: 2.5vw;
    background: #82f888;
    @media (max-width: 768px) {
      top: 28.3vw;
    }
    @media (max-width: 570px) {
      top: 32.3vw;
    }
    @media (max-width: 505px) {
      top: 15rem;
      width: 9rem;
      height: 1rem;
    }
  }
  & .title {
    pointer-events: none;
    font-size: 8vw;
    position: fixed;
    font-family: "Roboto", sans-serif;
    z-index: 5;
    @media (max-width: 505px) {
      font-size: 3rem;
    }
  }
  // 첫번째 타이틀
  & .title-m {
    top: 6.8vw;
    @media (max-width: 768px) {
      top: 10vw;
    }
    @media (max-width: 570px) {
      top: 14vw;
    }
    @media (max-width: 505px) {
      top: 7.7rem;
    }
  }
  & .title-s {
    top: 19.5vw;
    @media (max-width: 768px) {
      top: 22.7vw;
    }
    @media (max-width: 570px) {
      top: 27vw;
    }
    @media (max-width: 505px) {
      top: 12.8rem;
    }
  }
  // 두번째 타이틀
  & .titleS-m {
    top: 6.8vw;
    left: 0;
    @media (max-width: 768px) {
      top: 10vw;
    }
    @media (max-width: 570px) {
      top: 14vw;
    }
    @media (max-width: 505px) {
      top: 7.7rem;
    }
  }
  & .titleS-s {
    top: 19.5vw;
    left: 0;
    @media (max-width: 768px) {
      top: 22.7vw;
    }
    @media (max-width: 570px) {
      top: 27vw;
    }
    @media (max-width: 505px) {
      top: 12.8rem;
    }
  }

  & > .code-box {
    // border: 1px solid red;
    position: fixed;
    bottom: -60vh;
    right: 10vw;
    width: 28vw;
    height: 28vw;
    pointer-events: none;
    @media (max-width: 505px) {
      top: 70%;
      left: -120%;
      transform: translate(-50%, -50%);
      width: 28vw;
      height: 28vw;
    }
  }
  & > .fix {
    // border: 1px solid red;
    position: fixed;
    bottom: 0;
    right: 10vw;
    width: 28vw;
    height: 28vw;
    pointer-events: none;
    @media (max-width: 1200px) {
      width: 35vw;
      height: 35vw;
    }
    @media (max-width: 570px) {
      width: 40vw;
      height: 40vw;
    }
    @media (max-width: 505px) {
      top: 60%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 15rem;
      height: 15rem;
    }
  }
`;
const Second = styled.div`
  // background-color: #e8eaf6;
  position: relative;
`;
const Third = styled.div`
  // background-color: #e8eaf6;
`;
const Fourth = styled.div`
  // background-color: #e8eaf6;
`;
const Home = () => {
  const navigate = useNavigate();

  const userInfo = useSelector((state) => state.user);
  const modeInfo = useSelector((state) => state.mode);
  const dispatch = useDispatch();

  // 스크롤
  const [scroll, setScroll] = useState(0);
  const [fontStyle, setFontStyle] = useState([true, true]);
  const [fix, setFix] = useState(false);
  const [left, setLeft] = useState("-900px");
  const [leftS, setLeftS] = useState("-900px");
  const [display, setDisplay] = useState(false);
  const [displayS, setDisplayS] = useState(false);
  const [ops, setOps] = useState("0");
  useEffect(() => {
    // console.log(scroll);
    if (scroll > 615 && scroll < 750) {
      let copy = [...fontStyle];
      copy[0] = false;
      copy[1] = true;
      setFontStyle(copy);
    } else if (scroll > 750) {
      let copy = [...fontStyle];
      copy[0] = false;
      copy[1] = false;
      setFontStyle(copy);
    } else if (scroll < 615) {
      let copy = [...fontStyle];
      copy[0] = true;
      copy[1] = true;
      setFontStyle(copy);
    }

    if (scroll >= 1040) {
      setFix(true);
      // console.log(fix);
    } else if (scroll < 1040) {
      // console.log(fix);
      setFix(false);
    }

    if (scroll >= 1100 && display == true) {
      setLeft("0");
    } else if (scroll < 1100) {
      setLeft("-900px");
    }
    if (scroll >= 1200) {
      setDisplay(true);
    } else if (scroll < 1200 && left == "0") {
      setDisplay(false);
    }
    if (scroll >= 1500 && displayS == true) {
      setLeftS("0");
    } else if (scroll < 1500) {
      setLeftS("-900px");
    }
    if (scroll >= 1500) {
      setDisplayS(true);
    } else if (scroll < 1500) {
      setDisplayS(false);
    }

    if (scroll >= 1800) {
      setOps("1");
    } else if (scroll < 1800) {
      setOps("0");
    }
  }, [scroll]);

  return (
    <Main
      onScroll={(e) => {
        // console.log(e.target.scrollTop);
        setScroll(e.target.scrollTop);
      }}
    >
      <First
        style={{
          backgroundColor: modeInfo.mode ? "#212121" : null,
          color: modeInfo.mode ? "#f7f7f7" : null,
        }}
        mode={modeInfo.mode ? "true" : undefined}
      >
        <div style={{ display: display ? "none" : "block" }}>
          <span
            className="title title-m"
            style={{ fontStyle: fontStyle[1] ? "normal" : "italic" }}
          >
            MAKE YOUR
          </span>
        </div>
        <div style={{ display: displayS ? "none" : "block" }}>
          <span
            className="title title-s"
            style={{ fontStyle: fontStyle[0] ? "normal" : "italic" }}
          >
            CoDE
          </span>
        </div>
        <div
          style={{
            left: left,
            display: display ? "block" : "none",
            backgroundColor: modeInfo.mode ? "grey" : null,
          }}
        >
          <span
            className="title titleS-m"
            style={{
              fontStyle: fontStyle[1] ? "normal" : "italic",
            }}
          >
            SNIPPET
          </span>
        </div>
        <div
          style={{
            left: leftS,
            display: displayS ? "block" : "none",
            backgroundColor: modeInfo.mode ? "grey" : null,
          }}
        >
          <span
            className="title titleS-s"
            style={{ fontStyle: fontStyle[0] ? "normal" : "italic" }}
          >
            HUB
          </span>
        </div>
        <div
          className="start-link"
          style={{
            opacity: ops,
          }}
        >
          <a
            onClick={() => {
              console.log(userInfo);
              navigate("/post-test");
            }}
          >
            START
          </a>
          <div className="highlight-3"></div>
        </div>
        <div
          className={fix ? "fix" : "code-box"}
          style={{
            margin: "0 auto",
          }}
        >
          <video
            muted
            autoPlay
            loop
            style={{
              width: "100%",
              border: "none",
              outline: "none",
              borderTopLeftRadius: ".5vw",
              borderTopRightRadius: ".5vw",
            }}
          >
            <source src="coding.mp4"></source>
          </video>
        </div>
      </First>
      <Second
        style={{ backgroundColor: modeInfo.mode ? "#424242" : null }}
      ></Second>
      <Third
        style={{ backgroundColor: modeInfo.mode ? "#424242" : null }}
      ></Third>
      <Fourth
        style={{ backgroundColor: modeInfo.mode ? "#212121" : null }}
      ></Fourth>
    </Main>
  );
};

export default Home;
