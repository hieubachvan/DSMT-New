// JavaScript Document
// 标签类（继承AnimatedObject）
var AnimatedLabel = function (objectID, label) {
  this.objectID = objectID; // 物体ID
  this.label = label; // 标签
};

// 继承基类并且确定构造函数
AnimatedLabel.prototype = new AnimatedObject();
AnimatedLabel.prototype.constructor = AnimatedLabel;

// 画图
AnimatedLabel.prototype.draw = function (ctx) {
  ctx.beginPath();
  // 设置透明度
  ctx.globalAlpha = 1.0;
  // 画文字
  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;
  ctx.fillText(this.label, this.x - 30, this.y);
};
