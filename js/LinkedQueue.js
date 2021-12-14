// JavaScript Document

var currentLinkedQueue;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentLinkedQueue = new LinkedQueue(animationManager, drawing.width, drawing.height) ;
}

// 单链表
var LinkedQueue = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	//this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
LinkedQueue.prototype = new Algorithm();
LinkedQueue.prototype.constructor = LinkedQueue;

// 初始化控件
LinkedQueue.prototype.initControls = function() {
	addLabelToAlgorithmBar("序号");
	this.insertField_seq = addInputToAlgorithmBar("text", "");
	addLabelToAlgorithmBar("数值");
	this.insertField_value = addInputToAlgorithmBar("text", "");
	this.insertButton =	addInputToAlgorithmBar("button", "插入节点");
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
	addLabelToAlgorithmBar("序号");
	this.insertField_del = addInputToAlgorithmBar("text", "");
	this.deleteButton = addInputToAlgorithmBar("button", "删除节点");
	this.deleteButton.onclick = this.deleteCallBack.bind(this) ;
}

// 初始化
LinkedQueue.prototype.initAttributes = function() {
	// 逻辑部分
	this.head = null ;
	this.tail = null ;
	// this.length = 0 ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.interval = 120 ; // 间隙
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 150 ; // 新节点的x坐标
	this.startY = 100 ; // 新节点的y坐标
	this.startHeadY = 200 ; // 头结点的y坐标
	this.startheadArrowY = 250 ; // 头指针的y坐标
	this.starttailArrowY = 310 ; // 尾指针的y坐标
	this.length = 30 ; // 箭头的长度
	this.implementAction(this.initHeadNode.bind(this), 0);
}

LinkedQueue.prototype.pushCallBack = function(value) {
	this.insertCallBack(this.head.value+1, value);
	console.log('push at:'+ this.head.value +' val:'+value);
}

LinkedQueue.prototype.popCallBack = function(value) {
	this.deleteCallBack(1);
	console.log('pop at:'+this.head.value);
}

// 插入回调函数
LinkedQueue.prototype.insertCallBack = function(seq, value) {
	seq = parseInt(seq);
	value = value.trim();
	if (value != '') {
		if(this.head.value <= 5) {
			this.implementAction(this.insertNode.bind(this), [seq, value]);
		}
		else {
			alert("链表的长度应6以下");
		}
	} else {
		alert('入队元素不能为空');
	}
}

// 删除回调函数
LinkedQueue.prototype.deleteCallBack = function(value) {
	if (value != "")
	{
		this.implementAction(this.deleteNode.bind(this), value);
	}
}

// 初始化头结点
LinkedQueue.prototype.initHeadNode = function() {
	this.head = new ListNode(this.objectID, 0, this.startX, this.startHeadY, null) ;
	this.tail = this.head ;
	this.objectID ++ ;
	this.length ++ ;
	// 绘制头结点
	{
		this.cmd("SetState", "创建链表的头指针，该链表是带表头的单链表，可以从 1 开始插入元素") ;
		this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
				 'center', 'center', this.head.x, this.head.y) ;
		this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
	}
	// 绘制头指针
	this.headArrow = new ListNode(this.objectID, 'head', this.startX, this.startheadArrowY, null) ; 
	this.objectID ++ ;
	this.tailArrow = new ListNode(this.objectID, 'tail', this.startX, this.starttailArrowY, null) ;
	this.objectID ++ ;
	{
		this.cmd("CreatePointer", this.headArrow.objectID, "head", this.length, 'up', this.headArrow.x, this.headArrow.y) ;
		this.cmd("SetForegroundColor", this.headArrow.objectID, this.tomato) ;
		this.cmd("CreatePointer", this.tailArrow.objectID, "tail", this.length, 'up', this.tailArrow.x, this.tailArrow.y) ;
		this.cmd("SetForegroundColor", this.tailArrow.objectID, this.tomato) ;
	}
	return this.commands ;
}
	
