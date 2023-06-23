const spotsMax = 15;

let state = [
  {
    name: "one",
    value: 1,
    curLoc: null,
    legalLoc: "one-spot",
  },

  {
    name: "two",
    value: 2,
    curLoc: null,
    legalLoc: "two-spot",
  },
  {
    name: "three",
    value: 3,
    curLoc: null,
    legalLoc: "three-spot",
  },

  {
    name: "four",
    value: 4,
    curLoc: null,
    legalLoc: "four-spot",
  },
  {
    name: "five",
    value: 5,
    curLoc: null,
    legalLoc: "five-spot",
  },

  {
    name: "six",
    value: 6,
    curLoc: null,
    legalLoc: "six-spot",
  },
  {
    name: "seven",
    value: 7,
    curLoc: null,
    legalLoc: "seven-spot",
  },

  {
    name: "eight",
    value: 8,
    curLoc: null,
    legalLoc: "eight-spot",
  },
  {
    name: "nine",
    value: 9,
    curLoc: null,
    legalLoc: "nine-spot",
  },
  {
    name: "ten",
    value: 10,
    curLoc: null,
    legalLoc: "ten-spot",
  },

  {
    name: "eleven",
    value: 11,
    curLoc: null,
    legalLoc: "eleven-spot",
  },

  {
    name: "twelve",
    value: 12,
    curLoc: null,
    legalLoc: "twelve-spot",
  },
  {
    name: "thirteen",
    value: 13,
    curLoc: null,
    legalLoc: "thirteen-spot",
  },
  {
    name: "fourteen",
    value: 14,
    curLoc: null,
    legalLoc: "fourteen-spot",
  },

  {
    name: "fifteen",
    value: 15,
    curLoc: null,
    legalLoc: "fifteen-spot",
  },

  {
    name: "empty",
    value: "",
    curLoc: null,
    legalLoc: "empty-spot",
  },
];

export function stateInit() {
  state.map((obj) => {
    obj.curLoc = obj.legalLoc;
  });
  return state;
}
// function getRandom(max) {
//   return Math.floor(Math.random() * max);
// }
export function randomizeState() {
  const availableSpots = state.map((obj) => obj.legalLoc);
  availableSpots.pop();
  const shuffledArray = availableSpots.sort((a, b) => 0.5 - Math.random());
  state.map((obj) => {
    obj.curLoc = shuffledArray.at(-1);
    shuffledArray.pop();
  });
  state[15].curLoc = state[15].legalLoc;
  return state;
}

export function checkCorrect(array) {
  console.log(array);
  const arrayForCheck = array.filter((obj) => obj.curLoc === obj.legalLoc);
  return array.length === arrayForCheck.length;
}

export { state };

export let records = [];
