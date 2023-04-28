import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Li = styled.div`
  background-color: #FF6600;
  border-radius: 4px;
  width: 50%;
  margin: 20px auto 0 auto;
  display: grid;
  grid-template-columns: 1fr 7fr;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
const H2 = styled.h2`
  border-bottom: 1px solid #ff983f;
  margin: 0;
`;
const P = styled.p`
  margin-bottm: 1rem;
  color: #FFFFFF;
  font-weight: bold;
`;
const A = styled.a`
  cursor: pointer;
  text-decoration: none;
  color: #FFFFFF;
  &:hover {
    color: #FFFFFF;
    // text-shadow: 0.5px 0.5px 2px #ffffff, -1px 0.5px 2.5px #ffffff;
  }
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ProfileBox = styled(Box)`
  border-right: 1px solid #ff983f;
  margin: 1rem 0 1rem 0;
`;
const TextBox = styled(Box)`
  margin: 0 1rem 0 1rem;
`;
const ProfileImg = styled.img`
  border: 1px solid black;
  border-radius: 50%;
  margin: 1rem auto 0 auto;
  width: 40%;
`;
const ProfileName = styled.p`
  text-align: center;
  color: #FFFFFF;
`;

function SnippetLists(props) {
  let navigate = useNavigate();

  return (
    <div>
      <Ul>
        {props.snippets.map((snippet) => {
          return (
            <Li key={snippet.id}>
              <ProfileBox>
                <ProfileImg src="https://picsum.photos/200" alt=""></ProfileImg>
                <ProfileName>이름</ProfileName>
              </ProfileBox>
              <TextBox>
                <H2>
                  <A
                    onClick={() => {
                      navigate(`/snippet/${snippet.id}`);
                    }}
                  >
                    {snippet.title}
                  </A>
                </H2>
                <P>{snippet.language}</P>
              </TextBox>
            </Li>
          );
        })}
      </Ul>
    </div>
  );
}

export { SnippetLists };
