// JavaScript Document
/*
**	init()函数
**	GraphEdge类
**	Graph类
*/
// 初始化函数
var currentGraph;
var directedGraphCurve = 0.25;
var undirectedGraphCurve = 0.0;
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentGraph = new Graph(animationManager, drawing.width, drawing.height);
	currentGraph.implementAction(currentGraph.initGraph.bind(currentGraph), 5) ;
	
	//alert(currentGraph);
	//currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [0, 4, 2]) ;
	//currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [1, 4, 2]) ;
	//currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [2, 3, 2]) ;
	//currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [3, 4, 2]) ;
	//currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), 3) ;
	
	//randomGraphButton.onclick = currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), 3) ;
	
	//currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [0, 4]) ;
}

// 产生介于上界和下界的随机数，整数，上界和下界都可以取到
function getRandomNumber(lowerBound,upperBound) {
	var range = upperBound - lowerBound + 1;
	var rand = Math.round( Math.random() * 100 );
	return ( (rand% range) + lowerBound );
}


/* 边类 */
function GraphEdge(startVertex, endVertex, weight) {
	if (weight == null) {
		this.weight = 0;
	}
	else {
		this.weight = weight;
	}
	this.startVertex = startVertex;
	this.endVertex = endVertex;
}

GraphEdge.prototype = {
	constructor:GraphEdge,
}

/* 图类开始 */
// 图
var Graph = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initialize() ;
}
// 继承与构造
Graph.prototype = new Algorithm();
Graph.prototype.constructor = Graph;

// 初始化
Graph.prototype.initialize = function() {
	// 逻辑部分ID
	//this.head = -1 ; // 头指针
	this.directed = false;		// 是否是有向图
	// 图形部分
	this.objectID = 0 ; // 图形的序号
	this.radius = 26;	// 顶点圆的半径
	// 顶点位置的确定
	this.R = 150;		// 所有顶点分布在该圆上
	this.X0 = 250;		// 分布圆的圆心横坐标
	this.Y0 = 250; 		// 分布圆的圆心纵坐标
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	// 添加算法控制按钮
	this.addControls();
}

// 添加边调用函数
addEdgeCallBack = function () {
	var startVertex = parseInt( startVertexText.value );
	var endVertex = parseInt( endVertexText.value );
	//alert(startVertex+","+endVertex);
	currentGraph.implementAction(currentGraph.addEdge.bind(currentGraph), [startVertex, endVertex, 1]) ;
}
// 删除边调用函数
delEdgeCallBack = function () {
	var startVertex = parseInt( startVertexText.value );
	var endVertex = parseInt( endVertexText.value );
	currentGraph.implementAction(currentGraph.delEdge.bind(currentGraph), [startVertex, endVertex]) ;
}
// DFS遍历调用函数
runDFSCallBack = function() {
	//alert("runDFSCallBack");
	var startVertex = parseInt(DFSStartVertexText.value);
	//alert(startVertex);
	startVertex = ( startVertex == "" ) ? 0: startVertex;
	startVertex = ( isNaN(startVertex) ) ? 0: startVertex;
	//alert(startVertex);
	currentGraph.implementAction(currentGraph.DFSTraverse.bind(currentGraph), startVertex);
}
// 产生随机图调用函数
randomGraphCallBack = function() {
	//alert("randomGraphCallBack");
	currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
	currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
}
// 显示边权重调用函数
showEdgeWeightSwitch = function () {
	//alert(currentGraph.matrix);
	currentGraph.implementAction(currentGraph.showEdgeWeight.bind(currentGraph), showEdgeWeight.checked);
}
// 有向图和无向图的转换
directedGraphSwitch = function () {
	// 先清除所有的边
	currentGraph.implementAction(currentGraph.clearAllEdges.bind(currentGraph), 0);
	// 
	if (directedGraph.checked ) {
		currentGraph.directed = true;
	}
	else {
		currentGraph.directed = false;
	}
	// 获取随机图
	currentGraph.implementAction(currentGraph.getRandomGraph.bind(currentGraph), 0);
}

