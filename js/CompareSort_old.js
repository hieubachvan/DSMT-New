// JavaScript Document

var currentSort;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentSort = new Sort(animationManager, drawing.width, drawing.height) ;
}

// 排序
var Sort = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}
// 继承与构造
Sort.prototype = new Algorithm();
Sort.prototype.constructor = Sort;

// 初始化控件
Sort.prototype.initControls = function() {
	addLabelToAlgorithmBar("数组长度");
	this.insertField = addInputToAlgorithmBar("text", "");
	this.initButton = addInputToAlgorithmBar("button", "随机生成数组");
	this.initButton.onclick = this.initCallBack.bind(this) ;
	this.selectSortButton = addInputToAlgorithmBar("button", "选择排序");
	this.selectSortButton.onclick = this.selectSortCallBack.bind(this) ;
	this.insertSortButton = addInputToAlgorithmBar("button", "插入排序");
	this.insertSortButton.onclick = this.insertSortCallBack.bind(this) ;
	this.bubbleSortButton = addInputToAlgorithmBar("button", "冒泡排序");
	this.bubbleSortButton.onclick = this.bubbleSortCallBack.bind(this) ;
	this.shellSortButton = addInputToAlgorithmBar("button", "希尔排序");
	this.shellSortButton.onclick = this.shellSortCallBack.bind(this) ;
	this.QuickSortButton = addInputToAlgorithmBar("button", "快速排序");
	this.QuickSortButton.onclick = this.QuickSortCallBack.bind(this) ;
	this.MergeSortButton = addInputToAlgorithmBar("button", "归并排序");
	this.MergeSortButton.onclick = this.MergeSortCallBack.bind(this) ;
}

// 初始化属性
Sort.prototype.initAttributes = function() {
	// 逻辑部分
	// 图形部分
	this.objectID = 1 ;
	this.width = 30 ; // 矩形的宽度
	this.height = 6 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.tomato = '#FF6347' ; // tomato色
	this.palegreen = '#32CD32' ; // palegreen色
	this.startX = 100 ; // 开始的x坐标
	this.startY = 150 ; // 开始的y坐标
	this.startArrayY = 350 ; // 开始的数组的y坐标
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
Sort.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}

// 初始化回调函数
Sort.prototype.initCallBack = function(length) {
	var insertValue = length;
	if (insertValue != "")
	{
		// set text value
		// this.insertField.value = "";
		this.implementAction(this.initArray.bind(this), insertValue);
	}
	else{
	    alert("请输入数组长度");
	}
}

// 选择排序回调函数
Sort.prototype.selectSortCallBack = function(event) {
	this.implementAction(this.selectSort.bind(this), 0);
}

// 插入排序回调函数
Sort.prototype.insertSortCallBack = function(event) {
	this.implementAction(this.insertSort.bind(this), 1);
}

// 冒泡排序回调函数
Sort.prototype.bubbleSortCallBack = function(event) {
	this.implementAction(this.bubbleSort.bind(this), 0);
}

// 希尔排序回调函数
Sort.prototype.shellSortCallBack = function(event) {
	this.implementAction(this.shellSort.bind(this), 0);
}

// 快速排序回调函数
Sort.prototype.quickSortCallBack = function(event) {
	//this.implementAction(this.QuickSort.bind(this), [0,this.maxSize-1]);
	this.iID=this.objectID++;
	this.jID=this.objectID++;
	
	this.cmd("CREATEPOINTER", this.iID, "i", 20,"up", this.arrayList[0].x, this.startArrayY+10) ;
	this.cmd("CREATEPOINTER", this.jID, "j", 20,"up", this.arrayList[this.maxSize-1].x, this.startArrayY+10) ;
	this.QuickSort(0,this.maxSize-1);
	this.cmd("Delete", this.iID);
	this.cmd("Delete", this.jID);
	
}

// 归并排序回调函数
Sort.prototype.mergeSortCallBack = function(event) {
	this.implementAction(this.MergeSort.bind(this), [0,this.maxSize-1]);
}