// 插入
LinkedQueue.prototype.insertNode = function(valueArr) {
	var pos = valueArr[0] ;
	var value = valueArr[1] ;
	var point = this.head ;
	if(pos > this.length || pos <= 0) {
		alert("位置错误！位置超出范围。\n当前范围 1-"+this.head.value);
		// alert('Position error! The position is out of range.\nCurrent range ' + 1 +' to '+this.head.value) ;
	}
	else {
		var newNode = new ListNode(this.objectID, value, this.startX, this.startY, null) ;
		this.objectID ++ ;
		this.length ++ ;
		// 绘制新结点
		{
			this.cmd("SetState", "创建新节点"+value) ;
			this.cmd("Step") ;
			this.cmd("CreateRectangle", newNode.objectID, newNode.value, this.width, this.height, 
					 'center', 'center', newNode.x, newNode.y) ;
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		for(var i=0 ; i<pos-1 ; i++) {
			// 高亮
			/*{
				this.cmd("SetState", "搜索到位置"+i) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, false) ;
				this.cmd("Step") ;
			}*/
			point = point.linked ;
		}
		// 高亮
		{
			this.cmd("SetState", "在队尾插入") ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, false) ;
			this.cmd("Step") ;
		}
		// 如果插入到尾节点
		if(point == this.tail) {
			newNode.x = parseInt(point.x + this.interval) ;
			newNode.y = parseInt(point.y) ;
			point.linked = newNode ;
			this.tail = newNode ;
			this.tailArrow.x = newNode.x ;
			this.tailArrow.y = this.startheadArrowY ; 
			// 连接
			{
				// this.cmd("SetState", "该位置是尾节点,直接插入") ;
				// this.cmd("Step") ;
				this.cmd("Connect", point.objectID, newNode.objectID, this.forgroundColor) ;
				this.cmd("Step") ;
				this.cmd("Move", newNode.objectID, newNode.x, newNode.y) ;
				this.cmd("Step") ;
				this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
				this.cmd("Step") ;
			}
		}
		else { // 如果不是尾节点
			newNode.x = parseInt(point.x + this.interval) ;
			newNode.y = parseInt(point.y) ;
			newNode.linked = point.linked ;
			point.linked = newNode ;
			// 连接
			{
				this.cmd("SetState", "断开"+point.value+"的指针域") ;
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, newNode.linked.objectID) ;
				this.cmd("Step") ;
				this.cmd("SetState", "设置插入节点"+value+"的指针指向后续节点"+newNode.linked.value) ;
				this.cmd("Step") ;
				this.cmd("Connect", newNode.objectID, newNode.linked.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.cmd("SetState", "设置"+point.value+"的指针指向插入节点"+value) ;
				this.cmd("Step") ;
				this.cmd("Connect", point.objectID, newNode.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.shiftBack(newNode.linked) ;
				this.cmd("Move", newNode.objectID, newNode.x, newNode.y) ;
				this.cmd("Step") ;
			}
		}
		// 插入成功
		{
			this.head.value ++ ;
			this.cmd("Delete", this.head.objectID) ;
			this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
					 'center', 'center', this.head.x, this.head.y) ;
			this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
			this.cmd("SetState", "插入成功") ;
			this.cmd("Step") ;
		}
	}
	return this.commands ;
}
	
