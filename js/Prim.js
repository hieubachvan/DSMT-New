// JavaScript Document

var currentGraph;

var directedGraphCurveWithSingleEdge = 0.0;
var directedGraphCurveWithDoubleEdge = 0.15;
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6;
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentGraph = new Graph(animationManager, drawing.width, drawing.height);
  currentGraph.implementAction(
    currentGraph.initGraph.bind(currentGraph),
    initialVertexNum
  );

  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    3,
    5,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    2,
    1,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    0,
    1,
    6,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    2,
    3,
    5,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    1,
    2,
    5,
    false,
  ]);

  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    1,
    4,
    3,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    2,
    4,
    6,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    4,
    5,
    6,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    3,
    5,
    2,
    false,
  ]);
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    2,
    5,
    4,
    false,
  ]);
}

function getRandomNumber(lowerBound, upperBound) {
  var range = upperBound - lowerBound + 1;
  var rand = Math.round(Math.random() * 100);
  return (rand % range) + lowerBound;
}

function GraphEdge(startVertex, endVertex, weight) {
  if (weight == null) {
    this.weight = 0;
  } else {
    this.weight = weight;
  }
  this.startVertex = startVertex;
  this.endVertex = endVertex;
}

GraphEdge.prototype = {
  constructor: GraphEdge,
};

var Graph = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initialize();
};

Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

Graph.prototype.initialize = function () {
  this.directed = false;
  this.showEdgeWeight = true;
  $(".runPrimNumber").val("0");
  $(".weightPrimNumber").val("10");

  this.objectID = 0;
  this.highlightCircleID;
  this.MSTSetCircleID;
  this.setID; // set, 0:label U, 1:rect U, 2:label U-V, 3:rect U-V
  this.hintStartX = 600;
  this.hintStartY = 50;
  this.hintWidth = 150;
  this.hintInterval = 4;

  this.radius = 26;

  this.R = 150;
  this.X0 = 250;
  this.Y0 = 250;

  this.foregroundColor = "#1E90FF";
  this.backgroundColor = "#B0E0E6";
  this.highlightColor = "#FF0000";
};

addEdgeCallBack = function (startVertex, endVertex, weight) {
  if (isNaN(weight) || weight == null) {
    weight = 10;
  }
  currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [
    startVertex,
    endVertex,
    weight,
  ]);
};

delEdgeCallBack = function (startVertex, endVertex) {
  currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [
    startVertex,
    endVertex,
  ]);
};

runPrimCallBack = function (startVertex) {
  startVertex = startVertex == null || isNaN(startVertex) ? 0 : startVertex;
  currentGraph.implementAction(
    currentGraph.clearHintArea.bind(currentGraph),
    0
  );
  currentGraph.implementAction(
    currentGraph.Prim.bind(currentGraph),
    startVertex
  );
};

randomGraphCallBack = function () {
  do {
    currentGraph.implementAction(
      currentGraph.clearAllEdges.bind(currentGraph),
      0
    );
    currentGraph.implementAction(
      currentGraph.getRandomGraph.bind(currentGraph),
      0
    );
  } while (!currentGraph.isAllConnected());
};

showEdgeWeightSwitch = function (show) {
  if (show != null) {
    currentGraph.showEdgeWeight = show;
    currentGraph.implementAction(
      currentGraph.showEdgeWeightFunc.bind(currentGraph),
      show
    );
  }
};

directedGraphSwitch = function (directed) {
  if (directed != null) {
    currentGraph.implementAction(
      currentGraph.clearAllEdges.bind(currentGraph),
      0
    );
    currentGraph.directed = directed;

    currentGraph.implementAction(
      currentGraph.getRandomGraph.bind(currentGraph),
      0
    );
  }
};

vertexNumSelectChangeCallBack = function (newVertexNum) {
  if (
    !isNaN(parseInt(newVertexNum)) &&
    parseInt(newVertexNum) >= 3 &&
    parseInt(newVertexNum) <= 10
  ) {
    objectManager = null;
    currentGraph = null;
    animationManager = null;

    objectManager = new ObjectManager();
    animationManager = new AnimationManager(objectManager);
    currentGraph = new Graph(animationManager, drawing.width, drawing.height);
    currentGraph.implementAction(
      currentGraph.initGraph.bind(currentGraph),
      parseInt(newVertexNum)
    );
  } else {
    alert("The value range of the number of vertices should be 3-10 !");
  }
};

