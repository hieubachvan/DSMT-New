// JavaScript Document

var currentSort;

function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentSort = new Sort(animationManager, drawing.width, drawing.height);
}

var Sort = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ;
  this.initAttributes();
};

Sort.prototype = new Algorithm();
Sort.prototype.constructor = Sort;

Sort.prototype.initControls = function () {
  addLabelToAlgorithmBar("Array length");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.initButton = addInputToAlgorithmBar("button", "Randomly generate array");
  this.initButton.onclick = this.initCallBack.bind(this);
  this.selectSortButton = addInputToAlgorithmBar("button", "Select sort");
  this.selectSortButton.onclick = this.selectSortCallBack.bind(this);
  this.insertSortButton = addInputToAlgorithmBar("button", "Insertion sort");
  this.insertSortButton.onclick = this.insertSortCallBack.bind(this);
  this.bubbleSortButton = addInputToAlgorithmBar("button", "Bubble Sort");
  this.bubbleSortButton.onclick = this.bubbleSortCallBack.bind(this);
  this.shellSortButton = addInputToAlgorithmBar("button", "Hill sort");
  this.shellSortButton.onclick = this.shellSortCallBack.bind(this);
  this.QuickSortButton = addInputToAlgorithmBar("button", "Quick sort");
  this.QuickSortButton.onclick = this.QuickSortCallBack.bind(this);
  this.MergeSortButton = addInputToAlgorithmBar("button", "Merge sort");
  this.MergeSortButton.onclick = this.MergeSortCallBack.bind(this);
};

Sort.prototype.initAttributes = function () {
  this.objectID = 1;
  this.width = 60;
  this.height = 4;
  this.foregroundColor = "#000000";
  this.backgroundColor = "#B0E0E6";
  this.tomato = "#FF6347"; // tomato色
  this.palegreen = "#FF7F50"; // palegreen色
  this.lightgreen = "#5F9EA0";
  this.white = "#ffffff";
  this.startX = 700;
  this.startY = 150;
  this.startArrayY = 400;

  // this.implementAction(this.initStateBox.bind(this), "start");
};

