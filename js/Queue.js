// JavaScript Document

var currentQueue;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentQueue = new Queue(animationManager, drawing.width, drawing.height) ;
}

// 队列
var Queue= function(animManager, width, height) {
	this.init(animManager, width, height) ;
	//this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Queue.prototype = new Algorithm();
Queue.prototype.constructor = Queue;

// 初始化控件
Queue.prototype.initControls = function() {
	addLabelToAlgorithmBar("数组大小");
	this.insertField_maxSize = addInputToAlgorithmBar("text", "");
	this.initButton = addInputToAlgorithmBar("button", "初始化数组");
	this.initButton.onclick = this.initCallBack.bind(this) ;
	addLabelToAlgorithmBar("数值");
	this.insertField_value = addInputToAlgorithmBar("text", "");
	this.pushButton =addInputToAlgorithmBar("button", "入队");
	this.pushButton.onclick = this.pushCallBack.bind(this) ;
	this.popButton = addInputToAlgorithmBar("button", "出队");
	this.popButton.onclick = this.popCallBack.bind(this) ;
}

// 初始化
Queue.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.front = 0 ; // 头指针
	this.rear =0;    //尾指针
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.startX = 150 ; // 开始的x坐标
	this.startY = 150 ; // 开始的y坐标
	this.startArrayY = 250 ; // 开始的数组的y坐标
    this.startArrowY = 300 ; // 开始的箭头的y坐标
    this.length = 30 ; // 箭头的长度
	// this.implementAction(this.initStateBox.bind(this), "start") ;
}


// 初始化状态框
Queue.prototype.initStateBox = function(state) {
	return this.commands ;
}

// 初始化回调函数
Queue.prototype.initCallBack = function(length) {
	if (parseInt(length) > 0 && parseInt(length) <= 16)
	{
		this.implementAction(this.initArray.bind(this), length);
	}
	else{
		alert("初始化数组长度应在1-16之间");
	}
}

// 入队回调函数
Queue.prototype.pushCallBack = function(value) {
	if (value.trim() != "") {
		this.implementAction(this.enQueue.bind(this), value);
	}
}

// 出队回调函数
Queue.prototype.popCallBack = function() {
	this.implementAction(this.deQueue.bind(this), 0);
}

Queue.prototype.clearCanvas = function() {
	// 清空数组
	if(this.queue != null && this.queue != undefined) {
		for(var i=0 ; i<this.queue.length ; i++) {
			if (this.queue[i] != null) {
				this.cmd("Delete", this.queue[i].objectID) ;
			}
		}
		this.queue = null ;
	}
	// 清空元素
	if(this.orderObjectID != null && this.orderObjectID!= undefined) {
		for(var i=0 ; i<this.orderObjectID.length ; i++) {
			this.cmd("Delete", this.orderObjectID[i]) ;
		}
		this.orderObjectID = null ;
	}
	this.front = 0 ; // 头指针
	this.rear =0;    //尾指针
}

// 初始化数组
Queue.prototype.initArray = function(maxSize) {
	this.clearCanvas() ;
	this.maxSize = parseInt(maxSize) + 1 ; // 数组最大容量
	this.queue = new Array(this.maxSize) ; // 队列数组
	this.orderObjectID = new Array(this.maxSize) ; // 队列的物体
    // 设置状态栏
	{
		this.cmd("SetState", "创建大小为"+this.maxSize+"的数组") ;
	} 
	for(var i=0 ; i<this.maxSize ; i++) {
		this.orderObjectID[i] = this.objectID;
		this.cmd("CreateRectangle", this.objectID, "", this.width, this.height, 
			'center', 'center', parseInt(this.startX+i*(this.width-1)), this.startArrayY) ;
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
                this.orderObjectID[i] =this.objectID;
		this.objectID ++ ;
	}
	return this.commands ;
}
	
// 插入
Queue.prototype.enQueue = function(value) {
	if (this.queue == null) {
		this.cmd("SetState", "请先创建队列");
		return this.commands;
	}
	if((this.rear+1)% this.maxSize==this.front) {
		this.cmd('SetState', "队列已满，不能继续入队");
		// alert('Already full!') ;
	}
	else {
		// 出现矩形
		{
			this.cmd("SetState", "创建值为"+value+"的数组元素") ;
			this.cmd("Step") ;
			this.cmd("CreateRectangle", this.objectID, value, this.width, this.height, 
				'center', 'center', this.startX, this.startY) ;
			this.cmd("SetForegroundColor", this.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		// 查找对应位置
		{
			this.cmd("SetState", "数组"+this.rear+"位置无元素, 可插入新元素") ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", this.orderObjectID[this.rear], true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", this.orderObjectID[this.rear], false) ;
			this.cmd("Step") ;
		}
		this.queue[this.rear] = new QueueNode(this.objectID, value, this.startX+this.rear*(this.width-1), this.startArrayY);
		// 新生成的节点插入
		{
			this.cmd("Move", this.queue[this.rear].objectID, this.queue[this.rear].x, this.queue[this.rear].y) ;
			this.cmd("Step") ;
		}
		this.objectID ++ ;
		this.rear=(this.rear +1)% this.maxSize ;
				
	}
	return this.commands ;
}
	
// 删除
Queue.prototype.deQueue = function() {
	if (this.queue == null) {
		this.cmd("SetState", "请先创建队列");
		return this.commands;
	}
	if(this.front==this.rear) {
		this.cmd('SetState', '队列已空，不能继续出队');
		// alert('Already empty!') ;
	}
	else {
		// 查找对应位置
		{
			this.cmd("SetState", "在数组"+this.front+"位置删除新元素"+this.queue[this.front].value) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", this.queue[this.front].objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", this.queue[this.front].objectID, false) ;
			this.cmd("Step") ;
		}
		var deleteObjectID = this.queue[this.front].objectID;
		//出队列 
		{
			this.cmd("Move", deleteObjectID, this.startX ,this.startY) ;
			this.cmd("Step") ;
			this.cmd("Delete", deleteObjectID) ;
			this.cmd("Step") ;
		    this.cmd("SetState", "删除成功") ;
			this.cmd("Step") ;
		}
		this.queue[this.front] = null;
		this.front=(this.front+1) % this.maxSize ;
	}
	return this.commands ;
}

// 队列的节点
var QueueNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}
