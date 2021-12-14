// JavaScript Document

// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	var currentForest = new Forest(animationManager, drawing.width, drawing.height) ;
}

// 森林
var Forest = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Forest.prototype = new Algorithm();
Forest.prototype.constructor = Forest;

// 初始化控件
Forest.prototype.initControls = function() {
	/*
	addLabelToAlgorithmBar("节点数值");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.ForestButton =	addInputToAlgorithmBar("button", "阶乘");
	this.ForestButton.onclick = this.ForestCallBack.bind(this) ;
	*/
}

// 初始化属性
Forest.prototype.initAttributes = function() {
	// 逻辑部分
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	// 初始化状态框
	this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
Forest.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}

// 阶乘回调函数
Forest.prototype.ForestCallBack = function(event) {
	var insertValue = this.insertField.value;
	if (insertValue != "")
	{
		// set text value
		this.insertField.value = "";
		this.implementAction(this.CalForest.bind(this), insertValue);
	}
}

// 阶乘函数
Forest.prototype.CalForest = function(value) {
	return this.commands ;
}

// 树的节点
var TreeNode = function(objectID, value, x, y, leftChild, rightChild, parent) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
	this.leftChild = leftChild ; // 左孩子
	this.rightChild = rightChild ; // 右孩子
	this.parent = parent ; // 父亲
}
