import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import styled, { keyframes } from "styled-components";
import data from "../data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  darcula,
  solarizedlight,
  gruvboxLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const LoadingWrap = styled.div`
  // border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Main = styled.div`
  // border: 1px solid blue;
  height: 100%;
  // margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 2rem;
  & > .up {
    // border: 1px solid red;
    z-index: 3;
    cursor: pointer;
    font-size: 2rem;
    position: fixed;
    top: 4.5rem;
    left: 50%;
    transform: translate(-50%);
  }
  & > .down {
    // border: 1px solid red;
    z-index: 3;
    cursor: pointer;
    font-size: 2rem;
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translate(-50%);
  }
`;
const Container = styled.div`
  // border: 1px solid red;
  position: relative;
  // overflow: auto;
  width: 100%;
  height: 100%;
  // top: -100px;
  // min-height: 800px;
  // padding: 2rem;
  // margin: 1rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 1fr);
  // gap: 100px;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
  // @media (max-width: 768px) {
  //   grid-template-columns: repeat(1, 1fr);
  //   row-gap: 2rem;
  // }
  // @media (max-width: 520px) {
  //   grid-template-columns: repeat(1, 1fr);
  //   row-gap: 2rem;
  // }
`;
const Card = styled.div`
  // border: 1px solid rgb(225, 225, 225);
  width: 290px;
  height: 220px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  cursor: pointer;
  border-radius: 4px;
  // padding: 1rem;
  // display: flex;
  // align-items: center;
  color: #333333;
  background: rgb(215, 151, 141);
  background: linear-gradient(
    54deg,
    rgba(215, 151, 141, 1) 0%,
    rgba(255, 177, 164, 1) 100%
  );
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  & > #syntax-title {
    // border: 1px solid red;
    padding: 2px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.3);
    // margin: 2px;
    position: absolute;
    width: 86%;
    text-align: center;
    font-weight: bold;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const CardWrap = styled.div`
  // border: 1px solid red;
  background-color: #9b635a;
  // background-color: white;
  border-radius: 4px;
  width: 270px;
  height: 210px;
  position: absolute;
  margin-bottom: 100px;
  top: 48%;
  transform: translateY(-50%);
  transition: all 0.5s;
  display: flex;
  align-items: flex-end;
  &:hover {
    width: 320px;
    height: 270px;
  }
`;
const CardWrapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Info = styled.div`
  // border: 1px solid red;
  display: none;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > .title {
    margin: 0 10px 0 40px;
    font-size: 23px;
  }
  & > .language {
    font-size: 10px;
  }
  & > .name {
    margin-right: 40px;
  }
  &.isActive {
    // background-color: red;
    display: flex;
    // align-items: center;
    & > * {
      diplay: flex;
    }
  }
`;

const AllSnippets = (props) => {
  const navigate = useNavigate();

  const [snippets, setSnippets] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8123/snippets")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // console.log(data.body);
  //       setSnippets(data.body);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  // console.log(snippets);

  const [active, setActive] = useState([]);
  const [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [data]);

  const customStyle = {
    // backgroundColor: "#333333",
    display: "inline-block",
    margin: "0",
    padding: "30px 15px",
    width: "100%",
    height: "100%",
    flex: "1",
    // background:
    //   "linear-gradient(54deg, rgba(215, 151, 141, 1) 0%, rgba(255, 177, 164, 1) 100%)",
    backgroundColor: "#ebe2e2",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 9,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    borderRadius: "4px",
  };

  const [isActive, setIsActive] = useState(false);
  const mouseHandler = () => {
    if (!isActive) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  // 이전페이지 현재페이지 다음페이지 구성
  // 이전페이지 없으면 화살표는 다음 방향만
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const fetchSnippets = async () => {
    fetch(`http://localhost:8123/snippets?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          // console.log(data);
          setSnippets(data);
        } else if (data.length <= 0) {
          let num = page;
          num--;
          setPage(num);
          alert("마지막 페이지 입니다.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchSnippets();
  }, [page]);

  return (
    <>
      {snippets.length > 0 ? (
        <Main>
          <FontAwesomeIcon
            icon={faChevronUp}
            className="up"
            onClick={() => {
              let num = page;
              if (num <= 1) {
                num = 1;
                alert("첫 페이지 입니다.");
              } else {
                num--;
              }
              setPage(num);
            }}
          />
          <Container>
            {snippets.map((v, i) => {
              return (
                <CardWrapContainer key={v.id}>
                  <CardWrap
                    onMouseEnter={mouseHandler}
                    onMouseLeave={mouseHandler}
                  >
                    <Card
                      onClick={() => {
                        navigate(`/snippets/${v.id}`);
                      }}
                    >
                      <div id="syntax-title">{v.title}</div>
                      <SyntaxHighlighter
                        language="javascript"
                        style={gruvboxLight}
                        customStyle={customStyle}
                      >
                        {v.code}
                      </SyntaxHighlighter>
                    </Card>
                    <Info className={isActive ? "isActive" : ""}>
                      <h3 className="title">{v.title}</h3>
                      <p className="language">{v.language}</p>
                      <div className="empty"></div>
                      <p className="name">{v.author.name}</p>
                    </Info>
                  </CardWrap>
                </CardWrapContainer>
              );
            })}
          </Container>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="down"
            onClick={() => {
              let num = page;
              num++;
              setPage(num);
            }}
          />
        </Main>
      ) : (
        <LoadingWrap>
          <Loading />
        </LoadingWrap>
      )}
    </>
  );
};

export default AllSnippets;
