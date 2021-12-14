// JavaScript Document
/*

*/

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
  //this.head = -1 ; //
  this.directed = false; //
  this.showEdgeWeight = true; //
  $(".runKruNumber").val("0");
  $(".weightKruNumber").val("10");

  this.objectID = 0;
  this.highightCircleID;
  this.EdgeArrayObjectID;
  this.hintLabelLeftID; // label left ID
  this.hintLabelRightID; // label right ID
  this.EdgeArrayLeftHighlightCircleID;
  this.EdgeArrayRightHighlightCircleID;
  this.UFSetsObjectID;
  this.radius = 26;

  this.R = 150;
  this.X0 = 250;
  this.Y0 = 250;

  this.EdgeArrayObjectStartX = 550;
  this.EdgeArrayObjectStartY = 100;
  this.EdgeArrayObjectInterval = 20;
  this.EdgeArrayLineLength = 30;
  this.EdgeArrayObjectRadius = 20;

  this.UFSetsObjectStartX = 750;
  this.UFSetsObjectStartY = 150;
  this.UFSetsObjectWidth = 25;
  this.UFSetsObjectHeight = 20;
  this.UFSetsObjectInterval = 15;
  this.UFSetsObjectCount;
  this.UFSetsObjectPosition;

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

runKruskalCallBack = function () {
  // startVertex = ( startVertex == null || isNaN(startVertex) ) ? 0: startVertex;
  // currentGraph.implementAction(currentGraph.clearHintArea.bind(currentGraph), 0);
  currentGraph.implementAction(currentGraph.Kruskal.bind(currentGraph), 0);
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

// var KruskalStartVertexText;
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

  addLabelToAlgorithmBar("Kruskal starting vertex");
  KruskalStartVertexText = addInputToAlgorithmBar("text", "0");

  runKruskalButton = addInputToAlgorithmBar("button", "Run Kruskal");
  runKruskalButton.onclick = runKruskalCallBack;

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
  this.highightCircleID = new Array(vertexNum);
  this.UFSetsObjectID = new Array(vertexNum);
  // this.EdgeArrayLeftHighlightCircleID = 3 * vertexNum;
  // this.EdgeArrayRightHighlightCircleID = 3 * vertexNum + 1;
  this.hintLabelLeftID = 7 * vertexNum;
  this.hintLabelRightID = 7 * vertexNum + 1;
  this.EdgeArrayLeftHighlightCircleID = 7 * vertexNum + 2;
  this.EdgeArrayRightHighlightCircleID = 7 * vertexNum + 3;

  this.highlightConnectArray = new Array();

  //this.EdgeArrayObjectID = new Array();
  for (var i = 0; i < this.vertexNum; i++) {
    this.highightCircleID[i] = vertexNum + i;
    this.UFSetsObjectID[i] = 2 * vertexNum + i;
  }
  this.UFSetsObjectCount = new Array(vertexNum);
  this.UFSetsObjectPosition = new Array(vertexNum);
  // for (var i=0; i< this.vertexNum; i++) {
  // 	this.UFSetsObjectCount[i] = 1;

  // 	this.UFSetsObjectPosition[i] = new Array(2);
  // 	this.UFSetsObjectPosition[i][0] = this.UFSetsObjectStartX;
  // 	this.UFSetsObjectPosition[i][1] = this.UFSetsObjectStartY + i * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
  // }

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
  //this.graphObjectID = new Array(maxSize) ; //

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
  return this.commands;
};

