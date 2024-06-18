import React, { useState } from "react";
import Modal from "react-modal";
import strings from "../../../../strings.json";
import "./Page1.css";
import PlayerName from "./PlayerName.js";
import backgroundMusic from "../../../../assets/music/blank.wav";
import useAutoPlayAudio from "../../../../hooks/useAutoPlayAudio";

const audioElementId = "Page1-audio";

Modal.setAppElement("#root");

const Page1 = ({ setActivePageIndex }) => {
  useAutoPlayAudio({ audioElementId });

  const [hasCreatedName, setHasCreatedName] = useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className="Page1-container">
      <header className="Page1-header"style={{ textAlign: 'left' }}>
        {strings["game.page1.guide_text"]}
      </header>
      <div className="Page1-button-container">
        <PlayerName
          hasCreatedName={hasCreatedName}
          setHasCreatedName={setHasCreatedName}
        />
        <button
          className="Page1-button"
          onClick={() => {
            if (!hasCreatedName) {
              setIsModalOpen(true);
              return;
            }

            setActivePageIndex(1);
          }}
        >
          进入游戏
        </button>
      </div>
      <audio autoPlay loop id={audioElementId}>
        <source src={backgroundMusic} type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <Modal
        className="App-modal"
        onRequestClose={() => setIsModalOpen(false)}
        isOpen={isModalOpen}
      >
        <button
          className="App-modal-close-button"
          onClick={() => setIsModalOpen(false)}
        >
          关闭
        </button>
        请先生成玩家
      </Modal>
    </div>
  );
};

export default Page1;
