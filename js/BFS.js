// JavaScript Document
/*
 **	init()函数
 **	GraphEdge类
 **	Graph类
 */
// 初始化函数
var currentGraph;
// 有向图的边画法改变
var directedGraphCurveWithSingleEdge = 0.0; // 两个顶点之间只有一条边， 此时画直线
var directedGraphCurveWithDoubleEdge = 0.15; // 两个顶点之间有两条边， 此时画曲线
var undirectedGraphCurve = 0.0;
var initialVertexNum = 6; // 图初始的顶点数量
function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentGraph = new Graph(animationManager, drawing.width, drawing.height);
  currentGraph.implementAction(
    currentGraph.initGraph.bind(currentGraph),
    initialVertexNum
  );
  currentGraph.implementAction(
    currentGraph.getRandomGraph.bind(currentGraph),
    0
  );
}

// 产生介于上界和下界的随机数，整数，上界和下界都可以取到
function getRandomNumber(lowerBound, upperBound) {
  var range = upperBound - lowerBound + 1;
  var rand = Math.round(Math.random() * 100);
  return (rand % range) + lowerBound;
}

/* 边类 */
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

/* 图类开始 */
// 图
var Graph = function (animManager, width, height) {
  this.init(animManager, width, height);
  this.initialize();
};
// 继承与构造
Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

// 初始化
Graph.prototype.initialize = function () {
  // 逻辑部分ID
  //this.head = -1 ; // 头指针
  this.directed = false; // 是否是有向图
  this.showEdgeWeight = false; // 是否显示边权重
  // 设置界面
  $(".radio2").attr("checked", "checked");
  $(".runNumber").val("0");
  $(".weightNumber").val("10");
  // $("#displayWeight").attr("checked", "checked");
  // 图形部分
  this.objectID = 0; // 图形的序号
  this.BFSCircleID = 0; // BFS遍历时显示的圆
  this.BFSParentCircleID = 0; // BFS遍历节点的父节点
  this.hintLabelID = 0; // label 序号
  this.hintObjectIDStart = 0;
  this.hintObjectIDCount = 0;
  this.hintObjectIDCurrent = 0; // 栈顶指针
  this.hintObjectIDArray;
  this.hintHighlightCircleID;
  this.hintStartX = 600;
  this.hintStartY = 150;
  this.hintInterval = 10;
  // this.hintRectWidth = 50;
  // this.hintRectHeight = 30;

  this.radius = 20; // 顶点圆的半径
  // 顶点位置的确定
  this.R = 150; // 所有顶点分布在该圆上
  this.X0 = 250; // 分布圆的圆心横坐标
  this.Y0 = 250; // 分布圆的圆心纵坐标

  this.foregroundColor = "#000000"; // 前景色
  this.backgroundColor = "#5F9EA0"; // 背景色
  this.highlightColor = "#FF6347";
};

// 添加边调用函数
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
// 删除边调用函数
delEdgeCallBack = function (startVertex, endVertex) {
  currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [
    startVertex,
    endVertex,
  ]);
};
// BFS遍历调用函数
runBFSCallBack = function (startVertex) {
  startVertex = startVertex == null || isNaN(startVertex) ? 0 : startVertex;
  currentGraph.implementAction(
    currentGraph.clearHintArea.bind(currentGraph),
    0
  );
  currentGraph.implementAction(
    currentGraph.BFSTraverse.bind(currentGraph),
    startVertex
  );
};
// 产生随机图调用函数
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
  } while ((1.0 * currentGraph.edgeNum) / currentGraph.vertexNum < 0.6);
  // 限制了图的稀疏性
};
// 显示边权重调用函数
showEdgeWeightSwitch = function (show) {
  if (show != null) {
    currentGraph.showEdgeWeight = show;
    currentGraph.implementAction(
      currentGraph.showEdgeWeightFunc.bind(currentGraph),
      show
    );
  }
};
// 有向图和无向图的转换
directedGraphSwitch = function (directed) {
  if (directed != null) {
    // 先清除所有的边
    currentGraph.implementAction(
      currentGraph.clearAllEdges.bind(currentGraph),
      0
    );
    currentGraph.directed = directed;
    // 获取随机图
    currentGraph.implementAction(
      currentGraph.getRandomGraph.bind(currentGraph),
      0
    );
  }
};
// 顶点数量取值变化调用函数
vertexNumSelectChangeCallBack = function (newVertexNum) {
  if (
    !isNaN(parseInt(newVertexNum)) &&
    parseInt(newVertexNum) >= 3 &&
    parseInt(newVertexNum) <= 10
  ) {
    // 清除所有
    objectManager = null;
    currentGraph = null;
    animationManager = null;
    // 重新产生所有
    objectManager = new ObjectManager();
    animationManager = new AnimationManager(objectManager);
    currentGraph = new Graph(animationManager, drawing.width, drawing.height);
    currentGraph.implementAction(
      currentGraph.initGraph.bind(currentGraph),
      parseInt(newVertexNum)
    );
  } else {
    alert("顶点数量取值范围应为 3-10 !");
  }
};

