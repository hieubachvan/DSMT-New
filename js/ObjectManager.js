// JavaScript Document
// 物体控制类
function ObjectManager() {
	this.Nodes = [] ; // 节点数组
	this.Edges = [] ; // 正向边数组
	this.BackEdges = [] ; // 反向边数组
	
	this.context = document.getElementById("drawing").getContext("2d") ; // 画布
	this.framenum = 0 ; // 当前帧数
	this.height = 1000 ; // 画布高度
	this.width = 2000 ; // 画布宽度
	
	// 创建一个圆形物体
	this.addCircleObject = function(objectID, label, radius) {
		if(this.Nodes[objectID] != null) {
			alert( 'circle object already exists!' ) ;
		}
		else {
			var newCircle = new AnimatedCircle(objectID, label, radius) ;
			this.Nodes[objectID] = newCircle ;
		}
	}
	
	// 创建一个高亮圆形物体
	this.addHighlightCircleObject = function(objectID, radius) {
		if(this.Nodes[objectID] != null) {
			alert( 'highlight circle object already exists!' ) ;
		}
		else {
			var newCircle = new AnimatedHighlightCircle(objectID, radius) ;
			this.Nodes[objectID] = newCircle ;
		}
	}
	
	// 创建一个矩形物体
	this.addRectangleObject = function(objectID, label, width, height, xJust, yJust) {
		if(this.Nodes[objectID] != null) {
			alert( 'rectangle object already exists!' ) ;
		}
		else {
			var newRect = new AnimatedRectangle(objectID, label, width, height, xJust, yJust) ;
			this.Nodes[objectID] = newRect ;
		}
	}
	
	// 创建一个高亮矩形物体
	this.addHighlightRectangleObject = function(objectID, width, height, xJust, yJust) {
		if(this.Nodes[objectID] != null) {
			alert( 'highlight rectangle object already exists!' ) ;
		}
		else {
			var newRect = new AnimatedHighlightRectangle(objectID, width, height, xJust, yJust) ;
			this.Nodes[objectID] = newRect ;
		}
	}
	
	// 创建一个矩形物体
	this.addPointerObject = function(objectID, label, length, direction) {
		if(this.Nodes[objectID] != null) {
			alert( 'pointer object already exists!' ) ;
		}
		else {
			var newPoint = new AnimatedPointer(objectID, label, length, direction) ;
			this.Nodes[objectID] = newPoint ;
		}
	}
	
	// 创建一个状态框
	this.addStateBoxObject = function(objectID, state, width, height) {
		if(this.Nodes[objectID] != null) {
			alert( 'state box object already exists!' ) ;
		}
		else {
			var newState = new StateBox(objectID, state, width, height) ;
			this.Nodes[objectID] = newState ;
		}
	}
	
	// 创建标签
	this.addLabelObject = function(objectID, label) {
		if(this.Nodes[objectID] != null) {
			alert( 'label object already exists!' ) ;
		}
		else {
			var newLabel = new AnimatedLabel(objectID, label) ;
			this.Nodes[objectID] = newLabel ;
		}
	}
	
	// 设置状态
	this.setState = function(objectID, state) {
		if(this.Nodes[objectID] == null) {
			alert( 'state box object do not exists!' ) ;
		}
		else {
			this.Nodes[objectID].setState(state) ;
		}
	}
	
	// 设置标签
	this.setLabel = function(objectID, label) {
		if(this.Nodes[objectID] == null) {
			alert( 'node do not exists!' ) ;
		}
		else {
			//alert('sl') ;
			this.Nodes[objectID].setLabel(label) ;
		}
	}
	
	// 设置前景色
	this.setForegroundColor = function(objectID, color) {
		if(this.Nodes[objectID] == null) {
			alert( 'node do not exist!' ) ;
		}
		else {
			this.Nodes[objectID].setForegroundColor(color) ;
		}
	}
	
	// 设置背景色
	this.setBackgroundColor = function(objectID, color) {
		if(this.Nodes[objectID] == null) {
			alert( 'node do not exist!' ) ;
		}
		else {
			this.Nodes[objectID].setBackgroundColor(color) ;
		}
	}
	
	// 设置高亮色
	this.setHighlightColor = function(objectID, color) {
		if(this.Nodes[objectID] == null) {
			alert( 'node do not exist!' ) ;
		}
		else {
			this.Nodes[objectID].setHighlightColor(color) ;
		}
	}
	
	// 设置高亮
	this.setHighlight = function(objectID, value) {
		if(this.Nodes[objectID] == null) {
			alert( 'node do not exist!' ) ;
		}
		else {
			this.Nodes[objectID].setHighlight(value) ;
		}
	}
	
	// 设置直线高亮
	this.setLineHighlight = function(fromObject, toObject, value) {
		if(this.Edges[fromObject] == null || this.Edges[fromObject] == undefined ||
		   this.BackEdges[toObject] == null || this.BackEdges[toObject] == undefined) {
			alert( 'node do not exist! cannot highlight' ) ;
		}
		else {
			for(var i=0 ; i<this.Edges[fromObject].length ; i++) {
				if(this.Edges[fromObject][i].Node2 == this.Nodes[toObject]) {
					this.Edges[fromObject][i].setHighlight(value) ;
				}
			}
		}
	}
	
	// 移除物体
	this.removeObject = function(objectID) {
		if(this.Nodes[objectID] == null) {
		}
		else {
			if(objectID == this.Nodes.length-1) {
				this.Nodes.pop() ;
			}
			else {
				this.Nodes[objectID] = null ;
			}
		}
	}
	
	// 连接两个物体
	this.connectEdge = function(fromObject, toObject, color, curve, directed, weight) {
		//alert("connectEdge:"+fromObject +toObject+ color+ ","+curve+","+ directed+ ","+weight);
		if(this.Nodes[fromObject] == null || this.Nodes[toObject] == null) {
			alert( 'do not exist!' ) ;
		}
		else {
			if(this.Edges[fromObject] == null || this.Edges[fromObject] == undefined) {
				this.Edges[fromObject] = [] ;
			}
			if(this.BackEdges[toObject] == null || this.BackEdges[toObject] == undefined) {
				this.BackEdges[toObject] = [] ;
			}
			var newLine = new AnimatedLine(this.Nodes[fromObject], this.Nodes[toObject],  color, curve, directed, weight) ;
			this.Edges[fromObject].push(newLine) ;
			this.BackEdges[toObject].push(newLine) ;
		}
	}
	
	// 取消两个物体的连接
	this.disConnectEdge = function(fromObject, toObject) {
		if(this.Edges[fromObject] == null || this.Edges[fromObject] == undefined ||
		   this.BackEdges[toObject] == null || this.BackEdges[toObject] == undefined) {
			alert( 'node do not exist! cannot disconnect' ) ;
		}
		else {
			for(var i=0 ; i<this.Edges[fromObject].length ; i++) {
				if(this.Edges[fromObject][i].Node2 == this.Nodes[toObject]) {
					if(i != this.Edges[fromObject].length) {
						this.Edges[fromObject][i] = this.Edges[fromObject][this.Edges[fromObject].length-1] ;
					}
					this.Edges[fromObject].pop() ;
				}
			}
			for(var i=0 ; i<this.BackEdges[toObject].length ; i++) {
				if(this.BackEdges[toObject][i].Node1 == this.Nodes[fromObject]) {
					if(i != this.BackEdges[toObject].length) {
						this.BackEdges[toObject][i] = this.BackEdges[toObject][this.BackEdges[toObject].length-1] ;
					}
					this.BackEdges[toObject].pop() ;
				}
			}
		}
	}
	
	// 画图
	this.draw = function() {
		// 清空画布
		this.context.clearRect(0, 0, this.width, this.height);
		// 循环Nodes画图
		for(var i=0 ; i<this.Nodes.length ; i++) {
			if(this.Nodes[i] != null) {
				if(this.Nodes[i].highlighted == false) {
					this.Nodes[i].draw(this.context) ;
				}
				else {
					this.Nodes[i].pluseHighlight(this.framenum) ;
					this.Nodes[i].draw(this.context) ;
				}
			}
		}
		for(var i=0 ; i<this.Edges.length ; i++) {
			if(this.Edges[i] != null) {
				for(var j=0 ; j<this.Edges[i].length ; j++) {
					if(this.Edges[i][j] != null && this.Edges[i][j] != undefined) {
						if(this.Edges[i][j].highlighted == false) {
							this.Edges[i][j].draw(this.context) ;
						}
						else {
							this.Edges[i][j].pluseHighlight(this.framenum) ;
							this.Edges[i][j].draw(this.context) ;
						}
					}
				}
			}
		}
	}
	
	// 设置节点的位置
	this.setPosition = function(nodeID, newX, newY) {
		if(this.Nodes[nodeID] == null) {
			alert( 'do not exist!' ) ;
		}
		else {
			this.Nodes[nodeID].x = newX ;
			this.Nodes[nodeID].y = newY ;
		}
	}
	
	// 获得节点X坐标
	this.getPositionX = function(nodeID) {
		return this.Nodes[nodeID].x ;
	}
	// 获得节点Y坐标
	this.getPositionY = function(nodeID) {
		return this.Nodes[nodeID].y ;
	}
}