Graph.prototype.showEdgeWeight = function (show) {
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
  //alert("getRandomGraph");
  //alert(this.matrix);

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
    if (startVertex > endVertex) {
      var tmp = endVertex;
      endVertex = startVertex;
      startVertex = tmp;
    }
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

Graph.prototype.Kruskal = function () {
  if (!this.isAllConnected()) {
    // alert("This graph is not a connected graph, algorithm cannot run. Please add some edges or get a new graph to retry the algorithm. ");
    this.cmd(
      "SetState",
      "The graph is not a connected graph, and the algorithm stops executing"
    );
    return this.commands;
  }

  while (this.highlightConnectArray.length) {
    var line = this.highlightConnectArray.pop();
    var startV = line[0];
    var endV = line[1];
    //alert(startV+" "+endV);
    this.setConnectLineHighlight(startV, endV, false);
  }

  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd("SetForegroundColor", i, this.foregroundColor);
  }

  for (var i = 0; i < this.vertexNum; i++) {
    this.UFSetsObjectCount[i] = 1;

    this.UFSetsObjectPosition[i] = new Array(2);
    this.UFSetsObjectPosition[i][0] = this.UFSetsObjectStartX;
    this.UFSetsObjectPosition[i][1] =
      this.UFSetsObjectStartY +
      i * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
  }

  var hasHighlightCiecle = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    hasHighlightCiecle[i] = false;
  }
  var edgeArray = new Array();
  for (var i = 0; i < this.vertexNum; i++) {
    for (var j = 0; j < i; j++) {
      if (this.matrix[i][j]) {
        var tmpEdge = new GraphEdge(j, i, this.matrix[i][j]);
        edgeArray.push(tmpEdge);
      }
    }
  }

  var MSTEdge = new Array();

  this.EdgeArrayObjectID = new Array(2 * edgeArray.length);
  for (var i = 0; i < 2 * edgeArray.length; i++) {
    this.EdgeArrayObjectID[i] = 3 * this.vertexNum + i;
  }

  this.cmd("SetState", "Sort all edges first");
  this.cmd("Step");
  this.cmd("Step");
  this.cmd("Step");

  edgeArray.sort(function (e1, e2) {
    return e1.weight > e2.weight ? 1 : -1;
  });

  this.cmd("SetState", "Sorting is complete");
  this.cmd(
    "CreateLabel",
    this.hintLabelLeftID,
    "Sorted edges",
    this.EdgeArrayObjectStartX + 35,
    this.EdgeArrayObjectStartY - 50
  );
  this.cmd("SetForegroundColor", this.hintLabelLeftID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintLabelLeftID, this.backgroundColor);
  for (var i = 0; i < edgeArray.length; i++) {
    this.cmd(
      "CreateCircle",
      this.EdgeArrayObjectID[2 * i],
      edgeArray[i].startVertex,
      this.EdgeArrayObjectStartX,
      this.EdgeArrayObjectStartY +
        i * (this.EdgeArrayObjectInterval + 2 * this.EdgeArrayObjectRadius),
      this.EdgeArrayObjectRadius
    );
    this.cmd(
      "SetForegroundColor",
      this.EdgeArrayObjectID[2 * i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.EdgeArrayObjectID[2 * i],
      this.backgroundColor
    );

    this.cmd(
      "CreateCircle",
      this.EdgeArrayObjectID[2 * i + 1],
      edgeArray[i].endVertex,
      this.EdgeArrayObjectStartX +
        2 * this.EdgeArrayObjectRadius +
        this.EdgeArrayLineLength,
      this.EdgeArrayObjectStartY +
        i * (this.EdgeArrayObjectInterval + 2 * this.EdgeArrayObjectRadius),
      this.EdgeArrayObjectRadius
    );
    this.cmd(
      "SetForegroundColor",
      this.EdgeArrayObjectID[2 * i + 1],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.EdgeArrayObjectID[2 * i + 1],
      this.backgroundColor
    );

    this.cmd(
      "Connect",
      this.EdgeArrayObjectID[2 * i],
      this.EdgeArrayObjectID[2 * i + 1],
      this.highlightColor,
      0.0,
      false,
      edgeArray[i].weight
    );
  }
  this.cmd("Step");

  var set = new UFSets(this.vertexNum);

  this.cmd(
    "CreateLabel",
    this.hintLabelRightID,
    "Equivalence class",
    this.UFSetsObjectPosition[0][0] - 50,
    this.UFSetsObjectPosition[0][1]
  );
  this.cmd("SetForegroundColor", this.hintLabelRightID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintLabelRightID, this.backgroundColor);
  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd(
      "CreateRectangle",
      this.UFSetsObjectID[i],
      i,
      this.UFSetsObjectWidth,
      this.UFSetsObjectHeight,
      "center",
      "center",
      this.UFSetsObjectPosition[i][0],
      this.UFSetsObjectPosition[i][1]
    );
    this.cmd(
      "SetForegroundColor",
      this.UFSetsObjectID[i],
      this.foregroundColor
    );
    this.cmd(
      "SetBackgroundColor",
      this.UFSetsObjectID[i],
      this.backgroundColor
    );
  }
  this.cmd("Step");

  //var edgeNum = 0;

  var edgeCount = 0;

  // var highlightLineArray = new Array();
  while (MSTEdge.length < this.vertexNum - 1) {
    if (edgeCount < edgeArray.length) {
      var startVertex = edgeArray[edgeCount].startVertex;
      var endVertex = edgeArray[edgeCount].endVertex;

      this.cmd(
        "CreateHighlightCircle",
        this.EdgeArrayLeftHighlightCircleID,
        this.EdgeArrayObjectStartX,
        this.EdgeArrayObjectStartY,
        this.EdgeArrayObjectRadius / 2
      );
      this.cmd(
        "SetForegroundColor",
        this.EdgeArrayLeftHighlightCircleID,
        this.highlightColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.EdgeArrayLeftHighlightCircleID,
        this.backgroundColor
      );
      this.cmd(
        "CreateHighlightCircle",
        this.EdgeArrayRightHighlightCircleID,
        this.EdgeArrayObjectStartX +
          this.EdgeArrayLineLength +
          2 * this.EdgeArrayObjectRadius,
        this.EdgeArrayObjectStartY,
        this.EdgeArrayObjectRadius / 2
      );
      this.cmd(
        "SetForegroundColor",
        this.EdgeArrayRightHighlightCircleID,
        this.highlightColor
      );
      this.cmd(
        "SetBackgroundColor",
        this.EdgeArrayRightHighlightCircleID,
        this.backgroundColor
      );
      this.cmd("Step");
      this.cmd("step");
      this.cmd("Step");
      this.cmd("Step");
      var stateV =
        "<" +
        edgeArray[edgeCount].startVertex +
        "," +
        edgeArray[edgeCount].endVertex +
        ">";
      this.cmd(
        "SetState",
        "Check two vertices" + stateV + "Are in the same equivalence class"
      );
      this.cmd("Step");
      this.cmd(
        "Move",
        this.EdgeArrayLeftHighlightCircleID,
        this.UFSetsObjectPosition[startVertex][0],
        this.UFSetsObjectPosition[startVertex][1]
      );
      this.cmd(
        "Move",
        this.EdgeArrayRightHighlightCircleID,
        this.UFSetsObjectPosition[endVertex][0],
        this.UFSetsObjectPosition[endVertex][1]
      );
      this.cmd("Step");
      this.cmd("Step");
      this.cmd("Delete", this.EdgeArrayLeftHighlightCircleID);
      this.cmd("Delete", this.EdgeArrayRightHighlightCircleID);

      if (!set.check(startVertex, endVertex)) {
        this.cmd(
          "SetState",
          "vertex" +
            stateV +
            "Not in the same equivalence class, add the edge to the minimum spanning tree, merge equivalence classes"
        );

        set.union(startVertex, endVertex);
        MSTEdge.push(stateV);
        // edgeNum++;

        for (var i = 0; i < this.vertexNum; i++) {
          this.UFSetsObjectCount[i] = 0;
        }
        for (var i = 0; i < this.vertexNum; i++) {
          this.UFSetsObjectPosition[i][0] =
            this.UFSetsObjectStartX +
            this.UFSetsObjectCount[set.find(i)] * this.UFSetsObjectWidth;
          this.UFSetsObjectPosition[i][1] =
            this.UFSetsObjectStartY +
            set.find(i) * (this.UFSetsObjectHeight + this.UFSetsObjectInterval);
          //alert(this.UFSetsObjectPosition[i][0]+" "+this.UFSetsObjectPosition[i][1]);
          this.cmd(
            "Move",
            this.UFSetsObjectID[i],
            this.UFSetsObjectPosition[i][0],
            this.UFSetsObjectPosition[i][1]
          );
          this.UFSetsObjectCount[set.find(i)]++;
        }
        this.cmd("Step");
        //alert(startVertex +" "+ endVertex);

        if (!hasHighlightCiecle[startVertex]) {
          this.cmd(
            "CreateHighlightCircle",
            this.highightCircleID[startVertex],
            this.position[startVertex][0],
            this.position[startVertex][1],
            this.radius
          );
          hasHighlightCiecle[startVertex] = true;
        }
        if (!hasHighlightCiecle[endVertex]) {
          this.cmd(
            "CreateHighlightCircle",
            this.highightCircleID[endVertex],
            this.position[endVertex][0],
            this.position[endVertex][1],
            this.radius
          );
          hasHighlightCiecle[endVertex] = true;
        }

        this.cmd("SetLineHighlight", startVertex, endVertex, true);
        this.cmd("Step");
        this.cmd("SetLineHighlight", startVertex, endVertex, false);
        this.cmd("Step");

        this.setConnectLineHighlight(startVertex, endVertex, true);
        this.highlightConnectArray.push([startVertex, endVertex]);

        this.cmd("SetForegroundColor", startVertex, this.highlightColor);
        this.cmd("SetForegroundColor", endVertex, this.highlightColor);
      } else {
        this.cmd(
          "SetState",
          "vertex" + stateV + "In the same equivalence class, discard the edge"
        );
        this.cmd("Step");
      }

      this.cmd(
        "Disconnect",
        this.EdgeArrayObjectID[2 * edgeCount],
        this.EdgeArrayObjectID[2 * edgeCount + 1]
      );
      this.cmd("Delete", this.EdgeArrayObjectID[2 * edgeCount]);
      this.cmd("Delete", this.EdgeArrayObjectID[2 * edgeCount + 1]);
      for (var i = edgeCount + 1; i < edgeArray.length; i++) {
        this.cmd(
          "Move",
          this.EdgeArrayObjectID[2 * i],
          this.EdgeArrayObjectStartX,
          this.EdgeArrayObjectStartY +
            (i - edgeCount - 1) *
              (this.EdgeArrayObjectInterval + 2 * this.EdgeArrayObjectRadius)
        );
        this.cmd(
          "Move",
          this.EdgeArrayObjectID[2 * i + 1],
          this.EdgeArrayObjectStartX +
            this.EdgeArrayLineLength +
            2 * this.EdgeArrayObjectRadius,
          this.EdgeArrayObjectStartY +
            (i - edgeCount - 1) *
              (this.EdgeArrayObjectInterval + 2 * this.EdgeArrayObjectRadius)
        );
      }
      this.cmd("Step");
    } else {
      this.cmd("SetState", "No minimum spanning tree");
      return this.commands;
    }
    edgeCount++;
  }
  this.cmd("SetState", "Completion algorithm");
  this.cmd("Step");
  MSTEdge.reverse();
  var edgesStr = "" + MSTEdge.pop();
  while (MSTEdge.length > 0) {
    edgesStr += "," + MSTEdge.pop();
  }
  this.cmd(
    "SetState",
    "The edges of the minimum spanning tree have" + edgesStr
  );

  this.cmd("Step");
  this.cmd("Step");
  this.cmd("Step");
  this.cmd("Step");
  this.cmd("Step");
  this.cmd("Step");
  for (var i = edgeCount; i < edgeArray.length; i++) {
    this.cmd(
      "Disconnect",
      this.EdgeArrayObjectID[2 * i],
      this.EdgeArrayObjectID[2 * i + 1]
    );
    this.cmd("Delete", this.EdgeArrayObjectID[2 * i]);
    this.cmd("Delete", this.EdgeArrayObjectID[2 * i + 1]);
  }

  this.cmd("Delete", this.hintLabelLeftID);
  this.cmd("Delete", this.hintLabelRightID);

  for (var i = 0; i < this.vertexNum; i++) {
    this.cmd("Delete", this.highightCircleID[i]);
    this.cmd("Delete", this.UFSetsObjectID[i]);
  }
  this.cmd("Step");
  return this.commands;
};

function UFSets(n) {
  this.n = n;
  this.sameSet = new Array(n);

  for (var i = 0; i < this.n; i++) {
    this.sameSet[i] = i;
  }
}

UFSets.prototype = {
  constructor: UFSets,
};

UFSets.prototype.union = function (n1, n2) {
  if (n1 == n2) {
    alert("cannot union two same number " + n1);
    return null;
  }
  if (this.sameSet[n1] == this.sameSet[n2]) {
    alert(n1 + "," + n2 + " are already in the same Set. ");
    return null;
  }
  var min =
    this.sameSet[n1] < this.sameSet[n2] ? this.sameSet[n1] : this.sameSet[n2];
  var max =
    this.sameSet[n1] < this.sameSet[n2] ? this.sameSet[n2] : this.sameSet[n1];
  for (var i = 0; i < this.n; i++) {
    if (this.sameSet[i] == max) {
      this.sameSet[i] = min;
    }
  }
  return null;
};

UFSets.prototype.check = function (n1, n2) {
  if (this.sameSet[n1] == this.sameSet[n2]) {
    return true;
  }
  return false;
};
// find
UFSets.prototype.find = function (n) {
  return this.sameSet[n];
};
