// JavaScript Document

var currentPatternMatch;
// 初始化函数
function init() {
	objectManager = new ObjectManager() ;
	animationManager = new AnimationManager(objectManager) ;
	currentPatternMatch = new PatternMatch(animationManager, drawing.width, drawing.height) ;
}

// 模式匹配
var PatternMatch = function(animManager, width, height) {
	this.init(animManager, width, height) ;
	// this.initControls() ; // 初始化控件
	this.initAttributes() ; // 初始化属性
}

// 继承与构造
PatternMatch.prototype = new Algorithm();
PatternMatch.prototype.constructor = PatternMatch;

// 初始化控件
PatternMatch.prototype.initControls = function() {
	this.insertField = addInputToAlgorithmBar("text", "");
	this.patternButton = addInputToAlgorithmBar("button", "生成模式串");
	this.patternButton.onclick = this.patternCallBack.bind(this) ;
	this.targetButton = addInputToAlgorithmBar("button", "生成目标串");
	this.targetButton.onclick = this.targetCallBack.bind(this) ;
	this.matchButton = addInputToAlgorithmBar("button", "开始匹配");
	this.matchButton.onclick = this.matchCallBack.bind(this) ;
}

// 初始化
PatternMatch.prototype.initAttributes = function() {
	// 逻辑部分
	this.pattern = null ;
	this.target = null ;
	this.head = -1;
	this.next = null ;
	// 图形部分
	this.objectID = 1 ; // 图形的序号
	this.width = 50 ; // 矩形的宽度
	this.height = 50 ; // 矩形的高度
	this.foregroundColor = '#1E90FF' ; // 前景色
	this.backgroundColor = '#B0E0E6' ; // 背景色
	this.matchedColor = '#32CD32' ; // 匹配后的颜色
	this.startX = 150 ; // 开始的x坐标
	this.startY = 100 ; // 开始的y坐标
	this.startArrayY = 250 ; // 开始的数组的y坐标
	this.patterntime = false ;
	this.targettime = false ;
	this.matchingtime = false ; 
	// 初始化状态框
	// this.implementAction(this.initStateBox.bind(this), "start");
}

// 初始化状态框
PatternMatch.prototype.initStateBox = function(state) {
	// 创建状态框
	{
		this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40) ;
		this.cmd("SetForegroundColor", 0, this.foregroundColor) ;
		this.cmd("SetBackgroundColor", 0, this.backgroundColor) ;
		this.cmd("Step") ;
	}
	return this.commands ;
}


// 模式串回调函数
PatternMatch.prototype.patternCallBack = function(patternStr) {
	// var insertValue = this.insertField.value;
	var insertValue = patternStr;
	if (insertValue != "")
	{
		// set text value
		// this.insertField.value = "";
		this.implementAction(this.initPattern.bind(this), insertValue);
	}
}

// 目标串回调函数
PatternMatch.prototype.targetCallBack = function(targetStr) {
	// var insertValue = this.insertField.value;
	var insertValue = targetStr;
	if (insertValue != "")
	{
		// set text value
		// this.insertField.value = "";
		this.implementAction(this.initTarget.bind(this), insertValue);
	}
}

//简单匹配回调函数
PatternMatch.prototype.matchCallBack = function(event) {
	this.implementAction(this.matching.bind(this), 0);
}
//KMP匹配回调函数
PatternMatch.prototype.KMPmatchCallBack = function(event) {
	this.implementAction(this.KMPmatching.bind(this), 0);
}

