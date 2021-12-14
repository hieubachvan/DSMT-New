// JavaScript Document

var currentHeap;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentHeap = new Heap(animationManager, drawing.width, drawing.height) ;
}

// 堆
var Heap = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Heap.prototype = new Algorithm();
Heap.prototype.constructor = Heap;

// 初始化控件
Heap.prototype.initControls = function() {
	addLabelToAlgorithmBar("节点数值");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.insertButton =	addInputToAlgorithmBar("button", "插入节点");
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
	this.deleteButton = addInputToAlgorithmBar("button", "删除节点");
	this.deleteButton.onclick = this.deleteCallBack.bind(this) ;
}

// 初始化
Heap.prototype.initAttributes = function() {
	// 逻辑部分
	this.root = null ;
	this.arrayLength = 0 ;
	this.nodeArray = [] ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.radius = 25 ; // 圆的半径
	this.intervalX = 60 ; // x间隙
	this.intervalY = 60 ; // y间隙
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 100 ; // 新节点的x坐标
	this.startY = 150 ; // 新节点的y坐标
	this.startRootX = 500 ; // 根结点的x坐标
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
Heap.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}

// 插入回调函数
Heap.prototype.insertCallBack = function(value) {
	var insertValue = parseInt(value);
	if (insertValue != "" && !isNaN(insertValue))
	{
		// set text value
		this.implementAction(this.insertNode.bind(this), insertValue);
	}
}

// 删除回调函数
Heap.prototype.deleteCallBack = function(value) {
	var insertValue = parseInt(value);
	if (insertValue != "" && !isNaN(insertValue))
	{
		// set text value
		this.implementAction(this.deleteNode.bind(this), insertValue);
	}
}
	
