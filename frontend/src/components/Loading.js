import { useState, CSSProperties } from "react";
import { ClipLoader, RotateLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#212121",
};

const Loading = ({ loading }) => {
  return (
    <RotateLoader
      color="#616161"
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default Loading;
