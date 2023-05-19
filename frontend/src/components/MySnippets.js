import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { NotFound } from "./NotFound";
import styled from "styled-components";

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
const Container = styled.div`
  // border: 1px solid red;
  overflow: auto;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 2px solid #555555;
  }
`;
const Card = styled.div`
  border: 1px solid rgb(225, 225, 225);
  cursor: pointer;
  border-radius: 4px;
  overflow: auto;
  padding: 1rem;
  width: 13rem;
  height: 15rem;
  word-wrap: break-word;
  display: flex;
  flex-direction: column;
  & * {
    margin: 0;
    padding: 0;
  }
  & > .title {
    margin-bottom: 10px;
  }
  & > .description {
    flex-grow: 1;
  }
  & > div {
    display: flex;
    justify-content: space-between;
  }
  & > div > .language {
    display: flex;
    align-items: center;
    font-size: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 6px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000;
    border: 1px solid #555555;
  }
  &:hover {
    box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
  }
`;
const MySnippets = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("account"));
    if (localUser === null || localUser.isLogin === false) {
      navigate("/login");
    } else {
      if (localUser.id !== Number(id)) {
        navigate("/");
      } else {
        setUser(localUser);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8123/snippets/author/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSnippets(data.body);
      })
      .catch((error) => console.error(error));
  }, []);

  //   console.log(snippets);
  return (
    <>
      {snippets.length > 0 ? (
        <Container>
          {snippets.map((v, i) => {
            return (
              <Card
                key={i}
                onClick={() => {
                  navigate(`/snippets/${v.id}`);
                }}
              >
                <h3 className="title">{v.title}</h3>
                <p className="description">{v.description}</p>
                <div>
                  <p className="name">{v.name}</p>
                  <p className="language">{v.language}</p>
                </div>
              </Card>
            );
          })}
        </Container>
      ) : (
        <LoadingWrap>
          <Loading />
        </LoadingWrap>
      )}
    </>
  );
};

export default MySnippets;
