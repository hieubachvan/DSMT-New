// JavaScript Document

var currentStack;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentStack = new Stack(animationManager, drawing.width, drawing.height) ;
}

// 栈
var Stack = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	//this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Stack.prototype = new Algorithm();
Stack.prototype.constructor = Stack;

// 初始化控件
Stack.prototype.initControls = function() {
	addLabelToAlgorithmBar("数组大小");
	this.insertField_maxSize = addInputToAlgorithmBar("text", "");
	this.initButton = addInputToAlgorithmBar("button", "初始化数组");
	this.initButton.onclick = this.initCallBack.bind(this) ;
	addLabelToAlgorithmBar("数值");
	this.insertField_value = addInputToAlgorithmBar("text", "");
	this.pushButton =addInputToAlgorithmBar("button", "入栈");
	this.pushButton.onclick = this.pushCallBack.bind(this) ;
	this.popButton = addInputToAlgorithmBar("button", "出栈");
	this.popButton.onclick = this.popCallBack.bind(this) ;
}

// 初始化
Stack.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.head = -1; // 头指针
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.startX = 250 ; // 开始的x坐标
	this.startY = 100 ; // 开始的y坐标
	this.startArrayY = 100 ; // 开始的数组的y坐标
	this.startArrayX = 400 ; // 开始的数组的x坐标
	// this.initStateBox("栈大小的初始化范围 1-8");
}

// 初始化状态框
Stack.prototype.initStateBox = function(state) {
	this.cmd("SetState", state);
}

// 初始化回调函数
Stack.prototype.initCallBack = function(length) {
	if (parseInt(length) > 0 && parseInt(length) <= 8) {
		this.implementAction(this.initArray.bind(this), length);
	}
	else {
		alert("栈的大小应在1~8之间") ;
	}
}

// 入栈回调函数
Stack.prototype.pushCallBack = function(value) {
	if (value.trim() != "") {
		this.implementAction(this.pushNode.bind(this), value.trim());
	}
}

// 出栈回调函数
Stack.prototype.popCallBack = function() {
	this.implementAction(this.popNode.bind(this), 0);
}
 
// 清空数组
Stack.prototype.clearCanvas = function() {      
	for(var i=1 ; i<this.objectID ; i++) {
		this.cmd("Delete", i) ;
	}
	this.objectID = 1 ;
	this.head = -1; // 头指针
}

// 初始化数组
Stack.prototype.initArray = function(maxSize) {
    this.clearCanvas() ; // 删除所有数组
	this.maxSize = maxSize ; // 数组最大容量
	this.stack = new Array(maxSize) ; // 顺序表数组
	this.orderObjectID = new Array(maxSize) ; // 顺序表的物体
        
	// 设置状态栏
	{
		this.cmd("SetState", "创建大小为"+maxSize+"的数组") ;
	} 
       
	for(var i=0 ; i<this.maxSize ; i++) {
		this.orderObjectID[i] =i;
		this.cmd("CreateRectangle", this.objectID, "", this.width, this.height, 
			'center', 'center',this.startArrayX ,  parseInt(this.startY+i*(this.width-1))) ;
		this.cmd("SetForegroundColor", this.objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.objectID, '#FFFFFF') ;
        this.orderObjectID[i] =this.objectID;
		this.objectID ++ ;
		
	}
	return this.commands ;
}
	
// 入栈
Stack.prototype.pushNode = function(value) {
	if (this.stack == null) {
		this.cmd("SetState", '请先创建栈');
		return this.commands;
	}
	if(this.head >= this.maxSize-1) {
		this.cmd("SetState", '栈已满，不能继续入栈');
		// alert('Already full!') ;
	}
	else {
		this.head ++ ;
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
			this.cmd("SetState", "数组"+this.head+"位置无元素, 可插入新元素") ;
			this.cmd("Step") ;
			this.cmd("SetHighlight",this.maxSize-this.head, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight",this.maxSize-this.head, false) ;
			this.cmd("Step") ;
		}
		this.orderObjectID[this.maxSize-this.head] = this.objectID ;
		this.stack[this.head] = value ;
		// 新生成的节点插入
		{
			this.cmd("SetState", "在数组"+this.head+"位置插入新元素"+value) ;
			this.cmd("Step") ;
			this.cmd("Move", this.orderObjectID[this.maxSize-this.head], this.startArrayX,this.startY+(this.maxSize-this.head-1)*(this.width-1)) ;
			this.cmd("Step") ;
		}
		this.objectID ++ ;
	}
	return this.commands ;
}
	
// 弹栈
Stack.prototype.popNode = function() {
	if (this.stack == null) {
		this.cmd("SetState", '请先创建栈');
		return this.commands;
	}
	if(this.head <= -1) {
		this.cmd("SetState", '栈已空，不能继续出栈');
		// alert('Already empty!') ;
	}
	else {
			// 查找对应位置
			{
                this.cmd("SetState", "在数组"+this.head+"位置删除新元素"+this.stack[this.head]) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", this.orderObjectID[this.maxSize-this.head], true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", this.orderObjectID[this.maxSize-this.head], false) ;
				this.cmd("Step") ;
			}
			var deleteObjectID = this.orderObjectID[this.maxSize-this.head] ;
			this.head -- ;
			// 新生成的节点删除
			{
				this.cmd("Move", deleteObjectID, this.startX ,this.startY) ;
				this.cmd("Step") ;
				this.cmd("Delete", deleteObjectID) ;
				this.cmd("Step") ;
				this.cmd("SetState", "删除成功") ;
				this.cmd("Step") ;
			}
			//Stack.pop(this.head);
			//this.stack[this.head] = [] ;
			//this.head -- ;
			//this.stack[this.head] = 0;
		}
	return this.commands ;
}

// 栈的节点
var StackNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}
