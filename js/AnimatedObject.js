// JavaScript Document
// 运动物体类的基类
function AnimatedObject() {
  this.init();
}

// 初始化
AnimatedObject.prototype.init = function () {
  this.foregroundColor = "#000000"; // 前景色
  this.backgroundColor = "#5F9EA0"; // 背景色
  this.highlightColor = "#FF6347"; // 高亮色
  this.highlighted = false; // 是否高亮
  this.highlightDiff = 3; // 高亮范围
  this.objectID = -1; // 物体ID
  this.label = ""; // 标签
  this.x = 0; // x坐标
  this.y = 0; // y坐标
  this.alpha = 0; // 透明度
  this.labelColor = "#000000"; // 标签颜色
  this.addToScene = false; // 是否添加到屏幕
  this.animationMaxFrame = animationMaxFrame; // 最大动画帧数
};

// 设置标签
AnimatedObject.prototype.setLabel = function (label) {
  this.label = label;
};

// 设置前景色
AnimatedObject.prototype.setForegroundColor = function (color) {
  this.foregroundColor = color;
};

// 设置背景色
AnimatedObject.prototype.setBackgroundColor = function (color) {
  this.backgroundColor = color;
};

// 设置高亮色
AnimatedObject.prototype.setHighlightColor = function (color) {
  this.highlightColor = color;
};

// 设置高亮
AnimatedObject.prototype.setHighlight = function (value) {
  this.highlighted = value;
};

// 获得高亮
AnimatedObject.prototype.getHighlight = function () {
  return this.highlighted;
};

// 强调高亮
AnimatedObject.prototype.pluseHighlight = function (framenum) {
  if (this.highlighted) {
    var alpha = 1.0;
    if (framenum <= this.animationMaxFrame / 2) {
      alpha = (2.0 * framenum) / this.animationMaxFrame;
    } else {
      alpha = 2 - (2.0 * framenum) / this.animationMaxFrame;
    }
    //alpha = 1.0*framenum / this.animationMaxFrame ;
    this.setAlpha(alpha);
  }
};

// 设置透明度
AnimatedObject.prototype.setAlpha = function (alpha) {
  this.alpha = alpha;
};

// 获得透明度
AnimatedObject.prototype.getAlpha = function () {
  return this.alpha;
};

// 获得箭头的头部的坐标
AnimatedObject.prototype.getArrowHeadPoint = function (fromX, fromY) {};

// 获得箭头的尾部的坐标
AnimatedObject.prototype.getArrowTailPoint = function (fromX, fromY) {};
