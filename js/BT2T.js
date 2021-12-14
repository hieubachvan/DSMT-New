// JavaScript Document

var currentBT2T;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentBT2T = new BT2T(animationManager, drawing.width, drawing.height) ;
	// currentBT2T.implementAction(currentBT2T.initStateBox.bind(currentBT2T), "start");
}
    
// BT2T树
var BT2T = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
BT2T.prototype = new Algorithm();
BT2T.prototype.constructor = BT2T;

// 初始化控件
BT2T.prototype.initControls = function() {
	var listOption = ['','bTree','Tree'];
	var listOptionChild = ['leftChild','rightChild'];
	this.treeStyle = addSelectToAlgorithmBar(listOption);
	this.treeStyle.id = "mySelect";
	this.treeStyle.onchange = this.offSelectOrNot.bind(this);
	addLabelToAlgorithmBar("节点");
	this.startInsertField = addInputToAlgorithmBar("text", "");
	this.startInsertField.id = "startInput";
	addLabelToAlgorithmBar("的");
	this.childSelect = addSelectToAlgorithmBar(listOptionChild);
	this.childSelect.id = "childSelect";
	addLabelToAlgorithmBar("子节点是");
	this.endInsertField = addInputToAlgorithmBar("text", "");
	this.endInsertField.id = "endInput";
	this.childSelect.onchange;
	this.createButton =	addInputToAlgorithmBar("button", "生成边");
	this.createButton.onclick = this.createButtonCallBack.bind(this) ;
	this.createButton.id = "crButton";
	this.changeButton =	addInputToAlgorithmBar("button", "转换");
	this.changeButton.onclick = this.changeButtonCallBack.bind(this) ;
	this.newButton = addInputToAlgorithmBar("button", "刷新当前页面（将清空所有输入~）");
	this.newButton.onclick = this.newButtonCallBack.bind(this) ;
}
BT2T.prototype.selectStyleButtonCallBack = function(style) {
	this.offSelectOrNot(style);
}
BT2T.prototype.offSelectOrNot = function(style) {
	this.treeStyle = style;
	if (this.treeStyle == "Tree") {
		alert("输入用三叉树代替森林演示树转换为二叉树算法");
		this.createConstTreeCallBack();
	}
	else if (this.treeStyle == "bTree"){
		alert("输入的二叉树根结点无右孩子，至多转换为三叉树，且转换后至多为4层");
	}
	// if(this.treeStyle.value == 'Tree'){
		// document.getElementById("childSelect").disabled = true;
		// document.getElementById("mySelect").disabled = true;
		// document.getElementById("crButton").disabled = true;
		// this.createConstTreeCallBack();
		//alert("输入的多叉树 叉数 至多为3叉，层数至多为4层！");
	// }
	// else if(this.treeStyle.value == 'bTree'){
		// document.getElementById("mySelect").disabled = true;
		// alert("输入的二叉树根结点无右孩子，至多转换为三叉树，且转换后至多为4层");
	// }
}
// 初始化属性
BT2T.prototype.initAttributes = function() {
	// 逻辑部分
	this.root = null ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.radius = 10 ; // 圆的半径
	this.intervalX = 30 ; // x间隙,在形成树的时候应用
	this.intervalY = 45 ; // y间隙,在形成树的时候应用
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.iniXc = 250 ; //节点产生起始位置的x坐标
	this.iniYc = 150 ; // 新节点的y坐标
	this.iniXr = 400 ;
	this.iniYr = 100 ;
	this.startX = 300 ; //产生新父节点的x坐标
	this.startY = 150 ; //产生新父节点的y坐标
	this.BT2TNodeArray = new Array();//包括树的全部节点
	this.rootArray = new Array();
	this.valueableNumOfArticle = 0;
}

