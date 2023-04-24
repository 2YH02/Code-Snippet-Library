import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();
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
            <A href="#">로그인</A>
          </Li>
        </Ul>
      </Box>
    </Container>
  );
}

export default Navbar;
