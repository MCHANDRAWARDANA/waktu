import React from "react";
import { useState, useEffect, useRef } from "react";

const StopWatch = () => {
  const [IsRunning, setIsRunning] = useState(false);
  const [ElapsedTime, setElapsedTime] = useState(0);
  const [LapTimes, setLapTimes] = useState([]); // State untuk menyimpan waktu lap
  const IntervalIdRef = useRef(null);
  const StartTimeRef = useRef(0);

  useEffect(() => {
    IntervalIdRef.current = setInterval(() => {
      if (IsRunning) {
        setElapsedTime(Date.now() - StartTimeRef.current);
      }
    }, 10);

    return () => {
      clearInterval(IntervalIdRef.current);
    };
  }, [IsRunning]);

  function start() {
    setIsRunning(true);
    StartTimeRef.current = Date.now() - ElapsedTime;
  }

  function Pause() {
    setIsRunning(false);
    setLapTimes([...LapTimes, FormatTime()]); // Simpan waktu lap saat pause
  }

  function Reset() {
    setIsRunning(false);
    setElapsedTime(0);
    setLapTimes([]); // Kosongkan waktu lap saat reset
  }

  function FormatTime() {
    let Hours = Math.floor(ElapsedTime / (1000 * 60 * 60));
    let Minutes = Math.floor((ElapsedTime / (1000 * 60)) % 60);
    let Seconds = Math.floor((ElapsedTime / 1000) % 60);
    let Miliseconds = Math.floor((ElapsedTime % 1000) / 10);

    Hours = String(Hours).padStart(2, "0");
    Minutes = String(Minutes).padStart(2, "0");
    Seconds = String(Seconds).padStart(2, "0");
    Miliseconds = String(Miliseconds).padStart(2, "0");

    return `${Minutes}:${Seconds}:${Miliseconds}`;
  }

  return (
    <div className="h-[500px] w-[500px] border-2 border-indigo-500 bg-teal-500/70 flex flex-col justify-center items-center rounded-3xl">
      <div className="space-y-5">
        <h1 className="text-center font-bold text-5xl text-slate-700">
          {FormatTime()}
        </h1>
        <div className="text-center space-x-2 animate-bounce">
          <button
            onClick={start}
            className="px-2 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-red-700 text-2xl scale-[1] hover-scale-[1.3] transition-all ease-out duration-300 shadow-xl hover:bg-red-400"
          >
            Start
          </button>
          <button
            onClick={Pause}
            className="px-2 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-yellow-400 text-2xl scale-[1] hover-scale-[1.3] transition-all ease-out duration-300 shadow-xl hover:bg-yellow-200"
          >
            Pause
          </button>
          <button
            onClick={Reset}
            className="px-2 py-2 rounded-2xl text-white cursor-pointer font-semibold bg-lime-600/70 text-2xl scale-[1] hover-scale-[1.3] transition-all ease-out duration-300 shadow-xl hover:bg-lime-300"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="mt-5 w-full max-h-40 overflow-y-auto">
        <h2 className="text-center font-bold text-xl text-slate-700 mb-2">
          Lap Times
        </h2>
        <ul className="list-disc pl-5">
          {LapTimes.map((lap, index) => (
            <li key={index} className="text-lg text-slate-600">
              {lap}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StopWatch;