// 初始化状态框
BT2T.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}
/*
	调用this.autoBTreeToTree()来自动生成一棵二叉树
*/
BT2T.prototype.autoBTreeToTree = function() {
	//alert("请刷新当前页面再进行下一步操作");
	var Range = 5 - 1;
	var Rand = Math.random();
	var num = 1 + Math.round(Rand * Range);
	if(num == 1){
		this.B2T1();
	}else if(num == 2){
		this.B2T2();
	}else if(num == 3){
		this.B2T3();
	}else if(num == 4){
		this.B2T4();
	}else{
		this.B2T5();
	}
}
BT2T.prototype.B2T1 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b','leftChild'];	constArray[1] = ['b','e','leftChild'];
	constArray[2] = ['b','c','rightChild'];	constArray[3] = ['e','f','rightChild'];
	constArray[4] = ['f','g','rightChild'];	constArray[5] = ['f','l','leftChild'];
	constArray[6] = ['l','m','rightChild'];	constArray[7] = ['m','n','rightChild'];
	constArray[8] = ['g','o','leftChild'];	constArray[9] = ['o','p','rightChild'];
	constArray[10] = ['c','h','leftChild'];	constArray[11] = ['c','d','rightChild'];
	constArray[12] = ['h','q','leftChild'];	constArray[13] = ['h','i','rightChild'];
	constArray[14] = ['d','j','leftChild'];	constArray[15] = ['j','r','leftChild'];
	constArray[16] = ['j','k','rightChild'];	constArray[17] = ['r','s','rightChild'];
	constArray[18] = ['s','t','rightChild'];
	for(var i = 0; i<19;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = constArray[i][2];
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawbTree();
	}
}
BT2T.prototype.B2T2 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b','leftChild'];	constArray[1] = ['b','c','leftChild'];
	constArray[2] = ['b','d','rightChild'];  constArray[3] = ['d','e','leftChild'];
	constArray[4] = ['e','g','leftChild'];  constArray[5] = ['e','h','rightChild'];
	constArray[6] = ['h','i','leftChild'];  constArray[7] = ['h','j','rightChild'];
	constArray[8] = ['d','f','rightChild'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = constArray[i][2];
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawbTree();
	}
}
BT2T.prototype.B2T3 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b','leftChild'];	constArray[1] = ['b','c','leftChild'];
	constArray[2] = ['b','d','rightChild'];  constArray[3] = ['c','e','leftChild'];
	constArray[4] = ['c','f','rightChild'];  constArray[5] = ['e','i','leftChild'];
	constArray[6] = ['e','j','rightChild'];  constArray[7] = ['d','g','leftChild'];
	constArray[8] = ['d','h','rightChild'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = constArray[i][2];
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawbTree();
	}
}
BT2T.prototype.B2T4 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b','leftChild'];	constArray[1] = ['b','c','leftChild'];
	constArray[2] = ['b','d','rightChild'];	constArray[3] = ['d','e','leftChild'];
	constArray[4] = ['d','f','rightChild'];	 constArray[5] = ['f','g','leftChild'];
	constArray[6] = ['g','h','leftChild'];	constArray[7] = ['g','i','rightChild'];	
	constArray[8] = ['i','j','rightChild'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = constArray[i][2];
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawbTree();
	}
}
BT2T.prototype.B2T5 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b','leftChild'];	constArray[1] = ['b','c','leftChild'];
	constArray[2] = ['b','d','rightChild'];  constArray[3] = ['c','e','rightChild'];
	constArray[4] = ['e','f','leftChild'];  constArray[5] = ['e','g','rightChild'];
	constArray[6] = ['f','h','rightChild'];  constArray[7] = ['h','i','rightChild'];
	constArray[8] = ['d','j','rightChild'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = constArray[i][2];
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawbTree();
	}
}
BT2T.prototype.createConstTreeCallBack = function(withStep) {
	var Range = 5 - 1;
	var Rand = Math.random();
	var num = 1 + Math.round(Rand * Range);
	if(num == 1){
		this.T2B1();
	}else if(num == 2){
		this.T2B2();
	}else if(num == 3){
		this.T2B3();
	}else if(num == 4){
		this.T2B4();
	}else{
		this.T2B5();
	}
}
BT2T.prototype.T2B1 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b'];	constArray[1] = ['a','c'];
	constArray[2] = ['a','d'];	constArray[3] = ['b','e'];
	constArray[4] = ['b','f'];	constArray[5] = ['b','g'];
	constArray[6] = ['c','h'];	constArray[7] = ['c','i'];
	constArray[8] = ['d','j'];	constArray[9] = ['d','k'];
	constArray[10] = ['f','l'];	constArray[11] = ['f','m'];
	constArray[12] = ['f','n'];	constArray[13] = ['g','o'];
	constArray[14] = ['g','p'];	constArray[15] = ['h','q'];
	constArray[16] = ['j','r'];	constArray[17] = ['j','s'];
	constArray[18] = ['j','t'];
	for(var i = 0; i<19;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawTree();
	}
}
BT2T.prototype.T2B2 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b'];	constArray[1] = ['a','d'];
	constArray[2] = ['a','f'];  constArray[3] = ['b','c'];
	constArray[4] = ['d','e'];  constArray[5] = ['f','g'];
	constArray[6] = ['f','i'];  constArray[7] = ['f','j'];
	constArray[8] = ['g','h'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawTree();
	}
}
BT2T.prototype.T2B3 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b'];	constArray[1] = ['a','d'];
	constArray[2] = ['a','f'];  constArray[3] = ['b','c'];
	constArray[4] = ['d','e'];  constArray[5] = ['d','h'];
	constArray[6] = ['d','j'];  constArray[7] = ['e','g'];
	constArray[8] = ['h','i'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawTree();
	}
}
BT2T.prototype.T2B4 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b'];	constArray[1] = ['a','d'];
	constArray[2] = ['a','h'];  
	constArray[3] = ['b','c'];  constArray[4] = ['b','f'];
	constArray[5] = ['d','g'];  constArray[6] = ['c','e'];
	constArray[7] = ['c','j'];  constArray[8] = ['f','i'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawTree();
	}
}
BT2T.prototype.T2B5 = function(){
	var startInsertValue;
	var endInsertValue;
	var leftOrRight;
	var constArray = [];
	constArray[0] = ['a','b'];	constArray[1] = ['a','d'];
	constArray[2] = ['a','j'];  constArray[3] = ['b','c'];
	constArray[4] = ['b','e'];  constArray[5] = ['b','g'];
	constArray[6] = ['e','f'];  constArray[7] = ['e','h'];
	constArray[8] = ['e','i'];
	for(var i = 0; i<9;++i){
		startInsertValue = constArray[i][0];
		endInsertValue = constArray[i][1];
		leftOrRight = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
		this.drawTree();
	}
}
// 插入回调函数
BT2T.prototype.createButtonCallBack = function(parentNode,nodePosition,childNode) {
	nodePosition = (nodePosition=="left")?("leftChild"):((nodePosition=="right")?("rightChild"):nodePosition);
	// var treeOrBTree = this.treeStyle.value;
	var treeOrBTree = this.treeStyle;
	var leftOrRight;
	if(treeOrBTree == "bTree"){
		// leftOrRight = this.childSelect.value;
		leftOrRight = nodePosition;
	}
	else if(treeOrBTree == "Tree"){
		leftOrRight = "";
	}
	// var startInsertValue = this.startInsertField.value;
	// var endInsertValue = this.endInsertField.value;
	var startInsertValue = parentNode;
	var endInsertValue = childNode;
	if (startInsertValue != "" && endInsertValue != "" && ((leftOrRight == "" && treeOrBTree == "Tree") ||(leftOrRight != "" && treeOrBTree == "bTree")))
	{
		// this.startInsertField.value = "";
		// this.endInsertField.value = "";
		this.implementAction(this.createBT2T.bind(this), [startInsertValue, endInsertValue, leftOrRight] );
	}
	if(treeOrBTree == "bTree"){
		this.drawbTree(); // 画出当前树的情况
	}
	else if(treeOrBTree == "Tree"){
		this.drawTree();
	}
}
BT2T.prototype.newButtonCallBack = function(event) {
	location.reload();
}
BT2T.prototype.changeButtonCallBack = function(treeStyle) {
	// var treeOrBTree = this.treeStyle.value;
	// var treeOrBTree = this.treeStyle;
	this.alertt(treeStyle);
	// document.getElementById("autoBT2T").disabled = true;
	// document.getElementById("crButton").disabled = true;
}
// 查找重复
BT2T.prototype.isFind = function(value){
	for(var index = 0; index < this.BT2TNodeArray.length; index++){
		if(value == this.BT2TNodeArray[index].value){
			return index;
		}
	}
	return -1;
}
// 创建BT2T
BT2T.prototype.createBT2T = function() {
	var startValue = arguments[0][0];
	var endValue = arguments[0][1];
	var lfOrRgt = arguments[0][2];
	var fatherObID = -1;
	var indexI = -1;
	var x = 1;
	var y = 1;
	var isStartFind = this.isFind(startValue);
	var isEndFind = this.isFind(endValue);
	if(startValue == endValue){
		alert("节点重复，请重新输入！");
		return this.commands ;
	}
	if(-1 != isStartFind && -1 != isEndFind && this.BT2TNodeArray[isEndFind].faObID != this.BT2TNodeArray[isEndFind].objectID){ // 判断是否存在环！！！！！！
		alert("输入两节点均存在，请重新输入！");
		return this.commands ;
	}
	if(-1 == isStartFind && -1 != isEndFind){
		if(this.BT2TNodeArray[this.BT2TNodeArray[isEndFind].faObID-1].value != startValue){
			if(this.BT2TNodeArray[isEndFind].faObID != this.BT2TNodeArray[isEndFind].objectID){
				alert("输入两节点均存在，请重新输入！");
				return this.commands ;
			}
		}
	}
	if(-1 != isStartFind && -1 == isEndFind){
		if(this.BT2TNodeArray[isStartFind].chObIDArray[0]!=null && lfOrRgt== "leftChild"){
			alert("输入两节点均存在，请重新输入！");
			return this.commands ;
		}
		if(this.BT2TNodeArray[isStartFind].chObIDArray[1]!=null && lfOrRgt== "rightChild"){
			alert("输入两节点均存在，请重新输入！");
			return this.commands ;
		}
	}
	if(-1 == isStartFind){ // 对于二叉树的插入，每条边的根结点不用特殊考虑，叶节点考虑1.输入是否存在 2.是否重复添加左(右)子树 3.子树添加是否超过二叉
		this.BT2TNodeArray[this.objectID-1] = new BT2TNode(this.objectID, this.objectID, null, x, y, this.objectID-1, startValue);
		this.cmd("CreateCircle", this.objectID, startValue, this.iniXr, this.iniYr, this.radius) ;
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor) ;
		 this.cmd("Step") ;
		fatherObID = this.BT2TNodeArray[this.objectID-1].objectID;
		if(lfOrRgt != ""){
			this.BT2TNodeArray[fatherObID-1].chObIDArray[0] = null;
			this.BT2TNodeArray[fatherObID-1].chObIDArray[1] = null;
		}
		this.objectID ++;
	}
	if(-1 != isStartFind){
		indexI = isStartFind;
		fatherObID = this.BT2TNodeArray[indexI].objectID;
	}
	if(-1 == isEndFind){
		this.BT2TNodeArray[this.objectID-1] = new BT2TNode(this.objectID, fatherObID, null, x, y, this.objectID-1, endValue);
		this.cmd("CreateCircle", this.objectID, endValue, this.iniXc, this.iniYc, this.radius) ;
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor) ;
		 this.cmd("Step") ;
		if(lfOrRgt == ""){
			this.BT2TNodeArray[fatherObID-1].chObIDArray.push(this.objectID);
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.objectID, this.foregroundColor) ;
		}
		else if(lfOrRgt == "leftChild"){
			this.BT2TNodeArray[fatherObID-1].chObIDArray[0] = this.objectID;
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.BT2TNodeArray[fatherObID-1].chObIDArray[0], this.foregroundColor) ;
		}
		else if(lfOrRgt == "rightChild"){
			this.BT2TNodeArray[fatherObID-1].chObIDArray[1] = this.objectID;
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.BT2TNodeArray[fatherObID-1].chObIDArray[1], this.foregroundColor) ;
		}
		this.objectID ++;
	}
	if(-1 != isEndFind){
		indexI = isEndFind;
		this.BT2TNodeArray[indexI].faObID = fatherObID;
		if(lfOrRgt == ""){
			this.BT2TNodeArray[fatherObID-1].chObIDArray.push(this.BT2TNodeArray[indexI].objectID);
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.BT2TNodeArray[indexI].objectID, this.foregroundColor) ;
		}
		else if(lfOrRgt == "leftChild"){
			this.BT2TNodeArray[fatherObID-1].chObIDArray[0] = this.BT2TNodeArray[indexI].objectID;
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.BT2TNodeArray[indexI].objectID, this.foregroundColor) ;
		}
		else if(lfOrRgt == "rightChild"){
			this.BT2TNodeArray[fatherObID-1].chObIDArray[1] = this.BT2TNodeArray[indexI].objectID;
			this.BT2TNodeArray[fatherObID-1].lengthOfChild ++;
			this.cmd("Connect", this.BT2TNodeArray[fatherObID-1].objectID, this.BT2TNodeArray[indexI].objectID, this.foregroundColor) ;
		}
	}
	this.done();
	
	for(var indexRoot = 0; indexRoot < this.BT2TNodeArray.length; indexRoot++){
		if(this.BT2TNodeArray[indexRoot].objectID == this.BT2TNodeArray[indexRoot].faObID){
			this.rootArray.push(indexRoot);
		}
	}
	return this.commands ;
}
BT2T.prototype.drawbTree = function() { // 画图
	for(var Pt = 0; Pt<this.rootArray.length ; Pt++){
		this.root = this.BT2TNodeArray[this.rootArray[Pt]];
		if(Pt != 0){
			this.resizeWidth(this.root);
			this.BT2TNodeArray[this.rootArray[Pt]].x = this.BT2TNodeArray[this.rootArray[Pt-1]].x + this.BT2TNodeArray[this.rootArray[Pt-1]].rightWidth + this.BT2TNodeArray[this.rootArray[Pt]].leftWidth ;
		}
		if(this.rootArray.length == 1){
			this.root.x = 900;
		}
		this.resizeTree(this.root.x);
	}
	this.rootArray.length = 0;
}