// var vertexNumSelect;

// var randomGraphButton;
// var startVertexText;
// var endVertexText;
// var edgeWeightText;
// var addEdgeButton;
// var delEdgeButton;

// var PrimStartVertexText;
// var runPrimButton;

// var showEdgeWeight;
// var directedGraph;
// var undirectedGraph;

Graph.prototype.addControls = function () {
  addLabelToAlgorithmBar("Number of vertices");
  var vertexNumList = [3, 4, 5, 6, 7, 8, 9, 10];
  vertexNumSelect = addSelectToAlgorithmBar(vertexNumList);
  vertexNumSelect.onchange = vertexNumSelectChangeCallBack;

  for (var i = 0; i < vertexNumSelect.length; i++) {
    if (vertexNumSelect.options[i].value == initialVertexNum) {
      vertexNumSelect.options[i].selected = true;
    }
  }

  addLabelToAlgorithmBar("starting point");
  startVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("end");
  endVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("Weights");
  edgeWeightText = addInputToAlgorithmBar("text", "");
  edgeWeightText.value = "10";
  addEdgeButton = addInputToAlgorithmBar("button", "Add edge");
  addEdgeButton.onclick = addEdgeCallBack;
  delEdgeButton = addInputToAlgorithmBar("button", "Delete edge");
  delEdgeButton.onclick = delEdgeCallBack;
  randomGraphButton = addInputToAlgorithmBar("button", "Generate random graph");
  randomGraphButton.onclick = randomGraphCallBack;

  addLabelToAlgorithmBar("Prim starting vertex");
  PrimStartVertexText = addInputToAlgorithmBar("text", "0");

  runPrimButton = addInputToAlgorithmBar("button", "Run Prim");
  runPrimButton.onclick = runPrimCallBack;

  showEdgeWeight = addCheckboxToAlgorithmBar("Show edge weights");
  showEdgeWeight.onclick = showEdgeWeightSwitch;
  showEdgeWeight.checked = true;
  showEdgeWeight.disabled = true;

  var directedGraphList = addRadioButtonGroupToAlgorithmBar(
    ["directed Graph", "undirected Graph"],
    "GraphType"
  );
  directedGraph = directedGraphList[0];
  undirectedGraph = directedGraphList[1];
  directedGraph.onclick = directedGraphSwitch;
  undirectedGraph.onclick = directedGraphSwitch;
  undirectedGraph.checked = true;
  directedGraph.disabled = true;
  undirectedGraph.disabled = true;
};

Graph.prototype.initGraph = function (vertexNum) {
  this.vertexNum = vertexNum;
  // set, 0:label U, 1:rect U, 2:label U-V, 3:rect U-V
  var setNum = 4;
  this.setID = new Array(setNum);
  for (var i = 0; i < setNum; i++) {
    this.setID[i] = this.vertexNum + i;
  }

  this.highlightConnectArray = new Array();
  this.highlightCircleID = new Array(vertexNum);
  this.MSTSetCircleID = new Array(vertexNum);

  for (var i = 0; i < vertexNum; i++) {
    this.highlightCircleID[i] = 2 * this.vertexNum + i + setNum;
    this.MSTSetCircleID[i] = this.vertexNum + i + setNum;
  }

  this.edgeNum = 0;
  this.matrix = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.matrix[i] = new Array(this.vertexNum);
    for (var j = 0; j < this.vertexNum; j++) {
      this.matrix[i][j] = 0;
    }
  }
  this.position = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.position[i] = new Array(2);
  }

  this.R = this.R + 20 * (this.vertexNum - 5);
  this.R = this.R > 220 ? 220 : this.R;
  for (var i = 0; i < this.vertexNum; i++) {
    this.position[i][0] = Math.round(
      this.X0 + this.R * Math.sin((2 * Math.PI * i) / this.vertexNum)
    );
    this.position[i][1] = Math.round(
      this.Y0 - this.R * Math.cos((2 * Math.PI * i) / this.vertexNum)
    );
  }

  for (var i = 0; i < this.vertexNum; i++) {
    //this.graphObjectID[i] = -1 ;
    this.cmd(
      "CreateCircle",
      this.objectID,
      this.objectID,
      this.position[this.objectID][0],
      this.position[this.objectID][1],
      this.radius
    );
    this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.objectID, "#FFFFFF");
    this.objectID++;
  }

  // label * 2
  this.cmd(
    "CreateLabel",
    this.setID[0],
    "U",
    this.hintStartX,
    this.hintStartY - 30
  );
  this.cmd("SetForegroundColor", this.setID[0], this.foregroundColor);
  this.cmd("SetBackgroundColor", this.setID[0], this.backgroundColor);
  this.cmd(
    "CreateLabel",
    this.setID[2],
    "U-V",
    this.hintStartX + this.hintWidth,
    this.hintStartY - 30
  );
  this.cmd("SetForegroundColor", this.setID[2], this.foregroundColor);
  this.cmd("SetBackgroundColor", this.setID[2], this.backgroundColor);
  // rect * 2
  this.cmd(
    "CreateRectangle",
    this.setID[1],
    "",
    50,
    this.vertexNum * (2 * this.radius + this.hintInterval),
    "center",
    "top",
    this.hintStartX,
    this.hintStartY - 20
  );
  this.cmd("SetForegroundColor", this.setID[1], this.foregroundColor);
  this.cmd("SetBackgroundColor", this.setID[1], this.backgroundColor);
  this.cmd(
    "CreateRectangle",
    this.setID[3],
    "",
    50,
    this.vertexNum * (2 * this.radius + this.hintInterval),
    "center",
    "top",
    this.hintStartX + this.hintWidth,
    this.hintStartY - 20
  );
  this.cmd("SetForegroundColor", this.setID[3], this.foregroundColor);
  this.cmd("SetBackgroundColor", this.setID[3], this.backgroundColor);

  return this.commands;
};

