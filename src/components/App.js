import React, { useCallback, useState } from "react";
import "../Assets/styles/common.scss";
import ResultBox from "./ResultBox";
import TextBox from "./TextBox";
import transpileCode from "../helpers/transpileCode";

function App() {
  const [compiledCode, setCompiledCode] = useState("<h1>Hello</h1>");
  const [code, setCode] = useState("");

  const renderComponent = useCallback(() => {
    try {
      const transpiledCode = transpileCode(compiledCode);
      const componentDefinition = eval(`
      var createElement = React.createElement;
      var React = (function() {
        var module = { exports: {} };
        var exports = module.exports;
        ${transpiledCode}
        return module.exports.default || module.exports;
      })();


      `);
      return React.createElement(componentDefinition);
    } catch (error) {
      console.error("Error rendering dynamic component:", error);
      return <h1>Error</h1>;
    }
  }, [compiledCode]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleSave = () => {
    setCompiledCode(code);
  };

  return (
    <div className="App">
      <header>
        <div className="title">
          <h2>Type your code to see the result</h2>
        </div>
        <div className="button-holder">
          <button onClick={handleSave}>Save</button>
        </div>
      </header>
      <div className="container">
        <TextBox handleChange={handleChange} value={code} />
        <ResultBox code={code} renderComponent={renderComponent} />
      </div>
    </div>
  );
}

export default App;
