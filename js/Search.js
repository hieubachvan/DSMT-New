// JavaScript Document

var currentSearch;
// 初始化函数
function init() {
	objectManager = new ObjectManager();
	animationManager = new AnimationManager(objectManager);
	currentSearch = new Search(animationManager, drawing.width, drawing.height);
}

// 顺序表
var Search = function(animManager, width, height) {
	this.init(animManager, width, height);
	// this.initControls() ; // 初始化控件
	this.initAttributes(); // 初始化属性
}

// 继承与构造
Search.prototype = new Algorithm();
Search.prototype.constructor = Search;

// 初始化控件
Search.prototype.initControls = function() {
	addLabelToAlgorithmBar("数组大小");
	this.insertField_maxSize = addInputToAlgorithmBar("text", "");
	this.initMaxSizeButton = addInputToAlgorithmBar("button", "初始化最大容量");
	this.initMaxSizeButton.onclick = this.initMaxSizeCallBack.bind(this);
	addLabelToAlgorithmBar("数值");
	this.insertField_value = addInputToAlgorithmBar("text", "");
	this.initArrayButton = addInputToAlgorithmBar("button", "初始化数组");
	this.initArrayButton.onclick = this.initArrayCallBack.bind(this);
	addLabelToAlgorithmBar("查号数字");
	this.insertField_number = addInputToAlgorithmBar("text", "");
	this.initNumberButton = addInputToAlgorithmBar("button", "初始化查找数字");
	this.initNumberButton.onclick = this.initNumberCallBack.bind(this);
	this.searchNumberButton = addInputToAlgorithmBar("button", "查找");
	this.searchNumberButton.onclick = this.searchNumberCallBack.bind(this);
}

// 初始化
Search.prototype.initAttributes = function() {
	// 逻辑部分ID
	this.head = 0; // 头指针
	this.number = 0; //查找数字
	this.numNode = null; // 数字节点
	this.node = 0; //数组元素值
	this.arraytimer = false; //判断数组是否已经完成初始化
	this.numtimer = false; //判断查找数字是否已经完成初始化
	this.haveInitMax = false;
	// 图形部分
	this.objectID = 1; // 图形的序号
	this.width = 50; // 矩形的宽度
	this.height = 50; // 矩形的高度
	this.foregroundColor = '#1E90FF'; // 前景色
	this.backgroundColor = '#B0E0E6'; // 背景色
	this.startX = 100; // 开始的x坐标
	this.startY = 150; // 开始的y坐标
	this.startArrayY = 250; // 开始的数组的y坐标
	this.implementAction(this.initState.bind(this), "state");
	// this.implementAction(this.initStateBox.bind(this), "start");
}

Search.prototype.initState = function() {
	this.cmd("SetState", "数组内容只允许输入数字，以空格和逗号分隔");
	return this.commands;
}

// 初始化状态框
Search.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
		this.cmd("SetForegroundColor", 0, this.foregroundColor);
		this.cmd("SetBackgroundColor", 0, this.backgroundColor);
		this.cmd("Step");
	}
	return this.commands;
}

//初始化数组边界
Search.prototype.initMaxSizeCallBack = function(value) {
	var insertValue = parseInt(value);
	if (insertValue != "" && !isNaN(insertValue)) {
		this.implementAction(this.initMaxSize.bind(this), insertValue);
	}
}

// 初始化数组回调函数
Search.prototype.initArrayCallBack = function(value) {
	value = value.trim();
	if (value == '') {
		alert('数组内容不能为空。');
	} else {
		var arrayContent = this.parseIntSeq(value);
		for (var i=0; i<arrayContent.length && i<this.maxSize; i++) {
			this.implementAction(this.initArray.bind(this), arrayContent[i]);
		}
	}
	// var insertValue = parseInt(value);
	// if (insertValue != "" && !isNaN(insertValue)) {
	// 	this.implementAction(this.initArray.bind(this), insertValue);
	// }
}

// 初始化查找数字回调函数
Search.prototype.initNumberCallBack = function(value) {
	this.implementAction(this.initNumber.bind(this), value);
}

// 查找回调函数
Search.prototype.linearSearchCallBack = function(value) {
	value = parseInt(value);
	if (isNaN(value)) {
		alert('请输入查找的“数字”。');
	}
	this.initNumberCallBack(value);
	this.implementAction(this.linearSearch.bind(this), 0);
}

