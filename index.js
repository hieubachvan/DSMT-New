var type = 0;
var index = 0;
$(function () {
  $(".nav").click(function () {
    type = $(this).index();
    $(this).addClass("selected");
    $(this).siblings().removeClass("selected");
  });

  $(".btn").click(function () {
    index = $(this).index();
    var name = $(this).attr("id");
    if (name.indexOf("Compare") != -1) {
      name = "compareSort";
    }
    if (name.indexOf("Search") != -1) {
      name = "search";
    }
    var current = $(this).parent(".buttonList").children().eq(index);
    $(current).css("background", "rgb(68, 68, 229)");
    $(current).siblings().css("background", "");
    var indexP = $(this).parents(".arithmeticList").index();
    $(this)
      .parents(".arithmeticList")
      .siblings(".arithmeticList")
      .children(".buttonList")
      .children()
      .css("background", "");
    var items = document.getElementsByTagName("a");
    items[indexP].href = name + ".html";
    // alert(items[indexP].href);
  });

  //鼠标放上去代码
  $(".length")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".init")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".serialNumber")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".insertNumber")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".insertGo")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".deleteNumber")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".deleteGo")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subS1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subS2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subS3")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subT1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subT2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subU1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subU2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subU3")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subX1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subX2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subX3")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subX4")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subC1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subC2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subV1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subV2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subW1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subW2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subW3")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subY1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subY2")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subY3")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subA1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subD1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subH1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".subB1")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".singleStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".stackStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".queueStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".graphDFSStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".primStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".kruStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".dijStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".compareSortStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".radixSortStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".patternStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".searchStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".avlTreeStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".heapStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".bstTreeStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".BT2TStarts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  //代码行鼠标放上去边色函数
  $(".codes p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "rgb(62, 62, 228)");
    });

  //算法状态行
  var stateFlag = 1;
  $(".stateHide").click(function () {
    if (stateFlag == 0) {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".state").show()', 100);
      $(".state").animate(
        {
          width: "350px",
        },
        300
      );
      stateFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".state").hide()', 100);
      $(".state").animate(
        {
          width: "0px",
        },
        100
      );
      stateFlag = 0;
    }
  });
  //----------------------------------------------
  var infoFlag = 0;
  $(".toggle-info").click(function () {
    if (infoFlag == 0) {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".more-info").show()', 100);
      $(".more-info").animate(
        {
          width: "350px",
        },
        300
      );
      infoFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".more-info").hide()', 100);
      $(".more-info").animate(
        {
          width: "0px",
        },
        100
      );
      infoFlag = 0;
    }
  });
  //---------------------------------
  //算法代码行
  var codeFlag = 0;
  $(".codeHide").click(function () {
    if (codeFlag == 0) {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".codes").show()', 100);
      $(".codes").animate(
        {
          width: "350px",
        },
        200
      );
      codeFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".codes").hide()', 100);
      $(".codes").animate(
        {
          width: "0px",
        },
        200
      );
      codeFlag = 0;
    }
  });

  //------------------------------------------------------------------------------
  //线性表
  var startFlag = 0;
  $(".startHide").click(function () {
    if (startFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".starts").show()', 100);
      $(".starts").animate(
        {
          width: "140px",
        },
        200
      );
      startFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".starts").hide()', 100);
      $(".subR1").hide();
      $(".subR2").hide();
      $(".subR3").hide();
      $(".starts").animate(
        {
          width: "0px",
        },
        200
      );
      startFlag = 0;
    }
  });

  $(".starts p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "#2F4F4F");
    });

  $(".starts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subR" + i).hide();
      } else {
        $(".subR" + s).show();
        $(".length span,input").show();
        $(".init p").show();
        $(".init").animate(
          {
            width: "80px",
          },
          10
        );

        $(".length").animate(
          {
            width: "200px",
          },
          10
        );
      }
    }
  });

  $(".codes p")
    .mouseenter(function () {
      $(this).css("background", "black");
    })
    .mouseleave(function () {
      $(this).css("background", "rgb(62, 62, 228)");
    });

  //顺序表创建数组
  $(".init p").click(function () {
    stateFlag = 0;
    $(".stateHide img").click();
    var dataLength = $(".inputLength").val();
    if (dataLength != "") {
      currentOrderList.initCallBack(dataLength);
    }
    $(".inputLength").attr("value", "");
    $(this).hide();
    $(".init").animate(
      {
        width: "0",
      },
      10
    );
    $(".length span,input").hide();
    $(".length").animate(
      {
        width: "0",
      },
      10
    );
  });
  //顺序表插入数据
  $(".insertGo p").click(function () {
    var serialNumber = $(".inputNumber").val();
    var arrayData = $(".inputInsertNumber").val();
    if (serialNumber != "" && arrayData != "") {
      currentOrderList.insertCallBack(serialNumber, arrayData);
    }
  });
  //顺序表删除数据
  $(".deleteGo p").click(function () {
    var deleteNumber = $(".inputDeleteNumber").val();
    if (deleteNumber != "") {
      currentOrderList.deleteCallBack(deleteNumber);
    }
  });

  //栈代码
  var stackStartFlag = 0;
  $(".startHide").click(function () {
    if (stackStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".stackStarts").show()', 100);
      $(".stackStarts").animate(
        {
          width: "195px",
        },
        200
      );
      stackStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".stackStarts").hide()', 100);
      $(".subS1").hide();
      $(".subS2").hide();
      $(".subS3").hide();
      $(".stackStarts").animate(
        {
          width: "0px",
        },
        200
      );
      stackStartFlag = 0;
    }
  });

  $(".stackStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subS" + i).hide();
      } else {
        $(".subS" + s).show();
        $(".stackLength span,input").show();
        $(".stackInit p").show();
        $(".stackInit").animate(
          {
            width: "100px",
          },
          10
        );

        $(".stackLength").animate(
          {
            width: "200px",
          },
          10
        );
      }
    }
  });
  //栈数组初始化
  $(".stackInit").click(function () {
    var length = $(".InputLength").val();
    if (length != "") {
      currentStack.initCallBack(length);
    } else {
    }
    $(".InputLength").val(" ");
  });
  //入栈操作
  $(".insertStack").click(function () {
    var number = $(".stackInputNumber").val();
    if (number != "") {
      currentStack.pushCallBack(number);
    } else {
    }
    $(".stackInputNumber").val(" ");
  });
  //出栈操作
  $(".outStack").click(function () {
    currentStack.popCallBack();
  });

  //单链表代码
  var singleStartFlag = 0;
  $(".singleStartHide").click(function () {
    if (singleStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".singleStarts").show()', 100);
      $(".singleStarts").animate(
        {
          width: "140px",
        },
        200
      );
      singleStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".singleStarts").hide()', 100);
      $(".subT1").hide();
      $(".subT2").hide();
      $(".singleStarts").animate(
        {
          width: "0px",
        },
        200
      );
      singleStartFlag = 0;
    }
  });

  $(".singleStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subT" + i).hide();
      } else {
        $(".subT" + s).show();
        $(".singleLength span,input").show();
        $(".singleInit p").show();
        $(".singleInit").animate(
          {
            width: "80px",
          },
          10
        );

        $(".singleLength").animate(
          {
            width: "200px",
          },
          10
        );
      }
    }
  });
  //单链表插入数据
  $(".singleInsert").click(function () {
    var serial = $(".singleSerial").val();
    var number = $(".singleInputNumber").val();
    if (serial != "" && number != "") {
      currentLinkList.insertCallBack(serial, number);
    } else {
    }
  });
  //单链表删除数据
  $(".singleDelete").click(function () {
    var serial = $(".singleDelNumber").val();
    if (serial != "") {
      currentLinkList.deleteCallBack(serial);
    } else {
    }
  });

  //队列代码
  var queueStartFlag = 0;
  $(".startHide").click(function () {
    if (queueStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".queueStarts").show()', 100);
      $(".queueStarts").animate(
        {
          width: "140px",
        },
        200
      );
      queueStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".queueStarts").hide()', 100);
      $(".subU1").hide();
      $(".subU2").hide();
      $(".subU3").hide();
      $(".queueStarts").animate(
        {
          width: "0px",
        },
        200
      );
      queueStartFlag = 0;
    }
  });

  $(".queueStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subU" + i).hide();
      } else {
        $(".subU" + s).show();
        // $('.queueLength span,input').show()
        // $('.queueInit p').show();
        // $('.queueInit').animate({
        //      'width':'80px'
        // },10);

        // $('.queueLength').animate({
        //      'width':'200px'
        // },10);
      }
    }
  });
  //队列数组初始化
  $(".queueInit").click(function () {
    var length = $(".qInputLength").val();
    if (length != "") {
      currentQueue.initCallBack(length);
    } else {
    }
    $(".InputLength").val(" ");
  });
  //入队操作
  $(".insertQueue").click(function () {
    var number = $(".queueInputNumber").val();
    if (number != "") {
      currentQueue.pushCallBack(number);
    } else {
    }
    $(".queueInputNumber").val(" ");
  });
  //出队操作
  $(".outQueue").click(function () {
    currentQueue.popCallBack();
  });

  //链式队列代码
  var linkedQueueStartFlag = 0;
  $(".linkedQueueStartHide").click(function () {
    if (linkedQueueStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".linkedQueueStarts").show()', 100);
      $(".linkedQueueStarts").animate(
        {
          width: "140px",
        },
        200
      );
      linkedQueueStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".linkedQueueStarts").hide()', 100);
      $(".subLU1").hide();
      $(".subLU2").hide();
      $(".subLU3").hide();
      $(".linkedQueueStarts").animate(
        {
          width: "0px",
        },
        200
      );
      linkedQueueStartFlag = 0;
    }
  });

  $(".linkedQueueStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subLU" + i).hide();
      } else {
        $(".subLU" + s).show();
      }
    }
  });
  //链式队列数组初始化
  $(".linkedQueueInit").click(function () {
    var length = $(".qInputLength").val();
    if (length != "") {
      // alert(length);
      currentLinkedQueue.initCallBack(length);
    } else {
    }
    $(".qInputLength").val("");
  });
  //链式队列入队操作
  $(".insertLinkedQueue").click(function () {
    var number = $(".queueInputNumber").val();
    if (number != "") {
      currentLinkedQueue.pushCallBack(number);
    } else {
    }
    $(".queueInputNumber").val(" ");
  });
  //链式队列出队操作
  $(".outLinkedQueue").click(function () {
    currentLinkedQueue.popCallBack();
  });

  //阶乘
  var factStartFlag = 0;
  $(".factStartHide").click(function () {
    if (factStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".factStarts").show()', 100);
      $(".factStarts").animate(
        {
          width: "140px",
        },
        200
      );
      factStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".factStarts").hide()', 100);
      $(".subFT1").hide();
      $(".factStarts").animate(
        {
          width: "0px",
        },
        200
      );
      factStartFlag = 0;
    }
  });
  $(".factStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subFT" + i).hide();
      } else {
        $(".subFT" + s).show();
      }
    }
  });
  //计算
  $(".factCal").click(function () {
    var factNum = $(".factNumber").val();
    if (factNum) {
      // alert(factNum);
      // console.log(currentFactorial);
      currentFactorial.factorialCallBack(factNum);
      $(".factNumber").val("");
    }
  });

  //--------------------------------------------------------------------------------
  //图部分
  //DFS遍历

  var graphStartFlag = 0;
  $(".graphStartHide").click(function () {
    if (graphStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".graphDFSStarts").show()', 100);
      $(".graphDFSStarts").animate(
        {
          width: "140px",
        },
        200
      );
      graphStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".graphDFSStarts").hide()', 100);
      $(".subX1").hide();
      $(".subX2").hide();
      $(".subX3").hide();
      $(".subX4").hide();
      $(".graphDFSStarts").animate(
        {
          width: "0px",
        },
        200
      );
      graphStartFlag = 0;
    }
  });

  $(".graphDFSStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subX" + i).hide();
      } else {
        $(".subX" + s).show();
      }
    }
  });

  //生成随机图
  $(".createGraph").click(function () {
    var peakNumber = parseInt($(".peakNumber").val());
    if (!isNaN(peakNumber)) {
      vertexNumSelectChangeCallBack(peakNumber);
      randomGraphCallBack();
    } else {
      randomGraphCallBack();
    }
    // $('.peakNumber').val('');
  });

  //加边
  $(".addEdge").click(function () {
    var startNumber = parseInt($(".startNumber").val());
    var endNumber = parseInt($(".endNumber").val());
    var weight = parseInt($(".weightNumber").val());
    // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      addEdgeCallBack(startNumber, endNumber, weight);
    }
    // $('.startNumber').val('');
    // $('.endNumber').val('');
  });
  //删边
  $(".deleteEdge").click(function () {
    var startNumber = parseInt($(".startNumber").val());
    var endNumber = parseInt($(".endNumber").val());
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      delEdgeCallBack(startNumber, endNumber);
    }
    // $('.startNumber').val('');
    // $('.endNumber').val('');
  });
  //run DFS
  $(".DFS").click(function () {
    var runNumber = parseInt($(".runNumber").val());
    runDFSCallBack(runNumber);
    // $('.runNumber').val('');
  });
  //run BFS
  $(".BFS").click(function () {
    var runNumber = parseInt($(".runNumber").val());
    runBFSCallBack(runNumber);
    // $('.runNumber').val('');
  });
  //配置选项
  // 显示边权重
  $("#displayWeight").click(function () {
    showEdgeWeightSwitch($("#displayWeight")[0].checked);
  });
  //选中有向图
  $(".radio1").click(function () {
    directedGraphSwitch(true);
  });
  //选中无向图
  $(".radio2").click(function () {
    directedGraphSwitch(false);
  });
  // $("#displayWeight:checked").bind(function(){
  //     alert('displayWeight checked');
  // });
  // $("#displayWeight").checked.bind(function(){
  //     alert('displayWeight checked');
  // });
  //prim
  var primStartFlag = 0;
  $(".primStartHide").click(function () {
    if (primStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".primStarts").show()', 100);
      $(".primStarts").animate(
        {
          width: "140px",
        },
        200
      );
      primStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".primStarts").hide()', 100);
      $(".subX1").hide();
      $(".subX2").hide();
      $(".subX3").hide();
      $(".primStarts").animate(
        {
          width: "0px",
        },
        200
      );
      primStartFlag = 0;
    }
  });

  $(".primStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subX" + i).hide();
      } else {
        $(".subX" + s).show();
      }
    }
  });

  //生成随机图
  $(".createPrimGraph").click(function () {
    var peakNumber = parseInt($(".peakPrimNumber").val());
    if (!isNaN(peakNumber)) {
      vertexNumSelectChangeCallBack(peakNumber);
      randomGraphCallBack();
    } else {
      randomGraphCallBack();
    }
    $(".peakPrimNumber").val("");
  });

  //加边
  $(".addPrimEdge").click(function () {
    var startNumber = parseInt($(".startPrimNumber").val());
    var endNumber = parseInt($(".endPrimNumber").val());
    var weight = parseInt($(".weightPrimNumber").val());
    // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      addEdgeCallBack(startNumber, endNumber, weight);
    }
    $(".startPrimNumber").val("");
    $(".endPrimNumber").val("");
  });
  //删边
  $(".deletePrimEdge").click(function () {
    var startNumber = parseInt($(".startPrimNumber").val());
    var endNumber = parseInt($(".endPrimNumber").val());
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      delEdgeCallBack(startNumber, endNumber);
    }
    $(".startPrimNumber").val("");
    $(".endprimNumber").val("");
  });
  //run prim
  $(".Prim").click(function () {
    var runNumber = parseInt($(".runPrimNumber").val());
    runPrimCallBack(runNumber);
    // $('.runPrimNumber').val('');
  });

  //kruskal算法
  var kruStartFlag = 0;
  $(".kruStartHide").click(function () {
    if (kruStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".kruStarts").show()', 100);
      $(".kruStarts").animate(
        {
          width: "140px",
        },
        200
      );
      kruStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".kruStarts").hide()', 100);
      $(".subX1").hide();
      $(".subX2").hide();
      $(".subX3").hide();
      $(".kruStarts").animate(
        {
          width: "0px",
        },
        200
      );
      kruStartFlag = 0;
    }
  });

  $(".kruStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subX" + i).hide();
      } else {
        $(".subX" + s).show();
      }
    }
  });

  //生成随机图
  $(".createKruGraph").click(function () {
    var peakNumber = parseInt($(".peakKruNumber").val());
    if (!isNaN(peakNumber)) {
      vertexNumSelectChangeCallBack(peakNumber);
      randomGraphCallBack();
    } else {
      randomGraphCallBack();
    }
    $(".peakKruNumber").val("");
  });

  //加边
  $(".addKruEdge").click(function () {
    var startNumber = parseInt($(".startKruNumber").val());
    var endNumber = parseInt($(".endKruNumber").val());
    var weight = parseInt($(".weightKruNumber").val());
    // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      addEdgeCallBack(startNumber, endNumber, weight);
    }
    $(".startKruNumber").val("");
    $(".endKruNumber").val("");
  });
  //删边
  $(".deleteKruEdge").click(function () {
    var startNumber = parseInt($(".startKruNumber").val());
    var endNumber = parseInt($(".endKruNumber").val());
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      delEdgeCallBack(startNumber, endNumber);
    }
    $(".startKruNumber").val("");
    $(".endKruNumber").val("");
  });
  //run Kruskal
  $(".Kruskal").click(function () {
    // var runNumber=parseInt($('.runKruNumber').val());
    runKruskalCallBack();
    // $('.runKruNumber').val('');
  });

  //Dijkstra
  var dijStartFlag = 0;
  $(".dijStartHide").click(function () {
    if (dijStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".dijStarts").show()', 100);
      $(".dijStarts").animate(
        {
          width: "140px",
        },
        200
      );
      dijStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".dijStarts").hide()', 100);
      $(".subX1").hide();
      $(".subX2").hide();
      $(".subX3").hide();
      $(".subX4").hide();
      $(".dijStarts").animate(
        {
          width: "0px",
        },
        200
      );
      dijStartFlag = 0;
    }
  });

  $(".dijStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];

    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subX" + i).hide();
      } else {
        $(".subX" + s).show();
      }
    }
  });

  //生成随机图
  $(".createDijGraph").click(function () {
    var peakNumber = parseInt($(".peakDijNumber").val());
    if (!isNaN(peakNumber)) {
      vertexNumSelectChangeCallBack(peakNumber);
      randomGraphCallBack();
    } else {
      randomGraphCallBack();
    }
    $(".peakDijNumber").val("");
  });

  //加边
  $(".addDijEdge").click(function () {
    var startNumber = parseInt($(".startDijNumber").val());
    var endNumber = parseInt($(".endDijNumber").val());
    var weight = parseInt($(".weightDijNumber").val());
    // alert('st:'+startNumber +' en:'+endNumber+' we:'+ weight);
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      addEdgeCallBack(startNumber, endNumber, weight);
    }
    $(".startDijNumber").val("");
    $(".endDijNumber").val("");
  });
  //删边
  $(".deleteDijEdge").click(function () {
    var startNumber = parseInt($(".startDijNumber").val());
    var endNumber = parseInt($(".endDijNumber").val());
    if (!isNaN(startNumber) && !isNaN(endNumber)) {
      delEdgeCallBack(startNumber, endNumber);
    }
    $(".startDijNumber").val("");
    $(".endDijNumber").val("");
  });
  //run Dijkstra
  $(".Dijkstra").click(function () {
    var runNumber = parseInt($(".runDijNumber").val());
    runDijkstraCallBack(runNumber);
    // $('.runDijNumber').val('');
  });
  // run Floyd
  $(".Floyd").click(function () {
    runFloydCallBack();
  });

  //--------------------------------------------------------------------------------
  // 排序部分

  //比较排序
  var sortStartFlag = 0;
  $(".sortStartHide").click(function () {
    if (sortStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".compareSortStarts").show()', 100);
      $(".compareSortStarts").animate(
        {
          width: "140px",
        },
        200
      );
      sortStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".compareSortStarts").hide()', 100);
      $(".subC1").hide();
      $(".subC2").hide();
      $(".compareSortStarts").animate(
        {
          width: "0px",
        },
        200
      );
      sortStartFlag = 0;
    }
  });
  $(".compareSortStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subC" + i).hide();
      } else {
        $(".subC" + s).show();
      }
    }
  });
  //生成排序数组
  $(".createArray").click(function () {
    var length = $(".sortArrayLength").val();
    if (!isNaN(length)) {
      currentSort.initCallBack(length);
    }
  });

  //执行插入排序
  $(".insertSort").click(function () {
    currentSort.insertSortCallBack();
  });
  //执行选择排序
  $(".selectSort").click(function () {
    currentSort.selectSortCallBack();
  });
  //执行冒泡排序
  $(".bubbleSort").click(function () {
    currentSort.bubbleSortCallBack();
  });
  //执行希尔排序
  $(".shellSort").click(function () {
    currentSort.shellSortCallBack();
  });
  //执行快速排序
  $(".quickSort").click(function () {
    currentSort.quickSortCallBack();
  });
  //执行归并排序
  $(".mergeSort").click(function () {
    currentSort.mergeSortCallBack();
  });

  //基数排序
  var radixSortStartFlag = 0;
  $(".sortStartHide").click(function () {
    if (radixSortStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".radixSortStarts").show()', 100);
      $(".radixSortStarts").animate(
        {
          width: "140px",
        },
        200
      );
      radixSortStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".radixSortStarts").hide()', 100);
      $(".subV1").hide();
      $(".subV2").hide();
      $(".radixSortStarts").animate(
        {
          width: "0px",
        },
        200
      );
      radixSortStartFlag = 0;
    }
  });
  $(".radixSortStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subV" + i).hide();
      } else {
        $(".subV" + s).show();
      }
    }
  });
  //生成排序数组
  $(".createRadixArray").click(function () {
    var length = $(".sortArrayLength").val();
    if (!isNaN(length)) {
      currentSort.initCallBack(length);
    }
  });
  //执行基数排序
  $(".radixSort").click(function () {
    currentSort.radixSortCallBack();
  });

  // <!-----------------------------新加的代码------------------------>
  ///堆排序
  var heapSortStartFlag = 0;
  $(".sortStartHide").click(function () {
    if (heapSortStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".heapSortStarts").show()', 100);
      $(".heapSortStarts").animate(
        {
          width: "140px",
        },
        200
      );
      heapSortStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".heapSortStarts").hide()', 100);
      $(".subHS1").hide();
      $(".subHS2").hide();
      $(".heapSortStarts").animate(
        {
          width: "0px",
        },
        200
      );
      heapSortStartFlag = 0;
    }
  });
  $(".heapSortStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subHS" + i).hide();
      } else {
        $(".subHS" + s).show();
      }
    }
  });
  //生成排序数组
  $(".createHeapArray").click(function () {
    var length = $(".sortArrayLength").val();
    if (!isNaN(length)) {
      // alert(length);
      currentSort.initCallBack(length);
    }
  });
  //执行堆排序
  $(".heapSort").click(function () {
    currentSort.HeapSortCallBack();
  });

  //-------------------------------------------------------------------------------
  //字符串
  //模式匹配
  var patternStartFlag = 0;
  $(".patternStartHide").click(function () {
    if (patternStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".patternStarts").show()', 100);
      $(".patternStarts").animate(
        {
          width: "140px",
        },
        200
      );
      patternStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".patternStarts").hide()', 100);
      $(".subW1").hide();
      $(".subW2").hide();
      $(".subW3").hide();
      $(".patternStarts").animate(
        {
          width: "0px",
        },
        200
      );
      patternStartFlag = 0;
    }
  });
  $(".patternStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subW" + i).hide();
      } else {
        $(".subW" + s).show();
      }
    }
  });
  //生成模式串
  $(".createPattern").click(function () {
    var str = $(".patternString_de").val();
    if (str) {
      currentPatternMatch.patternCallBack(str);
    } else {
      alert("请输入模式串");
    }
  });
  //生成目标串
  $(".createTarget").click(function () {
    var str = $(".targetString_de").val();
    if (str) {
      currentPatternMatch.targetCallBack(str);
    } else {
      alert("请输入目标串");
    }
  });
  //KMP匹配
  $(".match").click(function () {
    currentPatternMatch.KMPmatchCallBack();
  });
  //模式串与目标串开始匹配
  $(".matchStart").click(function () {
    currentPatternMatch.matchCallBack();
  });

  //查找
  var searchStartFlag = 0;
  $(".searchStartHide").click(function () {
    if (searchStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".searchStarts").show()', 100);
      $(".searchStarts").animate(
        {
          width: "140px",
        },
        200
      );
      searchStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".searchStarts").hide()', 100);
      $(".subY1").hide();
      $(".subY2").hide();
      $(".subY3").hide();
      $(".searchStarts").animate(
        {
          width: "0px",
        },
        200
      );
      searchStartFlag = 0;
    }
  });
  $(".searchStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subY" + i).hide();
      } else {
        $(".subY" + s).show();
      }
    }
  });
  //设置数组大小
  $(".setSize").click(function () {
    var size = $(".arraySize").val();
    if (!isNaN(size)) {
      currentSearch.initMaxSizeCallBack(size);
    }
  });
  //设置数组内容
  $(".createSearchArray").click(function () {
    var content = $(".contentDetail").val();
    if (content) {
      currentSearch.initArrayCallBack(content);
    }
  });
  //二分查找
  $(".binarySearch").click(function () {
    var toSearch = $(".whichOne").val();
    if (toSearch) {
      currentSearch.binarySearchCallBack(toSearch);
    }
  });
  //顺序查找
  $(".sequentialSearch").click(function () {
    var toSearch = $(".whichOne").val();
    if (toSearch) {
      currentSearch.linearSearchCallBack(toSearch);
    }
  });

  //------------------------------------------树-----------------------------------
  //AVL树
  var avlStartFlag = 0;
  $(".treeStartHide").click(function () {
    if (avlStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".avlTreeStarts").show()', 100);
      $(".avlTreeStarts").animate(
        {
          width: "140px",
        },
        200
      );
      avlStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".avlTreeStarts").hide()', 100);
      $(".subA1").hide();
      $(".avlTreeStarts").animate(
        {
          width: "0px",
        },
        200
      );
      avlStartFlag = 0;
    }
  });
  $(".avlTreeStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subA" + i).hide();
      } else {
        $(".subA" + s).show();
      }
    }
  });
  //插入
  /*$('.avlAction').click(function(){
        var avlNum=$('.avlNumber').val();
        if(avlNum){
            currentAVLTree.insertCallBack(avlNum);
            $('.avlNumber').val('');
        }
    });
	*/
  // 随机生成
  $(".avlAction").click(function () {
    init();
    currentAVLTree.randomAVLCallBack();
  });
  // 随机删除
  $(".avlDelete").click(function () {
    init();
    currentAVLTree.deleteAVLCallBack();
  });

  //堆
  var heapStartFlag = 0;
  $(".treeStartHide").click(function () {
    if (heapStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".heapStarts").show()', 100);
      $(".heapStarts").animate(
        {
          width: "140px",
        },
        200
      );
      heapStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".heapStarts").hide()', 100);
      $(".subH1").hide();
      $(".heapStarts").animate(
        {
          width: "0px",
        },
        200
      );
      heapStartFlag = 0;
    }
  });
  $(".heapStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subH" + i).hide();
      } else {
        $(".subH" + s).show();
      }
    }
  });
  //插入
  $(".heapInsert").click(function () {
    var heapNum = $(".heapNumber").val();
    if (heapNum) {
      currentHeap.insertCallBack(heapNum);
      $(".heapNumber").val("");
    }
  });
  //删除
  $(".heapDelete").click(function () {
    var heapNum = $(".heapNumber").val();
    if (heapNum) {
      currentHeap.deleteCallBack(heapNum);
      $(".heapNumber").val("");
    }
  });

  //线索二叉树
  var bstTreeStartFlag = 0;
  $(".treeStartHide").click(function () {
    if (bstTreeStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".bstTreeStarts").show()', 100);
      $(".bstTreeStarts").animate(
        {
          width: "140px",
        },
        200
      );
      bstTreeStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".bstTreeStarts").hide()', 100);
      $(".subB1").hide();
      $(".bstTreeStarts").animate(
        {
          width: "0px",
        },
        200
      );
      bstTreeStartFlag = 0;
    }
  });
  $(".bstTreeStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 4; i++) {
      if (i != s) {
        $(".subB" + i).hide();
      } else {
        $(".subB" + s).show();
      }
    }
  });
  //插入
  $(".bstTreeInsert").click(function () {
    var bstTreeNum = $(".bstTreeNumber").val();
    if (bstTreeNum) {
      currentBST.insertCallBack(bstTreeNum);
      $(".bstTreeNumber").val("");
    }
  });
  //查找
  $(".bstTreeSearch").click(function () {
    var bstTreeNum = $(".bstTreeNumber").val();
    if (bstTreeNum) {
      currentBST.searchCallBack(bstTreeNum);
      $(".bstTreeNumber").val("");
    }
  });
  //删除
  $(".bstTreeDelete").click(function () {
    var bstTreeNum = $(".bstTreeNumber").val();
    if (bstTreeNum) {
      currentBST.deleteCallBack(bstTreeNum);
      $(".bstTreeNumber").val("");
    }
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //树和森林的转换
  var BT2TStartFlag = 0;
  $(".treeBT2TStartHide").click(function () {
    if (BT2TStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".BT2TStarts").show()', 100);
      $(".BT2TStarts").animate(
        {
          width: "140px",
        },
        200
      );
      BT2TStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".BT2TStarts").hide()', 100);
      $(".subD1").hide();
      $(".BT2TStarts").animate(
        {
          width: "0px",
        },
        200
      );
      BT2TStartFlag = 0;
    }
  });
  $(".BT2TStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subD" + i).hide();
      } else {
        $(".subD" + s).show();
      }
    }
  });
  var actionFlag = 0;
  //选择btree或者tree
  $("#treeStyle").change(function () {
    var treeStyle = $(this).val();
    if (treeStyle == "bTree") {
      $("#zuoyou").removeAttr("disabled");
      $(".BCreateLine").find("p").css("color", "#fff");
      actionFlag = 0;
    } else {
      $("#zuoyou").attr("disabled", "true");
      $(".BCreateLine").find("p").css("color", "graytext");
      actionFlag = 1;
    }
    currentBT2T.selectStyleButtonCallBack(treeStyle);
  });
  var canInsert = 1;
  //生成边
  $(".BCreateLine").click(function () {
    var parentNode = $(".parentNodeDetail").val();
    var nodePosition = $("#zuoyou").val();
    var childNode = $(".childNodeDetail").val();
    if (actionFlag == 0 && canInsert == 1) {
      currentBT2T.createButtonCallBack(parentNode, nodePosition, childNode);
    } else {
      alert("不能生成边");
    }
  });
  //转换
  $(".transformP").click(function () {
    currentBT2T.changeButtonCallBack();
    canAutoPlay = 0;
    //alert("Inner function1 canAutoPlay" + canAutoPlay);
  });
  //刷新
  var canAutoPlay = 1;
  $(".updateP").click(function () {
    currentBT2T.newButtonCallBack();
  });
  //自动演示
  /*$('#autoBT2T').click(function(){
		//alert("Inner function2 canAutoPlay" + canAutoPlay);
		if(canAutoPlay == 1){
        	currentBT2T.autoBTreeToTree();
			canInsert = 0;
            canAutoPlay = 0;
		}
		else{
			// alert("请刷新");
            init();
            currentBT2T.autoBTreeToTree();
		}
    });*/

  // 自动演示
  $(".BT2TAction").click(function () {
    init();
    currentBT2T.autoBTreeToTree();
    currentBT2T.changeButtonCallBack("bTree");
  });

  $(".T2BTAction").click(function () {
    init();
    currentBT2T.createConstTreeCallBack(0);
    currentBT2T.changeButtonCallBack("Tree");
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //霍夫曼树
  var HuffmanStartFlag = 0;
  $(".HuffmanStartHide").click(function () {
    if (HuffmanStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".HuffmanStarts").show()', 100);
      $(".HuffmanStarts").animate(
        {
          width: "140px",
        },
        200
      );
      HuffmanStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".HuffmanStarts").hide()', 100);
      $(".subE1").hide();
      $(".HuffmanStarts").animate(
        {
          width: "0px",
        },
        200
      );
      HuffmanStartFlag = 0;
    }
  });
  $(".HuffmanStarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subE" + i).hide();
      } else {
        $(".subE" + s).show();
      }
    }
  });
  var canAuto = 1;
  var canInsert = 1;
  //建立Huffman树
  $(".createHuffman").click(function () {
    var inputText = $(".inputText").val();
    if (inputText && canInsert == 1) {
      currentHuffman.createButtonCallBack(inputText);
      canAuto = 0;
    } else {
      alert("请刷新");
    }
  });
  //自动演示
  $("#autoHuffman").click(function () {
    if (canAuto == 1) {
      currentHuffman.autoCreateHuffmanTree();
      canInsert = 0;
      canAuto = 0;
    } else {
      // alert("请刷新");
      init();
      currentHuffman.autoCreateHuffmanTree();
    }
  });

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //线索二叉树
  var ThrdBtreeStartFlag = 0;
  $(".ThrdBtreestartHide").click(function () {
    if (ThrdBtreeStartFlag == 0) {
      $(this).children().css("transform", "rotate(180deg)");
      setTimeout('$(".ThrdBtreestarts").show()', 100);
      $(".ThrdBtreestarts").animate(
        {
          width: "140px",
        },
        200
      );
      ThrdBtreeStartFlag = 1;
    } else {
      $(this).children().css("transform", "rotate(360deg)");
      setTimeout('$(".ThrdBtreestarts").hide()', 100);
      $(".subF1").hide();
      $(".ThrdBtreestarts").animate(
        {
          width: "0px",
        },
        200
      );
      ThrdBtreeStartFlag = 0;
    }
  });
  $(".ThrdBtreestarts p").click(function () {
    var str = $(this).attr("class");
    var s = str[str.length - 1];
    for (var i = 1; i < 5; i++) {
      if (i != s) {
        $(".subF" + i).hide();
      } else {
        $(".subF" + s).show();
      }
    }
  });
  var canThrd = 1;
  //生成边
  $(".ThrdBtreeCreateLine").click(function () {
    var parentNode = $(".parentNodeDetail").val();
    var nodePosition = $("#ThrdBtreezuoyou").val();
    var childNode = $(".childNodeDetail").val();
    if (canThrd == 1) {
      currentThrdBTree.createButtonCallBack(
        parentNode,
        nodePosition,
        childNode
      );
    } else {
      alert("请刷新");
    }
  });
  //加入线索
  var canAuto = 1;
  $(".addThrd").click(function () {
    currentThrdBTree.changeButtonCallBack();
    canAuto = 0;
  });
  //刷新
  $(".ThrdUpdate").click(function () {
    currentThrdBTree.newButtonCallBack();
  });
  //自动演示
  $("#autoThrdTree").click(function () {
    //currentThrdBTree.newButtonCallBack();
    if (canAuto == 1) {
      currentThrdBTree.autoThrdBTree();
      canThrd = 0;
      canAuto = 0;
    } else {
      // alert("请刷新");
      init();
      currentThrdBTree.autoThrdBTree();
    }
  });
});
function ini() {
  var url = document.location.search;
  index = url[1];
  type = index;
  $(".navList").children().eq(type).addClass("selected");
  $(".navList").children().eq(type).siblings().removeClass("selected");
}
function back() {
  window.location.href = "index.html";
}
function enterFun(obj) {
  $(obj).css("background", "black");
}
function leaveFun(obj) {
  $(obj).css("background", "#2F4F4F");
}