// 初始化数组
Sort.prototype.initArray = function(value) {
    this.maxSize=value;
	this.arrayList = new Array(value) ; // 数组框
	this.arrayData =new Array(value) ; 
	// 设置状态栏
	{
		this.cmd("SetState", 0, "创建大小为"+value+"的数组") ;
		this.cmd("Step") ;
	}
	for(var i=0 ; i<this.maxSize ; i++) {
	    this.arrayData[i] = Math.floor(1 + Math.random()*49);
		this.arrayList[i] = new ArrayNode(this.objectID, this.arrayData[i], parseInt(this.startX+i*(this.width)), this.startArrayY) ;
		this.objectID ++ ;
		// 创建矩形
		{
			this.cmd("CreateRectangle", this.arrayList[i].objectID, this.arrayList[i].value, this.width, this.height*this.arrayList[i].value, 
					 'center', 'bottom', this.arrayList[i].x, this.arrayList[i].y) ;
			this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		}
	}
	this.cmd("Step") ;
	
	return this.commands ;
}

// 选择排序
Sort.prototype.selectSort = function(value) {
	//this.point=value;    //后移的指针
	for(var i=value;i<this.maxSize-1;i++){
	    this.min_pos=i;   //被比较元素的最小值的位置
	    this.cmd("SetState", 0, "从位置"+i+"开始排序") ;
		this.cmd("Step") ;
		this.cmd("SetForegroundColor", this.arrayList[this.min_pos].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[this.min_pos].objectID, this.palegreen) ;
		this.min=this.arrayList[i].value;//被比较元素的最小值
		for(var j=i+1;j<this.maxSize;j++){
		     this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;
			 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("Step") ;
			 if(this.arrayList[j].value<this.min){
			      this.cmd("SetForegroundColor", this.arrayList[this.min_pos].objectID, this.foregroundColor) ;
		          this.cmd("SetBackgroundColor", this.arrayList[this.min_pos].objectID, '#FFFFFF') ;
				  this.min=this.arrayList[j].value;
			      this.min_pos=j;   
			 }
			 else{
			      this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;
		          this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
			}
		}
		if(this.min_pos!=i){  //
		    this.swap(i,this.min_pos);
		}
		this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor) ;
	}
	this.cmd("SetForegroundColor", this.arrayList[this.maxSize-1].objectID, this.foregroundColor) ;
	this.cmd("SetBackgroundColor", this.arrayList[this.maxSize-1].objectID, this.backgroundColor) ;
	return this.commands ;
}

// 插入排序
Sort.prototype.insertSort = function(value) {
     for(var i=value;i<this.maxSize;i++){
	      this.cmd("SetState", 0, "第"+(i+1)+"轮排序") ;
		  this.cmd("Step") ;
	      var j=i;
		  while(j>0){
	         this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.palegreen) ;
			 this.cmd("Step");
		     if(this.arrayList[j-1].value<=this.arrayList[j].value){
			      this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消高亮待排序元素
		          this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.backgroundColor) ;
		          this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		          this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.backgroundColor) ;
			      break;
             }
			 this.swap(j-1,j);
			 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.backgroundColor) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.backgroundColor) ;
			 j--;
		  }
	 }
     return this.commands ;
}

// 冒泡排序
Sort.prototype.bubbleSort = function(value) {
    for(var i=value;i<this.maxSize-1;i++){
	    this.cmd("SetState", 0, "第"+(i+1)+"轮排序") ;
		this.cmd("Step") ;
	    for(var j=this.maxSize-1;j>i;j--){
		     this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//高亮待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, this.palegreen) ;
			 this.cmd("Step");
			 
		     if(this.arrayList[j-1].value>this.arrayList[j].value){
			       this.swap(j-1,j);  
			 }
			 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		     this.cmd("SetForegroundColor", this.arrayList[j-1].objectID, this.foregroundColor) ;//取消待排序元素
		     this.cmd("SetBackgroundColor", this.arrayList[j-1].objectID, '#FFFFFF') ;
		}
		this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.backgroundColor) ;
	}
	this.cmd("SetForegroundColor", this.arrayList[this.maxSize-1].objectID, this.foregroundColor) ;
	this.cmd("SetBackgroundColor", this.arrayList[this.maxSize-1].objectID, this.backgroundColor) ;
	return this.commands;
}

