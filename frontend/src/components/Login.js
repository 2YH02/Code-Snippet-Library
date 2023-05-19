import styled from "styled-components";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Loading from "./Loading";
import { useEffect, useState } from "react";

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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  // border: 1px solid red;
  width: 70%;
  text-align: center;
`;
const Title = styled.div`
  margin-top: 87px;
  font-size: 26px;
  font-weight: bold;
  color: white;
`;
const Content = styled.div`
  margin-top: 26px;
  flex: 0.5;
`;
const InputTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
`;
const InputWrap = styled.div`
  display: flex;
  width: 50%;
  border-radius: 4px;
  padding: 10px;
  margin: 8px auto 0 auto;
  background-color: white;
  border: 1px solid rgb(190, 190, 190);
  &:focus-within {
    border: 1px solid #8e20f3;
  }
`;
const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  height: 17px;
  font-size: 14px;
  font-wight: 400;
  &::placeholder {
    color: #dadada;
  }
`;
const ErrorMessage = styled.div`
  margin-top: 8px;
  color: #ef0000;
  font-size: 12px;
`;
const Button = styled.button`
  width: 50%;
  height: 48px;
  border: 1px solid white;
  font-weight: 700;
  background-color: black;
  border-radius: 64px;
  color: white;
  margin: 30px 0 10px 0;
  cursor: pointer;
  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;
const ButtonBox = styled.div`
  position: relative;
`;
const Box = styled.div`
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translate(-50%, 0);
`;
const GoogleBtn = styled.button`
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

const LoginPage = (props) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("account"));
    if (data === null || data.isLogin === false) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, []);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      fetch("http://localhost:8123/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          const details = jwt_decode(data.id_token);
          // console.log(details);
          // console.log(data);
          fetch("http://localhost:8123/authors/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: details.name,
              email: details.email,
              access_token: data.access_token,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              localStorage.setItem(
                "account",
                JSON.stringify({
                  id: data.id,
                  name: details.name,
                  email: details.email,
                  photo: details.picture,
                  isLogin: true,
                })
              );
              setIsLoading(true);
              navigate("/");
              window.location.reload();
            })
            .catch((error) => console.error(error));
        })
        .catch((error) => {
          console.error(error);
        });
    },
    flow: "auth-code",
  });

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  useEffect(() => {
    if (emailValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [emailValid, pwValid]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(e.target.value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handlePassword = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Main>
          <Container>
            <Title>로그인</Title>

            <Content>
              <InputTitle>이메일 주소</InputTitle>
              <InputWrap>
                <Input
                  className="input"
                  type="email"
                  placeholder="Enter email"
                  // value={email}
                  onChange={handleEmail}
                />
              </InputWrap>
              <ErrorMessage>
                {!emailValid && email.length > 0 && (
                  <div>올바른 이메일을 입력해주세요.</div>
                )}
              </ErrorMessage>

              <InputTitle style={{ marginTop: "26px" }}>비밀번호</InputTitle>
              <InputWrap>
                <Input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={pw}
                  onChange={handlePassword}
                />
              </InputWrap>
              <ErrorMessage>
                {!pwValid && pw.length > 0 && (
                  <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
                )}
              </ErrorMessage>
            </Content>

            <ButtonBox>
              <Button
                disabled={notAllow}
                //  onClick={confirmButton}
              >
                로그인
              </Button>
              <Box>
                <GoogleBtn onClick={() => googleLogin()}>
                  Sign in with Google 🚀{" "}
                </GoogleBtn>
              </Box>
            </ButtonBox>
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

export default LoginPage;
