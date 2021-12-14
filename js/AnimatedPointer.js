// JavaScript Document

var AnimatedPointer = function (objectID, label, length, direction) {
  this.objectID = objectID;
  this.label = label;
  this.length = length;
  this.direction = direction;
  this.height = 8;
  this.width = 4;
  this.interval = 8;
};

AnimatedPointer.prototype = new AnimatedObject();
AnimatedPointer.prototype.constructor = AnimatedPointer;

AnimatedPointer.prototype.drawArrow = function (ctx) {
  ctx.beginPath();

  if (this.direction.toUpperCase() == "UP") {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x - this.width), parseInt(this.y + this.height));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x + this.width), parseInt(this.y + this.height));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, parseInt(this.y + this.length));
  } else if (this.direction.toUpperCase() == "DOWN") {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x - this.width), parseInt(this.y - this.height));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x + this.width), parseInt(this.y - this.height));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, parseInt(this.y - this.length));
  } else if (this.direction.toUpperCase() == "LEFT") {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x + this.height), parseInt(this.y - this.width));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x + this.height), parseInt(this.y + this.width));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x + this.length), this.y);
  } else if (this.direction.toUpperCase() == "RIGHT") {
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x - this.height), parseInt(this.y - this.width));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x - this.height), parseInt(this.y + this.width));
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(parseInt(this.x - this.length), this.y);
  }
  ctx.closePath();
  ctx.strokeStyle = this.foregroundColor;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = this.foregroundColor;
  ctx.fill();
};

AnimatedPointer.prototype.draw = function (ctx) {
  ctx.beginPath();

  ctx.globalAlpha = 1.0;

  this.drawArrow(ctx);

  ctx.font = "18px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = this.foregroundColor;

  if (this.direction.toUpperCase() == "UP") {
    ctx.fillText(
      this.label,
      this.x,
      parseInt(this.y + this.length + this.interval)
    );
  } else if (this.direction.toUpperCase() == "DOWN") {
    ctx.fillText(
      this.label,
      this.x,
      parseInt(this.y - this.length - this.interval)
    );
  } else if (this.direction.toUpperCase() == "LEFT") {
    ctx.fillText(
      this.label,
      parseInt(this.x - this.length - this.interval),
      this.y
    );
  } else if (this.direction.toUpperCase() == "RIGHT") {
    ctx.fillText(
      this.label,
      parseInt(this.x + this.length + this.interval),
      this.y
    );
  }
};
