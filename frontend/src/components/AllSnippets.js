import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import styled, { keyframes } from "styled-components";
import data from "../data";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  tomorrow,
  darcula,
  solarizedlight,
  gruvboxLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const LoadingSnippet = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Container = styled.div`
  // border: 1px solid blue;
  overflow: auto;
  width: 100%;
`;
const CardWrapContainer = styled.div`
  // border: 1px solid red;
  width: 500px;
  margin: 2rem auto 4rem auto;

  @media (max-width: 580px) {
    width: 300px;
  }
`;
const CardWrap = styled.div`
  // border: 1px solid #333333;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
const Info = styled.div`
  // border: 1px solid green;
  display: flex;
  padding: 5px;
  cursor: pointer;
  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  & > .title {
    font-size: 1.8rem;
    margin: 0 1rem;
  }
  & > .language {
    font-size: 0.9rem;
  }
  & > .name {
    margin-right: 0.9rem;
  }
  & > .title-l {
    font-size: 1.8rem;
    margin: 0 1rem;
    animation: ${LoadingSnippet} 1s infinite;
  }
  & > .language-l {
    font-size: 0.9rem;
    animation: ${LoadingSnippet} 1s infinite;
  }
  & > .name-l {
    margin-right: 0.9rem;
    animation: ${LoadingSnippet} 1s infinite;
  }
`;
const Card = styled.div`
  // border: 1px solid red;
  overflow: hidden;
  cursor: pointer;
`;

const AllSnippets = () => {
  const navigate = useNavigate();

  const [snippets, setSnippets] = useState([]);

  const customStyle = {
    display: "flex",
    margin: "0",
    padding: "30px 15px",
    width: "100%",
    height: "auto",
    minHeight: "170px",
    flex: "1",
    backgroundColor: "#ededed",
    textOverflow: "ellipsis",
    WebkitLineClamp: 9,
    WebkitBoxOrient: "vertical",
    overflow: "auto",
  };

  // 스크롤 업데이트
  let [loadingModal, setLoadingModal] = useState(true);
  let [page, setPage] = useState(1);
  let [num, setNum] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const fetchSnippets = async () => {
    fetch(`http://localhost:8123/snippets?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length >= 4) {
          // console.log(data);
          let copy = [...snippets, ...data];
          setSnippets(copy);
        } else if (data.length < 4 && data.length > 0) {
          let num = page;
          num++;
          let copy = [...snippets, ...data];
          setSnippets(copy);
          setPage(num);
          setNum(num);
          setLoadingModal(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const scrollBox = useRef(null);
  useEffect(() => {
    const scrollBoxRef = scrollBox.current;
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8,
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target === scrollBoxRef && entry.isIntersecting) {
          num++;
          setPage(num);
        }
      });
    };

    let observer = null;
    if (scrollBoxRef) {
      observer = new IntersectionObserver(callback, options);
      observer.observe(scrollBoxRef);
    }

    return () => {
      if (observer && scrollBoxRef) {
        observer.unobserve(scrollBoxRef);
        observer.disconnect();
      }
    };
  }, [scrollBox.current]);

  useEffect(() => {
    fetchSnippets();
    // console.log(page);
  }, [page]);

  return (
    <>
      {snippets.length > 0 ? (
        <Main>
          <Container>
            {snippets.map((v, i) => {
              return (
                <CardWrapContainer key={i}>
                  <CardWrap>
                    <Info
                      onClick={() => {
                        navigate(`/snippets/${v.id}`);
                      }}
                    >
                      <h3 className="title">{v.title}</h3>
                      <p className="language">{v.language}</p>
                      <div className="empty"></div>
                      <p className="name">{v.author.name}</p>
                    </Info>
                    <Card
                      onClick={() => {
                        navigate(`/snippets/${v.id}`);
                      }}
                    >
                      <SyntaxHighlighter
                        language="javascript"
                        style={gruvboxLight}
                        customStyle={customStyle}
                      >
                        {v.code}
                      </SyntaxHighlighter>
                    </Card>
                  </CardWrap>
                </CardWrapContainer>
              );
            })}
            {loadingModal ? (
              <CardWrapContainer ref={scrollBox}>
                <CardWrap>
                  <Info style={{ color: "#c4c4c4" }}>
                    <h3 className="title-l">Loading</h3>
                    <p className="language-l">Loading</p>
                    <div className="empty"></div>
                    <p className="name-l">Loading</p>
                  </Info>
                  <Card style={{ color: "#f7f7f7" }}>
                    <SyntaxHighlighter
                      language="javascript"
                      style={gruvboxLight}
                      customStyle={customStyle}
                    >
                      Loading...
                    </SyntaxHighlighter>
                  </Card>
                </CardWrap>
              </CardWrapContainer>
            ) : null}
          </Container>
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