var randomGraphButton;
var startVertexText;
var endVertexText;
var addEdgeButton;
var delEdgeButton;
var DFSTraverseButton;
var DFSStartVertexText;
var showEdgeWeight;
var directedGraph;
var undirectedGraph;

// 添加控制按钮
Graph.prototype.addControls = function () {
	//this.randomGraphButton = addInputToAlgorithmBar("button", "生成随机图");
	//this.randomGraphButton.onclick = this.getRandomGraph.bind(this);
	randomGraphButton = addInputToAlgorithmBar("button", "生成随机图");
	//randomGraphButton.onclick = this.getRandomGraph.bind(this);
	//randomGraphButton.onclick = this.implementAction(this.DFSTraverse.bind(this), 0);
	randomGraphButton.onclick = randomGraphCallBack;
	addLabelToAlgorithmBar("起点");
	startVertexText = addInputToAlgorithmBar("text", "");
	addLabelToAlgorithmBar("终点");
	endVertexText = addInputToAlgorithmBar("text", "");
	//addLabelToAlgorithmBar("权重");
	//addInputToAlgorithmBar("text", "");
	addEdgeButton = addInputToAlgorithmBar("button", "添加边");
	addEdgeButton.onclick = addEdgeCallBack;
	delEdgeButton = addInputToAlgorithmBar("button", "删除边");
	delEdgeButton.onclick = delEdgeCallBack;
	
	addLabelToAlgorithmBar("DFS起始顶点");
	DFSStartVertexText = addInputToAlgorithmBar("text", "0");
	
	DFSTraverseButton = addInputToAlgorithmBar("button", "Run DFS");
	DFSTraverseButton.onclick = runDFSCallBack;

	showEdgeWeight = addCheckboxToAlgorithmBar("显示边权重");
	showEdgeWeight.onclick = showEdgeWeightSwitch;
	showEdgeWeight.checked = true;
	
	var directedGraphList = addRadioButtonGroupToAlgorithmBar(["directed Graph","undirected Graph"],"GraphType");
	directedGraph = directedGraphList[0];
	undirectedGraph = directedGraphList[1];
	directedGraph.onclick = directedGraphSwitch;
	undirectedGraph.onclick = directedGraphSwitch;
	undirectedGraph.checked = true;
}

// 初始化数组
Graph.prototype.initGraph = function(vertexNum) {
	this.vertexNum = vertexNum ; 	// 顶点的数量
	this.edgeNum = 0;				// 边的数量
	this.matrix = new Array(this.vertexNum);	// 图的邻接矩阵
	for (var i=0; i<this.vertexNum; i++) {
		this. matrix[i] = new Array(this.vertexNum);
		for (var j=0; j<this.vertexNum; j++) {
			this.matrix[i][j] = 0;
		}
	}
	this.position = new Array(this.vertexNum);	// 存储顶点的位置
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i] = new Array(2);
	}
	for (var i =0; i< this.vertexNum; i++) {
		this.position[i][0] = Math.round( this.X0 + this.R * Math.sin( 2* Math.PI * i / this.vertexNum ) );
		this.position[i][1] = Math.round( this.Y0 - this.R * Math.cos( 2 * Math.PI * i / this.vertexNum ) );
	}
	//this.graphObjectID = new Array(maxSize) ; // 
	
	for(var i=0 ; i<this.vertexNum ; i++) {
		//this.graphObjectID[i] = -1 ;
		this.cmd("CreateCircle", this.objectID, this.objectID,
				 this.position[this.objectID][0], this.position[this.objectID][1], this.radius);
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
		this.objectID ++ ;
	}
	return this.commands;
}

