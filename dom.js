const getEl = (el) => document.querySelector(el);

const dom = {
  parentNums: getEl(".parent-frame"),
  main: getEl(".main"),
  btnStart: getEl(".start"),
  // btnSortToSettings: getEl(".btn-settings"),
  // parentItems: getEl(".parent-items"),
  // form: getEl(".date-form"),
  // dateSelect: getEl("#date-select"),
  // nameInput: getEl("#name-input"),
  // btnAdd: getEl(".btn-add"),
  // heading: getEl(".heading"),
  // outputUI: getEl("#output"),
};

export default dom;
