// JavaScript Document

var StateBox = function (objectID, state, width, height) {
  this.objectID = objectID;
  this.state = state;
  this.width = width;
  this.height = height;
  this.addToScene = true;
};

StateBox.prototype = new AnimatedObject();
StateBox.prototype.constructor = StateBox;

StateBox.prototype.setState = function (state) {
  this.state = state;
};

StateBox.prototype.draw = function (ctx) {
  ctx.beginPath();

  ctx.globalAlpha = 1.0;

  ctx.moveTo(this.x, this.y);
  ctx.lineTo(this.x + this.width, this.y);
  ctx.lineTo(this.x + this.width, this.y + this.height);
  ctx.lineTo(this.x, this.y + this.height);
  ctx.fillStyle = this.backgroundColor;
  ctx.fill();

  ctx.font = "18px Arial";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;
  ctx.fillText(this.state, this.x + 20, parseInt(this.y + this.height / 2));
};
