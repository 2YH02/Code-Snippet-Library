import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  // border: 1px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 0 20px;
`;
const Btn = styled.button`
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

const Home = () => {
  const navigate = useNavigate();
  return (
    <Main>
      <h1>홈화면임</h1>
      <Btn>클릭</Btn>
    </Main>
  );
};

export default Home;
