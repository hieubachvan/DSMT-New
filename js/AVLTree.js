// JavaScript Document

var currentAVLTree;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentAVLTree = new AVLTree(animationManager, drawing.width, drawing.height) ;
}

// 顺序表
var AVLTree = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
AVLTree.prototype = new Algorithm();
AVLTree.prototype.constructor = AVLTree;

// 初始化控件
AVLTree.prototype.initControls = function() {
	addLabelToAlgorithmBar("节点数值");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.insertButton =	addInputToAlgorithmBar("button", "插入节点");
	this.insertButton.onclick = this.insertCallBack.bind(this) ;
}

// 初始化属性
AVLTree.prototype.initAttributes = function() {
	// 逻辑部分
	this.root = null ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.radius = 25 ; // 圆的半径
	this.intervalX = 60 ; // x间隙
	this.intervalY = 60 ; // y间隙
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 600 ; // 新节点的x坐标
	this.startY = 150 ; // 新节点的y坐标
	this.startRootX = 800; // 根结点的x坐标
	// this.array = [[3, 2, 1, 4]];
	
	this.array = [[3, 2, 1, 4, 5, 6, 7, 16, 15, 14, 13, 12, 11, 10, 8, 9],
		[7, 4, 2, 1, 3, 6, 5, 13, 11, 9, 8, 10, 12, 15, 14, 16],
		[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
		[1, 3, 2, 5, 6, 4, 8, 10, 9, 12, 11, 14, 16, 15, 13, 7],
		[9, 8, 10, 11, 12, 13, 14, 15, 16, 7, 6, 5, 4, 1, 2, 3],
		[16, 14, 15, 12, 10, 8, 9, 11, 13, 5, 6, 3, 1, 2, 4, 7],
		[16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
		[7, 13, 15, 16, 14, 11, 12, 9, 10, 8, 4, 6, 5, 2, 3, 1]];
	
	this.index = 0;
	this.ifdelete = false;
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
AVLTree.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}

// 随机生成回调函数
AVLTree.prototype.randomAVLCallBack = function (value) {
	this.implementAction(this.randomAVL.bind(this), 0);
}

// 随机生成
AVLTree.prototype.randomAVL = function (value) {
	this.index = Math.round(Math.random() * this.array.length) % this.array.length;
	this.ifdelete = true;
	for (var i = 0; i < this.array[this.index].length; i++) {
		this.insertNode(this.array[this.index][i]);
	}
	this.deleteNode();
	return this.commands;
}

// 插入回调函数
AVLTree.prototype.insertCallBack = function (value) {
	var insertValue = parseInt(value);
	if (insertValue != "" && !isNaN(insertValue)) {
		this.implementAction(this.insertNode.bind(this), insertValue);
	}
}

// 删除回调函数
AVLTree.prototype.deleteAVLCallBack = function (value) {
	this.implementAction(this.deleteNode.bind(this), 0);
}

// 删除回调函数
AVLTree.prototype.deleteCallBack = function (value) {
	// 随机删除
	if (this.ifdelete == true) {
		node = Math.round(Math.random() * this.array[this.index].length) % this.array[this.index].length;
		value = this.array[this.index][node];
		this.array[this.index].splice(node, 1);
		this.implementAction(this.deleteNode.bind(this), value);
	}
	else {
		alert("不可删除");
	}
}

// 删除
AVLTree.prototype.deleteNode = function () {
	node = Math.round(Math.random() * this.array[this.index].length) % this.array[this.index].length;
	value = this.array[this.index][node];
	this.cmd("SetState", "删除节点" + value);
	this.cmd("Step");
	this.cmd("Step");
	var temp = this.root;
	// 开始查找
	while (true) {
		if (value >= temp.value && temp.rightChild != null) {
			// 找到节点
			{
				this.cmd("SetState", "节点比较" + value + ">=" + temp.value);
				this.cmd("Step");
				this.cmd("SetHighlight", temp.objectID, true);
				this.cmd("Step");
				this.cmd("SetHighlight", temp.objectID, false);
				this.cmd("Step");
			}
			temp = temp.rightChild;
		}
		else if (value < temp.value && temp.leftChild != null) {
			// 找到节点
			{
				this.cmd("SetState", "节点比较" + value + "<" + temp.value);
				this.cmd("Step");
				this.cmd("SetHighlight", temp.objectID, true);
				this.cmd("Step");
				this.cmd("SetHighlight", temp.objectID, false);
				this.cmd("Step");
			}
			temp = temp.leftChild;
		}
		else {
			break;
		}
	}
	// 找到节点
	if (value >= temp.value) {
		// 设置状态框
		{
			this.cmd("SetState", "节点比较" + value + ">=" + temp.value);
			this.cmd("Step");
		}
	}
	else {
		// 设置状态框
		{
			this.cmd("SetState", "节点比较" + value + "<" + temp.value);
			this.cmd("Step");
		}
	}
	// 设置高亮
	{
		this.cmd("SetHighlight", temp.objectID, true);
		this.cmd("Step");
		this.cmd("SetHighlight", temp.objectID, false);
		this.cmd("Step");
	}
	this.cmd("SetState", "删除节点" + temp.value);
	
	if(temp.parent == null) { // 删除的是根节点
		// 如果只有根节点
		if(temp.leftChild == null && temp.rightChild == null) {
			// 直接删除
			{
				this.cmd("SetState", "该节点没有子节点，直接删除") ;
				this.cmd("Step") ;
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
			}
			this.root = null;
		}
			// 如果只有右孩子
		else if(temp.leftChild == null) {
			// 断开连线
			{
				this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
				this.cmd("Step") ;
			}
			var del = temp ;
			this.root = temp.rightChild;
			this.root.parent = null;
			// 删除节点
			{
				this.cmd("Delete", del.objectID) ;
				this.cmd("Step") ;
			}
			this.resizeTree() ;
		}
			// 如果只有左孩子
		else if(temp.rightChild == null) {
			// 断开连线
			{
				this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
				this.cmd("Step") ;
			}
			var del = temp ;
			this.root = temp.leftChild;
			this.root.parent = null;
			// 删除节点
			{
				this.cmd("Delete", del.objectID) ;
				this.cmd("Step") ;
			}
			this.resizeTree() ;
		}
			// 如果左右孩子均有
		else {
			// 先找到左孩子的最右节点
			var rightest = temp.leftChild ;
			while(rightest.rightChild != null) {
				// 找右孩子
				{
					this.cmd("Step") ;
					this.cmd("SetHighlight", rightest.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", rightest.objectID, false) ;
					this.cmd("Step") ;
				}
				rightest = rightest.rightChild ;
			}
			// 找到最右侧孩子
			{
				this.cmd("SetHighlightColor", rightest.objectID, this.palegreen) ;
				this.cmd("SetState", "找到左子树的最右侧孩子") ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", rightest.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", rightest.objectID, false) ;
				this.cmd("Step") ;
				this.cmd("SetHighlightColor", rightest.objectID, this.tomato) ;
			}
			// 令最右侧的节点变成根节点
			rightest.x = temp.x ;
			rightest.y = temp.y ;
			{
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID) ;
				this.cmd("Step") ;
				this.cmd("Move", rightest.objectID, rightest.x, rightest.y) ;
				this.cmd("Step") ;
			}
			rightest.leftChild = temp.leftChild ;
			rightest.rightChild = temp.rightChild ;
			rightest.parent.rightChild = null ;
			rightest.parent = temp.parent ;
			this.root = rightest ;
			this.resizeTree() ;
		}
	}
	else {
		del = temp.parent
		// 如果是叶子节点
		if(temp.leftChild == null && temp.rightChild == null) {
			// 直接删除
			{
				this.cmd("SetState", "该节点没有子节点，直接删除") ;
				this.cmd("Step") ;
				this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
			}
			// 置其父节点的这个孩子为空
			if(temp == temp.parent.leftChild) {
				temp.parent.leftChild = null ;
			}
			else {
				temp.parent.rightChild = null ;
			}
			temp = null ;
		}
			// 如果只有右孩子
		else if(temp.leftChild == null) {
			// 断开连线
			{
				this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
			}
			// 置其父节点的这个孩子为这个孩子的右孩子
			if(temp == temp.parent.leftChild) {
				// 建立连接
				{
					this.cmd("Connect", temp.parent.objectID, temp.rightChild.objectID, this.foregroundColor) ;
					this.cmd("Step") ;
				}
				temp.parent.leftChild = temp.rightChild ;
				temp.rightChild.parent = temp.parent ;
			}
			else {
				// 建立连接
				{
					this.cmd("Connect", temp.parent.objectID, temp.rightChild.objectID, this.foregroundColor) ;
					this.cmd("Step") ;
				}
				temp.parent.rightChild = temp.rightChild ;
				temp.rightChild.parent = temp.parent ;
			}
			temp = null ;
			this.resizeTree() ;
		}
			// 如果只有左孩子
		else if(temp.rightChild == null) {
			// 断开连线
			{
				this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
				this.cmd("Step") ;
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
			}
			// 置其父节点的这个孩子为这个孩子的右孩子
			if(temp == temp.parent.leftChild) {
				// 建立连接
				{
					this.cmd("Connect", temp.parent.objectID, temp.leftChild.objectID, this.foregroundColor) ;
					this.cmd("Step") ;
				}
				temp.parent.leftChild = temp.leftChild ;
				temp.leftChild.parent = temp.parent ;
			}
			else {
				// 建立连接
				{
					this.cmd("Connect", temp.parent.objectID, temp.leftChild.objectID, this.foregroundColor) ;
					this.cmd("Step") ;
				}
				temp.parent.rightChild = temp.leftChild ;
				temp.leftChild.parent = temp.parent ;
			}
			temp = null ;
			this.resizeTree() ;
		}
			// 如果左右孩子均有
		else {
			// 先找到左孩子的最右节点
			var rightest = temp.leftChild ;
			while(rightest.rightChild != null) {
				// 找右孩子
				{
					this.cmd("Step") ;
					this.cmd("SetHighlight", rightest.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", rightest.objectID, false) ;
					this.cmd("Step") ;
				}
				rightest = rightest.rightChild ;
			}
			// 找到最右侧孩子
			{
				this.cmd("SetHighlightColor", rightest.objectID, this.palegreen) ;
				this.cmd("SetState", "找到左子树的最右侧孩子") ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", rightest.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", rightest.objectID, false) ;
				this.cmd("Step") ;
				this.cmd("SetHighlightColor", rightest.objectID, this.tomato) ;
			}
			// 令最右侧的节点变成根节点
			rightest.x = temp.x ;
			rightest.y = temp.y ;
			{
				this.cmd("Disconnect", rightest.parent.objectID, rightest.objectID) ;
				this.cmd("Step") ;
				this.cmd("Connect", rightest.objectID, temp.leftChild.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.cmd("Connect", rightest.objectID, temp.rightChild.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.cmd("Disconnect", temp.parent.objectID, temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID) ;
				this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID) ;
				this.cmd("Step") ;
				this.cmd("Connect", temp.parent.objectID, rightest.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
				this.cmd("Delete", temp.objectID) ;
				this.cmd("Step") ;
				this.cmd("Move", rightest.objectID, rightest.x, rightest.y) ;
				this.cmd("Step") ;
			}
			if(rightest != temp.leftChild) {
				rightest.parent.rightChild = null ;
				rightest.leftChild = temp.leftChild ;
				temp.leftChild.parent = rightest ;
			}
			rightest.rightChild = temp.rightChild ;
			temp.rightChild.parent = rightest ;
			rightest.parent = temp.parent ;
			if(temp == temp.parent.leftChild) {
				temp.parent.leftChild = rightest ;
			}
			else {
				temp.parent.rightChild = rightest ;
			}
			temp = null ;
			this.resizeTree() ;
		}
		// 更新树的每个节点的位置
		this.resizeTree();
		// 计算每个节点的高度
		this.calHeight(this.root);
		// 更新每个节点的平衡因子
		this.calBalFactor(this.root);
		// 从该节点向上回溯
		var isTurn = false;
		var stack = new Array(); // 栈存储路径
		temp = del;
		while (temp != null) {
			stack.push(temp);
			if (temp.balfactor >= 2 || temp.balfactor <= -2) {
				isTurn = true;
				break;
			}
			temp = temp.parent;
		}
		if (isTurn) {
			var first = stack.pop();
			var second = stack.pop();
			var third = stack.pop();
			// set highlight
			{
				this.cmd("SetHighlight", first.objectID, true);
				this.cmd("SetHighlight", second.objectID, true);
				this.cmd("SetHighlight", third.objectID, true);
				this.cmd("Step");
				this.cmd("SetHighlight", first.objectID, false);
				this.cmd("SetHighlight", second.objectID, false);
				this.cmd("SetHighlight", third.objectID, false);
				this.cmd("Step");
			}
			// start turning
			if (first.leftChild == second && second.leftChild == third) {
				this.singleRightTurn(first, second);
			}
			else if (first.rightChild == second && second.rightChild == third) {
				this.singleLeftTurn(first, second);
			}
			else if (first.leftChild == second && second.rightChild == third) {
				this.leftRightTurn(first, second, third);
			}
			else if (first.rightChild == second && second.leftChild == third) {
				this.rightLeftTurn(first, second, third);
			}
		}
		// update position of every points
		this.resizeTree();
	}
	return this.commands;
}

// 插入
AVLTree.prototype.insertNode = function (value) {
	// 如果根节点为空
	if(this.root == null || this.root == undefined) {
		this.root = new TreeNode(this.objectID, value, this.startRootX, this.startY, 0, null, null, null) ;
		this.objectID ++ ;
		// 创建根节点
		{
			this.cmd("SetState", "创建根节点"+value) ;
			this.cmd("Step") ;
			this.cmd("CreateCircle", this.root.objectID, this.root.value, this.root.x, this.root.y, this.radius) ;
			this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
	}
	else {
		var temp = this.root ;
		var newNode = new TreeNode(this.objectID, value, this.startX, this.startY, null, null, null) ;
		this.objectID ++ ;
		// 创建新节点
		{
			this.cmd("SetState", "创建新节点"+value) ;
			this.cmd("Step") ;
			this.cmd("CreateCircle", newNode.objectID, newNode.value, newNode.x, newNode.y, this.radius) ;
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
		}
		// 开始查找
		while(true) {
			if(newNode.value >= temp.value && temp.rightChild != null) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较"+newNode.value+">="+temp.value) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.rightChild ;
			}
			else if(newNode.value < temp.value && temp.leftChild != null){
				// 找到节点
				{
					this.cmd("SetState", "节点比较"+newNode.value+"<"+temp.value) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", temp.objectID, false) ;
					this.cmd("Step") ;
				}
				temp = temp.leftChild ;
			}
			else {
				break ;
			}
		}
		// 找到节点
		if(newNode.value >= temp.value) {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较"+newNode.value+">="+temp.value) ;
				this.cmd("Step") ;
			}
		}
		else {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较"+newNode.value+"<"+temp.value) ;
				this.cmd("Step") ;
			}
		}
		// 设置高亮
		{
			this.cmd("SetHighlight", temp.objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight", temp.objectID, false) ;
			this.cmd("Step") ;
			this.cmd("Connect", temp.objectID, newNode.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		// 节点插入到相应位置
		if(parseInt(newNode.value) >= parseInt(temp.value)) {
			// 插入到右侧
			temp.rightChild = newNode ;
			newNode.parent = temp ;
			// 插入
			{
				this.cmd("SetState", "新节点"+newNode.value+"插入到父节点"+temp.value+"的右孩子") ;
				this.cmd("Step") ;
			}
		}
		else {
			// 插入到左侧
			temp.leftChild = newNode ;
			newNode.parent = temp ;
			// 插入
			{
				this.cmd("SetState", "新节点"+newNode.value+"插入到父节点"+temp.value+"的左孩子") ;
				this.cmd("Step") ;
			}
		}
		// 更新树的每个节点的位置
		this.resizeTree() ;
		// 计算每个节点的高度
		this.calHeight(this.root) ;
		// 更新每个节点的平衡因子
		this.calBalFactor(this.root) ;
		// 从该节点向上回溯
		var isTurn = false ;
		var stack = new Array() ; // 栈存储路径
		temp = newNode ;
		while(temp != null) {
			stack.push(temp) ;
			if(temp.balfactor >= 2 || temp.balfactor <= -2) {
				isTurn = true ;
				break ;
			}
			temp = temp.parent ;
		}
		if(isTurn) {
			var first = stack.pop() ;
			var second = stack.pop() ;
			var third = stack.pop() ;
			// set highlight
			{
				this.cmd("SetHighlight", first.objectID, true) ;
				this.cmd("SetHighlight", second.objectID, true) ;
				this.cmd("SetHighlight", third.objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", first.objectID, false) ;
				this.cmd("SetHighlight", second.objectID, false) ;
				this.cmd("SetHighlight", third.objectID, false) ;
				this.cmd("Step") ;
			}
			// start turning
			if(first.leftChild == second && second.leftChild == third) {
				this.singleRightTurn(first, second) ;
			}
			else if(first.rightChild == second && second.rightChild == third) {
				this.singleLeftTurn(first, second) ;
			}
			else if(first.leftChild == second && second.rightChild == third) {
				this.leftRightTurn(first, second, third) ;
			}
			else if(first.rightChild == second && second.leftChild == third) {
				this.rightLeftTurn(first, second, third) ;
			}
		}
		// update position of every points
		this.resizeTree();
	}
	return this.commands ;
}

// 删除
AVLTree.prototype.insertNode = function (value) {
	// 如果根节点为空
	if (this.root == null || this.root == undefined) {
		this.root = new TreeNode(this.objectID, value, this.startRootX, this.startY, 0, null, null, null);
		this.objectID++;
		// 创建根节点
		{
			this.cmd("SetState", "创建根节点" + value);
			this.cmd("Step");
			this.cmd("CreateCircle", this.root.objectID, this.root.value, this.root.x, this.root.y, this.radius);
			this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor);
			this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor);
			this.cmd("Step");
		}
	}
	else {
		var temp = this.root;
		var newNode = new TreeNode(this.objectID, value, this.startX, this.startY, null, null, null);
		this.objectID++;
		// 创建新节点
		{
			this.cmd("SetState", "创建新节点" + value);
			this.cmd("Step");
			this.cmd("CreateCircle", newNode.objectID, newNode.value, newNode.x, newNode.y, this.radius);
			this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor);
			this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor);
			this.cmd("Step");
		}
		// 开始查找
		while (true) {
			if (newNode.value >= temp.value && temp.rightChild != null) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较" + newNode.value + ">=" + temp.value);
					this.cmd("Step");
					this.cmd("SetHighlight", temp.objectID, true);
					this.cmd("Step");
					this.cmd("SetHighlight", temp.objectID, false);
					this.cmd("Step");
				}
				temp = temp.rightChild;
			}
			else if (newNode.value < temp.value && temp.leftChild != null) {
				// 找到节点
				{
					this.cmd("SetState", "节点比较" + newNode.value + "<" + temp.value);
					this.cmd("Step");
					this.cmd("SetHighlight", temp.objectID, true);
					this.cmd("Step");
					this.cmd("SetHighlight", temp.objectID, false);
					this.cmd("Step");
				}
				temp = temp.leftChild;
			}
			else {
				break;
			}
		}
		// 找到节点
		if (newNode.value >= temp.value) {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较" + newNode.value + ">=" + temp.value);
				this.cmd("Step");
			}
		}
		else {
			// 设置状态框
			{
				this.cmd("SetState", "节点比较" + newNode.value + "<" + temp.value);
				this.cmd("Step");
			}
		}
		// 设置高亮
		{
			this.cmd("SetHighlight", temp.objectID, true);
			this.cmd("Step");
			this.cmd("SetHighlight", temp.objectID, false);
			this.cmd("Step");
			this.cmd("Connect", temp.objectID, newNode.objectID, this.foregroundColor);
			this.cmd("Step");
		}
		// 节点插入到相应位置
		if (parseInt(newNode.value) >= parseInt(temp.value)) {
			// 插入到右侧
			temp.rightChild = newNode;
			newNode.parent = temp;
			// 插入
			{
				this.cmd("SetState", "新节点" + newNode.value + "插入到父节点" + temp.value + "的右孩子");
				this.cmd("Step");
			}
		}
		else {
			// 插入到左侧
			temp.leftChild = newNode;
			newNode.parent = temp;
			// 插入
			{
				this.cmd("SetState", "新节点" + newNode.value + "插入到父节点" + temp.value + "的左孩子");
				this.cmd("Step");
			}
		}
		// 更新树的每个节点的位置
		this.resizeTree();
		// 计算每个节点的高度
		this.calHeight(this.root);
		// 更新每个节点的平衡因子
		this.calBalFactor(this.root);
		// 从该节点向上回溯
		var isTurn = false;
		var stack = new Array(); // 栈存储路径
		temp = newNode;
		while (temp != null) {
			stack.push(temp);
			if (temp.balfactor >= 2 || temp.balfactor <= -2) {
				isTurn = true;
				break;
			}
			temp = temp.parent;
		}
		if (isTurn) {
			var first = stack.pop();
			var second = stack.pop();
			var third = stack.pop();
			// set highlight
			{
				this.cmd("SetHighlight", first.objectID, true);
				this.cmd("SetHighlight", second.objectID, true);
				this.cmd("SetHighlight", third.objectID, true);
				this.cmd("Step");
				this.cmd("SetHighlight", first.objectID, false);
				this.cmd("SetHighlight", second.objectID, false);
				this.cmd("SetHighlight", third.objectID, false);
				this.cmd("Step");
			}
			// start turning
			if (first.leftChild == second && second.leftChild == third) {
				this.singleRightTurn(first, second);
			}
			else if (first.rightChild == second && second.rightChild == third) {
				this.singleLeftTurn(first, second);
			}
			else if (first.leftChild == second && second.rightChild == third) {
				this.leftRightTurn(first, second, third);
			}
			else if (first.rightChild == second && second.leftChild == third) {
				this.rightLeftTurn(first, second, third);
			}
		}
		// update position of every points
		this.resizeTree();
	}
	return this.commands;
}

