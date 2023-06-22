import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import MySnippets from "./MySnippets";
import LikeSnippets from "./LikeSnippets";
import Loading from "./Loading";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { useSelector, useDispatch } from "react-redux";
import { updateUserData } from "../features/userSlice";

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
    margin-right: 10px;
  }
  & > .img-box > img {
    // border: 1px solid red;
    width: 70px;
    height: 70px;
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

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }
    & > .user-email {
      display: flex;
      justify-content: center;
      align-items: center;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
  & > .info-box > .info-bottom {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-left: 5px;
    & > .cg-pf-btn {
      cursor: pointer;
      border-radius: 20px;
      border: 1px solid #5c5c5c;
      background-color: #white;
      color: #333333;
      margin-left: 15px;
    }
  }
`;
const Select = styled.div`
  // border: 1px solid blue;
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
const ProfileModal = styled.div`
  // border: 1px solid red;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;

const MyPage = (props) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo.isLogin === false) {
      navigate("/login");
    }
  }, []);

  // 프로필 변경
  const [promo, setPromo] = useState(false);

  // 코드목록 모달창 활성화
  const [saveActive, setSaveActive] = useState(true);
  const [likeActive, setLikeActive] = useState(false);

  return (
    <Main>
      <ProfileContainer>
        <div className="img-box">
          <img
            src={
              userInfo.photo
                ? `http://localhost:8123/authors/profile/${userInfo.photo}`
                : "user.png"
            }
          />
        </div>
        <div className="info-box">
          <div className="info-top">
            <p className="user-name">{userInfo.name}</p>
            <p className="user-email">{userInfo.email}</p>
          </div>
          <div className="info-bottom">
            <p className="follow">팔로워: 0</p>
            <button
              className="cg-pf-btn"
              onClick={() => {
                setPromo(true);
              }}
            >
              프로필 변경
            </button>
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
        <SaveContainer>
          <LikeSnippets></LikeSnippets>
        </SaveContainer>
      )}
      {promo ? (
        <ProfileModal>
          <Modal setPromo={setPromo} />
        </ProfileModal>
      ) : null}
    </Main>
  );
};

const Container = styled.div`
  // border: 1px solid blue;
  background-color: white;
  width: 560px;
  height: 250px;
  border-radius: 5px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & > div,
  form {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  & > .change-img {
    top: 25px;
    display: flex;
    justify-content: center;
    & > div {
      // border: 1px solid red;
      display: flex;
    }
    & > div > .img-hover {
      opacity: 0;
      cursor: pointer;
      position: absolute;
      border-radius: 50%;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      &:hover {
        opacity: 1;
      }
      & > span {
        color: white;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    & > div > img {
      width: 120px;
      height: 120px;
      // border: 3px solid;
      border-radius: 50%;
    }
  }
  & > .change-name {
    top: 170px;
    display: flex;
    & > .name {
      margin-right: 10px;
    }
    & > input {
      padding: 5px;
      outline: none;
      border: 1px solid #333333;
      border-radius: 3px;
    }
  }
  & > .btn-wrap {
    bottom: 10px;
    & > .btn {
      margin: 0 0.5rem;
    }
  }
`;
const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function Modal({ setPromo }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);

  const [updateUser, setUpdateUser] = useState({
    author_id: userInfo.id,
    img: userInfo.photo,
  });

  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const addName = (e) => {
    const copy = { ...updateUser };
    copy.name = e.target.value;
    setUpdateUser(copy);
  };

  const changeProfile = () => {
    setImgUrl(null);
    const fetchName = () => {
      fetch("http://localhost:8123/authors/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateUser),
      })
        .then((res) => {
          setLoading(false);
          if (res.ok) {
            dispatch(
              updateUserData({
                id: userInfo.id,
                name: updateUser.name,
                email: userInfo.email,
                photo: updateUser.img,
                isLogin: true,
              })
            );
            setPromo(false);
          } else {
            console.error("PUT 요청이 실패했습니다.");
          }
        })
        .catch((error) => {
          console.error("PUT 요청 중 오류가 발생했습니다:", error);
        });
    };
    const fetchImg = () => {
      const formData = new FormData();
      formData.append("image", file);

      fetch(`http://localhost:8123/authors/profile/`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          fetch(`http://localhost:8123/authors/profile/`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              author_id: userInfo.id,
              img: data.filename,
            }),
          })
            .then((res) => {
              setLoading(false);
              if (res.ok) {
                // console.log("성공");
                dispatch(
                  updateUserData({
                    id: userInfo.id,
                    name: updateUser.name,
                    email: userInfo.email,
                    photo: data.filename,
                    isLogin: true,
                  })
                );
                setPromo(false);
              } else {
                console.error("PUT 요청이 실패했습니다.");
              }
            })
            .catch((error) => {
              console.error("PUT 요청 중 오류가 발생했습니다:", error);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    if (updateUser.name && file) {
      setLoading(true);
      fetchName();
      fetchImg();
    } else if (updateUser.name && !file) {
      setLoading(true);
      fetchName();
    } else if (!updateUser.name && file) {
      setLoading(true);
      fetchImg();
    } else if (!updateUser.name && !file) {
      setPromo(false);
    }
  };

  // 이미지 변경
  const imgInputRef = useRef(null);
  const clickImg = () => {
    imgInputRef.current.click();
  };
  const changeImg = (e) => {
    // setLoading(true);
    setFile(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImgUrl(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  // console.log(user.photo);
  return (
    <Container>
      {loading ? (
        <LoadingWrap>
          <Loading />
        </LoadingWrap>
      ) : (
        <>
          <form className="change-img" encType="multipart/form-data">
            <div className="img-wrap">
              <img
                src={
                  imgUrl
                    ? imgUrl
                    : userInfo.photo
                    ? `http://localhost:8123/authors/profile/${userInfo.photo}`
                    : "/user.png"
                }
                // onClick={clickImg}
                style={{ cursor: "pointer" }}
              />
              <div className="img-hover" onClick={clickImg}>
                <span>변경</span>
              </div>
            </div>
            <input
              ref={imgInputRef}
              type="file"
              accept="image/*"
              name="image"
              style={{ display: "none" }}
              onChange={changeImg}
            />
          </form>
          <div className="change-name">
            <div className="name">이름</div>
            <input
              className="name-input"
              type="text"
              name="img"
              defaultValue={userInfo.name}
              onChange={addName}
            />
          </div>
          <div className="btn-wrap">
            <button className="submit-btn btn" onClick={changeProfile}>
              제출
            </button>
            <button
              className="cancel-btn btn"
              onClick={() => {
                console.log(userInfo);
                setPromo(false);
              }}
            >
              취소
            </button>
          </div>
        </>
      )}
    </Container>
  );
}

export default MyPage;
