// JavaScript Document

// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	var currentLinearSearch = new LinearSearch(animationManager, drawing.width, drawing.height) ;
}

// 顺序表
var LinearSearch = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}

// 继承与构造
LinearSearch.prototype = new Algorithm();
LinearSearch.prototype.constructor = LinearSearch;

// 初始化控件
LinearSearch.prototype.initControls = function() {
	addLabelToAlgorithmBar("数组大小");
	this.insertField_maxSize = addInputToAlgorithmBar("text", "");
	this.initMaxSizeButton = addInputToAlgorithmBar("button", "初始化最大容量");
	this.initMaxSizeButton.onclick = this.initMaxSizeCallBack.bind(this) ;
	addLabelToAlgorithmBar("数值");
	this.insertField_value = addInputToAlgorithmBar("text", "");
	this.initArrayButton = addInputToAlgorithmBar("button", "初始化数组");
	this.initArrayButton.onclick = this.initArrayCallBack.bind(this) ;
    addLabelToAlgorithmBar("查号数字");
	this.insertField_number = addInputToAlgorithmBar("text", "");
	this.initNumberButton = addInputToAlgorithmBar("button", "初始化查找数字");
	this.initNumberButton.onclick = this.initNumberCallBack.bind(this) ;
	this.searchNumberButton = addInputToAlgorithmBar("button", "查找");
	this.searchNumberButton.onclick = this.searchNumberCallBack.bind(this) ;
}

// 初始化
LinearSearch.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.head = 0 ; // 头指针
	this.number = 0 ; //查找数字
	this.numNode = null ;// 数字节点
	this.node = 0 ; //数组元素值
	this.timer = false ; //判断是否已经查找过
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.startX = 100 ; // 开始的x坐标
	this.startY = 150 ; // 开始的y坐标
	this.startArrayY = 250 ; // 开始的数组的y坐标
	this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
LinearSearch.prototype.initStateBox = function(state) {
	// 创建状态框
	{
   		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
    }

//初始化数组边界
LinearSearch.prototype.initMaxSizeCallBack = function(event){
	var insertValue =this.insertField_maxSize.value;
	if (insertValue != "" ){
		// set text value
		this.insertField_maxSize.value = "";
		this.implementAction(this.initMaxSize.bind(this), insertValue);
	}
}

// 初始化数组回调函数
LinearSearch.prototype.initArrayCallBack = function(event) {
	var insertValue = this.insertField_value.value;
	if (insertValue != "" ){
		// set text value
		this.insertField_value.value = "";
		this.implementAction(this.initArray.bind(this), insertValue );
	}
}

// 初始化查找数字回调函数
LinearSearch.prototype.initNumberCallBack = function(event) {
	var insertValue = this.insertField_number.value;
	if (insertValue != "" )
	{
		// set text value
		this.insertField_number.value = "";
		this.implementAction(this.initNumber.bind(this), insertValue);
	}
}

// 查找回调函数
LinearSearch.prototype.searchNumberCallBack = function(event) {
	this.implementAction(this.searchNumber.bind(this) , 0 );
}

//初始化数组边界
LinearSearch.prototype.initMaxSize = function ( maxSize ){
	this.maxSize = maxSize ; // 数组最大容量 
	this.arrayList = new Array(this.maxSize) ; 
	// 创建状态框明确数组大小
	{
		    this.cmd("SetState",0,"数组大小是"+this.maxSize );
			this.cmd("Step");
	}
	}

// 初始化数组
LinearSearch.prototype.initArray = function( arrayNodeValue ) {
	var i = this.head ;
	//this.timer = true ;
	this.nodeValue = arrayNodeValue ; //数组元素值		
	if( i < this.maxSize ){		
		this.arrayList[i] = new LinearSearchNode(this.objectID, this.nodeValue , parseInt(this.startX+this.head*(this.width-1)), this.startArrayY) ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 'center', 'center', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor) ;
		}
		this.objectID ++ ;
		this.head ++ ;
	}
	else{
		// 创建状态框数组越界
		{
		    this.cmd("SetState",0,"数组越界" );
			this.cmd("Step");
		}
		}
	return this.commands ;
}

//初始化查找数字	
LinearSearch.prototype.initNumber = function ( number ){
	this.number = number ;
	this.numNode = new LinearSearchNode ( this.objectID ,this.number , this.startX , this.startY);
	    // 创建矩形
		{
			this.cmd("CreateRectangle", this.numNode.objectID, this.numNode.value, this.width, this.height, 'center', 'center', this.numNode.x , this.numNode.y ) ;
			this.cmd("SetForegroundColor",  this.numNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor",  this.numNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
  	    }
		this.objectID ++ ;
		return this.commands ; 
	}

//查找函数	
LinearSearch.prototype.searchNumber = function ( ){	
  	for(var i = 0 ; i < this.maxSize ; i ++ ){		
		//移动矩形
		{
			this.cmd("Move", this.numNode.objectID , parseInt(this.numNode.x+i*(this.width-1)) , this.numNode.y );
			this.cmd("Step");
		}
		if( this.numNode.value == this.arrayList[i].value){
			// 创建状态框找到该元素
			{
		  		this.cmd("SetState",0,"找到该元素");
				this.cmd("Step");
			}
			// 将匹配数字和数组元素背景色变绿
			{
				this.cmd("SetBackgroundColor",  this.arrayList[i].objectID,'#32CD32' ) ;	
				this.cmd("Step") ;	
				this.cmd("SetBackgroundColor",  this.numNode.objectID,'#32CD32' ) ;
			    this.cmd("Step") ;	
			}
			i = -1 ;
			break;
			}
		//查找对比位置
		{
			this.cmd("SetHighlight", this.arrayList[i].objectID, true) ;
			this.cmd("Step") ;	
			this.cmd("SetHighlight", this.arrayList[i].objectID, false) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", this.numNode.objectID, true) ;
			this.cmd("Step") ;	
			this.cmd("SetHighlight", this.numNode.objectID, false) ;
			this.cmd("Step") ;	
		}
		}
		if( i != -1 ){
			// 创建状态框查找失败
			{
		   		this.cmd("SetState",0,"数组中无此元素" );
				this.cmd("Step");
			}
		}
		return this.commands ;
	}

// 顺序表的节点
var LinearSearchNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}