// 是否显示边权重，show为bool类型，表示是否显示权重
Graph.prototype.showEdgeWeight = function(show) {
	//alert("show Edge weight");
	var graphType = undirectedGraph.checked ;
	var upperBound ;
	for (var i=0; i<this.vertexNum; i++) {
		upperBound = graphType? i : this.vertexNum;
		for (var j=0; j<upperBound; j++) {
			if(this.matrix[i][j] )  {
				this.cmd("Disconnect", i, j);
			}
		}
	}
	for (var i=0; i<this.vertexNum; i++) {
		upperBound = graphType? i : this.vertexNum;
		for (var j =0; j<upperBound; j++) {
			if(this.matrix[i][j]) {
				var curve = directedGraph.checked? directedGraphCurve : undirectedGraphCurve;
				if(show) {
					this.cmd("Connect", i, j, this.foregroundColor, curve, this.directed, this.matrix[i][j]);
				}
				else {
					this.cmd("Connect", i, j, this.foregroundColor, curve, this.directed );
				}
			}
		}
	}
	return this.commands;
}

// 清除图的所有边
Graph.prototype.clearAllEdges = function () {
	//alert("clearAllEdges");
	// 有向图
	//alert(this.directed);
	if (this.directed ) {
		for(var i=0; i<this.vertexNum; i++ ) {
			for(var j=0; j<this.vertexNum; j++) {
				if (this.matrix[i][j]) {
					this.cmd("Disconnect", i, j);
					this.matrix[i][j] = 0;
				}
			}
		}
	}
	// 无向图
	else {
		for (var i=0; i<this.vertexNum; i++) {
			for (var j=0; j<i ; j++) {
				if (this.matrix[i][j]) {
					this.cmd("Disconnect", i, j );
					this.matrix[i][j] =0;
					this.matrix[j][i] =0;
				}
			}
		}
	}
	this.edgeNum =0;
	return this.commands;
}

// 产生一个随机图
Graph.prototype.getRandomGraph = function () {
	//alert("getRandomGraph");
	//alert(this.matrix);
	// 产生无向图
	if (undirectedGraph.checked) {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j<i; j++) {
				this.matrix[i][j] = getRandomNumber(0,1);
				this.matrix[j][i] = this.matrix[i][j];
				this.edgeNum++;
				if (this.matrix[i][j] ) {
					if (showEdgeWeight.checked){
						this.cmd("Connect", i, j, this.foregroundColor, undirectedGraphCurve, false, this.matrix[i][j]);
					}
					else {
						this.cmd("Connect", i, j, this.foregroundColor, undirectedGraphCurve, false );
					}
				}
			}
		}
	}
	// 产生有向图
	else {
		for(var i=0; i < this.vertexNum; i++) {
			for (var j=0; j<this.vertexNum; j++) {
				if (i != j ) {
					this.matrix[i][j] = getRandomNumber(0,1);
					this.edgeNum++;
					if (this.matrix[i][j] ) {
						if (showEdgeWeight.checked){
							this.cmd("Connect", i, j, this.foregroundColor, directedGraphCurve, true, this.matrix[i][j]);
							/*
							this.cmd("SetLineHighlight", i, j, true) ;
							this.cmd("Step") ;
							this.cmd("SetLineHighlight", i, j, false) ;
							this.cmd("Step") ;
							*/
						}
						else {
							this.cmd("Connect", i, j, this.foregroundColor, directedGraphCurve, true );
						}
						//alert("connect "+i+" to "+j +"curve:"+curve);
					}
				}
			}
		}
	}
	//alert(this.matrix);
	return this.commands;
}
	