Graph.prototype.showEdgeWeightFunc = function (show) {
  //alert("show Edge weight");

  if (this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", i, j);
        }
      }
    }

    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          var label = show ? this.matrix[i][j] : "";
          var curve = this.matrix[j][i]
            ? directedGraphCurveWithDoubleEdge
            : directedGraphCurveWithSingleEdge;
          this.cmd(
            "Connect",
            i,
            j,
            this.foregroundColor,
            curve,
            this.directed,
            label
          );
        }
      }
    }
  } else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[j][i]) {
          this.cmd("Disconnect", j, i);
        }
      }
    }

    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[j][i]) {
          var label = show ? this.matrix[i][j] : "";
          this.cmd(
            "Connect",
            j,
            i,
            this.foregroundColor,
            undirectedGraphCurve,
            this.directed,
            label
          );
        }
      }
    }
  }
  return this.commands;
};

Graph.prototype.clearAllEdges = function () {
  //alert("clearAllEdges");

  //alert(this.directed);
  if (this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", i, j);
          this.matrix[i][j] = 0;
        }
      }
    }
  } else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", j, i);
          this.matrix[i][j] = 0;
          this.matrix[j][i] = 0;
        }
      }
    }
  }
  this.edgeNum = 0;
  return this.commands;
};

Graph.prototype.getRandomGraph = function () {
  if (!this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (getRandomNumber(0, 1)) {
          this.addEdge([j, i, getRandomNumber(1, 100), false]);
        }
      }
    }
  } else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (i != j) {
          //alert(i +" "+j +":"+this.matrix[i][j] );

          if (getRandomNumber(0, 1)) {
            this.addEdge([i, j, getRandomNumber(1, 100), false]);
          }
        }
      }
    }
  }
  //alert(this.matrix);
  return this.commands;
};