// var vertexNumSelect;

// var randomGraphButton;
// var startVertexText;
// var endVertexText;
// var edgeWeightText;
// var addEdgeButton;
// var delEdgeButton;
// var BFSTraverseButton;
// var BFSStartVertexText;
// var showEdgeWeight;
// var directedGraph;
// var undirectedGraph;

// 添加控制按钮
Graph.prototype.addControls = function () {
  addLabelToAlgorithmBar("顶点数量");
  var vertexNumList = [3, 4, 5, 6, 7, 8, 9, 10];
  vertexNumSelect = addSelectToAlgorithmBar(vertexNumList);
  vertexNumSelect.onchange = vertexNumSelectChangeCallBack;
  // 添加初始值
  for (var i = 0; i < vertexNumSelect.length; i++) {
    if (vertexNumSelect.options[i].value == initialVertexNum) {
      vertexNumSelect.options[i].selected = true;
    }
  }
  //alert(vertexNumSelect.selectedIndex);

  addLabelToAlgorithmBar("起点");
  startVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("终点");
  endVertexText = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("权重");
  edgeWeightText = addInputToAlgorithmBar("text", "");
  edgeWeightText.value = "10";
  addEdgeButton = addInputToAlgorithmBar("button", "添加边");
  addEdgeButton.onclick = addEdgeCallBack;
  delEdgeButton = addInputToAlgorithmBar("button", "删除边");
  delEdgeButton.onclick = delEdgeCallBack;
  randomGraphButton = addInputToAlgorithmBar("button", "生成随机图");
  randomGraphButton.onclick = randomGraphCallBack;

  addLabelToAlgorithmBar("BFS起始顶点");
  BFSStartVertexText = addInputToAlgorithmBar("text", "0");

  BFSTraverseButton = addInputToAlgorithmBar("button", "Run BFS");
  BFSTraverseButton.onclick = runBFSCallBack;

  showEdgeWeight = addCheckboxToAlgorithmBar("显示边权重");
  showEdgeWeight.onclick = showEdgeWeightSwitch;
  showEdgeWeight.checked = true;

  var directedGraphList = addRadioButtonGroupToAlgorithmBar(
    ["directed Graph", "undirected Graph"],
    "GraphType"
  );
  directedGraph = directedGraphList[0];
  undirectedGraph = directedGraphList[1];
  directedGraph.onclick = directedGraphSwitch;
  undirectedGraph.onclick = directedGraphSwitch;
  undirectedGraph.checked = true;
};

// 初始化数组
Graph.prototype.initGraph = function (vertexNum) {
  // BFS时移动的圆
  this.BFSCircleID = vertexNum;
  this.BFSParentCircleID = vertexNum + 1;
  // 提示区域显示
  this.hintHighlightCircleID = vertexNum + 2;
  this.hintLabelID = vertexNum + 3;
  this.hintObjectIDStart = vertexNum + 4;

  this.vertexNum = vertexNum; // 顶点的数量
  this.edgeNum = 0; // 边的数量
  this.matrix = new Array(this.vertexNum); // 图的邻接矩阵
  for (var i = 0; i < this.vertexNum; i++) {
    this.matrix[i] = new Array(this.vertexNum);
    for (var j = 0; j < this.vertexNum; j++) {
      this.matrix[i][j] = 0;
    }
  }
  this.position = new Array(this.vertexNum); // 存储顶点的位置
  for (var i = 0; i < this.vertexNum; i++) {
    this.position[i] = new Array(2);
  }
  // 对顶点的分布做出适应性改变
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
  // BFS Queue label
  this.cmd(
    "CreateLabel",
    this.hintLabelID,
    "BFS Queue -->",
    this.hintStartX - this.radius - 40,
    this.hintStartY
  );
  this.cmd("SetForegroundColor", this.hintLabelID, this.foregroundColor);
  this.cmd("SetBackgroundColor", this.hintLabelID, this.backgroundColor);
  return this.commands;
};