// 添加边
Graph.prototype.addEdge = function() {
	// 传入参数，起点，终点，权重
	startVertex = parseInt( arguments[0][0]);
	endVertex = parseInt( arguments[0][1]);
	weight = parseInt( arguments[0][2] );
	// 传入参数的合法性判断
	if (startVertex <0 && startVertex >= this.vertexNum) {
		alert("start Vertex illeagl");
		return this.commands;
	}
	if (endVertex <0 && endVertex >= this.vertexNum) {
		alert("end Vertex illeagl");
		return this.commands;
	}
	if(weight <=0 ) {
		alert("weight illeagl");
		return this.commands;
	}
	if (this.directed) {
		if (this.matrix[startVertex][endVertex] ) {
			alert("this edge already exists");
			return this.commands;
		}
	}
	else {
		if (this.matrix[startVertex][endVertex] || this.matrix[endVertex][startVertex]) {
			alert("this edge already exists");
			return this.commands;
		}
	}
	// 添加这个边

	this.cmd("SetHighlight", startVertex, true) ;
	this.cmd("SetHighlight", endVertex, true) ;
	this.cmd("Step") ;
	this.cmd("SetHighlight", startVertex, false) ;
	this.cmd("SetHighlight", endVertex, false) ;
	this.cmd("Step") ;
	//this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);

	// 有向图
	if (this.directed) {
		this.cmd("Connect", startVertex, endVertex, this.foregroundColor, directedGraphCurve, this.directed, weight);
		this.matrix[startVertex][endVertex] = weight;
	}
	// 无向图
	else {
		this.cmd("Connect", startVertex, endVertex, this.foregroundColor, undirectedGraphCurve, this.directed, weight);
		this.matrix[startVertex][endVertex] = weight;
		this.matrix[endVertex][startVertex] = weight;
	}
	return this.commands;
}
	
// 删除边
Graph.prototype.delEdge = function() {
	// 传入参数，要删除的边
	startVertex = arguments[0][0];
	endVertex = arguments[0][1];
	// 传入参数的合法性判断
	if (startVertex <0 && startVertex >= this.vertexNum) {
		alert("start Vertex illeagl");
		return this.commands;
	}
	if (endVertex <0 && endVertex >= this.vertexNum) {
		alert("end Vertex illeagl");
		return this.commands;
	}
	{
		this.cmd("SetHighlight", startVertex, true) ;
		this.cmd("SetHighlight", endVertex, true) ;
		this.cmd("Step") ;
		this.cmd("SetHighlight", startVertex, false) ;
		this.cmd("SetHighlight", endVertex, false) ;
		this.cmd("Step") ;
		this.cmd("Disconnect", startVertex, endVertex);
	}
	// 有向图
	if (this.directed) {
		this.matrix[startVertex][endVertex] = 0;
	}
	else {
		this.matrix[startVertex][endVertex] = 0;
		this.matrix[endVertex][startVertex] = 0;
	}
	return this.commands;
}

// firstEdge, nextEdge
Graph.prototype.firstEdge = function (vertex) {
	for(var i=0; i< this.vertexNum; i++) {
		if ( this.matrix[vertex][i] ) {
			var edge = new GraphEdge(vertex,i,this.matrix[vertex][i]);
			return edge;
		}
	}
	return null;	// 该顶点没有邻边
}

Graph.prototype.nextEdge = function (edge) {
	for (var i = edge.endVertex + 1; i<this.vertexNum; i++) {
		if( this.matrix[edge.startVertex][i] ) {
			edge.endVertex = i;
			edge.weight = this.matrix[edge.startVertex][i];
			return edge;
		}
	}
	return null;	// 没有nextEdge
}

// DFS
Graph.prototype.DFSTraverse = function(startVertex) {
	//alert("start DFSTraverse()");
	this.visited = new Array(this.vertexNum);
	for (var i=0; i<this.vertexNum; i++ ) {
		this.visited[i] = false;
	}
	if ( !this.visited[startVertex] ) {
		this.DFS(startVertex);
	}
	return this.commands;
}

Graph.prototype.DFS = function(vertex) {
	this.visited[vertex] = true;
	{
		//alert("visit "+ vertex);
		this.cmd("SetHighlight", vertex, true);
		this.cmd("Step");
		this.cmd("SetHighlight", vertex, false);
		this.cmd("Step");
		//this.cmd("Connect", startVertex, endVertex, this.foregroundColor, 0.0, false, weight);
	}
	for (var edge = this.firstEdge(vertex); ; edge = this.nextEdge(edge)) {
		if( edge == null ) {		// edge 不是边, 退出
			return null;
		}
		if( !this.visited[edge.endVertex] ) {
/*			{
				this.cmd("Disconnect", edge.startVertex, edge.endVertex);
				this.cmd("Connect", edge.startVertex, edge.endVertex, this.foregroundColor, 0.0, false, "1");
				this.cmd("Step");
			}
*/			this.DFS(edge.endVertex);
		}
	}	
}



