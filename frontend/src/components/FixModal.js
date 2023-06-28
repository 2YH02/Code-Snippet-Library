import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toggleModeData } from "../features/modeSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  // border: 1px solid red;
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: ${(props) => (!props.mode ? "white" : "#5c5c5c")};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  height: 15rem;
  width: 23rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Exit = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
`;
const BtnWrap = styled.div`
  // border: 1px solid;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 25px;
  cursor: pointer;
  height: 40px;
  width: 70px;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  user-select: none;
  background-color: ${(props) => (!props.mode ? "#f7f7f7" : "#333333")};
`;

const FixModal = ({ setFixModal }) => {
  const dispatch = useDispatch();
  const modeInfo = useSelector((state) => state.mode);
  return (
    <Container mode={modeInfo.mode ? "true" : undefined}>
      <Exit>
        <FontAwesomeIcon
          icon={faXmark}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFixModal(false);
          }}
        />
      </Exit>
      <BtnWrap
        onClick={() => {
          dispatch(toggleModeData());
        }}
        mode={modeInfo.mode ? "true" : undefined}
      >
        {!modeInfo.mode ? "🌞" : "🌚"}
      </BtnWrap>
    </Container>
  );
};

export default FixModal;
