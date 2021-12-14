// JavaScript Document

var currentFactorial;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentFactorial = new Factorial(animationManager, drawing.width, drawing.height) ;
}

// 阶乘
var Factorial = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Factorial.prototype = new Algorithm();
Factorial.prototype.constructor = Factorial;

// 初始化控件
Factorial.prototype.initControls = function() {
	addLabelToAlgorithmBar("节点数值");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.factorialButton =	addInputToAlgorithmBar("button", "阶乘");
	this.factorialButton.onclick = this.factorialCallBack.bind(this) ;
}

// 初始化属性
Factorial.prototype.initAttributes = function() {
	// 逻辑部分
	// 图形部分
	this.objectIDStart = 1 ; // 图形的序号
	this.objectIDCount = 0;	// 矩形数量
	this.rectWidth = 50;
	this.rectHeight = 30;
	this.rectInterval = 30;	// 矩形之间的间隔
	this.X0 = 100;	// 画矩形起点X
	this.Y0 = 250;	// 画矩形起点Y
	this.lineCurve = 0;
	this.firstRun = true;	// 是不是第一次求阶乘
	
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
Factorial.prototype.initStateBox = function(state) {
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
Factorial.prototype.factorialCallBack = function(value) {
	// var insertValue = this.insertField.value;
	var insertValue = value;
	if (insertValue != "")
	{
		// set text value
		// this.insertField.value = "";
		this.implementAction(this.CalFactorial.bind(this), parseInt(insertValue));
	}
}

// 阶乘函数
Factorial.prototype.CalFactorial = function(value) {
	var MINVALUE = 1;
	var MAXVALUE = 10;
	if (value > MAXVALUE) {
		alert("输入数值过大，页面无法显示！（请输入"+MINVALUE+"-"+MAXVALUE+"）");
		return this.commands;
	}
	if (value < MINVALUE) {
		alert("输入数值过小，页面无法显示！（请输入"+MINVALUE+"-"+MAXVALUE+"）");
		return this.commands;
	}
	// 第n(n>1)次运行需要把之前留下的矩形去掉
	if ( !this.firstRun ) {
		this.cmd("Delete", this.objectIDStart);
		this.objectIDCount = 0;
		this.cmd("Step");
	}
	// 计算阶乘
	this.Factorial(value);
	var count = 1;
	for (var i = this.objectIDCount-1 ; i > 0 ;i-- ) {
		count = count * (this.objectIDCount-i + 1);
		if ( i >= 1 ) {
			this.cmd("Step");
			this.cmd("Disconnect", this.objectIDStart + i-1, this.objectIDStart + i);
			this.cmd("Step");
			this.cmd("Connect",this.objectIDStart + i ,this.objectIDStart + i-1 , 
						this.foregroundColor, this.lineCurve, true, "x"+(value-i+1));
			this.cmd("Step");
			this.cmd("Move", this.objectIDStart + i, this.X0 + (i-1) * (this.rectWidth + this.rectInterval), this.Y0);
			this.cmd("Step");
			this.cmd("SetLabel", this.objectIDStart + i-1, count );
			this.cmd("Disconnect", this.objectIDStart + i, this.objectIDStart + i-1);
			
		}
		this.cmd("Delete", this.objectIDStart+i);
		this.cmd("Step");
	}
	this.firstRun = false;
	return this.commands ;
}

Factorial.prototype.Factorial = function (value) {
	
	if (value ==0 ) {
		value = 1;
	}
	if (value == 1 ) {
		// 画矩形
		this.cmd("CreateRectangle", this.objectIDStart + this.objectIDCount, value, this.rectWidth, this.rectHeight, 
						'left', 'center', this.X0 + this.objectIDCount * (this.rectWidth + this.rectInterval), this.Y0 );
		this.cmd("SetForegroundColor", this.objectIDStart + this.objectIDCount, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.objectIDStart + this.objectIDCount, this.backgroundColor);
	
		// 画连线
		if (this.objectIDCount != 0 ) {
			this.cmd("Connect", this.objectIDStart+this.objectIDCount-1, this.objectIDStart+this.objectIDCount, 
							this.foregroundColor, this.lineCurve, true, (value + 1) + 'x');
		}
		else {
			this.cmd("Step");
			this.cmd("Step");
		}

		this.objectIDCount++;

		return 1;
	}
	// 绘矩形
	this.cmd("CreateRectangle", this.objectIDStart + this.objectIDCount, value+"!", this.rectWidth, this.rectHeight, 
					'left', 'center', this.X0 + this.objectIDCount * (this.rectWidth + this.rectInterval), this.Y0 );
	this.cmd("SetForegroundColor", this.objectIDStart + this.objectIDCount, this.foregroundColor);
	this.cmd("SetBackgroundColor", this.objectIDStart + this.objectIDCount, this.backgroundColor);
	
	// 画连线
	if (this.objectIDCount != 0 ) {
		this.cmd("Connect", this.objectIDStart+this.objectIDCount-1, this.objectIDStart+this.objectIDCount, 
						this.foregroundColor, this.lineCurve, true, (value + 1) + 'x');
	}
	
	this.objectIDCount++;
	
	this.cmd("Step");
	
	return this.Factorial(value-1)*value;
}