Sort.prototype.initStateBox = function (state) {
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

Sort.prototype.initCallBack = function (length) {
  var insertValue = length;
  if (insertValue != "") {
    // set text value
    // this.insertField.value = "";
    this.implementAction(this.initArray.bind(this), insertValue);
  } else {
    alert("Please enter the length of the array");
  }
};

Sort.prototype.selectSortCallBack = function (event) {
  this.implementAction(this.selectSort.bind(this), 0);
};

Sort.prototype.insertSortCallBack = function (event) {
  this.implementAction(this.insertSort.bind(this), 1);
};

Sort.prototype.bubbleSortCallBack = function (event) {
  this.implementAction(this.bubbleSort.bind(this), 0);
};

Sort.prototype.shellSortCallBack = function (event) {
  this.implementAction(this.shellSort.bind(this), 0);
};

Sort.prototype.quickSortCallBack = function (event) {
  //this.implementAction(this.QuickSort.bind(this), [0,this.maxSize-1]);
  this.iID = this.objectID++;
  this.jID = this.objectID++;

  // this.cmd(
  //   "CREATEPOINTER",
  //   this.iID,
  //   "I",
  //   20,
  //   "up",
  //   this.arrayList[0].x,
  //   this.startArrayY + 10
  // );
  // this.cmd(
  //   "CREATEPOINTER",
  //   this.jID,
  //   "J",
  //   20,
  //   "up",
  //   this.arrayList[this.maxSize - 1].x,
  //   this.startArrayY + 10
  // );
  this.cmd(
    "CreateRectangle",
    this.iID,
    "I",
    0,
    0,
    "left",
    "top",
    this.arrayList[0].x,
    this.startArrayY + 40
  );
  this.cmd(
    "CreateRectangle",
    this.jID,
    "J",
    0,
    0,
    "left",
    "top",
    this.arrayList[this.maxSize - 1].x,
    this.startArrayY + 40
  );
  this.QuickSort(0, this.maxSize - 1);
  this.cmd("Delete", this.iID);
  this.cmd("Delete", this.jID);
};

Sort.prototype.mergeSortCallBack = function (event) {
  this.implementAction(this.ToCirle.bind(this));
  this.implementAction(this.divide.bind(this), [0, this.maxSize - 1]);
  this.implementAction(this.MergeSort.bind(this), [0, this.maxSize - 1]);
};

Sort.prototype.initArray = function (value) {
  value = parseInt(value);
  if (isNaN(value)) {
    this.cmd("SetState", "The array length should be between 2-30");
    return this.commands;
  }
  if (value < 2 || value > 30) {
    this.cmd("SetState", "The length of the array should be between 2-30.");
    return this.commands;
  }
  if (this.flag) {
    for (var j = 0; j < this.maxSize; j++) {
      this.cmd("DELETE", this.arrayList[j].objectID);
    }
  }
  if (this.circleList != null) {
    for (var i = 0; i < this.circleList.length; i++) {
      if (this.circleList[i] != null) {
        this.cmd("DELETE", this.circleList[i].objectID);
      }
    }
  }
  this.maxSize = value;
  this.arrayList = new Array(value);
  this.arrayData = new Array(value);
  this.cmd("Step");

  {
    this.cmd("SetState", "Create a size of" + value + "Array of");
    this.cmd("Step");
  }
  for (var i = 0; i < this.maxSize; i++) {
    this.flag = 1;
    this.arrayData[i] = Math.floor(1 + Math.random() * 50);
    this.arrayList[i] = new ArrayNode(
      this.objectID,
      this.arrayData[i],
      parseInt(this.startX + i * this.width),
      this.startArrayY
    );
    this.objectID++;

    {
      this.cmd(
        "CreateRectangle",
        this.arrayList[i].objectID,
        this.arrayList[i].value,
        this.width,
        30 + this.height * this.arrayList[i].value,
        "center",
        "bottom",
        this.arrayList[i].x,
        this.arrayList[i].y
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[i].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
    }
  }
  this.cmd("Step");

  return this.commands;
};

Sort.prototype.selectSort = function (value) {
  //this.point=value;
  this.cmd("selectSort");
  for (var i = value; i < this.maxSize - 1; i++) {
    this.cmd("SETSTEP1");
    this.min_pos = i;
    // console.log("hahah", this.cmd);
    this.cmd("SetState", "From location " + i + 1 + " Start sorting");
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[this.min_pos].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[this.min_pos].objectID,
      this.palegreen
    );
    this.min = this.arrayList[i].value;
    for (var j = i + 1; j < this.maxSize; j++) {
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );

      this.cmd("SetState", "From location " + i + " Find min value ");

      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd("Step");
      if (this.arrayList[j].value < this.min) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[this.min_pos].objectID,
          this.foregroundColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[this.min_pos].objectID,
          "#FFFFFF"
        );
        this.cmd(
          "SetState",
          "Location" + i + " Find min value = true, update min value "
        );
        this.cmd("SETSTEP2");

        this.min = this.arrayList[j].value;
        this.min_pos = j;
      } else {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j].objectID,
          this.foregroundColor
        );
        this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      }
    }
    if (this.min_pos != i) {
      //
      this.cmd("SetState", "Location " + i + " swap to " + this.min_pos);
      this.cmd("SETSTEP3");
      this.swap(i, this.min_pos);
    }
    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[i].objectID,
      this.backgroundColor
    );
  }
  this.cmd(
    "SetForegroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.backgroundColor
  );
  this.cmd("SetState", "finished sorting");

  return this.commands;
};