// 初始化模式串
PatternMatch.prototype.initPattern = function(pattern) {
	pattern = pattern.trim();
	if (pattern.length > 16 || pattern.length <=0) {
		this.cmd('SetState', '模式串的长度应介于1-16。');
		return this.commands;
	} 
	//清空模式串原有内容
	if(this.patterntime == true )
	{
		for(var m = 0 ; m < this.pattern.length ; m++)
		{
			if (this.patternArray[m].value != null)
			{
				this.cmd("Delete",this.patternArray[m].objectID);
			}
		}	
		this.cmd("Step") ;
	}
	this.pattern = pattern ;
	this.patternArray = new Array ( this.pattern.length) ; // 模式串的字符数组
	// 创建状态框
	{
		    this.cmd("SetState","创建目标串");
			this.cmd("Step");
	}
	for(var i=0 ; i< this.pattern.length ; i++)
	{
		this.patternArray[i] = new ArrayNode(this.objectID, this.pattern[i], 
							parseInt(this.startX+i*(this.width-1)), this.startArrayY) ;
		// 创建模式串矩形
		{
			this.cmd("CreateRectangle", this.patternArray[i].objectID ,this.patternArray[i].value, 
					 this.width, this.height, 'center', 'center', 
					 this.patternArray[i].x, this.patternArray[i].y) ;
			this.cmd("SetForegroundColor", this.patternArray[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.patternArray[i].objectID, '#FFFFFF') ;
		}
		this.objectID ++ ;	
	} 
	this.cmd("Step") ;  
    this.patterntime = true ;
	return this.commands ;
}

// 初始化目标串
PatternMatch.prototype.initTarget = function(target) {
	target = target.trim();
	if (target.length > 16 || target.length <= 0) {
		this.cmd('SetState', '目标串的长度应介于1-16。');
		return this.commands;
	}
	//清空目标串原有内容
	if(this.targettime == true )
	{
		for(var m = 0 ; m < this.target.length ; m++)
		{
			if (this.targetArray[m].value != null)
			{
				this.cmd("Delete",this.targetArray[m].objectID);
			}
		}	
		this.cmd("Step") ;
	}
	this.target = target ;
	this.targetArray = new Array ( this.target.length) ; // 模式串的字符数组
	// 创建状态框
	{
		    this.cmd("SetState","创建模式串");
			this.cmd("Step");
	}
	for(var i=0 ; i< this.target.length ; i++)
	{
		this.targetArray[i] = new ArrayNode(this.objectID, this.target[i], 
							parseInt(this.startX+i*(this.width-1)), this.startArrayY+100) ;
		// 创建模式串矩形
		{
			this.cmd("CreateRectangle", this.targetArray[i].objectID ,this.targetArray[i].value, 
					 this.width, this.height, 'center', 'center', 
					 this.targetArray[i].x, this.targetArray[i].y) ;
			this.cmd("SetForegroundColor", this.targetArray[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.targetArray[i].objectID, '#FFFFFF') ;
		}
		this.objectID ++ ;	
	} 
	this.cmd("Step") ;  
    this.targettime = true ;
	return this.commands ;
}
// 匹配
PatternMatch.prototype.matching = function() {
	//重置背景色与图形位置
	for(pos = 0 ; pos <this.pattern.length ;pos ++)
	{
		this.cmd("SetBackgroundColor", this.patternArray[pos].objectID, '#FFFFFF') ;
	}
	this.cmd("Step") ;
	for(pos = 0 ; pos <this.target.length ;pos ++)
	{
		this.targetArray[pos].x=parseInt(this.startX+pos*(this.width-1));
		this.targetArray[pos].y= this.startArrayY+100;
		this.cmd("Move", this.targetArray[pos].objectID, this.targetArray[pos].x ,this.targetArray[pos].y)	;
		this.cmd("SetBackgroundColor", this.targetArray[pos].objectID, '#FFFFFF') ;
	}
	for( var i = 0 ; i < this.pattern.length-this.target.length+1; i ++ )
	{
		for(var j = 0 ; j< this.target.length ; j++)
		  {
			    // 查找对比位置
			
			 		this.cmd("SetHighlight", this.patternArray[i+j].objectID, true) ;
					this.cmd("Step") ;			
					this.cmd("SetHighlight", this.patternArray[i+j].objectID, false);
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.targetArray[j].objectID, true) ;
					this.cmd("Step") ;
					this.cmd("SetHighlight", this.targetArray[j].objectID, false);
					this.cmd("Step") ;
				
				//若正在匹配的字符不同，匹配失败
				if ( this.patternArray[i+j].value!=this.targetArray[j].value)
		 	    {	
					if((this.pattern.length-i)>this.target.length)
					{	
						// 创建状态框
						{
					    	this.cmd("SetState", "目标串的第"+parseInt(i+j+1)+"个字符与模式串的第"+parseInt(j+1)+"个字符不同");	
							this.cmd("Step");
						}		
						for(var pos = 0 ; pos < this.target.length; pos ++)
	  					{
							this.targetArray[pos].x +=(this.width-1) ;
							this.cmd("Move", this.targetArray[pos].objectID, this.targetArray[pos].x ,this.targetArray[pos].y)	;	
				  		}
						//重置背景色
						for(pos = 0 ; pos <this.pattern.length ;pos ++)
						{
							this.cmd("SetBackgroundColor", this.patternArray[pos].objectID, '#FFFFFF') ;
						}
						this.cmd("Step") ;
						for(pos = 0 ; pos <this.target.length ;pos ++)
						{
							this.cmd("SetBackgroundColor", this.targetArray[pos].objectID, '#FFFFFF') ;
						}
						this.cmd("Step") ;
				  	    break;		 
		  			}
					else
					{
						// 创建状态框
						{
					 	   this.cmd("SetState","匹配失败");
						   this.cmd("Step");
						}
						//重置背景色
						for(pos = 0 ; pos <this.pattern.length ;pos ++)
						{
							this.cmd("SetBackgroundColor", this.patternArray[pos].objectID, '#FFFFFF') ;
						}
						this.cmd("Step") ;
						for(pos = 0 ; pos <this.target.length ;pos ++)
						{
							this.cmd("SetBackgroundColor", this.targetArray[pos].objectID, '#FFFFFF') ;
						}
						this.cmd("Step") ;
						return this.commands ;
					}
				}
				else
				{
					// 创建状态框
					{
					    this.cmd("SetState", "目标串的第"+parseInt(i+j+1)+"个字符与模式串的第"+parseInt(j+1)+"个字符相同");
						this.cmd("Step");
					}	
					//将已匹配的字符背景色变绿
					this.cmd("SetBackgroundColor", this.patternArray[i+j].objectID,this.matchedColor) ;
					this.cmd("SetBackgroundColor", this.targetArray[j].objectID, this.matchedColor) ;
				}
		  }
		  //匹配成功
		  if(j==this.target.length)
		  {
		     // 创建状态框
			{
		 		this.cmd("SetState","在位置"+(i+1).toString()+"匹配成功");
				this.cmd("Step");
			}
			  break;
		  }
		  //匹配失败后目标串向后移动一个矩形
		 
	}
	//直到最后仍未出现和目标串相同字符，匹配失败
	if(i==this.pattern.length)
	{
		// 创建状态框
		{
		    this.cmd("SetState","匹配失败");
			this.cmd("Step");
		}
	}
	return this.commands ;
}

//获取next数组
PatternMatch.prototype.getNext = function(){
	var k = -1;
	var j = 0;
	this.next = new Array( this.targetArray.length );
	this.next[j] = k;
	while(j < this.targetArray.length){
		if(k == -1 || this.targetArray[k].value == this.targetArray[j].value ){
			++j;
			++k;
			this.next[j] = k;	
		}
		else{
			k = this.next[k];
		}
	}
}

//KMP匹配
PatternMatch.prototype.KMPmatching = function (){
	if(this.matchingtime == true){
		for( var i = 0 ; i < this.patternArray.length ; i++){
			this.cmd("SetForegroundColor", this.patternArray[i].objectID, this.foregroundColor) ;
			this.cmd("SetBackgroundColor", this.patternArray[i].objectID, '#FFFFFF') ;
		}
		this.cmd("Step");
		for( var i = 0 ; i < this.targetArray.length ; i++){
			this.targetArray[i].x = parseInt(this.startX+i*(this.width-1));
			this.cmd("Move", this.targetArray[i].objectID, this.targetArray[i].x ,this.targetArray[i].y);
			{
				this.cmd("SetForegroundColor", this.targetArray[i].objectID, this.foregroundColor) ;
				this.cmd("SetBackgroundColor", this.targetArray[i].objectID, '#FFFFFF') ;
		    }
		}
		this.cmd("Step");
	}
    var i = 0 ;
    var j = 0 ;
    this.getNext();
    while( i < this.patternArray.length && j < this.targetArray.length){
    	if( j != -1){
    	/*if( j == -1){
    		// 查找对比位置
		
			//this.cmd("SetHighlight",this.patternArray[i].objectID, true) ;
			//this.cmd("Step") ;			
			////this.cmd("SetHighlight", this.patternArray[i].objectID, false);
			//this.cmd("Step") ;
			//this.cmd("SetHighlight",this.targetArray[0].objectID, true) ;
			//this.cmd("Step") ;
			///this.cmd("SetHighlight",this.targetArray[0].objectID, false);
			//this.cmd("Step") ;
    	}
    	else{*/
        	// 查找对比位置
		
			this.cmd("SetHighlight",this.patternArray[i].objectID, true) ;
			this.cmd("Step") ;			
			this.cmd("SetHighlight", this.patternArray[i].objectID, false);
			this.cmd("Step") ;
			this.cmd("SetHighlight",this.targetArray[j].objectID, true) ;
			this.cmd("Step") ;
			this.cmd("SetHighlight",this.targetArray[j].objectID, false);
			this.cmd("Step") ;
		}
        if( j == -1 || this.patternArray[i].value == this.targetArray[j].value){
        	/*if( j == -1){
        		//将已匹配的字符背景色变绿
				this.cmd("SetBackgroundColor", this.patternArray[i].objectID,this.matchedColor) ;
				this.cmd("SetBackgroundColor", this.targetArray[0].objectID, this.matchedColor) ;
				this.cmd("SetState","0","模式串的第"+parseInt(i+1)+"个字符与目标串的第"+parseInt(j+1)+"个字符相同同");
				this.cmd("Step");
        	}
        	else{*/
        	if( j != -1){
        		//将已匹配的字符背景色变绿
				this.cmd("SetBackgroundColor", this.patternArray[i].objectID,this.matchedColor) ;
				this.cmd("SetBackgroundColor", this.targetArray[j].objectID, this.matchedColor) ;
				this.cmd("SetState","模式串的第"+parseInt(i+1)+"个字符与目标串的第"+parseInt(j+1)+"个字符相同同");
				this.cmd("Step");
        	}
         	i++;
         	j++;
        }
        else{
        	{
        		//提示不匹配的字符,消除已匹配字段的颜色
        		for( var m = 0 ; m < this.patternArray.length ; m++){
        			this.cmd("SetForegroundColor", this.patternArray[m].objectID, this.foregroundColor) ;
					this.cmd("SetBackgroundColor", this.patternArray[m].objectID, '#FFFFFF') ;
        		}
        		for( var m = 0 ; m < this.targetArray.length ; m++){
        			this.cmd("SetForegroundColor", this.targetArray[m].objectID, this.foregroundColor) ;
					this.cmd("SetBackgroundColor", this.targetArray[m].objectID, '#FFFFFF') ;
        		}
				this.cmd("SetState","模式串的第"+parseInt(i+1)+"个字符与目标串的第"+parseInt(j+1)+"个字符不同");
				this.cmd("Step");
        	}
        	for(var n = 0 ; n < this.targetArray.length ; n++){
           		//移动
            	{
            		this.targetArray[n].x=parseInt(this.targetArray[n].x+(j - this.next[j])*(this.width-1));
               		this.cmd("Move", this.targetArray[n].objectID, this.targetArray[n].x ,this.targetArray[n].y);
               		//将已经确定相同的字符背景色变绿
               		for (var t = 0; t <this.next[j] ; t++) {
               			this.cmd("SetBackgroundColor", this.patternArray[i-t-1].objectID,this.matchedColor) ;
						this.cmd("SetBackgroundColor", this.targetArray[t].objectID, this.matchedColor) ;
               		};
               		this.cmd("Step");
            	}
            }
         	j = this.next[j];
        }
    }
    if(this.targetArray.length == j){
        this.cmd("SetState","查找成功，在位置"+ parseInt(i - j + 1)+"匹配成功");
        this.cmd("Step");
    }
    else{
    	this.cmd("SetState", "查找失败");  
   	    this.cmd("Step");
    }   
    this.matchingtime = true;
    return this.commands;
}


// 节点类
var ArrayNode = function(objectID, value, x, y) {
	this.objectID = objectID ;
	this.value = value ;
	this.x = x ;
	this.y = y ;
}