BT2T.prototype.drawTree = function() { // 画图
	//alert("Function Start!");
	var level = 3; //层数为 4+1 层
	var startY = new Array();
	var xOfTheTree = new Array();
	var usedOrNot = new Array();
	xOfTheTree[0] = 600; // 0号x节点的横轴坐标
	startY[0] = this.startY ; // 第0层节点纵轴坐标
	usedOrNot[0] = false;
	for(var indexLevel = 1;indexLevel <= level+1;indexLevel++){
		startY[indexLevel] = startY[indexLevel-1] + this.intervalY;
	}
	for(var indexRoot = 0; indexRoot < 14; indexRoot++){
		for(var index13 = 1; index13 < 4;index13++){
			if(indexRoot*3 + index13 >= 1){
				xOfTheTree[indexRoot*3 + index13] = xOfTheTree[indexRoot]+(index13-2)*9*this.intervalX;
			}
			if(indexRoot*3 + index13 >= 4){
				xOfTheTree[indexRoot*3 + index13] = xOfTheTree[indexRoot]+(index13-2)*3*this.intervalX;
			}
			if(indexRoot*3 + index13 >= 13){
				xOfTheTree[indexRoot*3 + index13] = xOfTheTree[indexRoot]+(index13-2)*this.intervalX;
			}
			usedOrNot[indexRoot*3 + index13] = false;
		}
	}
	// 预处理为按顺序（先跟节点后子节点的顺序）
	var tempIndexInOrder = new Array();
	var lengthOfOrder = this.BT2TNodeArray.length;
	var order = 0;
	var CONSTINDEX = 0;
	var CONSTINDEXFATHER = 0;
	var childLength = 0;
	var childNum = 0;
	var flag = 1;
	var keyCONSTINDEX = 0;
	//var indexRoot = 0;
	//alert(this.rootArray.length);
	for(var indexroot = 0;indexroot < this.rootArray.length; indexroot++)
	{
		//alert("CONST: " + CONSTINDEX +"order: "+order);
		keyCONSTINDEX = CONSTINDEX ;
		tempIndexInOrder[order] = this.BT2TNodeArray[this.rootArray[indexroot]].index;
		order++;
		while(flag == 1)
		{
			CONSTINDEXFATHER = tempIndexInOrder[CONSTINDEX];
			childLength = this.BT2TNodeArray[tempIndexInOrder[CONSTINDEX]].chObIDArray.length;
			//alert(this.BT2TNodeArray[tempIndexInOrder[CONSTINDEX]].value +" has "+ childLength +"child");
			childNum = 0;
			while(childNum < childLength){
				tempIndexInOrder[order] = this.BT2TNodeArray[CONSTINDEXFATHER].chObIDArray[childNum]-1;
				order++;
				childNum++;
			}
			CONSTINDEX++;
			if(flag == 0){
				break;
			}
			if(this.BT2TNodeArray[tempIndexInOrder[CONSTINDEX]].chObIDArray.length == 0 && CONSTINDEX == (order-1)){
				flag = 0;
			}
		}
		flag = 1;
		CONSTINDEX++;
		//alert("When Root is: "+this.BT2TNodeArray[this.rootArray[indexroot]].value);
	}
	/*for(var i = 0; i < tempIndexInOrder.length; i++){
		alert("Order is: " + this.BT2TNodeArray[tempIndexInOrder[i]].value);
	}*/
	//alert("Function End!");
	var maxX = 0;
	var maxY = 0;
	var keyIndex = new Array();
	for(var indexroot2 = 0;indexroot2 < this.rootArray.length; indexroot2++){
		for(var i = 0; i<tempIndexInOrder.length; i++){
			if(tempIndexInOrder[i] == this.BT2TNodeArray[this.rootArray[indexroot2]].index){
				keyIndex[indexroot2] = i;
				break;
			}
		}
	}
	
	for(var indexroot1 = 0;indexroot1 < this.rootArray.length; indexroot1++)
	{
		this.BT2TNodeArray[this.rootArray[indexroot1]].x = maxX;
		usedOrNot[maxX] = true;
		this.BT2TNodeArray[this.rootArray[indexroot1]].y = startY[maxY];
		for(var indexDraw = keyIndex[indexroot1]+1; indexDraw < this.BT2TNodeArray.length; indexDraw++){
			if(this.BT2TNodeArray[tempIndexInOrder[indexDraw]].objectID == this.BT2TNodeArray[tempIndexInOrder[indexDraw]].faObID){
				break;
			}
			var faXIndex = this.BT2TNodeArray[this.BT2TNodeArray[tempIndexInOrder[indexDraw]].faObID-1].x ;
			for(var indexDraw13 = 1; indexDraw13 < 4; indexDraw13++){
				if(!usedOrNot[faXIndex*3 + indexDraw13]){
					this.BT2TNodeArray[tempIndexInOrder[indexDraw]].x = faXIndex*3 + indexDraw13;
					if(maxX <= faXIndex*3 + indexDraw13){
						maxX = faXIndex*3 + indexDraw13 + 1;
					}
					if(faXIndex*3 + indexDraw13 >= 1 && faXIndex*3 + indexDraw13 <= 3){
						this.BT2TNodeArray[tempIndexInOrder[indexDraw]].y = startY[1];
					}else if(faXIndex*3 + indexDraw13 >= 4 && faXIndex*3 + indexDraw13 <= 12){
						this.BT2TNodeArray[tempIndexInOrder[indexDraw]].y = startY[2];
					}else if(faXIndex*3 + indexDraw13 >=13 && faXIndex*3 + indexDraw13 <= 39){
						this.BT2TNodeArray[tempIndexInOrder[indexDraw]].y = startY[3];
					}
					if(maxX >= 1 && maxX <= 3){
						maxY = 1;
					}else if(maxX >= 4 && maxX <= 12){
						maxY = 2;
					}else if(maxX >=13 && maxX <= 39){
						maxY = 3;
					}
					usedOrNot[faXIndex*3 + indexDraw13] = true;
					break;
				}
			}
		}
	}
	for(var OMG = 0; OMG < this.BT2TNodeArray.length; OMG++){
		this.cmd("Move", this.BT2TNodeArray[tempIndexInOrder[OMG]].objectID, xOfTheTree[this.BT2TNodeArray[tempIndexInOrder[OMG]].x], this.BT2TNodeArray[tempIndexInOrder[OMG]].y) ;
		//this.cmd("Step") ;
	}
	this.rootArray.length = 0;
}

