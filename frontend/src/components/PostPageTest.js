import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSolid,
  faFileArrowDown,
  faToolbox,
} from "@fortawesome/free-solid-svg-icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import codeprism from "../styles/codeprism";
import AceEditor from "react-ace";
import Loading from "./Loading";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-xml";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-sass";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-handlebars";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/ext-language_tools";

const Container = styled.div`
  // border: 1px solid red;
  position: relative;
  height: 100%;
  // display: flex;
  // justify-content: space-around;
  overflow: hidden;
  position: relative;
`;
const LoadingWrap = styled.div`
  // border: 1px solid red;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Code = styled.div`
  // border: 1px solid blue;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & .editor {
  }
  & > #codeWrap {
    // border: 1px solid blue;
    background-color: #fdf6e3;
    width: 100%;
    height: 100%;
    // padding: 10px;
    &:focus-within {
      box-shadow: rgba(255, 255, 255, 0.35) 0px 5px 15px;
    }
  }
`;
const Info = styled.div`
  // border: 1px solid green;
  z-index: 8;
  user-select: none;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  z-index: 5;
  top: 30px;
  right: 30px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    display: none;
    opacity: 0;
  }
  & > span {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  // 클릭 전 상태
  &.isActive {
    z-index: 10;
    // border: 1px solid green;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    z-index: 5;
    top: 30px;
    right: 30px;
    width: 400px;
    height: 560px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    & > span {
      top: 20px;
      right: 10px;
      left: auto;
    }
    & > div {
      display: flex;
      opacity: 1;
    }
  }
`;
const Fix = styled(Info)`
  z-index: 3;
  top: 80px;
  right: 30px;
  &.isActive {
    top: 80px;
    right: 30px;
    width: 400px;
    height: 560px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    & > span {
      top: 20px;
      right: 10px;
      left: auto;
    }
    & > div {
      display: flex;
    }
  }
`;
const LangSelection = styled.div`
  position: absolute;
  top: 85px;
  border: 1px solid #333333;
  border-radius: 3px;
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding: 5px;
    margin: 0 5px;
    height: 100%;
    &:nth-of-type(2) {
      margin: 0;
      width: 30px;
    }
  }
`;
const ThemeSelection = styled(LangSelection)`
  top: 185px;
`;
const LangModal = styled.div`
  border: 1px solid #333333;
  border-radius: 3px;
  position: absolute;
  top: 115px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  overflow: auto;
  background-color: white;
  z-index: 1;
  & > ul {
    width: 100%;
  }
  & li {
    // border: 1px solid blue;
    width: 100%;
    padding: 3px;
    cursor: pointer;
    &:hover {
      background-color: #c4c4c4;
    }
  }
`;
const ThemeModal = styled(LangModal)`
  top: 215px;
`;
const Wrap = styled.div`
  // border: 1px solid yellow;
  position: relative;
  width: 80%;
  height: 70%;
  & > div {
    // border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Title = styled.div`
  background-color: transparent;
  border-bottom: 1px solid rgb(50, 50, 50);
  // margin-top: 7rem;
  padding: 10px;
  position: absolute;
  top: 15%;
  width: 100%;
  & > input {
    background-color: transparent;
    font-family: Noto Sans KR, sans-serif;
    color: #333333;
    border: none;
    outline: none;
    width: 100%;
  }
`;
const Description = styled.div`
  background-color: white;
  padding: 10px;
  height: 20%;
  // margin-top: 3rem;
  position: absolute;
  top: 40%;
  width: 100%;
  border: 1px solid rgb(50, 50, 50);
  background-color: transparent;
  & > textarea {
    background-color: transparent;
    font-family: Noto Sans KR, sans-serif;
    color: #333333;
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    resize: none;
  }
`;
const Tag = styled.ul`
  // border: 1px solid red;
  display: flex;
  // margin-top: 10px;
  position: absolute;
  top: 60%;
  width: 100%;
  padding: 10px 0;
`;
const TagList = styled.li`
  // border: 1px solid blue;
  padding: 0;
  list-style: none;
`;
const TagInput = styled.input`
  outline: none;
  font-family: Noto Sans KR, sans-serif;
  background-color: transparent;
  border: none;
  // border: 1px solid rgb(50, 50, 50);
  padding: 3px;
  color: #333333;
  width: 100px;
`;
const ButtonWrap = styled.div`
  // margin-top: 5rem;
  // border: 1px solid red;
  position: absolute;
  bottom: 10%;
  width: 100%;
`;
const SubmitBtn = styled.button`
  color: inherit;
  padding: 0.5rem 1rem;
  background-color: #ce9187;
  border: none;
  // border: 1px solid white;
  border-radius: 40px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    color: rgb(244, 244, 244);
    text-shadow: 1px 1px 8px #ffffff, -1px 1px 5px #ffffff;
  }