Graph.prototype.addEdge = function () {
  var startVertex = arguments[0][0];
  var endVertex = arguments[0][1];
  var weight = arguments[0][2];
  var withAnimation = arguments[0].length > 3 ? arguments[0][3] : true; // bool

  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex illeagl");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex illeagl");
    return this.commands;
  }
  if (weight <= 0) {
    alert("weight illeagl");
    return this.commands;
  }

  if (this.directed) {
    if (this.matrix[startVertex][endVertex]) {
      alert("this edge already exists");
      return this.commands;
    }
  } else {
    if (
      this.matrix[startVertex][endVertex] ||
      this.matrix[endVertex][startVertex]
    ) {
      alert("this edge already exists");
      return this.commands;
    }
  }

  if (withAnimation) {
    this.cmd("SetHighlight", startVertex, true);
    this.cmd("SetHighlight", endVertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", startVertex, false);
    this.cmd("SetHighlight", endVertex, false);
    this.cmd("Step");
  }
  //this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

  if (this.directed) {
    this.matrix[startVertex][endVertex] = weight;
    var label1 = this.showEdgeWeight ? this.matrix[startVertex][endVertex] : "";
    var label2 = this.showEdgeWeight ? this.matrix[endVertex][startVertex] : "";

    if (this.matrix[endVertex][startVertex]) {
      this.cmd("Disconnect", endVertex, startVertex);
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        directedGraphCurveWithDoubleEdge,
        this.directed,
        label1
      );
      this.cmd(
        "Connect",
        endVertex,
        startVertex,
        this.foregroundColor,
        directedGraphCurveWithDoubleEdge,
        this.directed,
        label2
      );
    } else {
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        directedGraphCurveWithSingleEdge,
        this.directed,
        label1
      );
    }
  } else {
    this.matrix[startVertex][endVertex] = weight;
    this.matrix[endVertex][startVertex] = weight;
    var label = this.showEdgeWeight ? weight : "";
    if (startVertex > endVertex) {
      var tmp = startVertex;
      startVertex = endVertex;
      endVertex = tmp;
    }
    this.cmd(
      "Connect",
      startVertex,
      endVertex,
      this.foregroundColor,
      undirectedGraphCurve,
      this.directed,
      label
    );
  }
  /* changed */
  this.edgeNum++;
  return this.commands;
};

Graph.prototype.delEdge = function () {
  startVertex = arguments[0][0];
  endVertex = arguments[0][1];

  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex illeagl.");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex illeagl.");
    return this.commands;
  }

  if (!this.directed && startVertex > endVertex) {
    var tmp = startVertex;
    startVertex = endVertex;
    endVertex = tmp;
  }
  if (!this.matrix[startVertex][endVertex]) {
    alert("this edge do not exists.");
    return this.commands;
  }

  this.cmd("SetHighlight", startVertex, true);
  this.cmd("SetHighlight", endVertex, true);
  this.cmd("Step");
  this.cmd("SetHighlight", startVertex, false);
  this.cmd("SetHighlight", endVertex, false);
  this.cmd("Step");
  //this.cmd("Disconnect", startVertex, endVertex);

  if (this.directed) {
    this.cmd("Disconnect", startVertex, endVertex);
    this.matrix[startVertex][endVertex] = 0;
    if (this.matrix[endVertex][startVertex]) {
      var label = this.showEdgeWeight
        ? this.matrix[endVertex][startVertex]
        : "";
      this.cmd("Disconnect", endVertex, startVertex);
      this.cmd(
        "Connect",
        endVertex,
        startVertex,
        this.foregroundColor,
        directedGraphCurveWithSingleEdge,
        this.directed,
        label
      );
    }
  } else {
    //alert(startVertex+" "+endVertex);
    this.cmd("Disconnect", startVertex, endVertex);
    this.matrix[startVertex][endVertex] = 0;
    this.matrix[endVertex][startVertex] = 0;
  }
  this.edgeNum--;
  return this.commands;
};

Graph.prototype.setConnectLineHighlight = function (
  startVertex,
  endVertex,
  highlight
) {
  this.cmd("Disconnect", startVertex, endVertex);
  if (this.showEdgeWeight && !this.directed) {
    var curve = 0.0;
    var label = this.matrix[startVertex][endVertex];
    if (highlight) {
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.highlightColor,
        curve,
        false,
        label
      );
      //this.highlightConnectArray.push([startVertex, endVertex]);
    } else {
      this.cmd(
        "Connect",
        startVertex,
        endVertex,
        this.foregroundColor,
        curve,
        false,
        label
      );
    }
  }
  return this.commands;
};

// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
  for (var i = 0; i < this.vertexNum; i++) {
    if (this.matrix[vertex][i]) {
      var edge = new GraphEdge(vertex, i, this.matrix[vertex][i]);
      return edge;
    }
  }
  return null;
};

Graph.prototype.nextEdge = function (edge) {
  for (var i = edge.endVertex + 1; i < this.vertexNum; i++) {
    if (this.matrix[edge.startVertex][i]) {
      edge.endVertex = i;
      edge.weight = this.matrix[edge.startVertex][i];
      return edge;
    }
  }
  return null;
};

