// JavaScript Document
// 圆类（继承AnimatedObject）
var AnimatedCircle = function (objectID, label, radius) {
  this.objectID = objectID; // 物体ID
  this.label = label; // 标签
  this.radius = radius; // 半径
  this.addToScene = true; // 是否加入画布
  //   console.log("animatecricel", this.radius);
};

// 继承基类并且确定构造函数
AnimatedCircle.prototype = new AnimatedObject();
AnimatedCircle.prototype.constructor = AnimatedCircle;

// 画图
AnimatedCircle.prototype.draw = function (ctx) {
  ctx.beginPath();
  // 设置透明度
  ctx.globalAlpha = 1.0;
  // 画背景
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.backgroundColor;
  ctx.fill();
  // 画外框
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = this.foregroundColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  // 画文字
  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;
  ctx.fillText(this.label, this.x, this.y);
  // 判断是否需要画高亮的圆
  if (this.highlighted) {
    ctx.beginPath();
    // 设置透明度
    ctx.globalAlpha = this.alpha;
    // 画背景
    ctx.arc(this.x, this.y, parseInt(this.radius), 0, 2 * Math.PI, false);
    ctx.fillStyle = this.highlightColor;
    ctx.fill();
  }
};

// 获得箭头的头部坐标
AnimatedCircle.prototype.getArrowHeadPoint = function (fromX, fromY) {
  var xVec = parseInt(this.x - fromX);
  var yVec = parseInt(this.y - fromY);
  var len = Math.sqrt(xVec * xVec + yVec * yVec);
  var deltaX = this.radius * (xVec / len);
  var deltaY = this.radius * (yVec / len);
  return [this.x - deltaX, this.y - deltaY];
};

// 获得箭头的尾部坐标
AnimatedCircle.prototype.getArrowTailPoint = function (fromX, fromY) {
  return this.getArrowHeadPoint(fromX, fromY);
};
