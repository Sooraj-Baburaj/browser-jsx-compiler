import Style from "./TextBox.module.scss";

const TextBox = ({ handleChange, value }) => {
  return (
    <div className={Style.textareaWrapper}>
      <textarea value={value} onChange={handleChange} />
    </div>
  );
};

export default TextBox;
