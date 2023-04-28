import styled from "styled-components";

const Page = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  //   border-radius: 8px;
  position: absolute;
  top: 100px;
  width: 900px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  margin-top: 60px;
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
  grid-template-columns: 1fr 3fr;
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
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 500px;
  outline: none;
  border: none;
  padding: 15px;
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

function PostPage() {
  return (
    <Page>
      <Title>글쓰기</Title>
      <Content>
        <ContentTitle>
          <ContentTitleBox>제목</ContentTitleBox>
          <InputWrap>
            <TitleInput type="text" className="titleInput" />
          </InputWrap>
        </ContentTitle>
        <ContentBody>
          <TextArea type="text" className="bodyInput" />
        </ContentBody>
      </Content>
      <ButtonWrap>
        <SubmitBtn>제출</SubmitBtn>
        <CancelBtn>취소</CancelBtn>
      </ButtonWrap>
    </Page>
  );
}

export default PostPage;
