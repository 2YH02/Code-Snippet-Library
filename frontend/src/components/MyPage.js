import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Main = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  // border: 1px solid blue;
  cursor: pointer;
  width: 50%;
  margin: auto;
  & h1,
  p {
    padding: 0;
    margin: 0;
    text-align: center;
  }
`;
const MyPage = (props) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    setUser(localUser);
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    if (localUser === null || localUser.isLogin === false) {
      navigate("/login");
    } else {
      setUser(localUser);
    }
  }, []);

  // console.log(user);

  return (
    <Main>
      <Container>
        <h1>마이페이지</h1>
        <p>
          <a
            onClick={() => {
              navigate(`${user.id}/snippets`);
            }}
          >
            나의 코드
          </a>
        </p>
      </Container>
    </Main>
  );
};

export default MyPage;
