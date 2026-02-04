"use client";
import { useRef, useState } from "react";

export default function Addition() {
  const [operandA, setOperandA] = useState(() => getRandomNumber());
  const [operandB, setOperandB] = useState(() => getRandomNumber());
  const [points, setPoints] = useState(0);

  const [userAnswer, setUserAnswer] = useState<string>("");

  const allEquations = useRef(
    Array.from(generateAllSingleDigitEquations().entries()),
  );

  const correctAnswer = operandA + operandB;

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
      //implement after
    }
  }

  function generateNewQuestion() {
    const randomPick = getRandomArbitrary(0, allEquations.current.length - 1);

    const equationToDisplay = allEquations.current[randomPick][1];

    setOperandA(equationToDisplay.operandA);
    setOperandB(equationToDisplay.operandB);
  }

  return (
    <div className="solving-window container mt-4">
      <div className="text-light">
        <div className="card-band mt-3 mx-1">
          <div className="d-flex justify-content-between">
            <p className="points-earned">{points}</p>
            <p className="countdown"> 00 : 39</p>
          </div>
        </div>
        <div className="card-content">
          <div className="text-center">
            <p>
              {operandA} + {operandB}
            </p>
          </div>

          <input
            value={userAnswer}
            inputMode="numeric"
            className="form-control"
            onChange={(e) => handleAnswer(e.currentTarget.value)}
          />
        </div>
        <div className="card-band text-center mt-3">
          <button className="btn">
            <i className="bi bi-volume-mute-fill"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill"></i>
            {/* <i class="bi bi-volume-mute"></i> */}
          </button>
          <button className="btn">
            <i className="bi bi-volume-mute-fill"></i>
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

type EquationStats = {
  operandA: number;
  operandB: number;
  timesAttempted: number;
  timesSolved: number;
  timesWrong: number;
  successRate: number;
};

function createEquationStatsForMap(
  a: number,
  b: number,
  smallesToLargest = true,
): EquationStats {
  return {
    operandA: a <= b && smallesToLargest ? a : b,
    operandB: b >= a && smallesToLargest ? b : a,
    successRate: 0,
    timesAttempted: 0,
    timesSolved: 0,
    timesWrong: 0,
  };
}

function createEquationStatsKey(es: EquationStats) {
  return `${es.operandA}+${es.operandB}`;
}

function generateAllSingleDigitEquations() {
  const answerTable: Map<string, EquationStats> = new Map<
    string,
    EquationStats
  >();
  for (let x = 1; x < 10; x++) {
    for (let y = 1; y < 10; y++) {
      const equationStat = createEquationStatsForMap(x, y, false);
      const equationStatKey = createEquationStatsKey(equationStat);

      if (!answerTable.get(equationStatKey)) {
        answerTable.set(equationStatKey, equationStat);
      }
    }
  }
  return answerTable;
}