Sort.prototype.insertSort = function (value) {
  this.cmd("INSERTSORT");
  for (var i = value; i < this.maxSize; i++) {
    this.cmd("SetState", "From location" + (i + 1) + " start sorting");
    this.cmd("SETSTEP1");
    this.cmd("Step");
    var j = i;
    while (j > 0) {
      this.cmd("SETSTEP2");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.palegreen
      );
      this.cmd("Step");
      if (this.arrayList[j - 1].value <= this.arrayList[j].value) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j].objectID,
          this.foregroundColor
        ); //
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[j].objectID,
          this.backgroundColor
        );
        this.cmd(
          "SetForegroundColor",
          this.arrayList[j - 1].objectID,
          this.foregroundColor
        ); //
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[j - 1].objectID,
          this.backgroundColor
        );
        break;
      }
      // this.cmd("SetState", "ahsycxhasydhads");
      this.cmd(
        "SetState",
        this.arrayList[j - 1].value + ">=" + this.arrayList[j].value + "=>true"
      );
      this.cmd("SETSTEP3");
      this.swap(j - 1, j);
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      ); //
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.backgroundColor
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      ); //
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.backgroundColor
      );
      j--;
    }
  }
  this.cmd("SetState", "Complete sorting");
  return this.commands;
};

Sort.prototype.bubbleSort = function (value) {
  this.cmd("BUBBLESORT");
  var flag = 1; // is sorted
  for (var i = value; i < this.maxSize - 1; i++) {
    this.cmd("SETSTEP1");

    flag = 1;
    this.cmd("SetState", "NS" + (i + 1) + "Round sorting");
    this.cmd("Step");
    for (var j = this.maxSize - 1; j > i; j--) {
      this.cmd("SETSTEP2");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.palegreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j - 1].objectID,
        this.palegreen
      );
      this.cmd("Step");

      if (this.arrayList[j - 1].value > this.arrayList[j].value) {
        this.cmd("SETSTEP3");
        this.swap(j - 1, j);
        flag = 0;
      }
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j - 1].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.arrayList[j - 1].objectID, "#FFFFFF");
    }
    // the array is sorted
    if (flag == 1) {
      this.cmd("SetState", "The array has been sorted");
      break;
    }
    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[i].objectID,
      this.backgroundColor
    );
  }
  this.cmd(
    "SetForegroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.arrayList[this.maxSize - 1].objectID,
    this.backgroundColor
  );
  return this.commands;
};

Sort.prototype.shellSort = function (value) {
  var gap = Math.floor(this.maxSize / 2);
  while (gap != 0) {
    var group = Math.floor(this.maxSize / gap);
    for (; group > 0; group--) {
      var start = (group - 1) * gap;
      this.MoveRange(start, start + gap - 1, (group - 1) * 20);
      this.cmd("Step");
    }
    //this.cmd("",);
    for (var i = 0; i < gap; i++) {
      for (var j = i; j < this.maxSize; j += gap) {
        for (var j1 = j; j1 < this.maxSize; j1 += gap) {
          this.cmd(
            "SetForegroundColor",
            this.arrayList[j1].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[j1].objectID,
            this.tomato
          );
        }
        var inc = j;
        while (inc >= gap) {
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc].objectID,
            this.tomato
          );
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc - gap].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc - gap].objectID,
            this.tomato
          );
          this.cmd("Step");
          if (this.arrayList[inc].value >= this.arrayList[inc - gap].value) {
            this.cmd(
              "SetForegroundColor",
              this.arrayList[inc].objectID,
              this.foregroundColor
            );
            this.cmd(
              "SetBackgroundColor",
              this.arrayList[inc].objectID,
              "#FFFFFF"
            );
            this.cmd(
              "SetForegroundColor",
              this.arrayList[inc - gap].objectID,
              this.foregroundColor
            );
            this.cmd(
              "SetBackgroundColor",
              this.arrayList[inc - gap].objectID,
              "#FFFFFF"
            );
            break;
          }
          this.swap(inc - gap, inc);
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc].objectID,
            "#FFFFFF"
          );
          this.cmd(
            "SetForegroundColor",
            this.arrayList[inc - gap].objectID,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.arrayList[inc - gap].objectID,
            "#FFFFFF"
          );
          inc -= gap;
        }
      }
    }
    this.cmd("Step");
    for (var i1 = 0; i1 < this.maxSize; i1++) {
      this.arrayList[i1].x = parseInt(this.startX + i1 * this.width);
      this.cmd(
        "Move",
        this.arrayList[i1].objectID,
        parseInt(this.startX + i1 * this.width),
        this.startArrayY
      );
    }
    this.cmd("Step");
    gap = Math.floor(gap / 2);
  }
  return this.commands;
};

