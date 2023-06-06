import { useParams, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  funky, // 배경 검
  tomorrow, // 주 노 초
  coldarkDark, // 파 초
  darcula, // 회 초 깔끔
  prism, // 화이트
  synthwave84, // 형광 보라 배경 빨 파
  xonokai,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import codeprism from "../styles/codeprism";
import data from "../data";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  // border: 1px solid red;
  width: 80%;
  margin: 2rem auto;
  height: calc(100% - 4rem);
  display: flex;
  justify-content: space-around;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;
const CodeWrap = styled.div`
  //   border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const InfoWrap = styled.div`
  //   border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const Code = styled.div`
  //   border: 1px solid gold;
  background-color: #333333;
  padding: 3rem 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
const Info = styled.div`
  // border: 1px solid gold;
  color: #333333;
  background-color: #c4c4c4;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  & > div {
    // border: 1px solid red;
  }
  & > #icon {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    & span {
      cursor: pointer;
      // padding: 5px;
    }
    & .i-1:hover {
      text-shadow: rgba(255, 255, 255, 0.65) 0px 0px 4px,
        rgba(255, 255, 255, 0.62) 0px 2px 4px;
    }
    & button {
      border: none;
      border-radius: 1rem;
      padding: 5px 10px;
      background-color: #ce9187;
      color: rgb(230, 230, 230);
      cursor: pointer;
      margin-left: 10px;
      &:hover {
        // box-shadow: rgba(255, 255, 255, 0.25) 0px 14px 28px,
        //   rgba(255, 255, 255, 0.22) 0px 10px 10px;
      }
    }
  }
  & > #user-info {
    padding: 1rem;
    display: flex;
    align-items: center;
    & > img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 1rem;
    }
    & > p {
      margin: 0;
      padding: 0;
    }
  }
  & > #title {
    padding: 1rem;
    font-weight: bold;
    font-size: 2rem;
  }
  & > #description {
    padding: 1rem;
    font-size: 1rem;
  }
  & > #comment {
    margin-top: 1rem;
    padding: 1rem;
    flex-grow: 1;
    & h3 {
      font-size: 1.5rem;
      margin: 0;
      padding: 0;
    }
  }
  & > #comment-input-wrap {
    padding: 0.7rem;
    & > div {
      height: 48px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 1rem;
      border-radius: 25px;
      background-color: #f7f7f7;
      cursor: pointer;
      &:focus-within {
        background-color: white;
      }
    }
    & #comment-input {
      width: 100%;
      background-color: #f7f7f7;
      cursor: pointer;
      border: none;
      outline: none;
      padding: 5px;
      &:focus {
        border: none;
        outline: none;
        background-color: white;
      }
    }
  }
`;

const Snippet = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // 초기화
  const [snippet, setSnippet] = useState({});
  const [author, setAuthor] = useState({});
  const [user, setUser] = useState({});
  
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    if (localUser === null || localUser.isLogin === false) {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("account"));
    setUser(userData);
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8123/snippets/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setSnippet(data.body);
      })
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    if (snippet.author_id !== undefined) {
      fetch(`http://localhost:8123/authors/${snippet.author_id}`)
        .then((res) => res.json())
        .then((data) => {
          setAuthor(data.body);
          fetchLikeBtn();
        })
        .catch((error) => console.error(error));
    }
  }, [snippet]);
  // console.log(snippet);

  // 삭제
  const deleteHandler = () => {
    fetch(`http://localhost:8123/snippets/delete/${snippet.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("삭제 완료");
          navigate("/snippets");
        } else {
          console.log("삭제 실패");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 저장
  const [likeBtn, setLikeBtn] = useState();

  // 좋아요 현황 확인
  const fetchLikeBtn = () => {
    fetch(`http://localhost:8123/authors/likes/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.body);
        if (data.body === null || !data.body.includes(snippet.id)) {
          setLikeBtn(false);
        } else if (data.body.includes(snippet.id) || data.body !== null) {
          setLikeBtn(true);
        }
      })
      .catch((error) => console.error(error));
  };

  const fetchAuthorLikes = () => {
    fetch("http://localhost:8123/authors/likes", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        snippet_id: snippet.id,
        author_id: user.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("성공");
          fetchLikeBtn();
        } else if (!res.ok) {
          console.log("실패");
        }
      })
      .catch((error) => console.error(error));
  };
  return (
    <Container>
      <CodeWrap>
        <Code>
          <SyntaxHighlighter
            language="javascript"
            style={tomorrow}
            customStyle={{
              backgroundColor: "#333333",
              flex: "1",
            }}
          >
            {snippet.code}
          </SyntaxHighlighter>
        </Code>
      </CodeWrap>
      <InfoWrap>
        <Info>
          <div id="icon">
            <div>
              {/* <span className="i-1">🤍</span> */}
              {/* <span className="i-1">❤️</span> */}
            </div>
            <div>
              <span>
                {user.id === snippet.author_id ? (
                  <button onClick={deleteHandler}>삭제</button>
                ) : null}
                <button
                  onClick={() => {
                    fetchAuthorLikes();
                  }}
                >
                  {!likeBtn ? "저장" : "저장됨"}
                </button>
              </span>
            </div>
          </div>
          <div id="user-info">
            <img
              src={
                author.img
                  ? `http://localhost:8123/authors/profile/${author.img}`
                  : "/user.png"
              }
            ></img>
            <p>{author.name}</p>
          </div>
          <div id="title">{snippet.title}</div>
          <div id="description">{snippet.description}</div>
          <div id="comment">
            <div>
              <h3>comment</h3>
            </div>
            <div>
              <p>아직 댓들이 없습니다. 댓글을 추가해 주세요.</p>
            </div>
          </div>
          <div id="comment-input-wrap">
            <div>
              <input
                type="text"
                id="comment-input"
                placeholder="댓글을 입력하세요."
              ></input>
            </div>
          </div>
        </Info>
      </InfoWrap>
    </Container>
  );
};

export default Snippet;
