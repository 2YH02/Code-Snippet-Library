import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  height: 80%;
  margin: auto;
`;
const Title = styled.div`
  text-align: center;
  margin: 1rem 0 2rem 0;
  padding: 1rem;
  border-bottom: 1px solid black;
`;
const Body = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 3px;
  width: 60%;
  margin: auto;
  padding: 1rem;
`;
const H1 = styled.h1`
  margin: 0;
`;
const P = styled.p`
  margin: 0;
`;

function Snippet() {
  let { id } = useParams();
  const [snippet, setSnippet] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/snippets")
      .then((res) => res.json())
      .then((data) => {
        let x = data.body.find((v) => {
          return v.id === Number(id);
        });
        setSnippet(x);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <Container>
      <Title>
        <H1>{snippet.title}</H1>
      </Title>
      <Body>
        <P>{snippet.code}</P>
      </Body>
    </Container>
  );
}

export default Snippet;