// binary search
Search.prototype.binarySearchCallBack = function(value) {
	value = parseInt(value);
	if (isNaN(value)) {
		alert('请输入查找的“数字”。');
	}
	this.initNumberCallBack(value);
	this.implementAction(this.binarySearch.bind(this), 0);
}

//初始化数组边界
Search.prototype.initMaxSize = function(maxSize) {
	if (maxSize > 10 || maxSize < 3) {
		this.cmd("SetState", "数组大小应介于3-10。");
		return this.commands;
	}
	/*if(arraytimer == true){
		for( var j = 0 ; j < this.maxSize ; j ++){
			this.cmd("Delete",this.arrayList[j].objectID);
		}
	}*/
	if (this.arraytimer == true) {
		for (var i = 0; i < this.maxSize + 1; i++) {
			this.cmd("Delete", i + 1);
		}
		this.cmd("Step");
		this.objectID = 1;
		this.head = 0;
		this.haveInitMax = true;
	}
	this.maxSize = maxSize; // 数组最大容量 
	this.arrayList = new Array(this.maxSize);
	// 创建状态框明确数组大小
	{
		this.cmd("SetState", "数组大小是" + this.maxSize);
		this.cmd("Step");
	}
	// 创建矩形
	for (var i = 0; i < this.maxSize; i++) {
		this.arrayList[i] = new SearchNode(this.objectID, "", parseInt(this.startX + i * (this.width - 1)), this.startArrayY);
		this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height, 'center', 'center', this.arrayList[i].x, this.arrayList[i].y);
		this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor);
		this.cmd("Step");
		this.objectID++;
	}
	this.arraytimer = true;
	return this.commands;
}

// 初始化数组
Search.prototype.initArray = function(arrayNodeValue) {

	if (isNaN(arrayNodeValue)) {
		alert("请输入数字：");
		return 0;
	}
	if (this.head < this.maxSize) {
		// 向矩形内添加元素
		{
			this.arrayList[this.head].value = arrayNodeValue; //数组元素值
			this.cmd("SetLabel", this.arrayList[this.head].objectID, this.arrayList[this.head].value);
			this.head++;
		}
	} else {
		// 创建状态框数组越界
		{
			this.cmd("SetState", "数组越界");
			this.cmd("Step");
		}
	}
	return this.commands;
}

//初始化查找数字	
Search.prototype.initNumber = function(number) {
	if (this.numtimer == true && this.haveInitMax != true) {
		if (this.numNode.value != null) {
			this.cmd("Delete", this.numNode.objectID);
			this.cmd("Step");
		}
	}
	this.haveInitMax = false;
	if (isNaN(number)) {
		this.cmd("SetState", "请输入数字");
		return this.commands;
	}
	this.number = number;
	this.numNode = new SearchNode(this.objectID, this.number, this.startX, this.startY);
	// 创建矩形
	{
		this.cmd("CreateRectangle", this.numNode.objectID, this.numNode.value, this.width, this.height, 'center', 'center', this.numNode.x, this.numNode.y);
		this.cmd("SetForegroundColor", this.numNode.objectID, this.foregroundColor);
		this.cmd("SetBackgroundColor", this.numNode.objectID, this.backgroundColor);
		this.cmd("Step");
	}
	//this.objectID ++ ;
	this.numtimer = true;
	return this.commands;
}

