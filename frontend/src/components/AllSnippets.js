import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const Body = styled.div`
  // border: 1px solid red;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 3fr;
`;
const CardContainer = styled.div`
  // border: 1px solid blue;
  background-color: rgb(20, 20, 20);
  border-radius: 10px;
  max-height: 400px;
  padding: 20px 10px 10px 10px;
  overflow: auto;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #black;
  }

  &::-webkit-scrollbar {
    width: 7px;
    background-color: #black;
  }

  &::-webkit-scrollbar-thumb {
    background-color: black;
    border-radius: 2px;
    // border: 2px solid #555555;
  }
  // &::-webkit-scrollbar {
  //   display: none;
  // }
`;
const CardContent = styled.div`
  // border: 1px solid green;
  width: 90%;
  & > h1 {
    text-align: center;
    padding: 0 0 20px 0;
    margin: 0;
    border-bottom: 1px solid white;
  }
  & p {
    background-color: black;
    border-radius: 5px;
    padding: 30px;
    width: 80%;
    margin: 25px auto 0 auto;
    min-height: 350px;
    white-space: pre-wrap;
  }
  &.start {
    opacity: 0;
  }
  &.end {
    opacity: 1;
    transition: opacity 1s;
  }
`;
const Card = styled.div`
  background-color: rgba(100, 100, 100, 0.7);
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 20px;
  width: 200px;
  &.active {
    background-color: rgb(228, 122, 122);
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  & h1 {
    font-size: 20px;
    text-align: center;
    margin: 0;
    padding: 15px 0;
  }
  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

const AllSnippets = (props) => {
  const data = [
    { title: "title", language: "language", name: "name" },
    { title: "title2", language: "language2", name: "name2" },
  ];
  const [active, setActive] = useState([]);
  const [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [data]);

  const snippetAction = (i) => {
    let copy = [...active];
    copy[i] = true;
    copy.forEach((v, k) => {
      if (i !== k && v === true) {
        copy[k] = false;
      }
    });
    setActive(copy);
  };

  return (
    <Body>
      <CardContainer>
        {data.map((v, i) => {
          return (
            <Card
              key={i}
              onClick={() => {
                snippetAction(i);
              }}
              className={active[i] ? "active" : ""}
            >
              <h1>{v.title}</h1>
              <div>
                <p>{v.language}</p>
                <p>{v.name}</p>
              </div>
            </Card>
          );
        })}
      </CardContainer>
      <CardContent className={"start " + fade}>
        <h1>코드 타이틀</h1>
        <div>
          <p>코드 내용</p>
        </div>
      </CardContent>
    </Body>
  );
};

export default AllSnippets;
