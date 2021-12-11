import Option from "./Option";

const Card = ({ cardId, content, options, onSelect, selected }) => {
  return (
    <div className="card-container">
      <div className="card-head" id={cardId}>
        {content}
      </div>

      <div className="card-body">
        <Option
          cardId={cardId}
          optId={options[0].optId}
          content={options[0].content}
          onSelect={onSelect}
          selected={selected}
          index={"A"}
        />
        <Option
          cardId={cardId}
          optId={options[1].optId}
          content={options[1].content}
          onSelect={onSelect}
          selected={selected}
          index={"B"}
        />
      </div>
    </div>
  );
};

export default Card;
