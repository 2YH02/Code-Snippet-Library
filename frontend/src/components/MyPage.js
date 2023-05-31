import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import MySnippets from "./MySnippets";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

const Main = styled.div`
  // border: 2px solid red;
  width: 100%;
  height: 100%;
  overflow: auto;
`;
const ProfileContainer = styled.div`
  & h1,
  p {
    padding: 0;
    margin: 0;
    text-align: center;
  }
  // border: 1px solid blue;
  width: 50%;
  margin: 80px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  & > .img-box {
    display: flex;
    margin-right: 20px;
  }
  & > .img-box > img {
    // border: 1px solid red;
    width: 100px;
    border-radius: 50%;
    overflow: hidden;
  }
  & > .info-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  & > .info-box > .info-top {
    display: flex;
    & > .user-name {
      margin-right: 10px;
      font-size: 2rem;
      font-weight: bold;
    }
    & > .user-email {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  & > .info-box > .info-bottom {
    width: 100%;
    display: flex;
    justify-content: center;
    // margin-left: 5px;
    & > .cg-pf-btn {
      cursor: pointer;
      border-radius: 20px;
      border: none;
      background-color: #ce9187;
      color: #333333;
    }
  }
`;
const Select = styled.div`
  // border: 1px solid blue;
  // width: 200px;
  // margin: auto;
  & > ul {
    display: flex;
    justify-content: center;
  }
  & > ul > li {
    // border: 1px solid red;
    cursor: pointer;
    padding: 5px 10px;
    margin: 0 5px;
    &:hover {
      border-bottom: 2px solid;
    }
    &.isActive {
      border-bottom: 2px solid;
    }
  }
`;
const SaveContainer = styled.div`
  // border: 1px solid blue;
`;
const LikeContainer = styled.div`
  // border: 1px solid blue;
`;

const MyPage = (props) => {
  const navigate = useNavigate();

  // 유저 저장, 인가 확인
  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    if (localUser === null || localUser.isLogin === false) {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, []);
  // console.log(user);

  // 프로필 변경
  const [profileModal, setProfileModal] = useState(false);

  // 코드목록 모달창 활성화
  const [saveActive, setSaveActive] = useState(true);
  const [likeActive, setLikeActive] = useState(false);

  return (
    <Main>
      <ProfileContainer>
        <div className="img-box">
          <img src={`${user.photo}`} />
        </div>
        <div className="info-box">
          <div className="info-top">
            <p className="user-name">{user.name}</p>
            <p className="user-email">{user.email}</p>
          </div>
          <div className="info-bottom">
            <p className="follow">팔로워: 0</p>
            {/* <button
              className="cg-pf-btn"
              onClick={() => {
                console.log(user);
              }}
            >
              프로필 변경
            </button> */}
          </div>
        </div>
      </ProfileContainer>
      <Select>
        <ul>
          <li
            onClick={() => {
              setSaveActive(true);
              setLikeActive(false);
            }}
            className={saveActive ? "isActive" : null}
          >
            나의 코드
          </li>
          <li
            onClick={() => {
              setSaveActive(false);
              setLikeActive(true);
            }}
            className={likeActive ? "isActive" : null}
          >
            좋아요한 코드
          </li>
        </ul>
      </Select>
      {saveActive ? (
        <SaveContainer>
          <MySnippets></MySnippets>
        </SaveContainer>
      ) : (
        <LikeContainer>좋아요한 코드 목록</LikeContainer>
      )}
    </Main>
  );
};

export default MyPage;
