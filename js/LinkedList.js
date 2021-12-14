// JavaScript Document

function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentLinkList = new LinkList(
    animationManager,
    drawing.width,
    drawing.height
  );
}

var LinkList = function (animManager, width, height) {
  this.init(animManager, width, height);
  //this.initControls() ;
  this.initAttributes();
};

LinkList.prototype = new Algorithm();
LinkList.prototype.constructor = LinkList;

LinkList.prototype.initControls = function () {
  addLabelToAlgorithmBar("Serial number");
  this.insertField_seq = addInputToAlgorithmBar("text", "");
  addLabelToAlgorithmBar("Numerical value");
  this.insertField_value = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
  addLabelToAlgorithmBar("Serial number");
  this.insertField_del = addInputToAlgorithmBar("text", "");
  this.deleteButton = addInputToAlgorithmBar("button", "Delete node");
  this.deleteButton.onclick = this.deleteCallBack.bind(this);
};

LinkList.prototype.initAttributes = function () {
  this.head = null;
  this.tail = null;
  this.length = 0;

  this.objectID = 1;
  // this.objectIDHead = 2;
  this.width = 50;
  this.height = 30;
  this.widthLength = 70;
  this.heightLength = 50;
  this.interval = 120;
  this.foregroundColor = "#000000";
  this.backgroundColor = "#fff";
  this.tomato = "#Coral"; // tomato
  this.palegreen = "#32CD32"; // palegreen
  this.startX = -100;
  this.startY = 500;
  this.startHeadY = 330;
  this.startheadArrowY = 250;
  this.starttailArrowY = 310;
  this.startNewNodex = 20;
  this.startNewNodey = 400;
  // this.arrowLengthx = 50;
  this.arrowLength = 30;
  this.radius = 20;
  this.implementAction(this.initHeadNode.bind(this), 0);
};

LinkList.prototype.insertCallBack = function (seq, value) {
  if (seq != "" && value != "") {
    seq = parseInt(seq);
    value = parseInt(value);
    if (this.head.value <= 9) {
      this.implementAction(this.insertNode.bind(this), [seq, value]);
    } else {
      alert("The length of the linked list should be 10 or less");
    }
  }
};

LinkList.prototype.deleteCallBack = function (value) {
  if (value != "") {
    this.implementAction(this.deleteNode.bind(this), value);
  }
};

LinkList.prototype.initHeadNode = function () {
  this.head = new ListNode(
    this.objectID,
    0,
    this.startX,
    this.startHeadY,
    null
  );
  this.tail = this.head;
  this.objectID++;
  this.length++;

  {
    this.cmd(
      "SetState",
      "You can only create linked lists with integers. You can insert elements starting from 1"
    );
    this.cmd(
      "CreateRectangle",
      this.head.objectID,
      this.head.value,
      this.widthLength,
      this.heightLength,
      "center",
      "center",
      this.head.x,
      this.head.y
    );
    this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
    this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
  }

  //-----------------------------------------------
  // this.objectID++;

  // this.headArrow1 = new ListNode(
  //   this.objectIDHead,
  //   "head1",
  //   this.startX,
  //   this.startheadArrowY,
  //   null
  // );

  this.headArrow = new ListNode(
    this.objectID,
    "head",
    this.startX + 120,
    this.startheadArrowY + 55,
    null
  );
  // console.log("head", this.headArrow);
  //-----------------------------------------------

  this.objectID++;
  this.tailArrow = new ListNode(
    this.objectID,
    "tail",
    this.startX + 120,
    this.starttailArrowY - 55,
    null
  );

  // console.log("tail", this.tailArrow);

  this.objectID++;

  {
    this.cmd(
      "CreatePointer",
      this.headArrow.objectID,
      "Head",
      this.arrowLength,
      "down",
      this.headArrow.x,
      this.headArrow.y
    );
    this.cmd("SetForegroundColor", this.headArrow.objectID, this.tomato);

    // this.cmd(
    //   "CreatePointer",
    //   this.headArrow1.objectID,
    //   "Head",
    //   this.arrowLength,
    //   "up",
    //   this.headArrow.x,
    //   this.headArrow.y
    // );
    // this.cmd("SetForegroundColor", this.headArrow1.objectID, this.tomato);

    this.cmd(
      "CreatePointer",
      this.tailArrow.objectID,
      "Tail",
      this.arrowLength,
      "down",
      this.tailArrow.x,
      this.tailArrow.y
    );
    this.cmd("SetForegroundColor", this.tailArrow.objectID, this.tomato);
  }
  return this.commands;
};

