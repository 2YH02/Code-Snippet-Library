import { useState, CSSProperties } from "react";
import { ClipLoader, RotateLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#E50915",
};

const Loading = ({ loading }) => {
  return (
    <RotateLoader
      color="#EEE"
      loading={loading}
      cssOverride={override}
      size={10}
    />
  );
};

export default Loading;
