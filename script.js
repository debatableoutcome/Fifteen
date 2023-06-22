"use strict";
import dom from "./dom.js";
import { neighbours } from "./rules.js";
import { randomizeState, state, stateInit } from "./coords.js";
let moves = 0;
let time = 120;

const isNeighbour = (emptyCurLoc, clickedLoc) =>
  neighbours[clickedLoc].includes(emptyCurLoc);

function prepareHTML(array) {
  const toAppend = [];
  console.log(array);
  array.forEach((obj) => {
    console.log(obj);
    const html = `<div class="square ${obj.curLoc}" id="${obj.name}" value="${obj.value}" data-loc="${obj.curLoc}">
    <div class="content">${obj.value}</div>
  </div>`;
    toAppend.push(html);
  });
  return render(toAppend);
}

function render(nodes) {
  if (!nodes) return;
  const html = nodes.join(",").toString().replaceAll(",", "\n");
  dom.parentNums.innerHTML = "";
  console.log(html);
  dom.parentNums.innerHTML += html;
}

function renderTimerAndMoves() {
  html = `<div class="moves">${moves}</div>
  <div class="timer">${timerString}</div>`;
}

function detectLocs(event) {
  console.log(event.target);
  const clicked = event.target.closest(".square");

  const id = clicked.id;
  const clickedLoc = clicked.dataset.loc;

  const emptyCurLoc = state[15].curLoc;
  console.log(clickedLoc, emptyCurLoc);
  isNeighbour(emptyCurLoc, clickedLoc)
    ? updState(id, clickedLoc, emptyCurLoc)
    : "";
}

function updState(id, clickedLoc, emptyCurLoc) {
  console.log("upd");
  state[15].curLoc = clickedLoc;
  const index = state.findIndex((obj) => obj.name === id);
  state[index].curLoc = emptyCurLoc;
  return prepareHTML(state);
}

function open() {
  const array = stateInit();
  console.log("start", array);
  return prepareHTML(array);
}
function gameOver() {
  console.log("oh no you lose!");
}

function win() {
  console.log("Yeay you win!");
}

// &&&&&&&&&&&&&&&&&&&&&&& TIMER  &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

function tick() {
  const min = String(Math.trunc(time / 60)).padStart(2, 0);
  const sec = String(time % 60).padStart(2, 0);
  dom.timer.textContent = `${min} : ${sec}`;
  if (time === 0) {
    clearInterval(timer);
    gameOver();
  }
  time--;
}
function timer() {
  setInterval(tick, 1000);
  return timer;
}

function shuffleTiles() {
  clearInterval(timer);
  moves = 0;
  prepareHTML(randomizeState());
  timer();
}

// &&&&&&&&&&&&&&&&&& LISTENERS &&&&&&&&&&&&&&&&&&&&&&&&&

window.addEventListener("DOMContentLoaded", open);
dom.btnStart.addEventListener("click", shuffleTiles);

dom.parentNums.addEventListener("click", (event) => detectLocs(event));

// Tasks

//BUGS:
// Before Play nonclickable
// Timer to stop at 0 00
//FEATURES:

// Sound
// Timer
// Settings - sound off/on
// Remember the record - render
// Count each move - render
// restart button?
//localStorage

// DONE TODAY:
// Prohibit to shift any tile
// Randomize
