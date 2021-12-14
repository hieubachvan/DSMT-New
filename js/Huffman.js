// JavaScript Document

var currentHuffman;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentHuffman = new Huffman(animationManager, drawing.width, drawing.height) ;
	// currentHuffman.implementAction(currentHuffman.initStateBox.bind(currentHuffman), "start");
}

// Huffman树
var Huffman = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Huffman.prototype = new Algorithm();
Huffman.prototype.constructor = Huffman;

// 初始化控件
Huffman.prototype.initControls = function() {
	this.insertField = addInputToAlgorithmBar("text", "");
	this.createButton =	addInputToAlgorithmBar("button", "建立Huffman树");
	this.createButton.onclick = this.createButtonCallBack.bind(this) ;
}

// 初始化属性
Huffman.prototype.initAttributes = function() {
	// 逻辑部分
	this.root = null ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.radius = 20 ; // 圆的半径
	this.intervalX = 45 ; // x间隙,在形成树的时候应用
	this.intervalY = 45 ; // y间隙,在形成树的时候应用
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startRootX = 250 ; //节点产生起始位置的x坐标
	this.startY = 150 ; // 新节点的y坐标
	this.startNewX = 200 ; //产生新父节点的x坐标
	this.startNewY = 100 ; //产生新父节点的y坐标
	this.hfmNodeArray = new Array();//包括树的全部节点
	this.valueableNumOfArticle = 0;
}

