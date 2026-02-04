"use client";
import { useEffect, useRef, useState } from "react";
import { generateAllSingleDigitEquations } from "../data/additionData";
import { EquationStats } from "./types/equationStats";
import {
  loadEquations as load,
  loadEquations,
  saveEquations,
} from "../data/localStorageHelper";

export default function Addition() {
  const [operandA, setOperandA] = useState(() => getRandomNumber());
  const [operandB, setOperandB] = useState(() => getRandomNumber());
  const [points, setPoints] = useState(0);

  const [userAnswer, setUserAnswer] = useState<string>("");

  const allEquations = useRef<[string, EquationStats][]>(loadEquations());

  const correctAnswer = operandA + operandB;

  useEffect(() => {}, []);

  function handleAnswer(value: string): void {
    setUserAnswer(value);
    if (value.trim() === "") return;

    const numericAnswer = Number(value);
    if (Number.isNaN(numericAnswer)) return;

    if (value.length != correctAnswer.toString().length) return;

    if (numericAnswer === correctAnswer) {
      generateNewQuestion();
      setPoints((p) => p + 10);
      setUserAnswer("");
    } else {
      setPoints((p) => p - 10);
      setUserAnswer("");
    }
  }

  function generateNewQuestion() {
    const randomPick = getRandomArbitrary(0, allEquations.current.length - 1);

    const equationToDisplay = allEquations.current[randomPick][1];

    setOperandA(equationToDisplay.operandA);
    setOperandB(equationToDisplay.operandB);
  }

  return (
    <div className="solving-window container mt-5">
      <div className="text-light">
        <div className="card-band mt-3 mx-1">
          <div className="d-flex justify-content-between">
            <p className="points-earned display-4 ">{points}</p>
            <p className="countdown display-4 "> 00 : 39</p>
          </div>
        </div>
        <div className="card-content my-5">
          <div className="text-center">
            <p className="display-1 gold-colored">
              {operandA} + {operandB}
            </p>
          </div>

          <div className="">
            <input
              autoFocus={true}
              value={userAnswer}
              inputMode="numeric"
              className="form-control input-answer"
              onChange={(e) => handleAnswer(e.currentTarget.value)}
            />
          </div>
        </div>
        <div className="card-band text-center mt-3">
          <button className="btn">
            <i className="bi bi-volume-mute-fill display-3"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill display-3"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill display-3"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill display-3"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill display-3"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
        </div>
      </div>
    </div>
  );
}
function getRandomNumber() {
  return getRandomArbitrary(1, 10);
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