// 希尔排序
Sort.prototype.shellSort = function(value) {
     var gap=Math.floor(this.maxSize/2);   //gap是子序列间隔
	 while(gap!=0){
	    for(var i=0;i<gap;i++){
	        for(var j=i;j<this.maxSize;j+=gap){
			    for(var j1=j;j1<this.maxSize;j1+=gap){
				     this.cmd("SetForegroundColor", this.arrayList[j1].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[j1].objectID, this.tomato) ;
				}
			    var inc=j;
				while(inc>=gap){
			         this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, this.tomato) ;
		             this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//高亮待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID, this.tomato) ;
			         this.cmd("Step");
		             if(this.arrayList[inc].value>=this.arrayList[inc-gap].value){
					      this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//取消待排序元素
		                  this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, '#FFFFFF') ;
		                  this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//取消待排序元素
		                  this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID, '#FFFFFF') ;
						  break;
				     } 
					 this.swap(inc-gap,inc);
				     this.cmd("SetForegroundColor", this.arrayList[inc].objectID, this.foregroundColor) ;//取消待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc].objectID, '#FFFFFF') ;
		             this.cmd("SetForegroundColor", this.arrayList[inc-gap].objectID, this.foregroundColor) ;//取消待排序元素
		             this.cmd("SetBackgroundColor", this.arrayList[inc-gap].objectID,'#FFFFFF') ;
				     inc-=gap;
		        }
			}
	    }
		gap=Math.floor(gap / 2);
	 }
     return this.commands;
}

// 快速排序
Sort.prototype.QuickSort = function(low,high) {
    // var low=valueArr[0];
	// var high=valueArr[1];
	 if(high<low){
		return this.commands;
	 }
	 var i=low+1;
	 var j=high;
	 var pivot=this.arrayList[low].value;
	 this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
	 this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
	 this.cmd("Step");
	 while(i<=j){
	     this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.palegreen) ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		 this.cmd("Step");
		 this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 while(i<=j && this.arrayList[i].value<pivot){
		      i++;
			  if(i==this.maxSize){
			       this.cmd("Move", this.iID, this.arrayList[i-1].x+this.width, this.startArrayY + 10);
			       this.cmd("Step");
			  }
			  else{
			       this.cmd("Move", this.iID, this.arrayList[i].x, this.startArrayY + 10);
			       this.cmd("Step");
			  }
			  if(i<=j){
			       this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//高亮待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[i].objectID, this.palegreen) ;
		           this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		           this.cmd("Step");
		           this.cmd("SetForegroundColor", this.arrayList[i].objectID, this.foregroundColor) ;//取消待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[i].objectID, '#FFFFFF') ;
		           this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		           this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
			 }
		 }
		 
		 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		 this.cmd("Step");
		 this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		 this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		 this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 while(j>=i && this.arrayList[j].value>pivot){
		       j--;
			   this.cmd("Move", this.jID, this.arrayList[j].x, this.startArrayY + 10);
			   this.cmd("Step");
			   this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//高亮待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[j].objectID, this.palegreen) ;
		       this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//高亮待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[low].objectID, this.palegreen) ;
		       this.cmd("Step");
		       this.cmd("SetForegroundColor", this.arrayList[j].objectID, this.foregroundColor) ;//取消待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[j].objectID, '#FFFFFF') ;
		       this.cmd("SetForegroundColor", this.arrayList[low].objectID, this.foregroundColor) ;//取消待排序元素
		       this.cmd("SetBackgroundColor", this.arrayList[low].objectID, '#FFFFFF') ;
		 }
		 if(i<=j){
		       this.cmd("Move", this.iID, this.arrayList[i+1].x, this.startArrayY + 10);
	           this.cmd("Move", this.jID, this.arrayList[j-1].x, this.startArrayY + 10);
		       this.swap(i,j);	
			   i++;
			   j--;
		 }
	 }
	 this.swap(low,j);
	 this.cmd("Step");
	 this.QuickSort(low,j-1);
	 this.QuickSort(j+1,high);
     return this.commands;
}