LinkList.prototype.insertNode = function (valueArr) {
  // console.log("value", valueArr);
  var pos = valueArr[0] > this.length ? this.length : valueArr[0];
  var value = valueArr[1];
  var point = this.head;
  // console.log("thiss", this);
  if (pos == 1) {
    this.cmd("singleList_addHead");
  } else if (pos == this.length) {
    this.cmd("singleList_addTail");
  } else if (pos > 1) {
    this.cmd("singleList_add");
  }
  if (pos > this.length || pos <= 0) {
    alert(
      "Wrong location! The position is out of range. \nCurrent range 1-" +
        (this.head.value + 1).toString()
    );
    // alert('Position error! The position is out of range.\nCurrent range ' + 1 +' to '+this.head.value) ;
  } else {
    // console.log("id", this.objectID);
    this.cmd("ADDHEAD1");
    this.cmd("ADDTAIL1");

    var newNode = new ListNode(
      this.objectID,
      value,
      this.startNewNodex,
      this.startNewNodey,
      null
    );
    this.objectID++;
    this.length++;

    {
      this.cmd("SetState", "Create a new node" + value);
      this.cmd("Step");

      // this.cmd(
      //   "CreateRectangle",
      //   newNode.objectID,
      //   newNode.value,
      //   this.width,
      //   this.height,
      //   "center",
      //   "center",
      //   newNode.x,
      //   newNode.y
      // );

      this.cmd(
        "CreateCircle",
        newNode.objectID,
        newNode.value,
        newNode.x,
        newNode.y,
        this.radius
      );

      this.cmd("SetForegroundColor", newNode.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", newNode.objectID, this.backgroundColor);
      this.cmd("Step");
    }
    for (var i = 0; i < pos - 1; i++) {
      this.cmd("ADD1");
      {
        this.cmd("SetState", "Search to the location" + i);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, false);
        this.cmd("Step");
      }
      point = point.linked;
    }

    this.cmd("ADDHEAD2");
    this.cmd("ADDTAIL2");

    {
      this.cmd("SetState", "Search to the location" + parseInt(pos - 1));
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, false);
      this.cmd("Step");
    }

    if (point == this.tail) {
      newNode.x = parseInt(point.x + this.interval);
      newNode.y = parseInt(point.y);
      point.linked = newNode;
      this.tail = newNode;
      this.tailArrow.x = newNode.x;
      this.tailArrow.y = this.startheadArrowY;

      {
        this.cmd("SetState", "This position is the tail node, insert directly");
        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          newNode.objectID,
          this.forgroundColor
        );
        this.cmd("Step");
        this.cmd("Move", newNode.objectID, newNode.x, newNode.y);
        this.cmd("Step");
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y
        );
        this.cmd("Step");
      }
    } else {
      newNode.x = parseInt(point.x + this.interval);
      newNode.y = parseInt(point.y);
      newNode.linked = point.linked;
      point.linked = newNode;
      this.cmd("ADD2");

      {
        this.cmd("SetState", "disconnect" + point.value + "Pointer field");
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, newNode.linked.objectID);
        this.cmd("Step");
        this.cmd(
          "SetState",
          "Set insert node" +
            value +
            "The pointer points to the subsequent node" +
            newNode.linked.value
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          newNode.objectID,
          newNode.linked.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd(
          "SetState",
          "set up" +
            point.value +
            "The pointer points to the inserted node" +
            value
        );

        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          newNode.objectID,
          this.foregroundColor
        );

        this.cmd("Step");
        this.shiftBack(newNode.linked);
        this.cmd("Move", newNode.objectID, newNode.x, newNode.y);
        this.cmd("Step");
      }
    }

    {
      this.cmd("ADD3");
      this.head.value++;
      if (this.head.value > 1) {
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y + 50
        );
      }
      this.cmd("ADDHEAD3");
      this.cmd("ADDTAIL3");

      this.cmd("Delete", this.head.objectID);
      this.cmd(
        "CreateRectangle",
        this.head.objectID,
        this.head.value,
        this.widthLength,
        this.heightLength,
        "center",
        "center",
        this.head.x,
        this.head.y
      );
      this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
      this.cmd("SetState", "Inserted successfully");
      this.cmd("Step");
    }
  }
  return this.commands;
};

