// JavaScript Document
// 算法基类
// 在算法控制区域添加控件的函数
function addLabelToAlgorithmBar(labelName) {
  var element = document.createTextNode(labelName);

  var tableEntry = document.createElement("td");
  tableEntry.appendChild(element);

  var controlBar = document.getElementById("AlgorithmSpecificControls");

  controlBar.appendChild(tableEntry);
  return element;
}
/* changed */
// select 标签
function addSelectToAlgorithmBar(optionList) {
  var element = document.createElement("select");
  for (var i = 0; i < optionList.length; i++) {
    element.options.add(new Option(optionList[i], optionList[i]));
  }

  var controlBar = document.getElementById("AlgorithmSpecificControls");

  controlBar.appendChild(element);
  return element;
}

// checkbox 勾选框
function addCheckboxToAlgorithmBar(boxLabel) {
  var element = document.createElement("input");

  element.setAttribute("type", "checkbox");
  element.setAttribute("value", boxLabel);

  var label = document.createTextNode(boxLabel);

  var tableEntry = document.createElement("td");
  tableEntry.appendChild(element);
  tableEntry.appendChild(label);

  var controlBar = document.getElementById("AlgorithmSpecificControls");

  //Append the element in page (in span).
  controlBar.appendChild(tableEntry);
  return element;
}

// radio button 单选
function addRadioButtonGroupToAlgorithmBar(buttonNames, groupName) {
  var buttonList = [];
  var newTable = document.createElement("table");

  for (var i = 0; i < buttonNames.length; i++) {
    var midLevel = document.createElement("tr");
    var bottomLevel = document.createElement("td");

    var button = document.createElement("input");
    button.setAttribute("type", "radio");
    button.setAttribute("name", groupName);
    button.setAttribute("value", buttonNames[i]);
    bottomLevel.appendChild(button);
    midLevel.appendChild(bottomLevel);
    var txtNode = document.createTextNode(" " + buttonNames[i]);
    bottomLevel.appendChild(txtNode);
    newTable.appendChild(midLevel);
    buttonList.push(button);
  }

  var topLevelTableEntry = document.createElement("td");
  topLevelTableEntry.appendChild(newTable);

  var controlBar = document.getElementById("AlgorithmSpecificControls");
  controlBar.appendChild(topLevelTableEntry);

  return buttonList;
}

function addInputToAlgorithmBar(type, name) {
  var element = document.createElement("input");

  element.setAttribute("type", type);
  element.setAttribute("value", name);
  element.setAttribute("name", name);
  if (type == "text") {
    element.setAttribute("size", "5");
  }

  var tableEntry = document.createElement("td");

  tableEntry.appendChild(element);

  var controlBar = document.getElementById("AlgorithmSpecificControls");

  //Append the element in page (in span).
  controlBar.appendChild(tableEntry);
  return element;
}

var Algorithm = function () {};

// 初始化
Algorithm.prototype.init = function (animManager, width, height) {
  this.animationManager = animManager; // 动画
  this.canvasWidth = width; // 画布宽度
  this.canvasHeight = height; // 画布高度
  this.commands = []; // 命令行
};

// 完成动作
Algorithm.prototype.implementAction = function (func, val) {
  var retVal = func(val);
  this.animationManager.startNewAnimation(retVal);
};

// commands生成函数
Algorithm.prototype.cmd = function () {
  var command = arguments[0];
  for (i = 1; i < arguments.length; i++) {
    command = command + "<cry>" + String(arguments[i]);
  }
  this.commands.push(command);
};