// 是否显示边权重，show为bool类型，表示是否显示权重
Graph.prototype.showEdgeWeightFunc = function (show) {
  //alert("show Edge weight");
  // 有向图
  if (this.directed) {
    // 先删除图上所有的边
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (this.matrix[i][j]) {
          this.cmd("Disconnect", i, j);
        }
      }
    }
    // 重新绘边
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
  }
  // 无向图
  else {
    // 先删除图上所有的边
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (this.matrix[j][i]) {
          this.cmd("Disconnect", j, i);
        }
      }
    }
    // 重新绘边
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
// 清除图的所有边
Graph.prototype.clearAllEdges = function () {
  //alert("clearAllEdges");
  // 有向图
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
  }
  // 无向图
  else {
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

// 产生随机图
Graph.prototype.getRandomGraph = function () {
  // 产生无向图
  if (!this.directed) {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < i; j++) {
        if (!getRandomNumber(0, 2)) {
          this.addEdge([j, i, getRandomNumber(1, 100), false]);
        }
      }
    }
  }
  // 产生有向图
  else {
    for (var i = 0; i < this.vertexNum; i++) {
      for (var j = 0; j < this.vertexNum; j++) {
        if (i != j) {
          //alert(i +" "+j +":"+this.matrix[i][j] );
          // 决定是否添加边
          if (!getRandomNumber(0, 2)) {
            this.addEdge([i, j, getRandomNumber(1, 100), false]);
          }
        }
      }
    }
  }
  return this.commands;
};

