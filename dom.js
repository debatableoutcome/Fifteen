const getEl = (el) => document.querySelector(el);

const dom = {
  parentNums: getEl(".parent-nums"),
  main: getEl(".main"),
  btnStart: getEl(".start"),
  moves: getEl(".moves"),
  timer: getEl(".timer"),
  // form: getEl(".date-form"),
  // dateSelect: getEl("#date-select"),
  // nameInput: getEl("#name-input"),
  // btnAdd: getEl(".btn-add"),
  // heading: getEl(".heading"),
  // outputUI: getEl("#output"),
};

export default dom;
