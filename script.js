"use strict";
import dom from "./dom.js";
import { store } from "./store.js";
import { neighbours } from "./rules.js";
import { checkCorrect, state, stateInit, randomizeState } from "./coords.js";

let records = store.get("records") || [];
// let records = []; // restart strorage
let moves = 0;
const initialTime = 1200;

// Audio

function audioStart() {
  let playStart = new Audio("audio/ding.mp3");
  playStart.play();
}

function audioLose() {
  let playLose = new Audio("audio/lose.mp3");
  playLose.play();
}

function audioWin() {
  let playWin = new Audio("audio/win.mp3");
  playWin.play();
}
const isNeighbour = (emptyCurLoc, clickedLoc) =>
  neighbours[clickedLoc].includes(emptyCurLoc);

function prepareHTML(array) {
  const toAppend = [];
  array.forEach((obj) => {
    const html = `<div class="square ${obj.curLoc}" id="${obj.name}" value="${obj.value}" data-loc="${obj.curLoc}">
    <div class="content">${obj.value}</div>
  </div>`;
    toAppend.push(html);
  });
  return renderTiles(toAppend);
}

function renderTiles(nodes) {
  if (!nodes) return;
  const html = nodes.join(",").toString().replaceAll(",", "\n");
  dom.parentNums.innerHTML = "";
  dom.parentNums.innerHTML += html;

  if (checkCorrect(state) && moves > 0) {
    records.push(moves);
    store.set("records", records);
    return win();
  }
}

function detectLocs(event) {
  const clicked = event.target.closest(".square");
  const id = clicked.id;
  const clickedLoc = clicked.dataset.loc;
  const emptyCurLoc = state[15].curLoc;

  isNeighbour(emptyCurLoc, clickedLoc)
    ? updState(id, clickedLoc, emptyCurLoc)
    : "";
}

function updState(id, clickedLoc, emptyCurLoc) {
  state[15].curLoc = clickedLoc;
  const index = state.findIndex((obj) => obj.name === id);
  state[index].curLoc = emptyCurLoc;
  moves++;

  dom.moves.textContent = moves;
  return prepareHTML(state);
}

function blockTiles() {
  dom.parentNums.classList.add("disabled");
}

function unblockTiles() {
  dom.parentNums.classList.remove("disabled");
}

function getMin(array) {
  if (array.length > 0) {
    const min = array.sort((a, b) => a.moves - b.moves);
    return min[0];
  }
}

//&&&&&&&&&&&&&&&&&&&&& THE GAME  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function open() {
  blockTiles();
  // Setup default
  const array = stateInit();
  if (records.length > 0) {
    const { moves, time } = getMin(records);
    dom.gameName.classList.add("hidden");
    dom.bestMoves.textContent = moves;
  }
  return prepareHTML(array);
}
function gameOver() {
  audioLose();
  clearInterval(timer);
  blockTiles();
  dom.gameName.classList.add("hidden");
  dom.bestResultView.classList.add("hidden");
  dom.loseView.classList.remove("hidden");
}

function win() {
  clearInterval(timer);
  audioWin();
  records.push(moves);
  store.set("records", records);
  blockTiles();
  dom.gameName.classList.add("hidden");
  dom.bestResultView.classList.add("hidden");
  dom.winView.classList.remove("hidden");
  dom.winMoves.textContent = `${moves} moves`;
}

// &&&&&&&&&&&&&&&&&&&&&&& TIMER  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function startGame() {
  dom.winView.classList.add("hidden");
  dom.loseView.classList.add("hidden");

  if (timer) clearInterval(timer);
  timer = startCountDown();
  moves = 0;
  dom.moves.textContent = moves;
  // Last best result display
  if (records.length > 0) {
    dom.bestResultView.classList.remove("hidden");
    const sorted = records.sort((a, b) => a - b);
    dom.bestMoves.textContent = sorted[0];
    dom.gameName.classList.add("hidden");
  } else {
    dom.gameName.classList.remove("hidden");
  }

  unblockTiles();
  prepareHTML(randomizeState());
}

const startCountDown = function () {
  audioStart();
  function tick() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    dom.timer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      gameOver();
    }
    time--;
  }
  let time = initialTime;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
let timer;

// &&&&&&&&&&&&&&&&&& LISTENERS &&&&&&&&&&&&&&&&&&&&&&&&&

window.addEventListener("DOMContentLoaded", open);

dom.btnStart.addEventListener("click", startGame);

dom.parentNums.addEventListener("click", (event) => detectLocs(event));
