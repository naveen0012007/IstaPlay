import "./inputBox.css";

const InputBox = (props) => {
  const { errorMessage, handleClick, styless, placeholder, ...inputs } = props;

  return (
    <div className="inputBox">
      <input className="inputField" placeholder={placeholder} {...inputs} />
    </div>
  );
};

export default InputBox;