BT2T.prototype.done = function() { // 后处理函数,为没有孩子的节点补值为null
	for(var indexJ = 0; indexJ < this.BT2TNodeArray.length; indexJ ++){
		for(var indexK = 0; indexK < this.BT2TNodeArray[indexJ].lengthOfChild; indexK ++){
			if(isNaN(this.BT2TNodeArray[indexJ].chObIDArray[indexK])){
				this.BT2TNodeArray[indexJ].chObIDArray[indexK] = null;
			}
		}
	}
}
BT2T.prototype.alertt = function(keyWord) {
	var maxChildOfBT2T = -1;
	var rootIndex = -1;
	for(var indexJ = 0; indexJ < this.BT2TNodeArray.length; indexJ ++){
		if(maxChildOfBT2T <= this.BT2TNodeArray[indexJ].chObIDArray.length){
			maxChildOfBT2T = this.BT2TNodeArray[indexJ].chObIDArray.length;
		}
		if(this.BT2TNodeArray[indexJ].objectID == this.BT2TNodeArray[indexJ].faObID){
			rootIndex = indexJ;
		}
	}
	if(maxChildOfBT2T <= 2 && keyWord == "bTree"){
		if(this.BT2TNodeArray[rootIndex].chObIDArray[1] != null){
			alert("输入二叉树根结点有右孩子，会生成2棵以上的树，请重新输入！");
			return this.commands ;
		}
		//alert("二叉树 到 树");
		this.bTree2Tree();
		/*for(var indexK = 0; indexK < this.BT2TNodeArray.length; indexK ++){
			alert("Value: "+this.BT2TNodeArray[indexK].value+", fa: "+this.BT2TNodeArray[indexK].faObID+", Object: "+this.BT2TNodeArray[indexK].objectID+", index: "+indexK+", child: "+this.BT2TNodeArray[indexK].chObIDArray);//[0]+", child: "+this.BT2TNodeArray[indexK].chObIDArray[1]);
		}*/	
	}
	else if(maxChildOfBT2T > 2 && keyWord == "Tree"){
		//alert("树 到 二叉树");
		this.tree2BTree();
		/*for(var indexK = 0; indexK < this.BT2TNodeArray.length; indexK ++){
			alert("Value: "+this.BT2TNodeArray[indexK].value+", fa: "+this.BT2TNodeArray[indexK].faObID+", Object: "+this.BT2TNodeArray[indexK].objectID+", index: "+indexK+", leftchild: "+this.BT2TNodeArray[indexK].chObIDArray[0]+", rightchild: "+this.BT2TNodeArray[indexK].chObIDArray[1]);
		}*/
	}
	else{
		alert("输入节点数与选择种类不同，请检查，并刷新页面改正！");
	}
}
BT2T.prototype.tree2BTree = function() {
	//1) 树中所有相邻兄弟节点之间连线
	//2) 保留与第一个孩子的连线，删除其与其他孩子的连线
	//3) 第一个孩子作为左孩子，剩下的为右孩子
	//4) 画出二叉树
	var cdForFaArray = new Array();
	for(var indexK = 0 ; indexK < this.BT2TNodeArray.length ; indexK ++){
		if(this.BT2TNodeArray[indexK].chObIDArray.length > 0){// objectID = index + 1;
			var childForFather = this.BT2TNodeArray[indexK].chObIDArray[0];
			cdForFaArray.push(childForFather);
			for(var indexNumOfChild = this.BT2TNodeArray[indexK].chObIDArray.length-1 ; indexNumOfChild >= 1 ; indexNumOfChild --){
				this.BT2TNodeArray[this.BT2TNodeArray[indexK].chObIDArray[indexNumOfChild]-1].faObID = this.BT2TNodeArray[indexK].chObIDArray[indexNumOfChild-1];
			}
		}
		this.BT2TNodeArray[indexK].chObIDArray.push(null);
		this.BT2TNodeArray[indexK].chObIDArray.push(null);
	}
	for(var indexK = 0; indexK < this.BT2TNodeArray.length; indexK ++){ // 连接左孩子和右孩子
		this.cmd("Connect", this.BT2TNodeArray[this.BT2TNodeArray[indexK].faObID-1].objectID, this.BT2TNodeArray[indexK].objectID, this.foregroundColor) ;
		this.cmd("Step") ;
		//alert("Value: "+this.BT2TNodeArray[indexK].value+", fa: "+this.BT2TNodeArray[this.BT2TNodeArray[indexK].faObID-1].value);
	}
	for(var indexK = 0; indexK < this.BT2TNodeArray.length; indexK ++){ // 断开与父节点的连接
		for(var i=1; i<this.BT2TNodeArray[indexK].chObIDArray.length-2; i++){
			this.cmd("disConnect", this.BT2TNodeArray[indexK].objectID, this.BT2TNodeArray[this.BT2TNodeArray[indexK].chObIDArray[i]-1].objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
	}
	for(var indexL = 0 ; indexL < this.BT2TNodeArray.length ; indexL ++){
		var obNum = this.BT2TNodeArray[indexL].objectID;
		var someResult = cdForFaArray.some(function(item, index, array){
			return (item == obNum);
		});
		if(!someResult){// 不存在于每层第一个节点
			this.BT2TNodeArray[this.BT2TNodeArray[indexL].faObID-1].chObIDArray[1] = this.BT2TNodeArray[indexL].objectID;
		}
		if(this.BT2TNodeArray[indexL].faObID == this.BT2TNodeArray[indexL].objectID){ // 特殊处理根结点的孩子
			this.BT2TNodeArray[this.BT2TNodeArray[indexL].faObID-1].chObIDArray[1] = null;
		}
	}
	for(var indexJ = 0; indexJ < this.BT2TNodeArray.length; indexJ ++){
		if(isNaN(this.BT2TNodeArray[indexJ].chObIDArray[0])){
			this.BT2TNodeArray[indexJ].chObIDArray[0] = null;
		}
		if(isNaN(this.BT2TNodeArray[indexJ].chObIDArray[1])){
			this.BT2TNodeArray[indexJ].chObIDArray[1] = null;
		}
	}
	{ // 调整树的整体位置
		for(var indexTree = 0; indexTree < this.BT2TNodeArray.length; indexTree++){
			if(this.BT2TNodeArray[indexTree].faObID == this.BT2TNodeArray[indexTree].objectID){
				this.rootArray.push(indexTree);
				break;
			}
		}
		this.drawbTree();
	}
}
BT2T.prototype.bTree2Tree = function() {
	// 1) 若某节点是其双亲节点的左孩子，则把该节点的右孩子，右孩子的右孩子......都与该节点的双亲节点相连
	// 2) 删除原二叉树中所有双亲节点与右孩子的连线
	for(var indexK = 0; indexK < this.BT2TNodeArray.length; indexK ++){
		this.BT2TNodeArray[indexK].lengthOfChild = 0;
		if(this.BT2TNodeArray[indexK].chObIDArray[0] != null){ // objectID = index + 1;
			var leftChildNode = this.BT2TNodeArray[indexK].chObIDArray[0];
			var indexOfRightChild = this.BT2TNodeArray[leftChildNode-1].chObIDArray[1];
			while(indexOfRightChild != null){
				this.BT2TNodeArray[indexOfRightChild-1].faObID = indexK + 1;
				indexOfRightChild = this.BT2TNodeArray[indexOfRightChild-1].chObIDArray[1];
			}
		}
	}
	for(var i = 0; i < this.BT2TNodeArray.length; i++){
		if(this.BT2TNodeArray[i].chObIDArray[1] != null){
			this.cmd("disConnect", this.BT2TNodeArray[i].objectID, this.BT2TNodeArray[i].chObIDArray[1], this.foregroundColor) ;
			this.cmd("Step") ;
		}
	}
	for(var i = 0; i < this.BT2TNodeArray.length; i++){
		this.cmd("Connect", this.BT2TNodeArray[i].faObID, this.BT2TNodeArray[i].objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	for(var indexE = 0; indexE < this.BT2TNodeArray.length; indexE ++){
		this.BT2TNodeArray[indexE].chObIDArray.length = 0;
	}
	for(var indexL = 0; indexL < this.BT2TNodeArray.length; indexL ++){
		if(this.BT2TNodeArray[indexL].faObID != this.BT2TNodeArray[indexL].objectID ){
			var len = this.BT2TNodeArray[this.BT2TNodeArray[indexL].faObID-1].lengthOfChild;
			this.BT2TNodeArray[this.BT2TNodeArray[indexL].faObID-1].chObIDArray[len] = this.BT2TNodeArray[indexL].objectID;
			this.BT2TNodeArray[this.BT2TNodeArray[indexL].faObID-1].lengthOfChild ++;
		}
	}	
	for(var indexJ = 0; indexJ < this.BT2TNodeArray.length; indexJ ++){
		for(var indexM = 0; indexM < this.BT2TNodeArray[indexJ].chObIDArray.length; indexM ++){
			if(isNaN(this.BT2TNodeArray[indexJ].chObIDArray[indexM])){
				this.BT2TNodeArray[indexJ].chObIDArray[indexM] = null;
			}
		}
	}
	for(var indexTree = 0; indexTree < this.BT2TNodeArray.length; indexTree++){
		if(this.BT2TNodeArray[indexTree].faObID == this.BT2TNodeArray[indexTree].objectID){
			this.rootArray.push(indexTree);
			break;
		}
	}
	this.drawTree();
}
BT2T.prototype.resizeTree = function(posX) {
	this.resizeWidth(this.root) ;
	if(this.root != null) {
		this.setNewPosition(this.root, posX, this.startY, 0) ;
		this.animateNewPosition(this.root) ;
		this.cmd("Step") ;
	}
}

// 设置每个节点的位置(递归)
BT2T.prototype.setNewPosition = function(tree, x, y, side) {
	// 如果树非空
	if(tree != null) {
		tree.y = y ;
		if(side == -1) { // 左孩子
			x = parseInt(x - tree.rightWidth) ;
		}
		else if(side == 1) { // 右孩子
			x = parseInt(x + tree.leftWidth) ;
		}
		tree.x = x ;
		this.setNewPosition(this.BT2TNodeArray[tree.chObIDArray[0]-1], x, parseInt(y + this.intervalY), -1) ;
		this.setNewPosition(this.BT2TNodeArray[tree.chObIDArray[1]-1], x, parseInt(y + this.intervalY), 1) ;
	}
}

// 动画显示每个节点的位置(递归)
BT2T.prototype.animateNewPosition = function(tree) {
	// 如果树非空则递归左右孩子
	if(tree != null) {
		this.cmd("Move", tree.objectID, tree.x, tree.y) ;
		this.animateNewPosition(this.BT2TNodeArray[tree.chObIDArray[0]-1]) ;
		this.animateNewPosition(this.BT2TNodeArray[tree.chObIDArray[1]-1]) ;
	}
}

// 计算节点的左右宽度(递归)
BT2T.prototype.resizeWidth = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftWidth = Math.max(this.resizeWidth(this.BT2TNodeArray[tree.chObIDArray[0]-1]), this.intervalX) ; // 左边宽度
	tree.rightWidth = Math.max(this.resizeWidth(this.BT2TNodeArray[tree.chObIDArray[1]-1]), this.intervalX) ; // 右边宽度
	//alert("Father: "+tree.value+"  l: "+tree.leftWidth+"r: "+tree.rightWidth);
	return parseInt(tree.leftWidth + tree.rightWidth) ;
}

// 树的节点
function BT2TNode(objectID, faObID, lengthOfChild, x, y, index, value){
	this.objectID = objectID;
	this.faObID = faObID;
	this.chObIDArray = new Array();
	this.lengthOfChild = lengthOfChild;
	this.x = x;
	this.y = y;
	this.index = index;
	this.value = value;
	this.width = new Array();
}