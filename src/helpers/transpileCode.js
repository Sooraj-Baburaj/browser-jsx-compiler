import * as babel from "@babel/standalone";

function transpileCode(code) {
  const transpiledCode = babel.transform(code, {
    presets: ["react"],
    plugins: [],
    configFile: false,
  }).code;

  return transpiledCode;
}

export default transpileCode;
