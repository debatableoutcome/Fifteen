"use strict";
import dom from "./dom.js";
import { state, stateInit } from "./coords.js";

function prepareHTML(array) {
  const toAppend = [];
  console.log(array);
  array.forEach((obj) => {
    console.log(obj);
    const html = `<div class="square ${obj.curLoc}" id=${obj.id} value="${obj.value}" data-loc=${obj.curLoc}>
    <div>${obj.value}</div>
  </div>`;
    toAppend.push(html);
  });
  return render(toAppend);
}

function render(array) {
  dom.parentNums.innerHTML = "";
  dom.parentNums.appendChild([...array]);
}

function detectLocs(event) {
  const target = event.target;
  id = target.id;
  const loc = target.dataset.loc;

  return updState(id, loc);
}

function updState(id, loc) {
  const emptyCurrentLoc = state.empty.curLoc;
  state.empty.curLoc = loc;
  state[id].curLoc = emptyCurrentLoc;
  console.log();
  return prepareHTML(state);
}

function start() {
  const array = stateInit();
  console.log("start", array);
  return prepareHTML(array);
}
// &&&&&&&&&&&&&&&&&& LISTENERS &&&&&&&&&&&&&&&&&&&&&&&&&

dom.btnStart.addEventListener("click", start);

dom.parentNums.addEventListener("click", (event) => detectLocs(event));
