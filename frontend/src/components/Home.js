import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownLong,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

const Main = styled.div`
  // border: 1px solid red;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  // height: calc(100vh - 56px);
  // overflow: hidden;
  & > div {
    // border: 1px solid blue;
    height: calc(100vh - 56px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const animate = keyframes`
  0% {
    transform: translateX(1300px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
  97% {
    transform: translateX(0px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
  100% {
    transform: translateX(0px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    // border: 1px solid rgba(0, 0, 0, 0.1);
    // box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
`;
const animateTwo = keyframes`
  0% {
    transform: translateX(0px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
  3% {
    transform: translateX(0px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
  100% {
    transform: translateX(2000px);
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
    box-shadow:0 5px 15px rgba(0, 0, 0, 0.5); 
  }
`;
const First = styled.section`
  & * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  background-color: #9b635a;
  position: relative;
  width: 100%;
  height: calc(100vh - 56px);
  transform-style: preserve-3d;
  perspective: 500px;
  overflow: hidden;
  & > h2 {
    position: relative;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    text-align: center;
    // line-height: 100vh;
    font-size: 10vw;
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & > span {
      font-family: "Pangolin", cursive;
    }
  }
  & > .banner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    & .blocks {
      color: black;
      z-index: 6;
      position: relative;
      justify-contents: center;
      align-items: center;
      width: 25vw;
      height: 25vh;
      animation: ${animate} 0.2s ease-in-out forwards;
      animation-delay: 0.1s;
    }
  }
  &.active .banner .blocks {
    animation: ${animateTwo} 0.2s ease-in-out forwards;
    // animation-delay: 0.1s;
    // background-color: white;
    background: url(title.png);
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
  }
`;
const Scroll = styled.div`
  display: none;
  font-size: 10vw;
  font-weight: 700;
  cursor: pointer;
  position: absolute;
  bottom: 10vh;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
  z-index: 5;
  &:hover {
    bottom: 7vh;
  }
  &.block {
    display: block;
  }
`;

const Second = styled.div`
  background-color: #fff5e9;
`;
const Third = styled.div``;
const Fourth = styled.div`
  background-color: #fff5e9;
`;
const Home = () => {
  const navigate = useNavigate();
  // first page action
  useEffect(() => {
    const banner = document.getElementsByClassName("banner")[0];
    const blocks = document.getElementsByClassName("blocks");
    for (let i = 1; i < 20; i++) {
      banner.innerHTML += `<div class='blocks' id='${i}'></div>`;
      const duration = Math.random() * 2;
      blocks[i].style.animationDuration = 0.4 + duration + "s";
      blocks[i].style.animationDelay = duration + "s";
    }
    const section = document.querySelector("section");
    const title = document.getElementById("title");
    const btn = document.getElementById("scroll");
    setTimeout(() => {
      section.classList.add("active");
      btn.classList.add("block");
      title.innerHTML = "<span>CoDE sNIppeT</span><span>LiBRaRY</span>";
    }, 5000);
  }, []);

  const scrollRef = useRef(null);
  const goScroll = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  // second page action
  return (
    <Main>
      <First>
        <h2 id="title"></h2>
        <Scroll id="scroll" onClick={goScroll}>
          <FontAwesomeIcon icon={faArrowDown} />
        </Scroll>
        <div className="banner">
          <div className="blocks"></div>
        </div>
      </First>
      <Second ref={scrollRef}>메인페이지 2번</Second>
      <Third>메인페이지 3번</Third>
      <Fourth>메인페이지 4번</Fourth>
    </Main>
  );
};

export default Home;
