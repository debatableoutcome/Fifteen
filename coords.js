let state = [
  {
    name: "one",
    value: 1,
    curLoc: null,
    legalLoc: "one-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "one",
    value: 2,
    curLoc: null,
    legalLoc: "two-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "three",
    value: 3,
    curLoc: null,
    legalLoc: "three-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "four",
    value: 4,
    curLoc: null,
    legalLoc: "four-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "five",
    value: 5,
    curLoc: null,
    legalLoc: "five-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "six",
    value: 6,
    curLoc: null,
    legalLoc: "six-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "seven",
    value: 7,
    curLoc: null,
    legalLoc: "seven-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "eight",
    value: 8,
    curLoc: null,
    legalLoc: "eight-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "nine",
    value: 9,
    curLoc: null,
    legalLoc: "nine-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "ten",
    value: 10,
    curLoc: null,
    legalLoc: "ten-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "eleven",
    value: 11,
    curLoc: null,
    legalLoc: "eleven-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "twelve",
    value: 12,
    curLoc: null,
    legalLoc: "twelve-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "thirteen",
    value: 13,
    curLoc: null,
    legalLoc: "thirsteen-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
  {
    name: "fourteen",
    value: 14,
    curLoc: null,
    legalLoc: "fourteen-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "fifteen",
    value: 15,
    curLoc: null,
    legalLoc: "fifteen-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },

  {
    name: "empty",
    value: "",
    curLoc: null,
    legalLoc: "empty-spot",
    checkCorrect: function () {
      return this.curLoc === this.legalLoc;
    },
  },
];

export function stateInit() {
  console.log(state);
  state = state.map((obj) => {
    obj.curLoc = obj.legalLoc;
  });
  console.log("new", state);
  return state;
}

export { state };
