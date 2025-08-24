import React, { useState, useEffect } from "react";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);
  // const [gameData, setGameData] = useState([]);
  const handleClick = (index : number) => {
    console.log(index);
  };
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
          ? "bg-gradient-to-br from-gray-300/70 to-gray-400/80 text-gray-800"
          : "bg-gradient-to-br from-gray-900 to-black text-gray-100"
      }`}
    >
      <header className="flex justify-between items-center w-full max-w-4xl px-6 py-4">
        <h1 className="text-4xl font-bold animate-slideDown">Tic Tac Toe</h1>
        <button
          onClick={toggleTheme}
          className="px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-transform transform hover:scale-110"
        >
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </header>

      <main className="grid grid-cols-3 gap-6 mt-10 animate-fadeIn">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(index)}
            className={`w-32 h-32 sm:w-36 sm:h-36 rounded-2xl flex items-center justify-center text-3xl font-bold cursor-pointer transition-transform transform hover:scale-110 ${
              theme === "light"
                ? "bg-white/20 backdrop-blur-lg border border-white/30"
                : "bg-black/30 backdrop-blur-lg border border-white/20"
            }`}
          ></div>
        ))}
      </main>
    </div>
  );
}
