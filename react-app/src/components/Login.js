import styled from "styled-components";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "./../store";

const Page = styled.div`
  border-radius: 8px;
  position: absolute;
  top: 200px;
  bottom: 100px;
  height: 700px;
  width: 500px;
  padding: 0 20px;
  left: 50%;
  transform: translate(-50%, 0);

  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
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
  width: 100%;
  height: 48px;
  border: 1px solid white;
  font-weight: 700;
  background-color: black;
  border-radius: 64px;
  color: white;
  margin-bottom: 16px;
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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  // const User = {
  //   name: name,
  //   email: email,
  // };

  const getLogin = (details) => {
    fetch("http://localhost:3000/authors/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: details.name, email: details.email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  // const confirmButton = () => {
  //   if (email === User.email && pw === User.pw) {
  //     alert("로그인에 성공했습니다.");
  //   } else {
  //     alert("등록되지 않은 회원입니다.");
  //   }
  // };

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
    <Page>
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
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const details = jwt_decode(credentialResponse.credential);
              // console.log(details);
              setEmail(details.email);
              setName(details.name);
              // console.log(User);
              getLogin(details);
              dispatch(
                setUser({
                  name: details.name,
                  email: details.email,
                  isLogin: true,
                })
              );
              navigate("/");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            theme="filled_black"
          />
        </Box>
      </ButtonBox>
    </Page>
  );
}

export default Login;