// single right turn method
AVLTree.prototype.singleRightTurn = function(first, second) {
	// B's right child is null?
	if(second.rightChild != null) {
		// B gives right child to A
		{
			this.cmd("Disconnect", second.objectID, second.rightChild.objectID) ;
			this.cmd("Step") ;
		}
		first.leftChild = second.rightChild ;
		{
			this.cmd("Connect", first.objectID, first.leftChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		first.leftChild.parent = first ;
	}
	else {
		first.leftChild = null ;
	}
	// A's parent is null?
	if(first.parent == null) {
		// if A is root 
		this.root = second ;
		second.parent = null ;
	}
	else {
		// if A is not root
		if(first.parent.leftChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.leftChild = second ;
			{
				this.cmd("Connect", first.parent.objectID, second.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			second.parent = first.parent ;
		}
		else if(first.parent.rightChild == first){
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.rightChild = second ;
			{
				this.cmd("Connect", first.parent.objectID, second.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			second.parent = first.parent ;
		}
	}
	// set A be the right child of B
	{
		this.cmd("Disconnect", first.objectID, second.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", second.objectID, first.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	second.rightChild = first ;
	first.parent = second ;
}

// single left turn method
AVLTree.prototype.singleLeftTurn = function(first, second) {
	// B's left child is null?
	if(second.leftChild != null) {
		// B gives right child to A
		{
			this.cmd("Disconnect", second.objectID, second.leftChild.objectID) ;
			this.cmd("Step") ;
		}
		first.rightChild = second.leftChild ;
		{
			this.cmd("Connect", first.objectID, first.rightChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		first.rightChild.parent = first ;
	}
	else {
		first.rightChild = null ;
	}
	// A's parent is null?
	if(first.parent == null) {
		// B will be the root 
		this.root = second ;
		second.parent = null ;
	}
	else {
		// set B be A's parent's child
		if(first.parent.leftChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.leftChild = second ;
			{
				this.cmd("Connect", first.parent.objectID, second.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			second.parent = first.parent ;
		}
		else if(first.parent.rightChild == first){
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.rightChild = second ;
			{
				this.cmd("Connect", first.parent.objectID, second.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			second.parent = first.parent ;
		}
	}
	// set A be the right child of B
	{
		this.cmd("Disconnect", first.objectID, second.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", second.objectID, first.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	second.leftChild = first ;
	first.parent = second ;
}

// left right turn method 
AVLTree.prototype.leftRightTurn = function(first, second, third) {
	// if C's left child is not null
	if(third.leftChild != null) {
		// give its left child to be B's right child
		{
			this.cmd("Disconnect", third.objectID, third.leftChild.objectID) ;
			this.cmd("Step") ;
		}
		second.rightChild = third.leftChild ;
		{
			this.cmd("Connect", second.objectID, second.rightChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		second.rightChild.parent = second ;
	}
	else {
		second.rightChild = null ;
	}
	// if C's right child is not null
	if(third.rightChild != null) {
		// give its right child to be A's left child
		{
			this.cmd("Disconnect", third.objectID, third.rightChild.objectID) ;
			this.cmd("Step") ;
		}
		first.leftChild = third.rightChild ;
		{
			this.cmd("Connect", first.objectID, first.leftChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		first.leftChild.parent = first ;
	}
	else {
		first.leftChild = null ;
	}
	// if A's parent is null
	if(first.parent == null) {
		this.root = third ;
		third.parent = null ;
	}
	else {
		// set C be A's parent's child
		if(first.parent.leftChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.leftChild = third ;
			{
				this.cmd("Connect", first.parent.objectID, third.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			third.parent = first.parent ;
		}
		else if(first.parent.rightChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.rightChild = third ;
			{
				this.cmd("Connect", first.parent.objectID, third.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			third.parent = first.parent ;
		}
	}
	// set B be the left child of C, set A be the right child of C
	{
		this.cmd("Disconnect", second.objectID, third.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", third.objectID, second.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	third.leftChild = second ;
	second.parent = third ;
	{
		this.cmd("Disconnect", first.objectID, second.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", third.objectID, first.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	third.rightChild = first ;
	first.parent = third ;
}

// right left turn method 
AVLTree.prototype.rightLeftTurn = function(first, second, third) {
	// if C's left child is not null
	if(third.leftChild != null) {
		// give its left child to be B's right child
		{
			this.cmd("Disconnect", third.objectID, third.leftChild.objectID) ;
			this.cmd("Step") ;
		}
		first.rightChild = third.leftChild ;
		{
			this.cmd("Connect", first.objectID, first.rightChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		first.rightChild.parent = first ;
	}
	else {
		first.rightChild = null ;
	}
	// if C's right child is not null
	if(third.rightChild != null) {
		// give its right child to be A's left child
		{
			this.cmd("Disconnect", third.objectID, third.rightChild.objectID) ;
			this.cmd("Step") ;
		}
		second.leftChild = third.rightChild ;
		{
			this.cmd("Connect", second.objectID, second.leftChild.objectID, this.foregroundColor) ;
			this.cmd("Step") ;
		}
		second.leftChild.parent = second ;
	}
	else {
		second.leftChild = null ;
	}
	// if A's parent is null
	if(first.parent == null) {
		this.root = third ;
		third.parent = null ;
	}
	else {
		// set C be A's parent's child
		if(first.parent.leftChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.leftChild = third ;
			{
				this.cmd("Connect", first.parent.objectID, third.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			third.parent = first.parent ;
		}
		else if(first.parent.rightChild == first) {
			{
				this.cmd("Disconnect", first.parent.objectID, first.objectID) ;
				this.cmd("Step") ;
			}
			first.parent.rightChild = third ;
			{
				this.cmd("Connect", first.parent.objectID, third.objectID, this.foregroundColor) ;
				this.cmd("Step") ;
			}
			third.parent = first.parent ;
		}
	}
	// set B be the left child of C, set A be the right child of C
	{
		this.cmd("Disconnect", first.objectID, second.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", third.objectID, first.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	third.leftChild = first ;
	first.parent = third ;
	{
		this.cmd("Disconnect", second.objectID, third.objectID) ;
		this.cmd("Step") ;
		this.cmd("Connect", third.objectID, second.objectID, this.foregroundColor) ;
		this.cmd("Step") ;
	}
	third.rightChild = second ;
	second.parent = third ;
}

// 重新布局树的节点
AVLTree.prototype.resizeTree = function() {
	this.resizeWidth(this.root) ;
	if(this.root != null) {
		this.setNewPosition(this.root, this.startRootX, this.startY, 0) ;
		this.animateNewPosition(this.root) ;
		this.cmd("Step") ;
	}
}

// 设置每个节点的位置(递归)
AVLTree.prototype.setNewPosition = function(tree, x, y, side) {
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
AVLTree.prototype.animateNewPosition = function(tree) {
	// 如果树非空则递归左右孩子
	if(tree != null) {
		this.cmd("Move", tree.objectID, tree.x, tree.y) ;
		this.animateNewPosition(tree.leftChild) ;
		this.animateNewPosition(tree.rightChild) ;
	}
}

// 计算节点的左右宽度(递归)
AVLTree.prototype.resizeWidth = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX) ; // 左边宽度
	tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX) ; // 右边宽度
	return parseInt(tree.leftWidth + tree.rightWidth) ;
}

// 计算节点的平衡因子(递归)
AVLTree.prototype.calBalFactor = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.balfactor = parseInt(tree.rightHeight - tree.leftHeight) ;
	this.calBalFactor(tree.leftChild) ;
	this.calBalFactor(tree.rightChild) ;
}

// 计算节点的高度(递归)
AVLTree.prototype.calHeight = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftHeight = this.calHeight(tree.leftChild) ;
	tree.rightHeight = this.calHeight(tree.rightChild) ;
	return parseInt(Math.max(tree.leftHeight, tree.rightHeight) + 1) ;
}

// 树的节点
var TreeNode = function(objectID, value, x, y, balfactor, leftChild, rightChild, parent) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
	this.balfactor = balfactor ; // 平衡因子
	this.leftChild = leftChild ; // 左孩子
	this.rightChild = rightChild ; // 右孩子
	this.parent = parent ; // 父亲
}