// 归并排序
Sort.prototype.MergeSort = function(valueArr) {
    
     var low=valueArr[0];
	 var high=valueArr[1];
	 if(low<high){
	     var mid=Math.floor((low + high) / 2);
		 this.MergeSort([low,mid]);
		 this.MergeSort([mid+1,high]);
		 var leftIndex=low;
		 var rightIndex=mid+1;
		 var k=low;
		 var InsertArray=new Array(high-low+1);
		 for(var j=0;j<high-low+1;j++){
		     InsertArray[j]=new ArrayNode("","","","");
		 }
		 var index=0;
		 while(leftIndex<=mid && rightIndex<=high){
		     if(this.arrayList[leftIndex].value<=this.arrayList[rightIndex].value){
			     this.cmd("Move", this.arrayList[leftIndex].objectID, this.startX+k*this.width, 600);
                 this.cmd("Step") ;
				 this.arrayList[leftIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.arrayList[leftIndex];
                 k++;
                 leftIndex++;				 
			 }
			 else{
			     this.cmd("Move", this.arrayList[rightIndex].objectID, this.startX+k*this.width, 600);
                 this.cmd("Step") ;
				 this.arrayList[rightIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.arrayList[rightIndex];
                 k++;
                 rightIndex++;
			 }
		 }
		 if(leftIndex<=mid){
		      while(leftIndex<=mid){
			     this.cmd("Move", this.arrayList[leftIndex].objectID, this.startX+k*this.width, 600);
                 this.cmd("Step") ;
				 this.arrayList[leftIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.arrayList[leftIndex];
                 k++;
                 leftIndex++; 
			  }
		 }
		 else{
		     while(rightIndex<=high){
			     this.cmd("Move", this.arrayList[rightIndex].objectID, this.startX+k*this.width, 600);
                 this.cmd("Step") ;
				 this.arrayList[rightIndex].x=this.startX+k*this.width;
				 InsertArray[index++]=this.arrayList[rightIndex];
                 k++;
                 rightIndex++;
			 }
		 }
		 for(var i1=0,i2=low;i1<index,i2<=high;i1++,i2++){
		     this.arrayList[i2]=InsertArray[i1];
			 //alert(this.arrayList[i2].value);
		 }
		 for(var i=low;i<=high;i++){
		    this.cmd("Move", this.arrayList[i].objectID, this.arrayList[i].x, this.arrayList[i].y) ;
		 }
		 this.cmd("Step") ;
	 }
     return this.commands;
}
//交换元素
Sort.prototype.swap=function(index1,index2){
    minNode=new ArrayNode("","","","");
	minNode=this.arrayList[index2];
    this.arrayList[index2]=this.arrayList[index1];
	this.arrayList[index1]=minNode;
	
	this.arrayList[index2].x+=(index2-index1)*(this.width);
	this.cmd("Move", this.arrayList[index2].objectID, this.arrayList[index2].x, this.arrayList[index2].y) ;
	
	this.arrayList[index1].x-=(index2-index1)*(this.width);
	this.cmd("Move", this.arrayList[index1].objectID, this.arrayList[index1].x, this.arrayList[index1].y) ;
    this.cmd("Step") ;
}
// 数组的节点
var ArrayNode = function(objectID, value, x, y) {
	this.objectID = objectID ; // 图形序号
	this.value = value ; // 值
	this.x = x ; // x坐标
	this.y = y ; // y坐标
}