// 添加边
Graph.prototype.addEdge = function () {
  // 传入参数，起点，终点，权重, 是否需要动画
  var startVertex = arguments[0][0];
  var endVertex = arguments[0][1];
  var weight = arguments[0][2];
  var withAnimation = arguments[0].length > 3 ? arguments[0][3] : true; // bool

  // 传入参数的合法性判断
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
  // 判断这条边是否已经存在
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
  // 添加这个边
  if (withAnimation) {
    this.cmd("SetHighlight", startVertex, true);
    this.cmd("SetHighlight", endVertex, true);
    this.cmd("Step");
    this.cmd("SetHighlight", startVertex, false);
    this.cmd("SetHighlight", endVertex, false);
    this.cmd("Step");
  }
  //this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

  // 有向图
  if (this.directed) {
    this.matrix[startVertex][endVertex] = weight;
    var label1 = this.showEdgeWeight ? this.matrix[startVertex][endVertex] : "";
    var label2 = this.showEdgeWeight ? this.matrix[endVertex][startVertex] : "";
    // 对于有向图，需要先判断是否已经存在反向的连线
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
  }
  // 无向图
  else {
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

// 删除边
Graph.prototype.delEdge = function () {
  // 传入参数，要删除的边
  startVertex = arguments[0][0];
  endVertex = arguments[0][1];
  // 传入参数的合法性判断
  if (startVertex < 0 || startVertex >= this.vertexNum) {
    alert("start Vertex illeagl.");
    return this.commands;
  }
  if (endVertex < 0 || endVertex >= this.vertexNum) {
    alert("end Vertex illeagl.");
    return this.commands;
  }
  // 如果是无向图，需要调整起点和终点
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
  // 有向图
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

// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
  for (var i = 0; i < this.vertexNum; i++) {
    if (this.matrix[vertex][i]) {
      var edge = new GraphEdge(vertex, i, this.matrix[vertex][i]);
      return edge;
    }
  }
  return null; // 该顶点没有邻边
};

Graph.prototype.nextEdge = function (edge) {
  for (var i = edge.endVertex + 1; i < this.vertexNum; i++) {
    if (this.matrix[edge.startVertex][i]) {
      edge.endVertex = i;
      edge.weight = this.matrix[edge.startVertex][i];
      return edge;
    }
  }
  return null; // 没有nextEdge
};
// 	清除hint区域
Graph.prototype.clearHintArea = function () {
  if (typeof this.visited == "undefined") {
    return this.commands;
  }
  // alert(this.hintObjectID.length);
  // don't use for now
  // for (var i=0; i<this.hintObjectID.length; i++) {
  // 	if (this.visited[i] ) {
  // 		//this.cmd("Delete", this.hintObjectID[i]);
  // 		try {
  // 			this.cmd("Delete", this.hintObjectID[i]);
  // 		}
  // 		catch(error) {
  // 			// do nothing
  // 		}
  // 	}
  // }
  return this.commands;
};
// BFS
Graph.prototype.BFSTraverse = function (startVertex) {
  if (startVertex >= this.vertexNum) {
    this.cmd("SetState", "输入的顶点应在0-" + (this.vertexNum - 1) + "之间");
    return this.commands;
  }
  this.visited = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    this.visited[i] = false;
  }

  this.cmd("CreateHighlightCircle", this.BFSCircleID, 100, 50, this.radius);
  this.cmd("SetForegroundColor", this.BFSCircleID, "#000000");
  this.cmd("SetBackgroundColor", this.BFSCircleID, "#FFFFFF");
  this.cmd("Step");
  this.objectID++;
  // hint circle
  this.cmd(
    "CreateHighlightCircle",
    this.hintHighlightCircleID,
    this.hintStartX,
    this.hintStartY,
    this.radius
  );
  this.cmd(
    "SetForegroundColor",
    this.hintHighlightCircleID,
    this.highlightColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.hintHighlightCircleID,
    this.backgroundColor
  );
  var visitSeq = [];
  for (var i = 0; i < this.vertexNum; i++) {
    var toVisit = (startVertex + i) % this.vertexNum;
    if (!this.visited[toVisit]) visitSeq = visitSeq.concat(this.BFS(toVisit));
  }
  // console.log(visitSeq);
  var visitSeqStr = "";
  for (var i = 0; i < visitSeq.length; i++) {
    if (i != 0) {
      visitSeqStr += ",";
    }
    visitSeqStr += visitSeq[i];
  }
  this.cmd("SetState", "BFS遍历顺序是 " + visitSeqStr);
  this.cmd("Delete", this.BFSCircleID);
  this.cmd("Delete", this.hintHighlightCircleID);
  this.cmd("Step");
  this.cmd("Step");
  return this.commands;
};
// BFS
// BFS访问的节点， 父节点， 第几层访问到该节点， 第几个访问到该节点
Graph.prototype.BFS = function (startVertex) {
  this.hintObjectIDArray = new Array();
  var queue = new Array();
  var visitSeq = new Array();
  visitSeq.push(startVertex);
  // visit startVertex
  this.visited[startVertex] = true;
  // 移动BFS circle
  this.cmd(
    "Move",
    this.BFSCircleID,
    this.position[startVertex][0],
    this.position[startVertex][1]
  );
  this.cmd("Step");
  this.cmd("Step");
  // 产生BFS	parent circle
  this.cmd(
    "CreateHighlightCircle",
    this.BFSParentCircleID,
    this.position[startVertex][0],
    this.position[startVertex][1],
    this.radius
  );
  this.cmd("SetForegroundColor", this.BFSParentCircleID, "#000000");
  this.cmd("SetBackgroundColor", this.BFSParentCircleID, "#FFFFFF");
  this.cmd("Step");

  // 记录每个节点的父节点
  var parent = new Array(this.vertexNum);
  for (var i = 0; i < this.vertexNum; i++) {
    parent[i] = startVertex;
  }

  queue.push(startVertex);
  this.cmd("SetState", "将起始节点添加到队列");
  this.cmd("Step");
  // 在右边的hint区域同步显示queue内容
  // this.cmd("CreateLabel", this.hintLabelID, "BFS Queue", this.hintStartX - this.radius - 40, this.hintStartY);
  // this.cmd("SetForegroundColor", this.hintLabelID, this.foregroundColor);
  // this.cmd("SetBackgroundColor", this.hintLabelID, this.backgroundColor);
  // this.cmd("CreateHighlightCircle", this.hintHighlightCircleID, this.hintStartX, this.hintStartY, this.radius);
  // this.cmd("SetForegroundColor", this.hintHighlightCircleID, this.highlightColor);
  // this.cmd("SetBackgroundColor", this.hintHighlightCircleID, this.backgroundColor);
  this.cmd(
    "CreateCircle",
    this.hintObjectIDStart + this.hintObjectIDCount,
    startVertex,
    this.hintStartX,
    this.hintStartY,
    this.radius
  );
  this.cmd(
    "SetForegroundColor",
    this.hintObjectIDStart + this.hintObjectIDCount,
    this.foregroundColor
  );
  this.cmd(
    "SetBackgroundColor",
    this.hintObjectIDStart + this.hintObjectIDCount,
    this.backgroundColor
  );
  this.hintObjectIDArray.push(this.hintObjectIDStart + this.hintObjectIDCount);
  this.hintObjectIDCount++;

  while (queue.length != 0) {
    var vertex = queue[0];
    this.cmd("SetState", "取出队列第一个顶点<" + vertex + ">");
    this.cmd("Step");

    queue.shift(); // 删除第一个元素
    this.cmd(
      "Move",
      this.BFSParentCircleID,
      this.position[vertex][0],
      this.position[vertex][1]
    );
    this.cmd("Step");
    this.cmd("Step");
    for (
      var edge = this.firstEdge(vertex);
      edge != null;
      edge = this.nextEdge(edge)
    ) {
      this.cmd(
        "SetState",
        "检查和顶点<" + vertex + ">相连的顶点<" + edge.endVertex + ">是否被访问"
      );
      this.cmd("Step");
      var fromV = edge.startVertex;
      var toV = edge.endVertex;
      if (!this.directed && fromV > toV) {
        fromV = edge.endVertex;
        toV = edge.startVertex;
      }
      this.cmd("SetLineHighlight", fromV, toV, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", fromV, toV, false);
      //this.cmd("Step");

      this.cmd(
        "Move",
        this.BFSCircleID,
        this.position[edge.endVertex][0],
        this.position[edge.endVertex][1]
      );
      this.cmd("Step");
      this.cmd("Step");

      var nextVertex = edge.endVertex;
      if (!this.visited[nextVertex]) {
        // visit nextVertex
        parent[nextVertex] = edge.startVertex;
        visitSeq.push(nextVertex);
        this.visited[nextVertex] = true;
        this.cmd("SetState", "访问顶点<" + nextVertex + ">");
        this.cmd("Step");
        this.cmd(
          "Move",
          this.BFSCircleID,
          this.position[nextVertex][0],
          this.position[nextVertex][1]
        );
        this.cmd("Step");
        this.cmd("Step");
        var flag = 0;
        for (var j = 0; j < queue.length; j++) {
          if (queue[j] == nextVertex) {
            flag = 1;
            break;
          }
        }
        if (flag == 0) {
          queue.push(nextVertex);
          this.cmd("SetState", "将顶点<" + nextVertex + ">添加到队列中");
          this.cmd("Step");
          // 在hint区域最后添加元素
          this.cmd(
            "CreateCircle",
            this.hintObjectIDStart + this.hintObjectIDCount,
            nextVertex,
            this.hintStartX +
              this.hintObjectIDArray.length *
                (this.hintInterval + 2 * this.radius),
            this.hintStartY,
            this.radius
          );
          // this.cmd("CreateCircle", this.hintObjectIDStart+this.hintObjectIDCount, nextVertex,
          // 		this.hintStartX + this.hintObjectIDCount * (this.hintInterval + 2*this.radius), this.hintStartY, this.radius);
          this.cmd(
            "SetForegroundColor",
            this.hintObjectIDStart + this.hintObjectIDCount,
            this.foregroundColor
          );
          this.cmd(
            "SetBackgroundColor",
            this.hintObjectIDStart + this.hintObjectIDCount,
            this.backgroundColor
          );
          this.hintObjectIDArray.push(
            this.hintObjectIDStart + this.hintObjectIDCount
          );
          this.hintObjectIDCount++;
        }
        // 向栈内添加元素
      }
    }
    this.cmd("Delete", this.hintObjectIDArray.shift());
    for (var j = 0; j < this.hintObjectIDArray.length; j++) {
      this.cmd(
        "Move",
        this.hintObjectIDArray[j],
        this.hintStartX + j * (this.hintInterval + 2 * this.radius),
        this.hintStartY
      );
    }
    var visitSeqStr = "";
    for (var i = 0; i < visitSeq.length; i++) {
      if (i != 0) {
        visitSeqStr += ",";
      }
      visitSeqStr += visitSeq[i];
    }
    // this.cmd("SetState", "BFS遍历顺序是 "+visitSeqStr);
    // this.cmd("Step");
    // this.cmd("Step");
  }
  this.cmd("Delete", this.BFSParentCircleID);
  // this.cmd("Delete", this.hintLabelID);
  return visitSeq;
};
