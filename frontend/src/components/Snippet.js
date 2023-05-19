import { useParams } from "react-router-dom";
import data from "../data";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Container = styled.div`
  //   border: 1px solid red;
  width: 80%;
  margin: 2rem auto;
  height: calc(100% - 4rem);
  display: flex;
  justify-content: space-around;
  border-radius: 9px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
const CodeWrap = styled.div`
  //   border: 1px solid blue;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
const InfoWrap = styled.div`
  //   border: 1px solid green;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;
const Code = styled.div`
  //   border: 1px solid gold;
  background-color: black;
  padding: 3rem 1.5rem;
  width: 100%;
  height: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
`;
const Info = styled.div`
  // border: 1px solid gold;
  background-color: rgba(40, 40, 40, 0.5);
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
      padding: 5px;
    }
    & .i-1:hover {
      text-shadow: rgba(255, 255, 255, 0.65) 0px 0px 4px,
        rgba(255, 255, 255, 0.62) 0px 2px 4px;
    }
    & button {
      border: 1px solid white;
      border-radius: 1rem;
      padding: 5px 10px;
      background-color: transparent;
      color: rgb(230, 230, 230);
      cursor: pointer;
      &:hover {
        box-shadow: rgba(255, 255, 255, 0.25) 0px 14px 28px,
          rgba(255, 255, 255, 0.22) 0px 10px 10px;
      }
    }
  }
  & > #user-info {
    padding: 1rem;
    display: flex;
    align-items: center;
    & > img {
      width: 10%;
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
      background-color: rgb(200, 200, 200);
      cursor: pointer;
      &:focus-within {
        background-color: white;
      }
    }
    & #comment-input {
      width: 100%;
      background-color: rgb(200, 200, 200);
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
  const { id } = useParams();

  const [snippet, setSnippet] = useState({});
  const [author, setAuthor] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8123/snippets/${id}`)
      .then((res) => res.json())
      .then((data) => {
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
        })
        .catch((error) => console.error(error));
    }
  }, [snippet]);
  // console.log(snippet);

  return (
    <Container>
      <CodeWrap>
        <Code>{snippet.code}</Code>
      </CodeWrap>
      <InfoWrap>
        <Info>
          <div id="icon">
            <div>
              <span className="i-1">icon1</span>
              <span className="i-1">icon2</span>
            </div>
            <div>
              <span>
                <button>저장</button>
              </span>
            </div>
          </div>
          <div id="user-info">
            <img src="https://picsum.photos/200"></img>
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
