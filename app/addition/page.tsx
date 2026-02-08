"use client";
import { useEffect, useRef, useState } from "react";
import {
  createEquationStatsKey,
  generateAllSingleDigitEquations,
} from "../data/additionData";
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

  const [focusOnWeakness, setFocusOnWeakness] = useState(false);

  const [doubleDigitAnswers, setDoubleDigitAnswers] = useState(false);

  const [userAnswer, setUserAnswer] = useState<string>("");

  const allEquations = useRef<Map<string, EquationStats>>(new Map());

  const correctAnswer = operandA + operandB;

  useEffect(() => {
    allEquations.current = loadEquations();
  }, []);

  function handleAnswer(value: string): void {
    setUserAnswer(value);
    if (value.trim() === "") return;

    const numericAnswer = Number(value);
    if (Number.isNaN(numericAnswer)) return;

    if (value.length != correctAnswer.toString().length) return;

    const equationStatKey = createEquationStatsKey(operandA, operandB);
    console.log(`allEquations.current: ${typeof allEquations.current}`);
    const equationAttempted = allEquations.current.get(equationStatKey);
    if (!equationAttempted) throw new Error("Equation not found");

    equationAttempted.timesAttempted++;

    if (numericAnswer === correctAnswer) {
      generateNewQuestion();
      setPoints((p) => p + 10);
      setUserAnswer("");
      equationAttempted.timesSolved++;
    } else {
      setPoints((p) => (p - 10 < 0 ? 0 : p - 10));
      setUserAnswer("");
      equationAttempted.timesWrong++;
    }
    equationAttempted.successRate =
      equationAttempted.timesSolved / equationAttempted.timesAttempted;

    allEquations.current.set(equationStatKey, equationAttempted);
    saveEquations(Array.from(allEquations.current));
  }

  function generateNewQuestion() {
    let poolOfEquations = Array.from(allEquations.current);

    if (doubleDigitAnswers)
      poolOfEquations = poolOfEquations.filter(
        (e) => e[1].answer.toString().length === 2,
      );

    if (focusOnWeakness) {
      poolOfEquations = poolOfEquations
        .sort((a, b) => a[1].successRate - b[1].successRate)
        .slice(0, 10);
    }
    console.log(poolOfEquations);

    const randomPick = getRandomArbitrary(0, poolOfEquations.length - 1);

    const equationToDisplay = poolOfEquations[randomPick][1];

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
        <div className="d-flex justify-content-between mt-3">
          <div className="p-2">
            <button
              className={`btn${focusOnWeakness && " btn-primary"}`}
              aria-pressed="false"
              onClick={() => setFocusOnWeakness(!focusOnWeakness)}
            >
              Focus on Weak Areas
            </button>
          </div>
          <div className="">
            <button
              className={`btn${doubleDigitAnswers && " btn-primary"}`}
              aria-pressed="false"
              onClick={() => setDoubleDigitAnswers(!doubleDigitAnswers)}
            >
              Double digits only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function getRandomNumber() {
  return getRandomArbitrary(1, 9);
}

function getRandomArbitrary(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
