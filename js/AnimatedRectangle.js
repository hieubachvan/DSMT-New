// JavaScript Document
// 动画矩形
var AnimatedRectangle = function (
  objectID,
  label,
  width,
  height,
  xJust,
  yJust
) {
  this.objectID = objectID; // 物体的ID
  this.label = label; // 物体的标签
  this.width = width; // 宽度
  this.height = height; // 高度
  this.xJustify = xJust; // x位置信息
  this.yJustify = yJust; // y位置信息
  this.addToScene = true; // 是否加入画布
};

// 继承和构造函数
AnimatedRectangle.prototype = new AnimatedObject();
AnimatedRectangle.prototype.constructor = AnimatedRectangle;

// 获得最左侧x坐标
AnimatedRectangle.prototype.left = function () {
  var xPos;
  if (this.xJustify == "center") {
    xPos = parseInt(this.x - this.width / 2);
  } else if (this.xJustify == "left") {
    xPos = this.x;
  } else if (this.xJustify == "right") {
    xPos = parseInt(this.x - this.width);
  }
  return xPos;
};

// 获得最右侧x坐标
AnimatedRectangle.prototype.right = function () {
  var xPos;
  if (this.xJustify == "center") {
    xPos = parseInt(this.x + this.width / 2);
  } else if (this.xJustify == "left") {
    xPos = parseInt(this.x + this.width);
  } else if (this.xJustify == "right") {
    xPos = this.x;
  }
  return xPos;
};

// 获得最上侧y坐标
AnimatedRectangle.prototype.top = function () {
  var yPos;
  if (this.yJustify == "center") {
    yPos = parseInt(this.y - this.height / 2);
  } else if (this.yJustify == "top") {
    yPos = this.y;
  } else if (this.yJustify == "bottom") {
    yPos = parseInt(this.y - this.height);
  }
  return yPos;
};

// 获得最下侧y坐标
AnimatedRectangle.prototype.bottom = function () {
  var yPos;
  if (this.yJustify == "center") {
    yPos = parseInt(this.y + this.height / 2);
  } else if (this.yJustify == "top") {
    yPos = parseInt(this.y + this.height);
  } else if (this.yJustify == "bottom") {
    yPos = this.y;
  }
  return yPos;
};

// 获得中间的x坐标
AnimatedRectangle.prototype.centerX = function () {
  var xPos;
  if (this.xJustify == "center") {
    xPos = this.x;
  } else if (this.xJustify == "left") {
    xPos = parseInt(this.x + this.width / 2);
  } else if (this.xJustify == "right") {
    xPos = parseInt(this.x - this.width / 2);
  }
  return xPos;
};

// 获得中间的y坐标
AnimatedRectangle.prototype.centerY = function () {
  var yPos;
  if (this.yJustify == "center") {
    yPos = this.y;
  } else if (this.yJustify == "top") {
    yPos = parseInt(this.y + this.height / 2);
  } else if (this.yJustify == "bottom") {
    yPos = parseInt(this.y - this.height / 2);
  }
  return yPos;
};

// 画图
AnimatedRectangle.prototype.draw = function (ctx) {
  var startX; // 左上角的X坐标
  var startY; // 左上角的Y坐标
  var labelX; // 文字的X坐标
  var labelY; // 文字的Y坐标
  // 通过justX和justY来计算左上角点的坐标和文字的坐标
  if (this.xJustify.toUpperCase() == "LEFT") {
    startX = this.x;
    labelX = this.x + this.width / 2;
  } else if (this.xJustify.toUpperCase() == "CENTER") {
    startX = this.x - this.width / 2;
    labelX = this.x;
  } else if (this.xJustify.toUpperCase() == "RIGHT") {
    startX = this.x - this.width;
    labelX = this.x - this.width / 2;
  }
  if (this.yJustify.toUpperCase() == "TOP") {
    startY = this.y;
    labelY = this.y + this.height / 2;
  } else if (this.yJustify.toUpperCase() == "CENTER") {
    startY = this.y - this.height / 2;
    labelY = this.y;
  } else if (this.yJustify.toUpperCase() == "BOTTOM") {
    startY = this.y - this.height;
    labelY = this.y - this.height / 2;
  }
  // 开始画图
  ctx.beginPath();
  // 设置透明度
  ctx.globalAlpha = 1.0;
  // 画背景
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + this.width, startY);
  ctx.lineTo(startX + this.width, startY + this.height);
  ctx.lineTo(startX, startY + this.height);
  ctx.fillStyle = this.backgroundColor;
  ctx.fill();
  // 画外框
  ctx.moveTo(startX, startY);
  ctx.lineTo(startX + this.width, startY);
  ctx.lineTo(startX + this.width, startY + this.height);
  ctx.lineTo(startX, startY + this.height);
  ctx.lineTo(startX, startY);
  ctx.strokeStyle = this.foregroundColor;
  ctx.lineWidth = 2;
  ctx.stroke();
  // 写文字
  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;
  ctx.fillText(this.label, labelX, labelY);
  // 判断是否需要画高亮的圆
  if (this.highlighted) {
    ctx.beginPath();
    // 设置透明度
    ctx.globalAlpha = this.alpha;
    // 画背景
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX + this.width, startY);
    ctx.lineTo(startX + this.width, startY + this.height);
    ctx.lineTo(startX, startY + this.height);
    ctx.lineTo(startX, startY);
    ctx.fillStyle = this.highlightColor;
    ctx.fill();
  }
};

// 获得箭头的头部坐标
AnimatedRectangle.prototype.getArrowHeadPoint = function (fromX, fromY) {
  var xDelta;
  var yDelta;
  var xPos;
  var yPos;
  // x
  if (this.left() > fromX) {
    xDelta = this.left() - fromX;
    xPos = this.left();
  } else if (fromX > this.right()) {
    xDelta = fromX - this.right();
    xPos = this.right();
  } else {
    xDelta = 0;
    xPos = this.centerX();
  }
  // y
  if (this.bottom() > fromY) {
    yDelta = this.bottom() - fromY;
    yPos = this.top();
  } else if (fromY > this.top()) {
    yDelta = fromY - this.top();
    yPos = this.bottom();
  } else {
    yDelta = 0;
    yPos = this.centerY();
  }
  // 比较delta
  if (xDelta > yDelta) {
    yPos = this.centerY();
  } else {
    xPos = this.centerX();
  }
  return [xPos, yPos];
};

// 获得箭头的尾部坐标
AnimatedRectangle.prototype.getArrowTailPoint = function (fromX, fromY) {
  return this.getArrowHeadPoint(fromX, fromY);
};
