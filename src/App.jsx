import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ScrambledWord from "./components/ScrambledWord";
import GuessResult from "./components/GuessResult";

const WORDS = [
  "Alpha",
  "Aura",
  "Huzz",
  "Beta",
  "Sigma",
  "Blud",
  "BabyGronk",
  "Bussin",
  "Cooked",
  "Cringe",
  "Delulu",
  "Doomscroll",
  "Fanum",
  "Gassy",
  "Goblin",
  "Goofy",
  "Grindset",
  "Gyat",
  "Huggy",
  "Six Seven",
  "Glaze",
  "Impostor",
  "Jelqing",
  "Jinkle",
  "Kevin",
  "Ligma",
  "Livvy",
  "Mewing",
  "Mogging",
  "Munch",
  "NPC",
  "Ohio",
  "Opp",
  "Poggers",
  "Pookie",
  "Ratio",
  "Rizz",
  "Sauce",
  "Sheesh",
  "Skibidi",
  "Slay",
  "Smurf",
  "Sussy",
  "Troll",
  "UwU",
  "Vibe",
  "Wack",
  "Wig",
  "Yass",
  "Yeet",
  "Zesty",
  "Rizzler",
  "Goon",
  "Edge",
  "Fanum tax",
  "Stan",
  "Suss",
  "Clout",
  "Drip",
  "Flex",
  "Roast",
  "Snack",
  "Bounce",
  "Ratioed",
  "Flexin",
  "Clappy",
  "Vaxxing",
  "Yeeted",
  "Rekt",
  "Clutch",
  "Salty",
  "Janky",
  "Simp",
  "Bling",
  "Poggers",
  "Shake",
  "Dank",
  "Hundo",
  "Botting",
  "Cancel",
  "Deadass",
  "Modded",
  "Chugging",
  "Gigachad",
  "Mewed",
  "Maxxing",
  "Trolling",
  "Vibed",
  "PogChamp",
  "Bopped",
  "Grind",
];

const GAME_DURATION = 45;
const RESULT_DISPLAY_DURATION = 1500;

function App() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [currentWord, setCurrentWord] = useState("");

  const initializeGame = () => {
    setTime(GAME_DURATION);
    setPoints(0);
    setGameOver(false);
    setIsRunning(true);
    setResult(null);
    setCurrentWord(getRandomWord());
  };

  const handlePlayAgain = () => {
    setIsRunning(false);
    setGameOver(false);
    setTime(0);
    setPoints(0);
    setGuess("");
    setCurrentWord("");
    setResult(null);
  };

  const getRandomWord = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
    return randomWord.toUpperCase();
  };

  const handleGameOver = () => {
    if (gameOver) return;
    setGameOver(true);
    setIsRunning(false);
    setGuess("");
    setCurrentWord("");
  };

  const handleSubmitGuess = () => {
    if (!isRunning || gameOver || !guess.trim()) return;

    if (guess.toUpperCase() === currentWord) {
      setPoints((previousState) => previousState + 1);
      setResult("CORRECT");
    } else {
      setResult("INCORRECT");
    }

    setTimeout(() => {
      setResult(null);
      setGuess("");
      setCurrentWord(getRandomWord());
    }, RESULT_DISPLAY_DURATION);
  };

  useEffect(() => {
    if (!isRunning || gameOver) return;

    const timer = setInterval(() => {
      setTime((previousState) => {
        if (previousState <= 1) {
          handleGameOver();
          return 0;
        }

        return previousState - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, gameOver]);

  if (gameOver) {
    return (
      <main className="p-4 sm:p-6 space-y-4 w-[90vw] max-w-2xl mx-auto">
        <div className="card flex-1 flex flex-col items-center justify-center border-amber-200 rounded-lg p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-red-600">
            GAME OVER!
          </h2>
          <p className="text-lg sm:text-xl font-semibold">
            <p className="text-lg sm:text-xl font-semibold">
              Final Score:{" "}
              {points === 1 ? `${points} point` : `${points} points`}
            </p>
          </p>
          <button
            onClick={handlePlayAgain}
            className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-4 sm:px-6 py-2 font-semibold rounded-md transition-colors w-full sm:w-auto"
          >
            Play Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="w-[90vw] p-4 sm:p-6 max-w-2xl mx-auto">
      {/* TITLE */}
      <div className="text-center mb-4 sm:mb-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black">
          SCRAMBROT
        </h1>
        <p className="text-base sm:text-lg font-medium text-gray-600 mt-2">
          Test your brainrot knowledge!
        </p>
      </div>

      {/* SCRAMBLED WORD DISPLAY */}
      <ScrambledWord word={currentWord || ""} isRunning={isRunning} />

      {/* GUESS RESULT */}
      {result && <GuessResult result={result} word={currentWord} />}

      {/* INPUT POINTS TIMER*/}
      <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-5">
        {/* POINTS */}
        <div className="card flex-1 flex flex-col items-center justify-center border-amber-200 rounded-lg p-3 sm:p-4 order-3 sm:order-1">
          <p className="text-sm sm:text-base">POINTS</p>
          <p className="text-green-600 text-2xl sm:text-3xl md:text-4xl">
            {points}
          </p>
        </div>

        {/* INPUT */}
        <div className="card flex flex-col gap-2 flex-2 order-2 sm:order-2 w-full">
          <input
            type="text"
            value={guess}
            maxLength={currentWord ? currentWord.length : undefined}
            disabled={!isRunning || result}
            onChange={(e) => {
              setGuess(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitGuess();
              }
            }}
            placeholder="Enter your guess...."
            className="
            border border-gray-300 px-3 sm:px-4 py-2 rounded-md w-full focus:ring-2 focus:ring-amber-400 focus:outline-none transition text-sm sm:text-base
          "
          />
          <button
            onClick={isRunning ? handleSubmitGuess : initializeGame}
            className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 flex-1 rounded-md transition text-white font-semibold py-2 px-4 text-sm sm:text-base"
          >
            {isRunning ? "SUBMIT" : "START"}
          </button>
        </div>

        {/* TIMER */}
        <div className="card flex-1 flex flex-col items-center justify-center border-amber-200 rounded-lg p-3 sm:p-4 order-1 sm:order-3">
          <p className="text-sm sm:text-base">TIMER</p>
          <p className="text-green-600 text-2xl sm:text-3xl md:text-4xl">
            {time}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
