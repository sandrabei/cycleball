import React from "react";
import strings from "../../../../strings.json";

const PlayerName = ({ hasCreatedName, setHasCreatedName }) => {
  return (
    <div>
      {hasCreatedName ? (
        <div style={{ fontSize: "1.2em", width: "144px" }}>
          {strings["game.players.human.name"]}
        </div>
      ) : (
        <button
          className="Page1-button"
          onClick={() => {
            setHasCreatedName(true);
          }}
        >
          点击生成玩家
        </button>
      )}
    </div>
  );
};

export default PlayerName;
