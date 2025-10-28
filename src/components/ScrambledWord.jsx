import { useEffect, useState } from "react";

const ScrambledWord = ({ word, isRunning }) => {
  const [scrambledWord, setScrambledWord] = useState("");

  const scrambleWord = (word) => {
    const letters = word.split("");
    for (let i = word.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[randomIndex]] = [letters[randomIndex], letters[i]];
    }
    return letters.join("");
  };

  useEffect(() => {
    if (word && isRunning) {
      setScrambledWord(scrambleWord(word));
    }
  }, [word, isRunning]);

  return (
    <div className="bg-orange-400 p-6 text-white font-bold text-center text-2xl mt-7 rounded-lg shadow-md border-2 border-orange-300 overflow-hidden">
      {word && isRunning ? (
        <div>
          <div className="text-xs font-normal opacity-50">UNSCRAMBLE THIS:</div>
          <div className="tracking-wider text-5xl">{scrambledWord}</div>
        </div>
      ) : (
        <div className="opacity-90">PRESS START TO PLAY</div>
      )}
    </div>
  );
};

export default ScrambledWord;