Sort.prototype.QuickSort = function (low, high) {
  // var low=valueArr[0];
  // var high=valueArr[1];
  this.cmd("QuickSort");
  if (high < low) {
    return;
  }
  this.cmd("step");
  var i = low + 1;
  var j = high;
  this.cmd("SETSTEP1");
  var pivot = this.arrayList[low].value;

  this.pivotStateID = this.objectID;
  this.objectID++;
  {
    this.cmd("Step");
    var y = parseInt(
      this.startArrayY - (this.height * this.arrayList[low].value) / 2
    );

    this.cmd("SetState", "create checkpoint at " + this.arrayList[low].value);

    this.cmd(
      "CREATECIRCLE",
      this.pivotStateID,
      this.arrayList[low].value,
      this.arrayList[low].x,
      y,
      0
    );

    // this.cmd("SetForegroundColor", this.arrayList[i].objectID, "red");
    // this.cmd("SetBackgroundColor", this.pivotStateID, "red");
    this.cmd("Step");
    this.cmd("Move", this.pivotStateID, this.arrayList[low].y, 240);
    this.cmd("Step");
  }
  if (i == this.maxSize) {
    this.cmd(
      "Move",
      this.iID,
      this.arrayList[i - 1].x + this.width,
      this.startArrayY + 40
    );
    this.cmd(
      "Move",
      this.jID,
      this.arrayList[j - 1].x + this.width,
      this.startArrayY + 40
    );
    this.cmd("Step");
  } else {
    this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 40);
    this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 40);
    this.cmd("Step");
  }
  //this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 40);
  //this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 40);
  //this.cmd("Step");
  while (i <= j) {
    this.cmd("SETSTEP2");

    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.lightgreen);
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[low].objectID,
      this.lightgreen
    );
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[i].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    while (i <= j && this.arrayList[i].value < pivot) {
      this.cmd("SetState", "Find element >=" + pivot);
      i++;
      if (i == this.maxSize) {
        this.cmd(
          "Move",
          this.iID,
          this.arrayList[i - 1].x + this.width,
          this.startArrayY + 40
        );
        this.cmd("Step");
      } else {
        this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 40);
        this.cmd("Step");
      }
      if (i <= j) {
        this.cmd(
          "SetForegroundColor",
          this.arrayList[i].objectID,
          this.foregroundColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[i].objectID,
          this.lightgreen
        );
        this.cmd(
          "SetForegroundColor",
          this.arrayList[low].objectID,
          this.foregroundColor
        );
        this.cmd(
          "SetBackgroundColor",
          this.arrayList[low].objectID,
          this.lightgreen
        );
        this.cmd("Step");
        this.cmd(
          "SetForegroundColor",
          this.arrayList[i].objectID,
          this.foregroundColor
        );
        this.cmd("SetBackgroundColor", this.arrayList[i].objectID, "#FFFFFF");
        this.cmd(
          "SetForegroundColor",
          this.arrayList[low].objectID,
          this.foregroundColor
        );
        this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
      }
    }

    this.cmd(
      "SetForegroundColor",
      this.arrayList[j].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.lightgreen);
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.arrayList[low].objectID,
      this.lightgreen
    );
    this.cmd("Step");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[j].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
    this.cmd(
      "SetForegroundColor",
      this.arrayList[low].objectID,
      this.foregroundColor
    );
    this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    while (j >= i && this.arrayList[j].value > pivot) {
      this.cmd("SETSTEP2");
      this.cmd("SetState", "Find element <=" + pivot);
      j--;
      this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 40);
      this.cmd("Step");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[j].objectID,
        this.lightgreen
      );
      this.cmd(
        "SetForegroundColor",
        this.arrayList[low].objectID,
        this.foregroundColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.arrayList[low].objectID,
        this.lightgreen
      );
      this.cmd("Step");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[j].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.arrayList[j].objectID, "#FFFFFF");
      this.cmd(
        "SetForegroundColor",
        this.arrayList[low].objectID,
        this.foregroundColor
      );
      this.cmd("SetBackgroundColor", this.arrayList[low].objectID, "#FFFFFF");
    }
    if (i <= j) {
      this.cmd("SETSTEP3");

      this.cmd(
        "SetState",
        "Swap " + this.arrayList[i].value + " & " + this.arrayList[j].value
      );
      this.cmd(
        "Move",
        this.iID,
        this.arrayList[i + 1].x,
        this.startArrayY + 40
      );
      this.cmd(
        "Move",
        this.jID,
        this.arrayList[j - 1].x,
        this.startArrayY + 40
      );

      this.swap(i, j);
      i++;
      j--;
    }
  }

  this.swap(low, j);
  //this.cmd("DISCONNECT",this.pivotStateID,this.arrayList[low].objectID);
  // this.cmd("SetState", this.arrayList[j].value);
  //hightlight element checked-------------------
  this.cmd("SETSTEP4");
  this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen);
  // this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.white);
  this.cmd("DELETE", this.pivotStateID);
  this.cmd("Step");
  this.QuickSort(low, j - 1);
  this.QuickSort(j + 1, high);
  this.cmd("setState", "Complete sorting");
  return this.commands;
};

