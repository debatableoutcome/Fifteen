const getEl = (el) => document.querySelector(el);

const dom = {
  parentNums: getEl(".parent-nums"),
  main: getEl(".main"),
  btnStart: getEl(".start"),
  moves: getEl(".moves"),
  timer: getEl(".timer"),
  loseView: getEl(".lose-view"),
  winView: getEl(".win-view"),
  bestResultView: getEl(".best-result-view"),
  bestMoves: getEl(".best-moves"),
  playField: getEl(".play-field"),
};

export default dom;