// 初始化状态框
Huffman.prototype.initStateBox = function(state) {
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
	调用函数this.autoCreateHuffmanTree()实现自动创建Huffman Tree
*/
Huffman.prototype.autoCreateHuffmanTree = function() {
	var Range = 10 - 1;
	var Rand = Math.random();
	var num = 1 + Math.round(Rand * Range);
	if(num == 1){
		var insertValue = "abccfhdjssw.<kl";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 2){
		var insertValue = "<<?ssdhfd12";
		this.implementAction(this.createHuffman.bind(this), insertValue);	
	}else if(num == 3){
		var insertValue = "$%sshdaac<";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 4){
		var insertValue = "ddsOPaa";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 5){
		var insertValue = "@ssa>?KKls";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 6){
		var insertValue = "sasHHaoOUa";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 7){
		var insertValue = "~~:d>>dsffj";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 8){
		var insertValue = "fdhjdds*7ds";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else if(num == 9){
		var insertValue = "dfhds<>ssJa";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}else{
		var insertValue = "KLddshj<>a?aas";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}
}
// 插入回调函数
Huffman.prototype.createButtonCallBack = function(text) {
	// var insertValue = this.insertField.value;
	var insertValue = text;
	if (insertValue != "")
	{
		// this.insertField.value = "";
		this.implementAction(this.createHuffman.bind(this), insertValue);
	}
}
// 创建Huffman
Huffman.prototype.createHuffman = function(theArticle) {
	this.cmd("SetState", "输入的字符串是："+theArticle);
	this.cmd("Step");
	this.cmd("Step");
	var MAX_ARTICLE_LENGTH = 2000;
	var MAX_ASCII_CODE_OF_DIC = 128;//定义最大的ASCII码
	var charArticleNew = theArticle;//输入字符串
	var CONSTtimeOfArticle = new Array();//统计每个字符出现的次数
	//by函数接受一个成员名字符串做为参数
	//并返回一个可以用来对包含该成员的对象数组进行排序的比较函数
	var by = function(name){
		return function(o, p){
			var a, b;
			if (typeof o === "object" && typeof p === "object" && o && p) {
				a = o[name];
			    b = p[name];
        		if (a === b) {
					return 0;
			    }
    	    	if (typeof a === typeof b) {
					return a < b ? -1 : 1;
		    	}
	        	return typeof a < typeof b ? -1 : 1;
			}
        	else {
				throw ("error");
	        }
		}
	}
	{//JK7968
		var CONST_x = new Array();
		var CONST_y = this.startY;
		for(var i=0;i<15*2;i++){
			CONST_x[i] = this.startRootX + i*this.intervalX;
		}
	}//JK7968
	{//FUNCTION_1 根据输入来获取每个字符出现的频率
		for(var i=0;i<MAX_ASCII_CODE_OF_DIC;i++){//初始化为0次
			CONSTtimeOfArticle[i] = new CONSTHfmNode(0,0,0,0,0,0,0,0,0);
		}
		for(var i=0;i<charArticleNew.length;i++){
			var asciiCode = charArticleNew[i].charCodeAt();//字符转换ASCII码
			CONSTtimeOfArticle[asciiCode].ASCIICode = asciiCode;//统计频率
			CONSTtimeOfArticle[asciiCode].Times++;
		}
		for(var i=0;i<MAX_ASCII_CODE_OF_DIC;i++){
			if(CONSTtimeOfArticle[i].Times==0){
				CONSTtimeOfArticle[i].Times = MAX_ARTICLE_LENGTH + 1;//记录出现的有用字符的ASCII码
			}
		}
		CONSTtimeOfArticle.sort(by("Times"));
		for(var i=0;i<MAX_ASCII_CODE_OF_DIC;i++){
			if(CONSTtimeOfArticle[i].Times == MAX_ARTICLE_LENGTH + 1){
				break;
			}
			else{
				CONSTtimeOfArticle[i].value = String.fromCharCode(CONSTtimeOfArticle[i].ASCIICode)+" , "+CONSTtimeOfArticle[i].Times;
				this.valueableNumOfArticle ++;
				CONSTtimeOfArticle[i].x = CONST_x[i];
				CONSTtimeOfArticle[i].y = CONST_y;
			}
		}
	}
	{//FUNCTION_2 生成单节点
		for(var i=0;i<this.valueableNumOfArticle;i++){
			CONSTtimeOfArticle[i].objectID = this.objectID;
			this.objectID ++;
			this.hfmNodeArray.push(CONSTtimeOfArticle[i]);
			{//JK7986
				this.cmd("SetState", "创建节点："+String.fromCharCode(CONSTtimeOfArticle[i].ASCIICode)+" 其出现次数为： "+CONSTtimeOfArticle[i].Times+" >>"+theArticle) ;
				// console.log(theArticle);
				this.cmd("Step") ;
				this.cmd("CreateCircle", CONSTtimeOfArticle[i].objectID, CONSTtimeOfArticle[i].value, CONSTtimeOfArticle[i].x, CONSTtimeOfArticle[i].y, this.radius) ;
				this.cmd("SetForegroundColor", CONSTtimeOfArticle[i].objectID, this.foregroundColor) ;
				this.cmd("SetBackgroundColor", CONSTtimeOfArticle[i].objectID, this.backgroundColor) ;
				this.cmd("Step") ;
			}//JK7986
		}
	}
	var tempCONSTtimeOfArticle = CONSTtimeOfArticle.slice(0);
	var tempvalueableNumOfArticle = this.valueableNumOfArticle;
	{//FUNCTION_3 建立Huffman树
	for(var numOfFatherNode=0;numOfFatherNode<this.valueableNumOfArticle-1;numOfFatherNode++){//因为要处理的有效节点个数为this.valueableNumOfArticle，故生成父节点的个数应该减1
		var minObject_0 = tempCONSTtimeOfArticle.shift();
		var minObject_1 = tempCONSTtimeOfArticle.shift();
		var valueOfTimes = parseInt(minObject_0.Times) + parseInt(minObject_1.Times);
		var newFather = new CONSTHfmNode(this.objectID," ",valueOfTimes,this.startNewX,this.startNewY,minObject_0.objectID,minObject_1.objectID,0," ");
		tempvalueableNumOfArticle --;
		newFather.value = parseInt(minObject_0.Times) + parseInt(minObject_1.Times) ;
		this.objectID ++;
		for(var valueHfmCode=0;valueHfmCode<this.hfmNodeArray.length;valueHfmCode++){
			if(minObject_0.objectID == this.hfmNodeArray[valueHfmCode].objectID){
				this.hfmNodeArray[valueHfmCode].hfmCode = "0";
				this.hfmNodeArray[valueHfmCode].fatherObID = newFather.objectID;
			}
			else if(minObject_1.objectID == this.hfmNodeArray[valueHfmCode].objectID){
				this.hfmNodeArray[valueHfmCode].hfmCode = "1";
				this.hfmNodeArray[valueHfmCode].fatherObID = newFather.objectID;
			}
		}
		this.hfmNodeArray.push(newFather);
		tempCONSTtimeOfArticle.push(newFather);
		tempCONSTtimeOfArticle.sort(by("Times"));
		{//JK7968
			for(var pointXIndex = 0; pointXIndex < tempvalueableNumOfArticle; pointXIndex++){
				this.hfmNodeArray[tempCONSTtimeOfArticle[pointXIndex].objectID-1].x = CONST_x[pointXIndex];//使每次排序后，顶端节点x坐标位置保持在一定范围内
			}
			this.cmd("SetState", "创建节点，其出现次数(频率)为其子节点之和："+newFather.value) ;
			this.cmd("CreateCircle", newFather.objectID, newFather.value, this.startNewX, this.startNewY, this.radius) ;
			this.cmd("SetForegroundColor", newFather.objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", newFather.objectID, this.backgroundColor) ;
			this.cmd("Step") ;
			this.cmd("Connect", newFather.objectID, newFather.leftChildObID, this.foregroundColor) ;
			this.cmd("Connect", newFather.objectID, newFather.rightChildObID, this.foregroundColor) ;
			this.cmd("Step") ;
			for(var Pt = 0; Pt<tempvalueableNumOfArticle ; Pt++){
				this.cmd("SetState", "新建立根结点，并进行排序") ;
				this.root = tempCONSTtimeOfArticle[Pt];
				if(Pt != 0){
					this.resizeWidth(this.root);
					tempCONSTtimeOfArticle[Pt].x = tempCONSTtimeOfArticle[Pt-1].x + tempCONSTtimeOfArticle[Pt-1].rightWidth + tempCONSTtimeOfArticle[Pt].leftWidth ;
				}
				if(tempvalueableNumOfArticle == 1){
					this.root.x = 500;
				}
				this.resizeTree(this.root.x);
			}
		}//JK7968
	}
	var rootOfHuffman = this.hfmNodeArray[2*this.valueableNumOfArticle-1-1].objectID;
	this.hfmNodeArray[2*this.valueableNumOfArticle-1-1].fatherObID = 0;//在建立Huffman树之后，为根结点的fatherID赋值为0
	this.root = this.hfmNodeArray[2*this.valueableNumOfArticle-1-1];
	this.resizeTree(this.root.x);
	{//FUNCTION_4 对Huffman树进行广度优先遍历,在每个节点上标注Huffman编码
		var queueOfHuffman = new Array();//声明遍历Huffman树的队列
		queueOfHuffman.push(rootOfHuffman);
		while( queueOfHuffman.length != 0 ){
			var node = queueOfHuffman.shift();
			if(this.hfmNodeArray[node-1].hfmCode != " "){
				this.hfmNodeArray[node-1].hfmCode = this.hfmNodeArray[this.hfmNodeArray[node-1].fatherObID-1].hfmCode + this.hfmNodeArray[node-1].hfmCode;
			}
			if(this.hfmNodeArray[node-1].leftChildObID != 0){
				queueOfHuffman.push(this.hfmNodeArray[node-1].leftChildObID);
			}
			if(this.hfmNodeArray[node-1].rightChildObID != 0){
				queueOfHuffman.push(this.hfmNodeArray[node-1].rightChildObID);
			}
		}
	}
	{//FUNCTION_5 在规定左0右1的条件下，展示叶节点的Huffman码
		this.cmd("SetState", "Huffman树构建完毕，由根结点出发遍历至叶节点得出Huffman编码") ;
		for(var stackHighIndex = 0 ; stackHighIndex < this.valueableNumOfArticle ; stackHighIndex++ ){
			var stackHigh = new Array();
			stackHigh.push(this.hfmNodeArray[stackHighIndex]);
			while(0 != stackHigh[stackHigh.length-1].fatherObID){
				var lengthOfStack = stackHigh.length;
				stackHigh.push(this.hfmNodeArray[stackHigh[lengthOfStack-1].fatherObID-1]);
			}
			for(var invertedIndex = stackHigh.length-1 ; invertedIndex >= 0 ; invertedIndex-- ){
				this.cmd("SetHighlight", stackHigh[invertedIndex].objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", stackHigh[invertedIndex].objectID, false) ;
				this.cmd("Step") ;
				this.cmd("SetHighlightColor",stackHigh[invertedIndex].objectID, this.palegreen) ;
				this.cmd("SetHighlight", stackHigh[invertedIndex].objectID, true) ;
				this.cmd("Step") ;
				this.cmd("SetHighlight", stackHigh[invertedIndex].objectID, false) ;
				this.cmd("Step") ;
				this.cmd("SetHighlightColor", stackHigh[invertedIndex].objectID, this.tomato) ;
			}
			this.cmd("SetState", "输入字符："+String.fromCharCode(this.hfmNodeArray[stackHighIndex].ASCIICode)+"   Huffman编码："+this.hfmNodeArray[stackHighIndex].hfmCode);
			//标注出霍夫曼码
		}
	}
	this.cmd("SetState", "算法执行完毕！");
	}
	return this.commands ;
}
Huffman.prototype.resizeTree = function(posX) {
	this.resizeWidth(this.root) ;
	if(this.root != null) {
		this.setNewPosition(this.root, posX, this.startY, 0) ;
		this.animateNewPosition(this.root) ;
		this.cmd("Step") ;
	}
}

// 设置每个节点的位置(递归)
Huffman.prototype.setNewPosition = function(tree, x, y, side) {
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
		this.setNewPosition(this.hfmNodeArray[tree.leftChildObID-1], x, parseInt(y + this.intervalY), -1) ;
		this.setNewPosition(this.hfmNodeArray[tree.rightChildObID-1], x, parseInt(y + this.intervalY), 1) ;
	}
}

// 动画显示每个节点的位置(递归)
Huffman.prototype.animateNewPosition = function(tree) {
	// 如果树非空则递归左右孩子
	if(tree != null) {
		this.cmd("Move", tree.objectID, tree.x, tree.y) ;
		this.animateNewPosition(this.hfmNodeArray[tree.leftChildObID-1]) ;
		this.animateNewPosition(this.hfmNodeArray[tree.rightChildObID-1]) ;
	}
}

// 计算节点的左右宽度(递归)
Huffman.prototype.resizeWidth = function(tree) {
	// 如果是空树返回0，递归出口
	if(tree == null) {
		return 0 ;
	}
	tree.leftWidth = Math.max(this.resizeWidth(this.hfmNodeArray[tree.leftChildObID-1]), this.intervalX) ; // 左边宽度
	tree.rightWidth = Math.max(this.resizeWidth(this.hfmNodeArray[tree.rightChildObID-1]), this.intervalX) ; // 右边宽度
	return parseInt(tree.leftWidth + tree.rightWidth) ;
}

// 树的节点
function CONSTHfmNode(objectID,ASCIICode,Times,x,y,leftChildObID,rightChildObID,fatherObID,hfmCode){
		this.objectID = objectID;
		this.ASCIICode = ASCIICode;
		this.Times = Times;
		this.x = x;
		this.y = y;
		this.leftChildObID = leftChildObID;
		this.rightChildObID = rightChildObID;
		this.value = null;
		this.fatherObID = fatherObID;
		this.hfmCode = hfmCode;
}