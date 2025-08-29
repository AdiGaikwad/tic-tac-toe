import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./components/ui/moving-border";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState<"start" | "choose" | "board">("start");
  const [player1Choice, setPlayer1Choice] = useState<"X" | "O" | null>(null);
  const [player1Next, setPlayer1Next] = useState(true);
  const [winner, setWinner] = useState<string>("");
  const [modalOpen, setModal] = useState(false);

  type Cell = { mark: "X" | "O" | null; move?: number };

  const initialGame: Cell[] = Array.from({ length: 9 }, () => ({ mark: null }));
  const choices = ["X", "O"] as const;

  const [gamedata, setGameData] = useState<Cell[]>(initialGame);

  const handleClick = (index: number) => {
    if (!player1Choice) return;
    if (gamedata[index]?.mark) return;

    const nextMoveNum =
      gamedata.reduce((m, c) => Math.max(m, c.move ?? 0), 0) + 1;

    const playerMark = player1Next
      ? player1Choice
      : player1Choice === "X"
      ? "O"
      : "X";

    const newData = gamedata.slice();
    newData[index] = { mark: playerMark, move: nextMoveNum };

    setGameData(newData);
    checkWinner(newData);
    setPlayer1Next(!player1Next);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const checkWinner = (gamedata: Cell[]) => {
    const checklist = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winner = false;
    console.log(gamedata);
    for (let i = 0; i < checklist.length; i++) {
      const [a, b, c] = checklist[i];
      if (
        gamedata[a].mark &&
        gamedata[b].mark &&
        gamedata[c].mark &&
        gamedata[a].mark === gamedata[b].mark &&
        gamedata[b].mark === gamedata[c].mark &&
        gamedata[c].mark === gamedata[a].mark
      ) {
        console.log(gamedata[a], " Is the winner");
        setWinner(gamedata[a].mark == player1Choice ? "Player 1" : "Player 2");
        setModal(true);
        winner = true;
        return;
      }

      if (!winner && !gamedata.find((a) => a.mark == null)) {
        setWinner("Tie");
        console.log("Game Tie");
        setModal(true);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const newGame = () => {
    window.location.reload();
  };
  if (loading) {
    return (
      <div
        className={`flex flex-col items-center justify-center h-screen w-screen transition-colors duration-700 ${
          theme === "light"
            ? "bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800"
            : "bg-gradient-to-br from-gray-900 to-black text-gray-100"
        }`}
      >
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        <h1 className="mt-6 text-2xl font-bold animate-fadeIn">Loading...</h1>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-screen flex flex-col items-center justify-center transition-all duration-700 ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-200/70 to-gray-400/80 text-gray-800"
          : "bg-gradient-to-br from-gray-900 to-black text-gray-100"
      }`}
    >
      <AlertDialog open={modalOpen} onOpenChange={() => setModal(!modalOpen)}>
        <AlertDialogContent className={theme}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {winner != "Tie" ? `${winner} won the Game!` : "Game Tie !"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {winner != "Tie"
                ? `${winner} won the Game!`
                : "It's a tie! No winner this time."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                newGame();
              }}
            >
              New Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <header className={`flex ${step != "board" ? "fixed" : "absolute"} justify-between items-center w-full  top-0 max-w-4xl px-6 py-4`}>
        <h1 className="text-4xl font-bold animate-slideDown">Tic Tac Toe</h1>
        <button
          onClick={toggleTheme}
          className="cursor-pointer shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      {step === "start" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          {theme === "dark" ? (
            <Button
              containerClassName="rounded-full"
              as="button"
              onClick={() => setStep("choose")}
              className="dark:bg-gray-900/80 hover:bg-black  dark:text-white flex cursor-pointer items-center"
            >
              <span>Start Game</span>
            </Button>
          ) : (
            <button
              onClick={() => setStep("choose")}
              className="cursor-pointer h-[60px] w-[156px] rounded-[1.75rem] shadow-[0_4px_14px_0_rgb(0,118,255,39%)]
           hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3]  text-white font-light transition duration-200 ease-linear"
            >
              Start Game
            </button>
          )}
        </motion.div>
      )}

      {step === "choose" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mt-20 space-y-6"
        >
          <h1 className="text-2xl font-semibold">Player 1</h1>

          <h2 className="text-2xl font-semibold">Choose your symbol</h2>
          <div className="flex gap-8">
            {choices.map((choice) => (
              <motion.button
                key={choice}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setPlayer1Choice(choice);
                  setStep("board");
                }}
                className="text-4xl px-8 py-4 rounded-xl cursor-pointer shadow-[0_4px_14px_0_rgb(0,118,255,45%)] hover:shadow-[0_6px_20px_rgba(0,118,255,60%)] hover:bg-[rgba(0,118,255,0.9)]  bg-[#0070f3]  text-white font-light transition duration-200 ease-linear"
              >
                {choice}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {step === "board" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-3 gap-6 mt-16"
          >
            {[...Array(9)].map((_, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                onClick={() => handleClick(index)}
                className={`w-28 h-28 sm:w-36 sm:h-36 rounded-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-transform transform hover:scale-110 ${
                  theme === "light"
                    ? "bg-white/20 backdrop-blur-lg border border-white/30"
                    : "bg-black/30 backdrop-blur-lg border border-white/20"
                }`}
              >
                {gamedata && gamedata[index].mark}
              </motion.p>
            ))}
          </motion.main>
          <div className="w-full bg-primary/20 rounded-md text-center">
            <h1 className="p-3">Move List</h1> <br />
            {gamedata
              .map((cell, pos) => ({
                pos,
                mark: cell.mark,
                move: cell.move ?? 0,
              }))
              .filter((c) => c.mark !== null)
              .sort((a, b) => a.move - b.move)
              .map((m, idx) => (
                <div
                  key={`${m.pos}-${m.move}`}
                  className="p-2 bg-accent-foreground/50 w-full my-2 rounded-lg"
                >
                  Move {idx + 1}: {m.mark} at Position {m.pos + 1}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