Sort.prototype.ToCirle = function () {
  //this.startX=300;
  this.circleList = new Array(this.maxSize);
  for (var i = 0; i < this.maxSize; i++) {
    var y = parseInt(
      this.startArrayY - (this.height * this.arrayList[i].value) / 2
    );
    this.circleList[i] = new ArrayNode(
      this.objectID,
      this.arrayData[i],
      this.arrayList[i].x,
      y
    );
    this.objectID++;
    {
      this.cmd("Step");
      this.cmd(
        "CREATECIRCLE",
        this.circleList[i].objectID,
        this.circleList[i].value,
        this.circleList[i].x,
        this.circleList[i].y,
        15
      );
      //this.cmd("SetForegroundColor", this.arrayList[i].objectID, "red") ;
      this.cmd("SetBackgroundColor", this.circleList[i].objectID, "#FFFFFF");
      this.cmd("Step");
    }
  }
  this.cmd("Step");
  for (var j = 0; j < this.maxSize; j++) {
    this.cmd("Step");
    this.cmd("DELETE", this.arrayList[j].objectID);
    this.cmd("Step");
  }
  this.cmd("Step");
  this.MoveToStart(100, 150);
  return this.commands;
};

Sort.prototype.divide = function (valueArr) {
  var low = valueArr[0];
  var high = valueArr[1];
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    this.CircleMoveRange(mid + 1, this.maxSize - 1, 20);
    this.cmd("Step");
    this.divide([low, mid]);
    //this.cmd("Step");
    this.divide([mid + 1, high]);
    //this.cmd("Step");
  }
  this.cmd("Step");
  return this.commands;
};