// 删除
LinkedQueue.prototype.deleteNode = function(pos) {
	console.log('length:'+this.head.value);
	if (this.head.value <= 0) {
		this.cmd("SetState", "队列无元素可出队");
		return this.commands;
	}
	if(pos >= this.length || pos <= 0) {
		alert("位置错误！位置超出范围。\n当前范围 1-"+this.head.value);
		// alert('Position error! The position is out of range.\nCurrent range ' + 1 +' to '+this.head.value) ;
	}
	else {
		this.length -- ;
		var point = this.head ;
		var next ;
		for(var i=0 ; i<pos-1; i++) {
			// 高亮
			/*{
				this.cmd("SetState", "搜索到位置"+i) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", point.objectID, false) ;
				this.cmd("Step") ;
			}*/
			point = point.linked ;
		}
		next = point.linked ;
		// 高亮
		{
			this.cmd("SetState", "在队头删除") ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", point.objectID, false) ;
			this.cmd("Step") ;
			this.cmd("SetState", "在队头删除") ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", next.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", next.objectID, false) ;
			this.cmd("Step") ;
		}
		if(next == this.tail) { // 如果是尾节点
			this.tail = point ;
			this.tailArrow.x = point.x ; 
			if(point == this.head) {
				this.tailArrow.y = this.starttailArrowY ; 
			}
			else {
				this.tailArrow.y = this.startheadArrowY ; 
			}
			// 断开连接并删除
			{
				this.cmd("SetState", "该位置是尾节点,直接删除") ;
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, next.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", next.objectID) ;
				this.cmd("Step") ;
				this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
				this.cmd("Step") ;
			}
			next = null ;
			this.tail.linked = null ;
		}
		else { // 如果不是尾节点
			// 连接、断开连接并删除
			{
				this.cmd("SetState", "断开"+point.value+"的指针域") ;
				this.cmd("Step") ;
				this.cmd("Disconnect", point.objectID, next.objectID) ;
				this.cmd("Step") ;
				this.cmd("SetState", "设置"+point.value+"的指针指向后续节点"+next.linked.value) ;
				this.cmd("Step") ;
				this.cmd("Connect", point.objectID, next.linked.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.cmd("SetState", "断开删除节点"+next.value+"的指针域") ;
				this.cmd("Step") ;
				this.cmd("Disconnect", next.objectID, next.linked.objectID) ;
				this.cmd("Step") ;
				this.cmd("SetState", "删除节点"+next.value) ;
				this.cmd("Step") ;
				this.cmd("Delete", next.objectID) ;
				this.cmd("Step") ;
				this.shiftFront(next.linked) ;
				this.cmd("Step") ;
			}
			point.linked = next.linked ;
			next.linked = null ;
		}
		// 删除成功
		{
			this.head.value -- ;
			this.cmd("Delete", this.head.objectID) ;
			this.cmd("CreateRectangle", this.head.objectID, this.head.value, this.width, this.height, 
					 'center', 'center', this.head.x, this.head.y) ;
			this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor) ;
			this.cmd("SetState", "删除成功") ;
			this.cmd("Step") ;
		}
	}
	return this.commands ;
}

// 向后移动
LinkedQueue.prototype.shiftBack = function(head) {
	while(head != this.tail) {
		// 移动
		{
			this.cmd("Move", head.objectID, head.linked.x, head.linked.y) ;
		}
		head.x = head.linked.x ;
		head.y = head.linked.y ;
		head = head.linked ;
	}
	head.x = parseInt(head.x+this.interval) ;
	head.y = head.y ;
	this.tailArrow.x = head.x ;
	this.tailArrow.y = this.startheadArrowY ; 
	// 尾节点后移
	{
		this.cmd("Move", head.objectID, head.x, head.y) ;
		this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
	}
}

// 向前移动
LinkedQueue.prototype.shiftFront = function(head) {
	while(head != this.tail) {
		head.x = parseInt(head.x - this.interval);
		head.y = head.linked.y ;
		// 移动
		{
			this.cmd("Move", head.objectID, head.x, head.y) ;
		}
		head = head.linked ;
	}
	head.x = parseInt(head.x - this.interval);
	head.y = head.y ;
	this.tailArrow.x = head.x ;
	this.tailArrow.y = this.startheadArrowY ; 
	// 移动
	{
		this.cmd("Move", head.objectID, head.x, head.y) ;
		this.cmd("Move", this.tailArrow.objectID, this.tailArrow.x, this.tailArrow.y) ;
	}
}

var ListNode = function(objectID, value, x, y, linked) {
	this.objectID = objectID ; // 序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标 
	this.linked = linked ; // 指针
}