import { useEffect } from "react";

const useAutoPlayAudio = ({ audioElementId }) => {
  useEffect(() => {
    const audio = document.getElementById(audioElementId);
    const playAudio = () => {
      audio
        .play()
        .then(() => {
          document.removeEventListener("click", playAudio);
        })
        .catch((error) => {
          console.error("Autoplay prevented:", error);
        });
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, [audioElementId]);
};

export default useAutoPlayAudio;