Sort.prototype.MergeSort = function (valueArr) {
  var low = valueArr[0];
  var high = valueArr[1];
  if (low < high) {
    var mid = Math.floor((low + high) / 2);
    this.MergeSort([low, mid]);
    this.MergeSort([mid + 1, high]);
    var leftIndex = low;
    var rightIndex = mid + 1;
    var k = low;
    var InsertArray = new Array(high - low + 1);
    for (var j = 0; j < high - low + 1; j++) {
      InsertArray[j] = new ArrayNode("", "", "", "");
    }
    var index = 0;
    while (leftIndex <= mid && rightIndex <= high) {
      if (
        this.circleList[leftIndex].value <= this.circleList[rightIndex].value
      ) {
        this.cmd(
          "SetState",
          this.circleList[leftIndex].value +
            "<=" +
            this.circleList[rightIndex].value
        );
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[leftIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[leftIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[leftIndex];
        k++;
        leftIndex++;
      } else {
        this.cmd(
          "SetState",
          this.circleList[leftIndex].value +
            ">" +
            this.circleList[rightIndex].value
        );
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[rightIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[rightIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[rightIndex];
        k++;
        rightIndex++;
      }
    }
    if (leftIndex <= mid) {
      while (leftIndex <= mid) {
        this.cmd("SetState", " ");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[leftIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[leftIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[leftIndex];
        k++;
        leftIndex++;
      }
    } else {
      while (rightIndex <= high) {
        this.cmd("SetState", " ");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.circleList[rightIndex].objectID,
          this.startX + k * this.width,
          300
        );
        this.cmd("Step");
        this.circleList[rightIndex].x = this.startX + k * this.width;
        InsertArray[index++] = this.circleList[rightIndex];
        k++;
        rightIndex++;
      }
    }
    for (var i1 = 0, i2 = low; i1 < index, i2 <= high; i1++, i2++) {
      this.circleList[i2] = InsertArray[i1];
    }
    for (var i = low; i <= high; i++) {
      this.cmd(
        "Move",
        this.circleList[i].objectID,
        this.circleList[i].x,
        this.circleList[i].y
      );
    }
    this.cmd("Step");
  }
  return this.commands;
};

Sort.prototype.swap = function (index1, index2) {
  var distance = this.arrayList[index2].x - this.arrayList[index1].x;
  minNode = new ArrayNode("", "", "", "");
  minNode = this.arrayList[index2];
  this.arrayList[index2] = this.arrayList[index1];
  this.arrayList[index1] = minNode;

  this.arrayList[index2].x += distance;
  this.cmd(
    "Move",
    this.arrayList[index2].objectID,
    this.arrayList[index2].x,
    this.arrayList[index2].y
  );

  this.arrayList[index1].x -= distance;
  this.cmd(
    "Move",
    this.arrayList[index1].objectID,
    this.arrayList[index1].x,
    this.arrayList[index1].y
  );
  this.cmd("Step");
};

var ArrayNode = function (objectID, value, x, y) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
};

Sort.prototype.MoveRange = function (start, end, distance) {
  for (var i = start; i <= end; i++) {
    this.arrayList[i].x += distance;
    this.cmd(
      "Move",
      this.arrayList[i].objectID,
      this.arrayList[i].x,
      this.arrayList[i].y
    );
  }
};
Sort.prototype.CircleMoveRange = function (start, end, distance) {
  for (var i = start; i <= end; i++) {
    this.circleList[i].x += distance;
    this.cmd(
      "Move",
      this.circleList[i].objectID,
      this.circleList[i].x,
      this.circleList[i].y
    );
  }
};
Sort.prototype.MoveToStart = function (x, y) {
  for (var i = 0; i < this.maxSize; i++) {
    this.cmd("Step");
    if (i == this.maxSize - 1) {
      this.circleList[i].x = x + i * 32;
      this.circleList[i].y = y - 2;
    } else {
      this.circleList[i].x = x + i * 32;
      this.circleList[i].y = y;
    }
    this.cmd(
      "Move",
      this.circleList[i].objectID,
      this.circleList[i].x,
      this.circleList[i].y
    );
    this.cmd("Step");
  }
};
