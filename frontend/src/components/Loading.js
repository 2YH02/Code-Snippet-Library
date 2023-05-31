import { useState, CSSProperties } from "react";
import { ClipLoader, RotateLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#9b635a",
};

const Loading = ({ loading }) => {
  return (
    <RotateLoader
      color="#ce9187"
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default Loading;