// 插入
Heap.prototype.insertNode = function(value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
		// 创建根节点
		this.root = new HeapNode(this.objectID, value, this.startRootX, this.startY, null, null, null) ;
		this.objectID ++ ;
		this.nodeArray[this.arrayLength] = this.root ;
		this.arrayLength ++ ;
		// 创建根节点
		{
			this.cmd("CreateCircle", this.root.objectID, this.root.value, this.root.x, this.root.y, this.radius) ;
			this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
	}
	else {
		// 创建新节点
		var newNode = new HeapNode(this.objectID, value, this.startX, this.startY, null, null, null) ;
		this.nodeArray[this.arrayLength] = newNode ;
		this.objectID ++ ;
		{
			this.cmd("CreateCircle", newNode.objectID, newNode.value, newNode.x, newNode.y, this.radius) ;
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		// 寻找父节点
		var parent = this.nodeArray[parseInt((this.arrayLength-1)/2)] ;
		{
			this.cmd("SetHighlight", parent.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", parent.objectID, false) ;
			this.cmd("Step") ;
		}
		// 连接到父节点
		if(this.arrayLength % 2 == 0) {
			parent.rightChild = newNode ;
		}
		else {
			parent.leftChild = newNode ;
		}
		newNode.parent = parent ;
		{
			this.cmd("Connect", parent.objectID, newNode.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
			this.resizeTree() ;
		}
		// 向上筛选
		this.shiftUp(this.nodeArray[this.arrayLength]) ;
		this.arrayLength ++ ;
	}
	return this.commands ;
}
	
// 删除
Heap.prototype.deleteNode = function(value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
	}
	else {
		// 找到要删除的节点
		var delNode ;
		for(var i=0 ; i<this.arrayLength ; i++) {
			if(this.nodeArray[i].value == value) {
				// 每个节点高亮
				{
					this.cmd("SetHighlightColor", this.nodeArray[i].objectID, this.palegreen) ;
					this.cmd("SetHighlight", this.nodeArray[i].objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.nodeArray[i].objectID, false) ;
					this.cmd("Step") ;
					this.cmd("SetBackgroundColor", this.nodeArray[i].objectID, this.palegreen) ;
					this.cmd("Step") ;
				}
				delNode = this.nodeArray[i] ;
				break ;
			}
			else {
				// 每个节点高亮
				{
					this.cmd("SetHighlightColor", this.nodeArray[i].objectID, this.tomato) ;
					this.cmd("SetHighlight", this.nodeArray[i].objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.nodeArray[i].objectID, false) ;
					this.cmd("Step") ;
				}
			}
		}
		// 找到最后一个节点
		var lastNode = this.nodeArray[this.arrayLength-1] ;
		if(lastNode == delNode) {
			if(delNode.parent == null) {
				// 直接删除
				{
					this.cmd("Delete", delNode.objectID) ;
					this.cmd("Step") ;
				}
				this.root = null ;
				this.nodeArray[this.arrayLength-1] = null ;
				this.arrayLength -- ;
			}
			else {
				// 断开箭头并删除
				{
					this.cmd("Disconnect", delNode.parent.objectID, delNode.objectID) ;
					this.cmd("Step") ;
					this.cmd("Delete", delNode.objectID) ;
					this.cmd("Step") ;
				}
				if(delNode.parent.leftChild == delNode) {
					delNode.parent.leftChild = null ;
				}
				else {
					delNode.parent.rightChild = null ;
				}
				this.nodeArray[this.arrayLength-1] = null ;
				this.arrayLength -- ;
			}
		}
		else {
			// 找到最后一个节点
			{
				this.cmd("SetHighlightColor", lastNode.objectID, this.tomato) ;
				this.cmd("SetHighlight", lastNode.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", lastNode.objectID, false) ;
				this.cmd("Step") ;
				this.cmd("SetBackgroundColor", lastNode.objectID, this.palegreen) ;
				this.cmd("Step") ;
			}
			// 交换两个节点
			var t = lastNode.value ;
			lastNode.value = delNode.value ;
			delNode.value = t ;
			// 重新设置标签
			{
				this.cmd("SetLabel", lastNode.objectID, lastNode.value) ;
				this.cmd("SetLabel", delNode.objectID, delNode.value) ;
				this.cmd("Step") ;
				this.cmd("SetBackgroundColor", delNode.objectID, this.backgroundColor) ;
				this.cmd("SetBackgroundColor", lastNode.objectID, this.backgroundColor) ;
				this.cmd("Step") ;
			}
			// 断开箭头并删除
			{
				this.cmd("Disconnect", lastNode.parent.objectID, lastNode.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", lastNode.objectID) ;
				this.cmd("Step") ;
			}
			if(lastNode.parent.leftChild == lastNode) {
				lastNode.parent.leftChild = null ;
			}
			else {
				lastNode.parent.rightChild = null ;
			}
			this.nodeArray[this.arrayLength-1] = null ;
			// 向下筛选
			this.shiftDown(delNode) ;
			this.arrayLength -- ;
		}
	}
	return this.commands ;
}

// 向上筛选
Heap.prototype.shiftUp = function(node) {
	if(node.parent != null) {
		// 如果比父节点小，则交换
		if(parseInt(node.value) < parseInt(node.parent.value)) {			
			// 该节点和父节点绿色高亮
			{
				this.cmd("SetHighlightColor", node.objectID, this.palegreen) ;
				this.cmd("SetHighlightColor", node.parent.objectID, this.palegreen) ;
				this.cmd("SetHighlight", node.objectID, true) ;
				this.cmd("SetHighlight", node.parent.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", node.objectID, false) ;
				this.cmd("SetHighlight", node.parent.objectID, false) ;
				this.cmd("Step") ;
			}
			var t = node.value ;
			node.value = node.parent.value ;
			node.parent.value = t ;
			// 重新设置标签
			{
				this.cmd("SetLabel", node.objectID, node.value) ;
				this.cmd("SetLabel", node.parent.objectID, node.parent.value) ;
				this.cmd("Step") ;
			}
			this.shiftUp(node.parent) ;
		}
		else {		
			// 该节点和父节点红色高亮
			{
				this.cmd("SetHighlightColor", node.objectID, this.tomato) ;
				this.cmd("SetHighlightColor", node.parent.objectID, this.tomato) ;
				this.cmd("SetHighlight", node.objectID, true) ;
				this.cmd("SetHighlight", node.parent.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", node.objectID, false) ;
				this.cmd("SetHighlight", node.parent.objectID, false) ;
				this.cmd("Step") ;
			}
		}
	}
}

// 向下筛选
Heap.prototype.shiftDown = function(node) {
	if(node != null) {
		if(node.leftChild == null && node.rightChild == null) {
			// 设置红色高亮
			{
				this.cmd("SetHighlightColor", node.objectID, this.tomato) ;
				this.cmd("SetHighlight", node.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", node.objectID, false) ;
				this.cmd("Step") ;
			}
		}
		else if(node.leftChild == null) {
			if(parseInt(node.value) > parseInt(node.rightChild.value)) {		
				// 该节点和父节点绿色高亮
				{
					this.cmd("SetHighlightColor", node.objectID, this.palegreen) ;
					this.cmd("SetHighlightColor", node.rightChild.objectID, this.palegreen) ;
					this.cmd("SetHighlight", node.objectID, true) ;
					this.cmd("SetHighlight", node.rightChild.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", node.objectID, false) ;
					this.cmd("SetHighlight", node.rightChild.objectID, false) ;
					this.cmd("Step") ;
				}
				var t = node.value ;
				node.value = node.rightChild.value ;
				node.rightChild.value = t ;
				// 重新设置标签
				{
					this.cmd("SetLabel", node.objectID, node.value) ;
					this.cmd("SetLabel", node.rightChild.objectID, node.rightChild.value) ;
					this.cmd("Step") ;
				}
				this.shiftDown(node.rightChild) ;
			}
			else {
				// 设置红色高亮
				{
					this.cmd("SetHighlightColor", node.objectID, this.tomato) ;
					this.cmd("SetHighlight", node.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", node.objectID, false) ;
					this.cmd("Step") ;
				}
			}
		}
		else if(node.rightChild == null) {
			if(parseInt(node.value) > parseInt(node.leftChild.value)) {		
				// 该节点和父节点绿色高亮
				{
					this.cmd("SetHighlightColor", node.objectID, this.palegreen) ;
					this.cmd("SetHighlightColor", node.leftChild.objectID, this.palegreen) ;
					this.cmd("SetHighlight", node.objectID, true) ;
					this.cmd("SetHighlight", node.leftChild.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", node.objectID, false) ;
					this.cmd("SetHighlight", node.leftChild.objectID, false) ;
					this.cmd("Step") ;
				}
				var t = node.value ;
				node.value = node.leftChild.value ;
				node.leftChild.value = t ;
				// 重新设置标签
				{
					this.cmd("SetLabel", node.objectID, node.value) ;
					this.cmd("SetLabel", node.leftChild.objectID, node.leftChild.value) ;
					this.cmd("Step") ;
				}
				this.shiftDown(node.leftChild) ;
			}
			else {		
				// 设置红色高亮
				{
					this.cmd("SetHighlightColor", node.objectID, this.tomato) ;
					this.cmd("SetHighlight", node.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", node.objectID, false) ;
					this.cmd("Step") ;
				}

			}
		}
		else {
			if(parseInt(node.rightChild.value) <= parseInt(node.leftChild.value) && 
			   parseInt(node.rightChild.value) < parseInt(node.value)) {
				   // 该节点和父节点绿色高亮
					{
						this.cmd("SetHighlightColor", node.objectID, this.palegreen) ;
						this.cmd("SetHighlightColor", node.rightChild.objectID, this.palegreen) ;
						this.cmd("SetHighlight", node.objectID, true) ;
						this.cmd("SetHighlight", node.rightChild.objectID, true) ;
						this.cmd("Step") ;
						this.cmd("SetHighlight", node.objectID, false) ;
						this.cmd("SetHighlight", node.rightChild.objectID, false) ;
						this.cmd("Step") ;
					}
					var t = node.value ;
					node.value = node.rightChild.value ;
					node.rightChild.value = t ;
					// 重新设置标签
					{
						this.cmd("SetLabel", node.objectID, node.value) ;
						this.cmd("SetLabel", node.rightChild.objectID, node.rightChild.value) ;
						this.cmd("Step") ;
					}
					this.shiftDown(node.rightChild) ;
			}
			else if(parseInt(node.leftChild.value) <= parseInt(node.rightChild.value) && 
			   parseInt(node.leftChild.value) < parseInt(node.value)) {
				   // 该节点和父节点绿色高亮
					{
						this.cmd("SetHighlightColor", node.objectID, this.palegreen) ;
						this.cmd("SetHighlightColor", node.leftChild.objectID, this.palegreen) ;
						this.cmd("SetHighlight", node.objectID, true) ;
						this.cmd("SetHighlight", node.leftChild.objectID, true) ;
						this.cmd("Step") ;
						this.cmd("SetHighlight", node.objectID, false) ;
						this.cmd("SetHighlight", node.leftChild.objectID, false) ;
						this.cmd("Step") ;
					}
					var t = node.value ;
					node.value = node.leftChild.value ;
					node.leftChild.value = t ;
					// 重新设置标签
					{
						this.cmd("SetLabel", node.objectID, node.value) ;
						this.cmd("SetLabel", node.leftChild.objectID, node.leftChild.value) ;
						this.cmd("Step") ;
					}
					this.shiftDown(node.leftChild) ;
			}
			else {
				// 设置红色高亮
				{
					this.cmd("SetHighlightColor", node.objectID, this.tomato) ;
					this.cmd("SetHighlight", node.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", node.objectID, false) ;
					this.cmd("Step") ;
				}
			}
		}
	}
}

// 重新布局树的节点
Heap.prototype.resizeTree = function() {
	this.resizeWidth(this.root) ;
	if(this.root != null) {
		this.setNewPosition(this.root, this.startRootX, this.startY, 0) ;
		this.animateNewPosition(this.root) ;
		this.cmd("Step") ;
	}
}

// 设置每个节点的位置(递归)
Heap.prototype.setNewPosition = function(tree, x, y, side) {
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
		this.setNewPosition(tree.leftChild, x, parseInt(y + this.intervalY), -1) ;
		this.setNewPosition(tree.rightChild, x, parseInt(y + this.intervalY), 1) ;
	}
}

// 动画显示每个节点的位置(递归)
Heap.prototype.animateNewPosition = function(tree) {
	// 如果树非空则递归左右孩子
	if(tree != null) {
		this.cmd("Move", tree.objectID, tree.x, tree.y) ;
		this.animateNewPosition(tree.leftChild) ;
		this.animateNewPosition(tree.rightChild) ;
	}
}

// 计算节点的左右宽度(递归)
Heap.prototype.resizeWidth = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX) ; // 左边宽度
	tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX) ; // 右边宽度
	return parseInt(tree.leftWidth + tree.rightWidth) ;
}

// 堆的节点
var HeapNode = function(objectID, value, x, y, leftChild, rightChild, parent) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
	this.leftChild = leftChild ; // 左孩子
	this.rightChild = rightChild ; // 右孩子
	this.parent = parent ; // 父亲
}