// DFS
Graph.prototype.DFS = function (vertex) {
  this.visited[vertex] = true;
  //alert("DFS:"+vertex);
  for (var edge = this.firstEdge(vertex); ; edge = this.nextEdge(edge)) {
    if (edge == null) {
      return null;
    }
    if (!this.visited[edge.endVertex]) {
      this.DFS(edge.endVertex);
    }
  }
};
//
Graph.prototype.clearHighlightCircle = function () {
  for (var i = 0; i < this.highlightCircleID.length; i++) {
    try {
      this.cmd("Delete", this.highlightCircleID[i]);
    } catch (error) {}
  }
  return this.commands;
};
//
Graph.prototype.clearHintArea = function () {
  if (typeof this.addNew == "undefined") {
    return this.commands;
  }
  for (var i = 0; i < this.vertexNum; i++) {
    if (this.addNew[i] == -1) {
      try {
        this.cmd("Delete", this.MSTSetCircleID[i]);
      } catch (error) {
        // do nothing
      }
    }
  }
  return this.commands;
};

Graph.prototype.isAllConnected = function () {
  this.visited = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.visited[i] = false;
  }
  this.DFS(0);

  for (var i = 0; i < this.vertexNum; i++) {
    if (!this.visited[i]) {
      return false;
    }
  }

  this.visited = null;
  return true;
};

