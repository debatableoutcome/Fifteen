"use strict";
import dom from "./dom.js";
import { neighbours } from "./rules.js";
import {
  checkCorrect,
  randomizeState,
  records,
  state,
  stateInit,
} from "./coords.js";

let moves = 0;
const initialTime = 1200;

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
  if (checkCorrect(state) && moves > 0) {
    console.log("You WIN!");
    dom.playField.classList.add("win-bc");
    dom.timer.classList.add("win-color");
    records.push(moves);
    return win();
  }
  if (!nodes) return;
  const html = nodes.join(",").toString().replaceAll(",", "\n");
  dom.parentNums.innerHTML = "";
  dom.parentNums.innerHTML += html;
}

function detectLocs(event) {
  console.log(event.target);
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
    dom.bestMoves.textContent = moves;
    dom.timeResult.textContent = time;
  }
  return prepareHTML(array);
}
function gameOver() {
  clearInterval(timer);
  blockTiles();
  dom.bestResultView.classList.add("hidden");
  dom.loseView.classList.remove("hidden");
}

function win() {
  clearInterval(timer);
  records.push(moves);
  blockTiles();
  dom.bestResultView.classList.add("hidden");
  dom.winView.classList.remove("hidden");
}

// &&&&&&&&&&&&&&&&&&&&&&& TIMER  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function startGame() {
  // reset timer and moves
  if (timer) clearInterval(timer);
  timer = startCountDown();
  moves = 0;
  dom.moves.textContent = moves;
  if (records.length > 0) {
    dom.bestResultView.classList.remove("hidden");
    const sorted = records.sort((a, b) => a - b);
    dom.bestMoves.textContent = sorted[0];
  }
  dom.winView.classList.add("hidden");
  dom.loseView.classList.add("hidden");
  unblockTiles();
  prepareHTML(randomizeState());
}

const startCountDown = function () {
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

// Tasks

//BUGS:

//FEATURES:

// Sound
// Settings - sound off/on
// Settings - timer options?
// Remember the record - render
//localStorage

// DONE TODAY:
// Timer to stop at 0 00
// Win and Lose UI
// Before Play nonclickable
// Count each move - render
// restart button
