import { useEffect, useState } from "react";

const ScrambledWord = ({ word }) => {
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
    setScrambledWord(scrambleWord(word));
  }, [word]);

  return (
    <div className="bg-orange-400 p-4 text-white font-bold text-center text-2xl mt-7 rounded-md">
      {scrambledWord || "PRESS TO START"}
    </div>
  );
};

export default ScrambledWord;