Graph.prototype.Prim = function (startVertex) {
  if (!this.isAllConnected()) {
    // alert("This graph is not a connected graph, algorithm cannot run. Please add some edges or get a new graph to retry the algorithm. ");
    this.cmd(
      "SetState",
      "The graph is not a connected graph, and the algorithm stops executing"
    );
    return this.commands;
  }

  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd("SetForegroundColor", i, this.foregroundColor);
  }

  while (this.highlightConnectArray.length) {
    var line = this.highlightConnectArray.pop();
    var startV = line[0];
    var endV = line[1];
    this.setConnectLineHighlight(startV, endV, false);
  }

  this.cmd("SetState", "Add all vertices to set U");
  var inSetCount = 0;
  var outSetCount = this.vertexNum;

  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd(
      "CreateCircle",
      this.MSTSetCircleID[i],
      i,
      this.hintStartX,
      this.hintStartY + i * (this.hintInterval + 2 * this.radius),
      this.radius - 8
    );
    this.cmd(
      "SetForegroundColor",
      this.MSTSetCircleID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.MSTSetCircleID[i],
      this.backgroundColor
    );
    //this.cmd("Step");
  }
  this.cmd("Step");
  this.cmd(
    "SetState",
    "The starting vertex of the algorithm<" + startVertex + ">Add to set U-V"
  );

  this.cmd(
    "Move",
    this.MSTSetCircleID[startVertex],
    this.hintStartX + this.hintWidth,
    this.hintStartY + inSetCount * (this.hintInterval + 2 * this.radius)
  );
  this.cmd(
    "SetForegroundColor",
    this.MSTSetCircleID[startVertex],
    this.highlightColor
  );
  this.cmd("Step");
  inSetCount++;
  outSetCount--;
  var INF = 10000;

  var edges = new Array();
  var lowCost = new Array(this.vertexNum);
  // addNew[v] = -1,
  this.addNew = new Array(this.vertexNum);

  for (var i = 0; i < this.vertexNum; i++) {
    this.addNew[i] = startVertex;
    if (this.matrix[startVertex][i]) {
      lowCost[i] = this.matrix[startVertex][i];
    } else {
      lowCost[i] = INF;
    }
  }

  this.addNew[startVertex] = -1;
  // this.cmd("CreateHighlightCircle", this.highlightCircleID[startVertex],
  // 		this.position[startVertex][0], this.position[startVertex][1], this.radius);
  this.cmd("SetForegroundColor", startVertex, this.highlightColor);
  this.cmd("Step");
  this.cmd("Step");

  for (var i = 1; i < this.vertexNum; i++) {
    var min = INF;
    var v = -1;
    for (var j = 0; j < this.vertexNum; j++) {
      if (this.addNew[j] > -1 && lowCost[j] != INF) {
        var fromV = j;
        var toV = this.addNew[j];
        this.cmd(
          "Connect",
          this.MSTSetCircleID[fromV],
          this.MSTSetCircleID[toV],
          this.foregroundColor,
          0.0,
          false,
          this.matrix[fromV][toV]
        );

        var tmp;
        fromV > toV ? ((tmp = fromV), (fromV = toV), (toV = tmp)) : true;
        this.cmd("SetLineHighlight", fromV, toV, true);
        this.cmd("Step");
        // this.cmd("Step");
        this.cmd("SetLineHighlight", fromV, toV, false);
        this.cmd("Step");
        // this.cmd("Step");
      }
      if (this.addNew[j] > -1 && lowCost[j] < min) {
        min = lowCost[j];
        v = j;
      }
    }
    if (v != -1) {
      if (this.addNew[v] < v) {
        var tmpEdge = new GraphEdge(
          this.addNew[v],
          v,
          this.matrix[this.addNew[v]][v]
        );
      } else {
        var tmpEdge = new GraphEdge(
          v,
          this.addNew[v],
          this.matrix[this.addNew[v]][v]
        );
      }

      this.cmd(
        "SetLineHighlight",
        this.MSTSetCircleID[v],
        this.MSTSetCircleID[this.addNew[v]],
        this.highlightColor
      );
      this.cmd("Step");

      this.cmd(
        "SetForegroundColor",
        this.MSTSetCircleID[v],
        this.highlightColor
      );

      this.cmd(
        "SetLineHighlight",
        tmpEdge.startVertex,
        tmpEdge.endVertex,
        true
      );
      this.cmd("Step");
      this.cmd(
        "SetLineHighlight",
        tmpEdge.startVertex,
        tmpEdge.endVertex,
        false
      );
      this.cmd("Step");

      this.setConnectLineHighlight(
        tmpEdge.startVertex,
        tmpEdge.endVertex,
        true
      );
      this.highlightConnectArray.push([tmpEdge.startVertex, tmpEdge.endVertex]);

      edges.push(tmpEdge);
      var tmp = this.addNew[v];
      this.addNew[v] = -1;
      var e = "<" + tmp + "," + v + ">";
      this.cmd(
        "SetState",
        "Find the edge with the smallest weight" +
          e +
          ",Will point<" +
          v +
          ">Add to collection U-V"
      );

      for (var j = 0; j < this.vertexNum; j++) {
        if (this.addNew[j] > -1 && lowCost[j] != INF) {
          var fromV = j;
          var toV = this.addNew[j];
          //(j > this.addNew[j]) ? (fromV = this.addNew[j], toV = j) : (fromV = j, toV = this.addNew[j] );
          this.cmd(
            "Disconnect",
            this.MSTSetCircleID[fromV],
            this.MSTSetCircleID[toV]
          );
        }
      }
      {
        this.cmd(
          "Move",
          this.MSTSetCircleID[v],
          this.hintStartX + this.hintWidth,
          this.hintStartY + inSetCount * (this.hintInterval + 2 * this.radius)
        );
        this.cmd("Step");
        this.cmd("Step");
        inSetCount++;
        outSetCount--;

        var fromV = v;
        var toV = tmp;

        this.cmd(
          "Disconnect",
          this.MSTSetCircleID[fromV],
          this.MSTSetCircleID[toV]
        );
        this.cmd("Step");
      }

      // this.cmd("CreateHighlightCircle", this.highlightCircleID[v],
      // 		this.position[v][0], this.position[v][1], this.radius);
      this.cmd("SetForegroundColor", v, this.highlightColor);
      this.cmd("Step");
      this.cmd("Step");

      for (var edge = this.firstEdge(v); ; edge = this.nextEdge(edge)) {
        if (edge == null) {
          break;
        }
        var u = edge.endVertex;
        if (this.addNew[u] != -1 && lowCost[u] > edge.weight) {
          this.addNew[u] = v;
          lowCost[u] = edge.weight;
        }
      }
    }
  }
  var edgesStr = "";
  for (var i = 0; i < edges.length; i++) {
    if (i != 0) {
      edgesStr += ",";
    }
    edgesStr += "<" + edges[i].startVertex + "," + edges[i].endVertex + ">";
  }
  this.cmd(
    "SetState",
    "The edges of the minimum spanning tree have" + edgesStr
  );
  for (var i = 0; i < 10; i++) {
    this.cmd("Step");
  }
  // this.clearHighlightCircle();
  return this.commands;
};
