import { EquationStats } from "../addition/types/equationStats";

export function generateAllSingleDigitEquations() {
  const answerTable: Map<string, EquationStats> = new Map<
    string,
    EquationStats
  >();
  for (let x = 1; x < 10; x++) {
    for (let y = 1; y < 10; y++) {
      const equationStat = createEquationStatsForMap(x, y, false);
      const equationStatKey = createEquationStatsKey(
        equationStat.operandA,
        equationStat.operandB,
      );

      if (!answerTable.get(equationStatKey)) {
        answerTable.set(equationStatKey, equationStat);
      }
    }
  }
  return answerTable;
}

export function createEquationStatsForMap(
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

export function createEquationStatsKey(operandA: number, operandB: number) {
  return `${operandA}+${operandB}`;
}