`;
const DeleteBtn = styled(SubmitBtn)``;

const PostPageTest = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);

  const [snippet, setSnippet] = useState({
    title: "",
    code: "",
    description: "",
    language: "",
    tags: [""],
    author_id: null,
    rating: "",
  });

  useEffect(() => {
    if (userInfo.isLogin === false) {
      navigate("/login");
    } else {
      setSnippet({
        ...snippet,
        author_id: userInfo.id,
      });
    }
  }, []);

  const [disabled, setDisabled] = useState(false);

  const saveTitle = (e) => {
    let copy = { ...snippet };
    copy.title = e.target.value;
    setSnippet(copy);
  };

  const saveCode = (e) => {
    let copy = { ...snippet };
    copy.code = e.target.value;
    setSnippet(copy);
  };

  const saveDescription = (e) => {
    let copy = { ...snippet };
    copy.description = e.target.value;
    setSnippet(copy);
  };

  const addTag = async (e, i) => {
    if (e.keyCode === 13) {
      let copy = { ...snippet };
      // copy.tags[i] = e.target.value;
      copy.tags.push("");
      await setSnippet(copy);
      document.getElementById(`tag-${i + 1}`).focus();
    }
  };

  const addTagData = (e, i) => {
    let copy = { ...snippet };
    copy.tags[i] = e.target.value;
    setSnippet(copy);
  };

  const postCode = () => {
    setLoading(true);
    fetch("http://localhost:8123/snippets/new", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(snippet),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        navigate("/snippets");
      })
      .catch((error) => console.error(error));
  };

  function onChange(newValue) {
    let copy = { ...snippet };
    copy.code = newValue;
    setSnippet(copy);
    // console.log(newValue);
  }

  // 클릭 이벤트
  const [submitModal, setSubmitModal] = useState(false);
  const submitModalClick = () => {
    if (!submitModal) {
      setSubmitModal(true);
    } else {
      setSubmitModal(false);
    }
  };

  const [fixModal, setFixModal] = useState(false);
  const fixModalClick = () => {
    if (!fixModal) {
      setFixModal(true);
    } else {
      setFixModal(false);
    }
  };

  const [lang, setLang] = useState("javascript");
  const [theme, setTheme] = useState("solarized_light");

  const langRef = useRef(null);
  const detectLang = (e) => {
    // console.log(e.target.innerHTML);
    // console.log(langRef.current.innerHTML);
    langRef.current.innerHTML = e.target.innerHTML;
    let str = e.target.innerHTML.toLowerCase();
    // console.log(str);
    setLang(str);
    setLangModal(false);
    const copy = { ...snippet };
    copy.language = e.target.innerHTML;
    setSnippet(copy);
  };

  const themeRef = useRef(null);
  const detectTheme = (e) => {
    // console.log(e.target.innerHTML);
    // console.log(themeRef.current.innerHTML);
    themeRef.current.innerHTML = e.target.innerHTML;
    setTheme(e.target.innerHTML);
  };

  const [langModal, setLangModal] = useState(false);
  const getLangModal = () => {
    setLangModal(!langModal);
  };
  const [themeModal, setThemeModal] = useState(false);
  const getThemeModal = () => {
    setThemeModal(!themeModal);
  };
  return (
    <Container>
      {loading ? (
        <LoadingWrap>
          <Loading loading={loading} />
        </LoadingWrap>
      ) : null}
      <Code>
        <div id="codeWrap">
          <AceEditor
            mode={`${lang}`}
            theme={theme}
            onChange={onChange}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            showGutter={true}
            highlightActiveLine={false}
            width="100%"
            height="100%"
            className="editor"
            fontSize={16}
            placeholder="코드를 작성해 주세요."
            setOptions={{
              enableBasicAutocompletion: false,
              enableLiveAutocompletion: false,
              enableSnippets: false,
              showLineNumbers: true,
              useWorker: false,
              tabSize: 2,
            }}
          />
        </div>
      </Code>
      <Info className={!submitModal ? "" : "isActive"}>
        <span onClick={submitModalClick}>
          <FontAwesomeIcon icon={faFileArrowDown} />
        </span>
        <Wrap className="none">
          <Title>
            <input type="text" onChange={saveTitle} placeholder="제목"></input>
          </Title>

          <Description>
            <textarea onChange={saveDescription} placeholder="설명"></textarea>
          </Description>

          <Tag>
            {snippet.tags.map((v, i) => {
              return (
                <TagList key={i}>
                  <span>#</span>
                  <TagInput
                    type="text"
                    id={"tag-" + i}
                    onChange={(e) => {
                      addTagData(e, i);
                    }}
                    onKeyDown={(e) => {
                      addTag(e, i);
                    }}
                    disabled={disabled}
                    placeholder="태그 입력"
                  />
                </TagList>
              );
            })}
          </Tag>

          <ButtonWrap className="none">
            <SubmitBtn
              onClick={() => {
                postCode();
              }}
            >
              저장
            </SubmitBtn>
            <DeleteBtn
              onClick={() => {
                console.log(snippet);
              }}
            >
              취소
            </DeleteBtn>
          </ButtonWrap>
        </Wrap>
      </Info>
      <Fix className={!fixModal ? "" : "isActive"}>
        <span onClick={fixModalClick}>
          <FontAwesomeIcon icon={faToolbox} />
        </span>
        <div style={{ position: "absolute", top: "50px" }}>언어 선택</div>
        <LangSelection>
          <span ref={langRef}>JavaScript</span>
          <span style={{ cursor: "pointer" }} onClick={getLangModal}>
            +
          </span>
        </LangSelection>
        {langModal ? (
          <LangModal>
            <ul>
              <li onClick={detectLang}>JavaScript</li>
              <li onClick={detectLang}>Java</li>
              <li onClick={detectLang}>Python</li>
              <li onClick={detectLang}>XML</li>
              <li onClick={detectLang}>Ruby</li>
              <li onClick={detectLang}>SASS</li>
              <li onClick={detectLang}>MySQL</li>
              <li onClick={detectLang}>JSON</li>
              <li onClick={detectLang}>HTML</li>
              <li onClick={detectLang}>Handlebars</li>
              <li onClick={detectLang}>GoLang</li>
              <li onClick={detectLang}>C#</li>
            </ul>
          </LangModal>
        ) : null}

        <div style={{ position: "absolute", top: "150px" }}>에디터 태마</div>
        <ThemeSelection>
          <span ref={themeRef}>solarized_light</span>
          <span style={{ cursor: "pointer" }} onClick={getThemeModal}>
            +
          </span>
        </ThemeSelection>
        {themeModal ? (
          <ThemeModal>
            <ul>
              <li onClick={detectTheme}>solarized_light</li>
              <li onClick={detectTheme}>solarized_dark</li>
              <li onClick={detectTheme}>monokai</li>
              <li onClick={detectTheme}>github</li>
              <li onClick={detectTheme}>tomorrow</li>
              <li onClick={detectTheme}>kuroir</li>
              <li onClick={detectTheme}>twilight</li>
              <li onClick={detectTheme}>xcode</li>
              <li onClick={detectTheme}>textmate</li>
              <li onClick={detectTheme}>terminal</li>
            </ul>
          </ThemeModal>
        ) : null}
      </Fix>
    </Container>
  );
};

export default PostPageTest;
