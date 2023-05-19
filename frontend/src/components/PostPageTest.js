import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  // border: 1px solid red;
  position: relative;
  width: 80%;
  margin: 2rem auto;
  height: calc(100% - 4rem);
  display: flex;
  justify-content: space-around;
  border-radius: 9px;
  overflow: hidden;
  // box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
  //   rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;
const LoadingWrap = styled.div`
  // border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Code = styled.div`
  // border: 1px solid blue;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > textarea {
    // width: 80%;
    // height: 70%;
    outline: none;
    // border: 2px solid rgb(50, 50, 50);
    padding: 15px;
    box-sizing: border-box;
    border-radius: 4px;
    resize: none;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    color: rgb(240, 240, 240);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    &:focus-within {
      box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
    }
  }
`;
const Info = styled.div`
  // border: 1px solid green;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  // border: 1px solid yellow;
  position: relative;
  width: 80%;
  height: 70%;
  & > div {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid rgb(50, 50, 50);
  // margin-top: 7rem;
  padding: 10px;
  position: absolute;
  top: 15%;
  width: 100%;
  & > input {
    background-color: transparent;
    color: rgb(240, 240, 240);
    border: none;
    outline: none;
    width: 100%;
  }
`;
const Description = styled.div`
  background-color: white;
  padding: 10px;
  height: 20%;
  // margin-top: 3rem;
  position: absolute;
  top: 40%;
  width: 100%;
  border: 1px solid rgb(50, 50, 50);
  background-color: transparent;
  & > textarea {
    background-color: transparent;
    color: rgb(240, 240, 240);
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
  }
`;
const Tag = styled.ul`
  // border: 1px solid red;
  display: flex;
  // margin-top: 10px;
  position: absolute;
  top: 60%;
  width: 100%;
  padding: 10px 0;
`;
const TagList = styled.li`
  // border: 1px solid blue;
  padding: 0;
  list-style: none;
`;
const TagInput = styled.input`
  outline: none;
  background-color: transparent;
  border: none;
  // border: 1px solid rgb(50, 50, 50);
  padding: 3px;
  color: white;
  width: 100px;
`;
const ButtonWrap = styled.div`
  // margin-top: 5rem;
  // border: 1px solid red;
  position: absolute;
  bottom: 10%;
  width: 100%;
`;
const SubmitBtn = styled.button`
  color: inherit;
  padding: 0.5rem 1rem;
  background-color: black;
  border: 1px solid white;
  border-radius: 2px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    color: rgb(244, 244, 244);
    text-shadow: 1px 1px 8px #ffffff, -1px 1px 5px #ffffff;
  }
`;
const DeleteBtn = styled(SubmitBtn)``;

const PostPageTest = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({});

  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    description: "",
    language: "",
    tags: [""],
    author_id: null,
    rating: "",
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("account"));
    if (data === null || data.isLogin === false) {
      navigate("/login");
    } else {
      navigate("/post-test");
      setUser(data);
      setSnippet({
        ...snippet,
        author_id: data.id,
      });
    }
  }, []);

  // console.log(user.id);

  const [disabled, setDisabled] = useState(false);

  const saveTitle = (e) => {
    let copy = { ...snippet };
    copy.title = e.target.value;
    setSnippet(copy);
  };

  const saveCody = (e) => {
    let copy = { ...snippet };
    copy.code = e.target.value;
    setSnippet(copy);
  };

  const saveDescription = (e) => {
    let copy = { ...snippet };
    copy.description = e.target.value;
    setSnippet(copy);
  };

  const addTag = async (e, i) => {
    if (e.keyCode === 13) {
      let copy = { ...snippet };
      // copy.tags[i] = e.target.value;
      copy.tags.push("");
      await setSnippet(copy);
      document.getElementById(`tag-${i + 1}`).focus();
    }
  };

  const addTagData = (e, i) => {
    let copy = { ...snippet };
    copy.tags[i] = e.target.value;
    setSnippet(copy);
  };

  const postCode = () => {
    setLoading(true);
    fetch("http://localhost:8123/snippets/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(snippet),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        navigate("/snippets");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container>
      {loading ? (
        <LoadingWrap>
          <Loading loading={loading} />
        </LoadingWrap>
      ) : null}
      <Code>
        <textarea
          wrap="hard"
          rows="20"
          cols="45"
          onChange={saveCody}
          placeholder="코드를 입력하세요."
        ></textarea>
      </Code>
      <Info>
        <Wrap>
          <Title>
            <input type="text" onChange={saveTitle} placeholder="제목"></input>
          </Title>

          <Description>
            <textarea onChange={saveDescription} placeholder="설명"></textarea>
          </Description>

          <Tag>
            {snippet.tags.map((v, i) => {
              return (
                <TagList key={i}>
                  <span>#</span>
                  <TagInput
                    type="text"
                    id={"tag-" + i}
                    onChange={(e) => {
                      addTagData(e, i);
                    }}
                    onKeyDown={(e) => {
                      addTag(e, i);
                    }}
                    disabled={disabled}
                    placeholder="태그 입력"
                  />
                </TagList>
              );
            })}
          </Tag>

          <ButtonWrap>
            <SubmitBtn
              onClick={() => {
                postCode();
              }}
            >
              저장
            </SubmitBtn>
            <DeleteBtn
              onClick={() => {
                console.log(snippet);
              }}
            >
              취소
            </DeleteBtn>
          </ButtonWrap>
        </Wrap>
      </Info>
    </Container>
  );
};

export default PostPageTest;
