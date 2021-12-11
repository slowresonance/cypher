const Button = ({ text, id, onClick }) => {
  return (
    <div className="button" id={id} onClick={onClick}>
      {text}
    </div>
  );
};

export default Button;
