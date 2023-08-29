import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page = styled.div`
  // background-color: rgba(0, 0, 0, 0.5);
  width: 800px;
  padding: 0 20px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid #e8e5df;
  text-align: center;
  padding: 10px;
  font-size: 25px;
`;
const Content = styled.div`
  // border: 1px solid red;
  flex: 0.9;
`;
const ContentTitle = styled.div`
  border-bottom: 1px solid #e8e5df;
  display: grid;
  grid-template-columns: 1fr 4fr;
  padding: 15px;
`;
const ContentTitleBox = styled.div`
  text-align: center;
  padding: 5px;
`;
const InputWrap = styled.div`
  display: flex;
  border-radius: 4px;
  padding: 5px;
  background-color: white;
  &:focus-within {
    border: 1px solid #8e20f3;
  }
`;
const TitleInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  font-size: 14px;
  font-wight: 400;
`;
const ContentBody = styled.div`
  // border: 1px solid blue;
  height: calc(100% - 64px);
  padding: 10px;
  text-align: center;
`;
const TextArea = styled.textarea`
  // width: 100%;
  // height: 380px;
  outline: none;
  border: none;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 4px;
  resize: none;
  &:focus-within {
    border: 1px solid #8e20f3;
  }
`;
const ButtonWrap = styled.div`
  // border: 1px solid red;
  text-align: center;
`;
const SubmitBtn = styled.button`
  color: inherit;
  padding: 10px 30px;
  background-color: black;
  border: 1px solid white;
  border-radius: 2px;
  margin: 5px 10px 20px 10px;
  &:hover {
    color: rgb(244, 244, 244);
    text-shadow: 1px 1px 8px #ffffff, -1px 1px 5px #ffffff;
  }
`;
const CancelBtn = styled(SubmitBtn)``;

const Tag = styled.ul`
  // border: 1px solid red;
  display: flex;
  margin: 0;
  padding: 0;
`;
const TagList = styled.li`
  padding: 0;
  list-style: none;
  & > span {
    margin-right: 5px;
  }
`;
const TagInput = styled.input`
  outline: none;
  border: none;
  border-radius: 3px;
  padding: 3px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  background-color: rgb(40, 40, 40);
  color: white;
  width: 100px;
`;

function UpdatePost(props) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    code: "",
    language: "",
    tags: [""],
    author_id: 0,
    rating: "",
  });

  const [disabled, setDisabled] = useState(false);

  const saveTitle = (e) => {
    let copy = { ...data };
    copy.title = e.target.value;
    setData(copy);
  };

  const saveBody = (e) => {
    let copy = { ...data };
    copy.code = e.target.value;
    setData(copy);
  };

  const addTag = async (e, i) => {
    if (e.keyCode === 13) {
      let copy = { ...data };
      // copy.tags[i] = e.target.value;
      copy.tags.push("");
      await setData(copy);
      document.getElementById(`tag-${i + 1}`).focus();
    }
  };

  const addTagData = (e, i) => {
    let copy = { ...data };
    copy.tags[i] = e.target.value;
    setData(copy);
  };

  // const submitData = () => {
  //   fetch(`http://localhost:8123/snippets/update/${props.snippet.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => {
  //       // navigate(`/snippets/${user.author_id}`);
  //       // window.location.reload();
  //       console.log("성공");
  //     })
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error(error));
  // };

  return (
    <Page>
      <Title>글쓰기</Title>
      <Content>
        <ContentTitle>
          <ContentTitleBox>제목</ContentTitleBox>
          <InputWrap>
            <TitleInput
              type="text"
              className="titleInput"
              onChange={saveTitle}
              defaultValue={props.snippet.title}
            />
          </InputWrap>
        </ContentTitle>
        <ContentBody>
          <TextArea
            type="text"
            cols="95"
            rows="20"
            wrap="hard"
            onChange={saveBody}
            defaultValue={props.snippet.code}
          />
        </ContentBody>
      </Content>
      <Tag>
        {data.tags.map((v, i) => {
          return (
            <TagList key={i}>
              <span>#</span>
              <TagInput
                type="text"
                defaultValue={props.snippet.tags ? props.snippet.tags[i] : null}
                id={"tag-" + i}
                onChange={(e) => {
                  addTagData(e, i);
                }}
                onKeyDown={(e) => {
                  addTag(e, i);
                }}
                disabled={disabled}
              />
            </TagList>
          );
        })}
      </Tag>
      <ButtonWrap>
        <SubmitBtn
          onClick={() => {
            console.log(data);
            // submitData();
          }}
        >
          제출
        </SubmitBtn>
        <CancelBtn
          onClick={() => {
            console.log(data);
            // console.log(props.snippet);
          }}
        >
          취소
        </CancelBtn>
      </ButtonWrap>
    </Page>
  );
}

export default UpdatePost;