//查找函数	
Search.prototype.linearSearch = function() {
	/*for (var j = 1; j < this.objectID + 1; j++) {
		this.cmd("SetForegroundColor", j, this.foregroundColor);
		this.cmd("SetBackgroundColor", j, this.backgroundColor);
		this.cmd("Step");
	}*/
	for (var i = 0; i < this.maxSize; i++) {
		//移动矩形
		{
			this.cmd("Move", this.numNode.objectID, parseInt(this.numNode.x + i * (this.width - 1)), this.numNode.y);
			this.cmd("Step");
		}
		if (this.numNode.value == this.arrayList[i].value) {
			// 创建状态框找到该元素
			{
				this.cmd("SetState", "找到该元素");
				this.cmd("Step");
			}
			// 将匹配数字和数组元素背景色变绿
			{
				this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#32CD32');
				this.cmd("Step");
				this.cmd("SetBackgroundColor", this.numNode.objectID, '#32CD32');
				this.cmd("Step");
			}
			i = -1;
			break;
		} else {
			// 创建状态框
			{
				this.cmd("SetState", "当前数组第" + parseInt(i + 1) + "个元素和查找数字不相等");
				this.cmd("Step");
			}
		}
		//查找对比位置
		{
			this.cmd("SetHighlight", this.arrayList[i].objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.arrayList[i].objectID, false);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, false);
			this.cmd("Step");
		}
	}
	if (i != -1) {
		// 创建状态框查找失败
		{
			this.cmd("SetState", "数组中无此元素");
			this.cmd("Step");
		}
	}
	return this.commands;
}


//查找函数	
Search.prototype.binarySearch = function() {
	/*for (var j = 1; j < this.objectID + 1; j++) {
		this.cmd("SetBackgroundColor", j, this.foregroundColor);
		this.cmd("SetBackgroundColor", j, this.backgroundColor);
		this.cmd("Step");
	}*/
	// invalid array order
	for (var i=1; i<this.maxSize; i++) {
		if (this.arrayList[i].value < this.arrayList[i-1].value) {
			this.cmd("SetState", "数组不满足升序的要求，不能执行二分查找");
			return this.commands;
		}
	}
	var left = 0;
	var right = this.maxSize - 1;
	var midm = 0;
	while (left <= right) {
		mid = parseInt((left + right) / 2);
		//移动矩形
		{
			this.cmd("Move", this.numNode.objectID, parseInt(this.numNode.x + mid * (this.width - 1)), this.numNode.y);
			this.cmd("Step");
		}
		if (this.numNode.value < this.arrayList[mid].value) {
			right = mid - 1;
			// 创建状态框
			{
				this.cmd("SetState", "当前mid值为" + mid + ",数组第" + parseInt(mid + 1) + "个元素和查找数字不相等");
				this.cmd("Step");
			}
		} else if (this.numNode.value > this.arrayList[mid].value) {
			left = mid + 1;
			// 创建状态框
			{
				this.cmd("SetState", "当前mid值为" + mid + ",数组第" + parseInt(mid + 1) + "个元素和查找数字不相等");
				this.cmd("Step");
			}
		} else {
			// 创建状态框找到该元素
			{
				this.cmd("SetState", "找到该元素，位置在数组第" + parseInt(mid + 1) + "个位置");
				this.cmd("Step");
			}
			// 将匹配数字和数组元素背景色变绿
			{
				this.cmd("SetBackgroundColor", this.arrayList[mid].objectID, '#32CD32');
				this.cmd("Step");
				this.cmd("SetBackgroundColor", this.numNode.objectID, '#32CD32');
				this.cmd("Step");
			}
			break;
		}
		//查找对比位置
		{
			this.cmd("SetHighlight", this.arrayList[mid].objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.arrayList[mid].objectID, false);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", this.numNode.objectID, false);
			this.cmd("Step");
		}
	}
	if (left > right) {
		// 创建状态框查找失败
		{
			this.cmd("SetState", "数组中无此元素");
			this.cmd("Step");
		}
	}
	return this.commands;
}

Search.prototype.parseIntSeq = function(value) {
	var intSeq = new Array();
	var stopChar = new Set([' ', ',', '.', ';', '-', ':', '/', '，', '。', '；', '：', '、']);
	var start = 0;
	var end = 0;
	for (var i=0; i<value.length; i++) {
		if (stopChar.has(value[i])) {
			end = i-1;
			if(end >= start) {
				var val = parseInt(value.substr(start, end-start+1));
				if (!isNaN(val)) {
					intSeq.push(val);
				}
			}
			start = i+1;
		}
	}
	end = value.length-1;
	if (end >= start) {
		var val = parseInt(value.substr(start, end-start+1));
		if (!isNaN(val)) {
			intSeq.push(val);
		}
	}
	return intSeq;
}


// 顺序表的节点
var SearchNode = function(objectID, value, x, y) {
	this.objectID = objectID; // 图形序号
	this.value = value; // 节点元素的值
	this.x = x; // x坐标
	this.y = y; // y坐标
}