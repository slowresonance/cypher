import { useState } from "react";

const Option = ({ cardId, optId, content, index, onSelect, selected }) => {
  const [hovered, setHovered] = useState(false);

  const toggleHover = () => {
    setHovered(!hovered);
  };

  const handleClick = () => {
    onSelect(optId);
  };

  return (
    <div
      className={`option ${hovered ? "active" : ""}`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      id={selected === optId ? `clicked` : ``}
      onClick={handleClick}
    >
      <input type="radio" className="option-input " name={cardId} id={optId} />

      <label htmlFor={optId} className="option-label">
        <div className="label-button">{index}</div>
        <div className="label-text">{content}</div>
      </label>
    </div>
  );
};

export default Option;
