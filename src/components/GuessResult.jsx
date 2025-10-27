const GuessResult = ({ result, word }) => {
  return (
    <div className="card mt-3">
      {result === "CORRECT" ? (
        <p>
          Your answer is <span className="text-green-500">CORRECT!</span>
        </p>
      ) : (
        <p>
          Your answer is <span className="text-red-500">INCORRECT!</span>
        </p>
      )}
      <p>The word is {word}</p>
    </div>
  );
};

export default GuessResult;
