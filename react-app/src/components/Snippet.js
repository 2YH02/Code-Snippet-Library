import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

function Snippet(props) {
  const navigate = useNavigate();
  let { id } = useParams();

  let snippet = props.snippets.find((v) => {
    return v.id === Number(id);
  });

  useEffect(() => {
    function handleKeyDown(e) {
      let snippetIndex = props.snippets.findIndex((v) => {
        return v.id === Number(id);
      });

      if (e.key === "ArrowRight") {
        let nextPage = props.snippets.find((v, i) => i === snippetIndex + 1);
        if (nextPage !== undefined) {
          navigate(`/snippet/${nextPage.id}`);
          window.location.reload();
        }
      }

      if (e.key === "ArrowLeft") {
        let prevPage = props.snippets.find((v, i) => i === snippetIndex - 1);
        if (prevPage !== undefined) {
          navigate(`/snippet/${prevPage.id}`);
          window.location.reload();
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <Container>
      <Title>
        <H1>{snippet ? snippet.title : null}</H1>
      </Title>
      <Body>
        <P>{snippet ? snippet.code : null}</P>
      </Body>
    </Container>
  );
}

export default Snippet;
