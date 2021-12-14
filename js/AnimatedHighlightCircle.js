// JavaScript Document
// 动画高亮圆形
var AnimatedHighlightCircle = function(objectID, radius) {
	this.objectID = objectID ; // 物体的ID
	this.radius = radius ; // 半径
	this.thickness = 3 ; // 宽度
}

// 继承和构造函数
AnimatedHighlightCircle.prototype = new AnimatedObject() ;
AnimatedHighlightCircle.prototype.constructor = AnimatedHighlightCircle ;

// 画图
AnimatedHighlightCircle.prototype.draw = function(ctx) {
	ctx.beginPath() ;
	// 设置透明度
	ctx.globalAlpha = 1.0 ;
	// 画外框
	ctx.arc(this.x, this.y, parseInt(this.radius)+parseInt(this.thickness), 0, 2*Math.PI, false) ;
	ctx.strokeStyle = this.foregroundColor ;
	ctx.lineWidth = this.thickness + 1 ;
	ctx.stroke() ;
}