LinkList.prototype.deleteNode = function (pos) {
  if (pos == 1) {
    this.cmd("SINGLELIST_DELETEHEAD");
  } else if (pos == this.length - 1) {
    this.cmd("SINGLELIST_DELETETAIL");
  } else {
    this.cmd("SINGLELIST_DELETE");
  }

  if (pos >= this.length || pos <= 0) {
    alert(
      "Wrong location! The position is out of range.\nCurrent range 1-" +
        this.head.value
    );
    // alert('Position error! The position is out of range.\nCurrent range ' + 1 +' to '+this.head.value) ;
  } else {
    this.cmd("DELETEHEAD1");

    this.length--;
    var point = this.head;
    // console.log("hehehe", point);
    var next;

    for (var i = 0; i < pos - 1; i++) {
      this.cmd("DELETETAIL1");
      this.cmd("DELETE1");
      {
        this.cmd("SetState", "Search to the location" + i);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, true);
        this.cmd("Step");
        this.cmd("SetHighlight", point.objectID, false);
        this.cmd("Step");
      }
      point = point.linked;
    }
    this.cmd("DELETEHEAD2");
    next = point.linked;

    {
      this.cmd("SetState", "Search to the location" + parseInt(pos - 1));
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", point.objectID, false);
      this.cmd("Step");
      this.cmd("SetState", "Search to the location" + parseInt(pos));
      this.cmd("Step");
      this.cmd("SetHighlight", next.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", next.objectID, false);
      this.cmd("Step");
    }

    if (next == this.tail) {
      this.tail = point;
      this.tailArrow.x = point.x;
      if (point == this.head) {
        this.tailArrow.y = this.starttailArrowY;
      } else {
        this.tailArrow.y = this.startheadArrowY;
      }

      {
        this.cmd(
          "SetState",
          "This position is the tail node, delete it directly"
        );
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, next.objectID);
        this.cmd("Step");
        this.cmd("Delete", next.objectID);
        this.cmd("Step");
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y
        );
        this.cmd("Step");
      }
      next = null;
      this.tail.linked = null;
    } else {
      this.cmd("DELETE2");
      {
        this.cmd("SetState", "disconnect" + point.value + "Pointer field");
        this.cmd("Step");
        this.cmd("Disconnect", point.objectID, next.objectID);
        this.cmd("Step");
        this.cmd(
          "SetState",
          "set up" +
            point.value +
            "The pointer points to the subsequent node" +
            next.linked.value
        );
        this.cmd("Step");
        this.cmd(
          "Connect",
          point.objectID,
          next.linked.objectID,
          this.foregroundColor
        );
        this.cmd("Step");
        this.cmd(
          "SetState",
          "Disconnect delete node" + next.value + "Pointer field"
        );
        this.cmd("Step");
        this.cmd("Disconnect", next.objectID, next.linked.objectID);
        this.cmd("Step");
        this.cmd("SetState", "Delete node" + next.value);
        this.cmd("Step");
        this.cmd("Delete", next.objectID);
        this.cmd("Step");
        this.shiftFront(next.linked);
        this.cmd("Step");
      }
      point.linked = next.linked;
      next.linked = null;
    }

    {
      this.head.value--;
      this.cmd("DELETEHEAD3");
      this.cmd("DELETE3");
      if (this.head.value == 0) {
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x + 120,
          this.tailArrow.y - 50
        );
      }
      if (this.head.value > 1) {
        this.cmd(
          "Move",
          this.tailArrow.objectID,
          this.tailArrow.x,
          this.tailArrow.y + 50
        );
      }
      this.cmd("DELETEHEAD3");
      this.cmd("DELETETAIL2");
      this.cmd("Delete", this.head.objectID);
      this.cmd(
        "CreateRectangle",
        this.head.objectID,
        this.head.value,
        this.widthLength,
        this.heightLength,
        "center",
        "center",
        this.head.x,
        this.head.y
      );
      this.cmd("SetForegroundColor", this.head.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.head.objectID, this.backgroundColor);
      this.cmd("SetState", "successfully deleted");
      this.cmd("Step");
    }
  }
  return this.commands;
};

LinkList.prototype.shiftBack = function (head) {
  while (head != this.tail) {
    {
      this.cmd("Move", head.objectID, head.linked.x, head.linked.y);
    }
    head.x = head.linked.x;
    head.y = head.linked.y;
    head = head.linked;
  }
  head.x = parseInt(head.x + this.interval);
  head.y = head.y;
  this.tailArrow.x = head.x;
  this.tailArrow.y = this.startheadArrowY;

  {
    this.cmd("Move", head.objectID, head.x, head.y);
    this.cmd(
      "Move",
      this.tailArrow.objectID,
      this.tailArrow.x,
      this.tailArrow.y
    );
  }
};

LinkList.prototype.shiftFront = function (head) {
  // console.log("head", head);
  while (head != this.tail) {
    head.x = parseInt(head.x - this.interval);
    head.y = head.linked.y;

    {
      this.cmd("Move", head.objectID, head.x, head.y);
    }
    head = head.linked;
  }
  head.x = parseInt(head.x - this.interval);
  head.y = head.y;
  this.tailArrow.x = head.x;
  this.tailArrow.y = this.startheadArrowY;

  {
    this.cmd("Move", head.objectID, head.x, head.y);
    this.cmd(
      "Move",
      this.tailArrow.objectID,
      this.tailArrow.x,
      this.tailArrow.y
    );
  }
};

var ListNode = function (objectID, value, x, y, linked) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
  this.linked = linked;
};
