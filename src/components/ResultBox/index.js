import Style from "./ResultBox.module.scss";
import React, { useEffect, useRef } from "react";
import * as Babel from "@babel/standalone";

const DynamicTranspiler = ({ code }) => {
  const transpiledCodeRef = useRef(null);

  useEffect(() => {
    const transpileCode = async () => {
      try {
        const transpiledCode = Babel.transform(code, {
          presets: ["react"],
        }).code;

        transpiledCodeRef.current = transpiledCode;
      } catch (error) {
        console.error("Error transpiling code:", error);
      }
    };

    transpileCode();
  }, [code]);

  if (transpiledCodeRef.current) {
    const TranspiledComponent = eval(transpiledCodeRef.current);
    return <TranspiledComponent />;
  }

  return null;
};

const ResultBox = ({ code, renderComponent }) => {
  return (
    <div className={Style.resultWrapper}>
      {/* <DynamicTranspiler code={code} /> */}
      {renderComponent()}
    </div>
  );
};

export default ResultBox;
