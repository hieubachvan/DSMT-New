// JavaScript Document

var AnimatedHighlightRectangle = function (
  objectID,
  width,
  height,
  xJust,
  yJust
) {
  this.objectID = objectID;
  this.width = width;
  this.height = height;
  this.xJustify = xJust;
  this.yJustify = yJust;
  this.thickness = 3;
};

AnimatedHighlightRectangle.prototype = new AnimatedObject();
AnimatedHighlightRectangle.prototype.constructor = AnimatedHighlightRectangle;

AnimatedHighlightRectangle.prototype.draw = function (ctx) {
  var startX;
  var startY;

  if (this.xJustify.toUpperCase() == "LEFT") {
    startX = this.x;
  } else if (this.xJustify.toUpperCase() == "CENTER") {
    startX = this.x - this.width / 2;
  } else if (this.xJustify.toUpperCase() == "RIGHT") {
    startX = this.x - this.width;
  }
  if (this.yJustify.toUpperCase() == "TOP") {
    startY = this.y;
  } else if (this.yJustify.toUpperCase() == "CENTER") {
    startY = this.y - this.height / 2;
  } else if (this.yJustify.toUpperCase() == "BOTTOM") {
    startY = this.y - this.height;
  }
  ctx.beginPath();

  ctx.globalAlpha = 1.0;

  ctx.moveTo(
    startX - parseInt(this.highlightDiff),
    startY - parseInt(this.highlightDiff)
  );
  ctx.lineTo(
    startX + this.width + parseInt(this.highlightDiff),
    startY - parseInt(this.highlightDiff)
  );
  ctx.lineTo(
    startX + this.width + parseInt(this.highlightDiff),
    startY + this.height + parseInt(this.highlightDiff)
  );
  ctx.lineTo(
    startX - parseInt(this.highlightDiff),
    startY + this.height + parseInt(this.highlightDiff)
  );
  ctx.lineTo(
    startX - parseInt(this.highlightDiff),
    startY - parseInt(this.highlightDiff)
  );
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = this.highlightDiff + 1;
  ctx.stroke();
};
