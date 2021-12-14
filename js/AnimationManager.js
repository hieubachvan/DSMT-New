// JavaScript Document
var timer;
var timespan = 15;
var animationMaxFrame = 20;
var animationManager;
var objectManager;

function AnimationManager(objectManager) {
  this.objectManager = objectManager;
  this.animationSteps = null;
  this.currentAnimation = 0;
  this.currentFrame = 0;
  this.animationMaxFrame = animationMaxFrame;
  this.currentBlock = [];

  this.startNewAnimation = function (commands) {
    clearTimeout(timer);
    this.animationSteps = commands;
    this.startNextBlock();
    this.currentFrame = 0;
    timer = setTimeout("timeout()", timespan);
  };

  this.startNextBlock = function () {
    var foundBreak = false;
    while (this.currentAnimation < this.animationSteps.length && !foundBreak) {
      var nextCommand =
        this.animationSteps[this.currentAnimation].split("<cry>");
      //alert(nextCommand) ;

      if (nextCommand[0].toUpperCase() == "CREATECIRCLE") {
        this.objectManager.addCircleObject(
          parseInt(nextCommand[1]),
          nextCommand[2],
          nextCommand[5]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[3]),
          parseInt(nextCommand[4])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATEHIGHLIGHTCIRCLE") {
        this.objectManager.addHighlightCircleObject(
          parseInt(nextCommand[1]),
          nextCommand[4]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[2]),
          parseInt(nextCommand[3])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATERECTANGLE") {
        this.objectManager.addRectangleObject(
          parseInt(nextCommand[1]),
          nextCommand[2],
          parseInt(nextCommand[3]),
          parseInt(nextCommand[4]),
          nextCommand[5],
          nextCommand[6]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[7]),
          parseInt(nextCommand[8])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATEHIGHLIGHTRECTANGLE") {
        this.objectManager.addHighlightRectangleObject(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[2]),
          parseInt(nextCommand[3]),
          nextCommand[4],
          nextCommand[5]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[6]),
          parseInt(nextCommand[7])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATEPOINTER") {
        this.objectManager.addPointerObject(
          parseInt(nextCommand[1]),
          nextCommand[2],
          parseInt(nextCommand[3]),
          nextCommand[4]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[5]),
          parseInt(nextCommand[6])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATESTATEBOX") {
        this.objectManager.addStateBoxObject(
          parseInt(nextCommand[1]),
          nextCommand[2],
          parseInt(nextCommand[5]),
          parseInt(nextCommand[6])
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[3]),
          parseInt(nextCommand[4])
        );
      } else if (nextCommand[0].toUpperCase() == "CREATELABEL") {
        this.objectManager.addLabelObject(
          parseInt(nextCommand[1]),
          nextCommand[2]
        );
        this.objectManager.setPosition(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[3]),
          parseInt(nextCommand[4])
        );
      } else if (nextCommand[0].toUpperCase() == "SETSTATE") {
        //this.objectManager.setState(parseInt(nextCommand[1]),
        //									  nextCommand[2]) ;
        $(".state p")[0].innerHTML = nextCommand[1];
      }

      //BST---------------------------------------------------------------
      else if (nextCommand[0].toUpperCase() == "BST_DELETE") {
        $(".BST_find")[0].classList.remove("active");
        $(".BST_insert")[0].classList.remove("active");
        $(".BST_delete")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "BST_FIND") {
        $(".BST_find")[0].classList.add("active");
        $(".BST_insert")[0].classList.remove("active");
        $(".BST_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_INSERT") {
        $(".BST_find")[0].classList.remove("active");
        $(".BST_insert")[0].classList.add("active");
        $(".BST_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_INSERT1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_insert .p1")[0].classList.add("active");
        $(".BST_insert .p2")[0].classList.remove("active");
        $(".BST_insert .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_INSERT2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_insert .p1")[0].classList.remove("active");
        $(".BST_insert .p2")[0].classList.add("active");
        $(".BST_insert .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_INSERT3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_insert .p1")[0].classList.remove("active");
        $(".BST_insert .p2")[0].classList.remove("active");
        $(".BST_insert .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "BST_FIND1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_find .p1")[0].classList.add("active");
        $(".BST_find .p2")[0].classList.remove("active");
        $(".BST_find .p3")[0].classList.remove("active");
        $(".BST_find .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_FIND2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_find .p1")[0].classList.remove("active");
        $(".BST_find .p2")[0].classList.add("active");
        $(".BST_find .p3")[0].classList.remove("active");
        $(".BST_find .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_FIND3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_find .p1")[0].classList.remove("active");
        $(".BST_find .p2")[0].classList.remove("active");
        $(".BST_find .p3")[0].classList.add("active");
        $(".BST_find .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_FIND4") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_find .p1")[0].classList.remove("active");
        $(".BST_find .p2")[0].classList.remove("active");
        $(".BST_find .p3")[0].classList.remove("active");
        $(".BST_find .p4")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "BST_DELETE1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_delete .p1")[0].classList.add("active");
        $(".BST_delete .p2")[0].classList.remove("active");
        $(".BST_delete .p3")[0].classList.remove("active");
        $(".BST_delete .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_DELETE2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_delete .p1")[0].classList.remove("active");
        $(".BST_delete .p2")[0].classList.add("active");
        $(".BST_delete .p3")[0].classList.remove("active");
        $(".BST_delete .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_DELETE3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_delete .p1")[0].classList.remove("active");
        $(".BST_delete .p2")[0].classList.remove("active");
        $(".BST_delete .p3")[0].classList.add("active");
        $(".BST_delete .p4")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "BST_DELETE4") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".BST_delete .p1")[0].classList.remove("active");
        $(".BST_delete .p2")[0].classList.remove("active");
        $(".BST_delete .p3")[0].classList.remove("active");
        $(".BST_delete .p4")[0].classList.add("active");
      }

      //BST---------------------------------------------------------------

      //singlelist--------------------------------------------------------
      else if (nextCommand[0].toUpperCase() == "SINGLELIST_DELETE") {
        $(".singleList_addTail")[0].classList.remove("active");
        $(".singleList_addHead")[0].classList.remove("active");
        $(".singleList_deleteHead")[0].classList.remove("active");
        $(".singleList_deleteTail")[0].classList.remove("active");
        $(".singleList_add")[0].classList.remove("active");
        $(".singleList_delete")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "SINGLELIST_ADD") {
        $(".singleList_addTail")[0].classList.remove("active");
        $(".singleList_addHead")[0].classList.remove("active");
        $(".singleList_deleteHead")[0].classList.remove("active");
        $(".singleList_deleteTail")[0].classList.remove("active");
        $(".singleList_add")[0].classList.add("active");
        $(".singleList_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SINGLELIST_DELETETAIL") {
        $(".singleList_addTail")[0].classList.remove("active");
        $(".singleList_addHead")[0].classList.remove("active");
        $(".singleList_deleteHead")[0].classList.remove("active");
        $(".singleList_deleteTail")[0].classList.add("active");
        $(".singleList_add")[0].classList.remove("active");
        $(".singleList_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SINGLELIST_DELETEHEAD") {
        $(".singleList_addTail")[0].classList.remove("active");
        $(".singleList_addHead")[0].classList.remove("active");
        $(".singleList_deleteHead")[0].classList.add("active");
        $(".singleList_deleteTail")[0].classList.remove("active");
        $(".singleList_add")[0].classList.remove("active");
        $(".singleList_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SINGLELIST_ADDTAIL") {
        $(".singleList_addTail")[0].classList.add("active");
        $(".singleList_addHead")[0].classList.remove("active");
        $(".singleList_deleteHead")[0].classList.remove("active");
        $(".singleList_deleteTail")[0].classList.remove("active");
        $(".singleList_add")[0].classList.remove("active");
        $(".singleList_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SINGLELIST_ADDHEAD") {
        $(".singleList_addTail")[0].classList.remove("active");
        $(".singleList_addHead")[0].classList.add("active");
        $(".singleList_deleteHead")[0].classList.remove("active");
        $(".singleList_deleteTail")[0].classList.remove("active");
        $(".singleList_add")[0].classList.remove("active");
        $(".singleList_delete")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADD1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_add .p1")[0].classList.add("active");
        $(".singleList_add .p2")[0].classList.remove("active");
        $(".singleList_add .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADD2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_add .p1")[0].classList.remove("active");
        $(".singleList_add .p2")[0].classList.add("active");
        $(".singleList_add .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADD3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_add .p1")[0].classList.remove("active");
        $(".singleList_add .p2")[0].classList.remove("active");
        $(".singleList_add .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "ADDHEAD1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addHead .p1")[0].classList.add("active");
        $(".singleList_addHead .p2")[0].classList.remove("active");
        $(".singleList_addHead .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADDHEAD2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addHead .p1")[0].classList.remove("active");
        $(".singleList_addHead .p2")[0].classList.add("active");
        $(".singleList_addHead .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADDHEAD3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addHead .p1")[0].classList.remove("active");
        $(".singleList_addHead .p2")[0].classList.remove("active");
        $(".singleList_addHead .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "ADDTAIL1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addTail .p1")[0].classList.add("active");
        $(".singleList_addTail .p2")[0].classList.remove("active");
        $(".singleList_addTail .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADDTAIL2") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addTail .p1")[0].classList.remove("active");
        $(".singleList_addTail .p2")[0].classList.add("active");
        $(".singleList_addTail .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "ADDTAIL3") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".singleList_addTail .p1")[0].classList.remove("active");
        $(".singleList_addTail .p2")[0].classList.remove("active");
        $(".singleList_addTail .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "DELETEHEAD1") {
        $(".singleList_deleteHead .p1")[0].classList.add("active");
        $(".singleList_deleteHead .p2")[0].classList.remove("active");
        $(".singleList_deleteHead .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETEHEAD2") {
        $(".singleList_deleteHead .p1")[0].classList.remove("active");
        $(".singleList_deleteHead .p2")[0].classList.add("active");
        $(".singleList_deleteHead .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETEHEAD3") {
        $(".singleList_deleteHead .p1")[0].classList.remove("active");
        $(".singleList_deleteHead .p2")[0].classList.remove("active");
        $(".singleList_deleteHead .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "DELETETAIL1") {
        $(".singleList_deleteTail .p1")[0].classList.add("active");
        $(".singleList_deleteTail .p2")[0].classList.remove("active");
        $(".singleList_deleteTail .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETETAIL2") {
        $(".singleList_deleteTail .p1")[0].classList.remove("active");
        $(".singleList_deleteTail .p2")[0].classList.add("active");
        $(".singleList_deleteTail .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETETAIL3") {
        $(".singleList_deleteTail .p1")[0].classList.remove("active");
        $(".singleList_deleteTail .p2")[0].classList.remove("active");
        $(".singleList_deleteTail .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "DELETE1") {
        $(".singleList_delete .p1")[0].classList.add("active");
        $(".singleList_delete .p2")[0].classList.remove("active");
        $(".singleList_delete .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETE2") {
        $(".singleList_delete .p1")[0].classList.remove("active");
        $(".singleList_delete .p2")[0].classList.add("active");
        $(".singleList_delete .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "DELETE3") {
        $(".singleList_delete .p1")[0].classList.remove("active");
        $(".singleList_delete .p2")[0].classList.remove("active");
        $(".singleList_delete .p3")[0].classList.add("active");
      }

      //--------------------------------------sort-------------------------
      else if (nextCommand[0].toUpperCase() == "BUBBLESORT") {
        $(".quickSort_")[0].classList.remove("active");
        $(".selectSort_")[0].classList.remove("active");
        $(".insertsort")[0].classList.remove("active");
        $(".bubbleSort_")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "QUICKSORT") {
        $(".quickSort_")[0].classList.add("active");
        $(".selectSort_")[0].classList.remove("active");
        $(".insertsort")[0].classList.remove("active");
        $(".bubbleSort_")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SELECTSORT") {
        $(".selectSort_")[0].classList.add("active");
        $(".insertsort")[0].classList.remove("active");
        $(".quickSort_")[0].classList.remove("active");
        $(".bubbleSort_")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "INSERTSORT") {
        $(".insertsort")[0].classList.add("active");
        $(".quickSort_")[0].classList.remove("active");
        $(".selectSort_")[0].classList.remove("active");
        $(".bubbleSort_")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SETSTEP1") {
        // $(".more-info .p1")[0].innerHTML = nextCommand[1];
        $(".insertsort .p1")[0].classList.add("active");
        $(".insertsort .p2")[0].classList.remove("active");
        $(".insertsort .p3")[0].classList.remove("active");
        $(".insertsort .p4")[0].classList.remove("active");

        $(".selectSort_ .p1")[0].classList.add("active");
        $(".selectSort_ .p2")[0].classList.remove("active");
        $(".selectSort_ .p3")[0].classList.remove("active");

        $(".quickSort_ .p1")[0].classList.add("active");
        $(".quickSort_ .p2")[0].classList.remove("active");
        $(".quickSort_ .p3")[0].classList.remove("active");
        $(".quickSort_ .p4")[0].classList.remove("active");

        $(".bubbleSort_ .p1")[0].classList.add("active");
        $(".bubbleSort_ .p2")[0].classList.remove("active");
        $(".bubbleSort_ .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SETSTEP2") {
        // $(".insertsort .p1")[0].innerHTML = nextCommand[1];
        $(".insertsort .p2")[0].classList.add("active");
        $(".insertsort .p1")[0].classList.remove("active");
        $(".insertsort .p3")[0].classList.remove("active");
        $(".insertsort .p4")[0].classList.remove("active");

        $(".selectSort_ .p2")[0].classList.add("active");
        $(".selectSort_ .p1")[0].classList.remove("active");
        $(".selectSort_ .p3")[0].classList.remove("active");

        $(".quickSort_ .p1")[0].classList.remove("active");
        $(".quickSort_ .p2")[0].classList.add("active");
        $(".quickSort_ .p3")[0].classList.remove("active");
        $(".quickSort_ .p4")[0].classList.remove("active");

        $(".bubbleSort_ .p1")[0].classList.remove("active");
        $(".bubbleSort_ .p2")[0].classList.add("active");
        $(".bubbleSort_ .p3")[0].classList.remove("active");
      } else if (nextCommand[0].toUpperCase() == "SETSTEP3") {
        // $(".insertsort .p1")[0].innerHTML = nextCommand[1];
        $(".insertsort .p3")[0].classList.add("active");
        $(".insertsort .p2")[0].classList.remove("active");
        $(".insertsort .p1")[0].classList.remove("active");
        $(".insertsort .p4")[0].classList.remove("active");

        // $(".insertsort .p1")[0].innerHTML = nextCommand[1];
        $(".selectSort_ .p3")[0].classList.add("active");
        $(".selectSort_ .p2")[0].classList.remove("active");
        $(".selectSort_ .p1")[0].classList.remove("active");

        $(".quickSort_ .p1")[0].classList.remove("active");
        $(".quickSort_ .p2")[0].classList.remove("active");
        $(".quickSort_ .p3")[0].classList.add("active");
        $(".quickSort_ .p4")[0].classList.remove("active");

        $(".bubbleSort_ .p1")[0].classList.remove("active");
        $(".bubbleSort_ .p2")[0].classList.remove("active");
        $(".bubbleSort_ .p3")[0].classList.add("active");
      } else if (nextCommand[0].toUpperCase() == "SETSTEP4") {
        // $(".insertsort .p1")[0].innerHTML = nextCommand[1];
        $(".insertsort .p3")[0].classList.remove("active");
        $(".insertsort .p2")[0].classList.remove("active");
        $(".insertsort .p1")[0].classList.remove("active");
        $(".insertsort .p4")[0].classList.add("active");

        // $(".insertsort .p1")[0].innerHTML = nextCommand[1];
        $(".selectSort_ .p3")[0].classList.remove("active");
        $(".selectSort_ .p2")[0].classList.remove("active");
        $(".selectSort_ .p1")[0].classList.remove("active");

        $(".quickSort_ .p1")[0].classList.remove("active");
        $(".quickSort_ .p2")[0].classList.remove("active");
        $(".quickSort_ .p3")[0].classList.remove("active");
        $(".quickSort_ .p4")[0].classList.add("active");
      }

      //sort--------------------------------------------------------
      else if (nextCommand[0].toUpperCase() == "SETLABEL") {
        this.objectManager.setLabel(parseInt(nextCommand[1]), nextCommand[2]);
      } else if (nextCommand[0].toUpperCase() == "SETFOREGROUNDCOLOR") {
        this.objectManager.setForegroundColor(
          parseInt(nextCommand[1]),
          nextCommand[2]
        );
      } else if (nextCommand[0].toUpperCase() == "SETBACKGROUNDCOLOR") {
        this.objectManager.setBackgroundColor(
          parseInt(nextCommand[1]),
          nextCommand[2]
        );
      } else if (nextCommand[0].toUpperCase() == "SETHIGHLIGHTCOLOR") {
        this.objectManager.setHighlightColor(
          parseInt(nextCommand[1]),
          nextCommand[2]
        );
      } else if (nextCommand[0].toUpperCase() == "SETHIGHLIGHT") {
        this.objectManager.setHighlight(
          parseInt(nextCommand[1]),
          parseBool(nextCommand[2])
        );
      } else if (nextCommand[0].toUpperCase() == "SETLINEHIGHLIGHT") {
        this.objectManager.setLineHighlight(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[2]),
          parseBool(nextCommand[3])
        );
      } else if (nextCommand[0].toUpperCase() == "DELETE") {
        this.objectManager.removeObject(parseInt(nextCommand[1]));
      } else if (nextCommand[0].toUpperCase() == "CONNECT") {
        if (nextCommand.length > 6) {
          this.objectManager.connectEdge(
            parseInt(nextCommand[1]),
            parseInt(nextCommand[2]),
            nextCommand[3],
            parseFloat(nextCommand[4]),
            parseBool(nextCommand[5]),
            nextCommand[6]
          );
        } else if (nextCommand.length > 5) {
          this.objectManager.connectEdge(
            parseInt(nextCommand[1]),
            parseInt(nextCommand[2]),
            nextCommand[3],
            parseFloat(nextCommand[4]),
            parseBool(nextCommand[5]),
            ""
          );
        } else if (nextCommand.length > 4) {
          this.objectManager.connectEdge(
            parseInt(nextCommand[1]),
            parseInt(nextCommand[2]),
            nextCommand[3],
            parseFloat(nextCommand[4]),
            parseBool("true"),
            ""
          );
        } else if (nextCommand.length > 3) {
          this.objectManager.connectEdge(
            parseInt(nextCommand[1]),
            parseInt(nextCommand[2]),
            nextCommand[3],
            parseFloat("0.0"),
            parseBool("true"),
            ""
          );
        }
      } else if (nextCommand[0].toUpperCase() == "DISCONNECT") {
        this.objectManager.disConnectEdge(
          parseInt(nextCommand[1]),
          parseInt(nextCommand[2])
        );
      } else if (nextCommand[0].toUpperCase() == "MOVE") {
        var objectID = parseInt(nextCommand[1]);
        var newAni = new SingleAnimation(
          objectID,
          parseInt(this.objectManager.getPositionX(objectID)),
          parseInt(this.objectManager.getPositionY(objectID)),
          parseInt(nextCommand[2]),
          parseInt(nextCommand[3])
        );
        this.currentBlock.push(newAni);
      } else if (nextCommand[0].toUpperCase() == "STEP") {
        foundBreak = true;
      }
      this.currentAnimation++;
    }
    this.currentFrame = 0;
  };

  this.update = function () {
    this.currentFrame++;

    for (var i = 0; i < this.currentBlock.length; i++) {
      if (this.currentFrame >= this.animationMaxFrame) {
        this.objectManager.setPosition(
          parseInt(this.currentBlock[i].objectID),
          parseInt(this.currentBlock[i].toX),
          parseInt(this.currentBlock[i].toY)
        );
      } else {
        var objectID = this.currentBlock[i].objectID;
        var fromX = this.currentBlock[i].fromX;
        var fromY = this.currentBlock[i].fromY;
        var toX = this.currentBlock[i].toX;
        var toY = this.currentBlock[i].toY;
        var rate = (1.0 * this.currentFrame) / this.animationMaxFrame;
        var nowX = fromX + (toX - fromX) * rate;
        var nowY = fromY + (toY - fromY) * rate;
        this.objectManager.setPosition(
          objectID,
          parseInt(nowX),
          parseInt(nowY)
        );
      }
    }

    if (this.currentFrame >= this.animationMaxFrame) {
      this.currentBlock = [];
      this.startNextBlock();
    }

    this.objectManager.framenum = this.currentFrame;
  };
}

function timeout() {
  timer = setTimeout("timeout()", timespan);
  animationManager.update();
  objectManager.draw();
}

function parseBool(value) {
  var retVal = !(value.toUpperCase() == "FALSE");
  return retVal;
}

var SingleAnimation = function (objectID, fromX, fromY, toX, toY) {
  this.objectID = objectID;
  this.fromX = fromX;
  this.fromY = fromY;
  this.toX = toX;
  this.toY = toY;
};

// set timespan
setAnimationSpeed = function (value) {
  // alert(timespan);
  // range of value [1, 100]
  value = parseInt(value);
  if (value >= 1 && value <= 100) {
    var min = 5;
    var max = 30;
    timespan = parseInt(((1.0 * (100 - value)) / 100) * (max - min) + min);
    // alert(timespan);
  }
};
