import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./../store";
import { googleLogout } from "@react-oauth/google";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  color: rgb(230, 230, 230);
  // min-width: 70rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
`;
const H1 = styled.h1`
  margin: 0;
  margin-left: 4rem;
  font-size: 1.7rem;
`;
const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  &:hover {
    color: rgb(244, 244, 244);
    text-shadow: 1px 1px 8px #ffffff, -1px 1px 5px #ffffff;
  }
`;
const Ul = styled.ul`
  margin: 0;
  padding: 0;
  margin-right: 4rem;
  display: flex;
`;
const Li = styled.li`
  margin: 1.5rem;
  padding: 0;
  list-style: none;
  font-size: 1.3rem;
`;
const Input = styled.input`
  width: 15rem;
  font: inherit;
`;
const Box = styled.div`
  display: flex;
  align-items: center;
`;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let user = useSelector((state) => {
    return state.user;
  });

  const fetchData = () => {
    fetch("http://localhost:3000/authors/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  const loginToggle = () => {
    if (user.isLogin) {
      fetchData();
      googleLogout();
      dispatch(
        setUser({
          name: "",
          email: "",
          isLogin: false,
        })
      );
    } else {
      navigate("/login");
    }
  };

  return (
    <Container>
      <H1>
        <A
          onClick={() => {
            navigate("/");
          }}
        >
          CoDe SNIpET
        </A>
      </H1>

      <Box>
        <div>
          <Input type="text"></Input>
        </div>
        <Ul>
          <Li>
            <A onClick={loginToggle}>{!user.isLogin ? "로그인" : "로그아웃"}</A>
          </Li>
        </Ul>
      </Box>
    </Container>
  );
}

export default Navbar;
