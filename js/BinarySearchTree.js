// JavaScript Document

var currentBST;

function init() {
  objectManager = new ObjectManager();
  animationManager = new AnimationManager(objectManager);
  currentBST = new BinarySearchTree(
    animationManager,
    drawing.width,
    drawing.height
  );
}

var BinarySearchTree = function (animManager, width, height) {
  this.init(animManager, width, height);
  // this.initControls() ;
  this.initAttributes();
};

BinarySearchTree.prototype = new Algorithm();
BinarySearchTree.prototype.constructor = BinarySearchTree;

BinarySearchTree.prototype.initControls = function () {
  addLabelToAlgorithmBar("Node value");
  this.insertField = addInputToAlgorithmBar("text", "");
  this.insertButton = addInputToAlgorithmBar("button", "Insert node");
  this.insertButton.onclick = this.insertCallBack.bind(this);
  this.searchButton = addInputToAlgorithmBar("button", "Find node");
  this.searchButton.onclick = this.searchCallBack.bind(this);
  this.deleteButton = addInputToAlgorithmBar("button", "Delete node");
  this.deleteButton.onclick = this.deleteCallBack.bind(this);
  this.dfsButton = addInputToAlgorithmBar("button", "Deep search");
  this.dfsButton.onclick = this.DFSCallBack.bind(this);
  this.bfsButton = addInputToAlgorithmBar("button", "Breadth search");
  this.bfsButton.onclick = this.BFSCallBack.bind(this);
};

BinarySearchTree.prototype.initAttributes = function () {
  this.root = null;

  this.objectID = 1;
  this.radius = 15;
  this.intervalX = 140;
  this.intervalY = 50;
  this.foregroundColor = "#000000";
  this.backgroundColor = "#FFF";
  this.tomato = "#FF6347";
  this.palegreen = "#2f4f4f";
  this.startX = 300;
  this.startY = 150;
  this.startRootX = 600;
  this.array = [];

  // this.implementAction(this.initStateBox.bind(this), "start");
};

BinarySearchTree.prototype.initStateBox = function (state) {
  {
    this.cmd("CreateStateBox", 0, state, 20, 20, 400, 40);
    this.cmd("SetForegroundColor", 0, this.foregroundColor);
    this.cmd("SetBackgroundColor", 0, this.backgroundColor);
    this.cmd("Step");
  }
  return this.commands;
};

BinarySearchTree.prototype.insertCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("You must enter an integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    var insertValue = parseInt(value);
    var isExist = false;
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i] == insertValue) {
        isExist = true;
        break;
      }
    }
    // alert(isExist);
    if (isExist == true) {
      alert("The number has appeared");
    } else {
      this.implementAction(this.insertNode.bind(this), insertValue);
      this.array.push(insertValue);
    }
  }
};

BinarySearchTree.prototype.searchCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("You must enter an integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    var searchValue = parseInt(value);
    this.implementAction(this.searchNode.bind(this), searchValue);
  }
};

BinarySearchTree.prototype.deleteCallBack = function (value) {
  var lligle = true;
  if (value.length == 0) {
    lligle = false;
  }
  for (var i = 0; i < value.length; i++) {
    if (value.charAt(i) > "9" || value.charAt(i) < "0") {
      alert("You must enter an integer");
      lligle = false;
    }
  }
  // alert(lligle);
  if (lligle == true) {
    // alert(this.array);
    var deleteValue = parseInt(value);
    this.implementAction(this.deleteNode.bind(this), deleteValue);
    for (var i = 0; i < this.array.length; i++) {
      if (this.array[i] == deleteValue) {
        this.array.splice(i, 1);
        break;
      }
    }
    // alert(this.array);
  }
};

BinarySearchTree.prototype.DFSCallBack = function (event) {
  this.implementAction(this.DeepFirstSearch.bind(this), 2);
};

BinarySearchTree.prototype.BFSCallBack = function (event) {
  this.implementAction(this.BroadFirstSearch.bind(this));
};

BinarySearchTree.prototype.insertNode = function (value) {
  this.cmd("BST_INSERT");
  if (this.root == null || this.root == undefined) {
    this.root = new TreeNode(
      this.objectID,
      value,
      this.startRootX,
      this.startY,
      null,
      null,
      null
    );
    this.objectID++;

    {
      this.cmd("SetState", "Create root node" + value);
      this.cmd("Step");
      this.cmd(
        "CreateCircle",
        this.root.objectID,
        this.root.value,
        this.root.x,
        this.root.y,
        this.radius
      );
      this.cmd("SetForegroundColor", this.root.objectID, this.foregroundColor);
      this.cmd("SetBackgroundColor", this.root.objectID, this.backgroundColor);
      this.cmd("Step");
    }
  } else {
    var temp = this.root;
    var newNode = new TreeNode(
      this.objectID,
      value,
      this.startX + 400,
      this.startY,
      null,
      null,
      null
    );
    this.objectID++;

    {
      this.cmd("SetState", "Create new node" + value);
      this.cmd("Step");
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

    while (true) {
      if (newNode.value >= temp.value && temp.rightChild != null) {
        this.cmd("BST_INSERT1");

        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + ">=" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }

        temp = temp.rightChild;
      } else if (newNode.value < temp.value && temp.leftChild != null) {
        this.cmd("BST_INSERT2");
        {
          this.cmd(
            "SetState",
            "Node comparison" + newNode.value + "<" + temp.value
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }

        temp = temp.leftChild;
      } else {
        break;
      }
    }

    if (newNode.value >= temp.value) {
      this.cmd("BST_INSERT1");

      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + ">=" + temp.value
        );
        this.cmd("Step");
      }
    } else {
      this.cmd("BST_INSERT2");

      {
        this.cmd(
          "SetState",
          "Node comparison" + newNode.value + "<" + temp.value
        );
        this.cmd("Step");
      }
    }

    {
      this.cmd("SetHighlight", temp.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", temp.objectID, false);
      this.cmd("Step");
      this.cmd(
        "Connect",
        temp.objectID,
        newNode.objectID,
        this.foregroundColor
      );
      this.cmd("Step");
    }

    if (parseInt(newNode.value) >= parseInt(temp.value)) {
      temp.rightChild = newNode;
      newNode.parent = temp;

      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert into parent node" +
            temp.value +
            "Right child"
        );
        this.cmd("Step");
      }
    } else {
      temp.leftChild = newNode;
      newNode.parent = temp;

      {
        this.cmd(
          "SetState",
          "New node" +
            newNode.value +
            "Insert into parent node" +
            temp.value +
            "Left child"
        );
        this.cmd("Step");
      }
    }
    this.cmd("BST_INSERT3");
    this.resizeTree();
  }
  return this.commands;
};

BinarySearchTree.prototype.searchNode = function (value) {
  this.cmd("BST_FIND");
  if (this.root == null || this.root == undefined) {
    this.cmd("SetState", "Empty tree cannot be found");
    this.cmd("Step");
  } else {
    var finded = false;
    var temp = this.root;

    while (temp != null) {
      if (value > temp.value) {
        this.cmd("BST_FIND1");
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              ">" +
              temp.value +
              ", Move to right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (value < temp.value) {
        this.cmd("BST_FIND2");

        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              "<" +
              temp.value +
              ", Move to right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        this.cmd("BST_FIND3");

        {
          this.cmd(
            "SetState",
            "Node comparison: " + value + "=" + temp.value + ", Find node"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.palegreen);
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.tomato);
        }
        finded = true;
        break;
      }
    }
    if (!finded) {
      this.cmd("BST_FIND4");

      {
        this.cmd("SetState", "Node not found" + value);
        this.cmd("Step");
      }
    } else {
      {
        this.cmd("SetState", "Find node" + value);
        this.cmd("Step");
      }
    }
  }
  return this.commands;
};

BinarySearchTree.prototype.deleteNode = function (value) {
  this.cmd("BST_DELETE");
  if (this.root == null || this.root == undefined) {
    this.cmd("SetState", "Empty tree cannot be deleted");
    this.cmd("Step");
  } else {
    var finded = false;
    var temp = this.root;

    while (temp != null) {
      this.cmd("BST_DELETE1");
      if (value > temp.value) {
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              ">" +
              temp.value +
              ", Move to right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.rightChild;
      } else if (value < temp.value) {
        {
          this.cmd(
            "SetState",
            "Node comparison: " +
              value +
              "<" +
              temp.value +
              ", Move to right child"
          );
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
        }
        temp = temp.leftChild;
      } else {
        {
          this.cmd("SetState", "Node comparison: " + value + "=" + temp.value);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.palegreen);
          this.cmd("SetState", "Node found, ready to delete");
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, true);
          this.cmd("Step");
          this.cmd("SetHighlight", temp.objectID, false);
          this.cmd("Step");
          this.cmd("SetHighlightColor", temp.objectID, this.tomato);
        }
        if (temp.parent == null) {
          if (temp.leftChild == null && temp.rightChild == null) {
            {
              this.cmd(
                "SetState",
                "The node has no child nodes, delete it directly"
              );
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }
            this.root = null;
          } else if (temp.leftChild == null) {
            {
              this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
              this.cmd("Step");
            }
            var del = temp;
            this.root = temp.rightChild;
            this.root.parent = null;

            {
              this.cmd("Delete", del.objectID);
              this.cmd("Step");
            }
            this.resizeTree();
          } else if (temp.rightChild == null) {
            {
              this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
              this.cmd("Step");
            }
            var del = temp;
            this.root = temp.leftChild;
            this.root.parent = null;

            {
              this.cmd("Delete", del.objectID);
              this.cmd("Step");
            }
            this.resizeTree();
          } else {
            var rightest = temp.leftChild;
            while (rightest.rightChild != null) {
              {
                this.cmd("Step");
                this.cmd("SetHighlight", rightest.objectID, true);
                this.cmd("Step");
                this.cmd("SetHighlight", rightest.objectID, false);
                this.cmd("Step");
              }
              rightest = rightest.rightChild;
            }

            {
              this.cmd("SetHighlightColor", rightest.objectID, this.palegreen);
              this.cmd(
                "SetState",
                "Find the rightmost child of the left subtree"
              );
              this.cmd("Step");
              this.cmd("SetHighlight", rightest.objectID, true);
              this.cmd("Step");
              this.cmd("SetHighlight", rightest.objectID, false);
              this.cmd("Step");
              this.cmd("SetHighlightColor", rightest.objectID, this.tomato);
            }

            rightest.x = temp.x;
            rightest.y = temp.y;
            {
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
              this.cmd(
                "Disconnect",
                rightest.parent.objectID,
                rightest.objectID
              );
              this.cmd("Step");
              this.cmd("Move", rightest.objectID, rightest.x, rightest.y);
              this.cmd("Step");
            }
            rightest.leftChild = temp.leftChild;
            rightest.rightChild = temp.rightChild;
            rightest.parent.rightChild = null;
            rightest.parent = temp.parent;
            this.root = rightest;
            this.resizeTree();
          }
        } else {
          if (temp.leftChild == null && temp.rightChild == null) {
            this.cmd("BST_DELETE2");
            {
              this.cmd(
                "SetState",
                "The node has no child nodes, delete it directly"
              );
              this.cmd("Step");
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }

            if (temp == temp.parent.leftChild) {
              temp.parent.leftChild = null;
            } else {
              temp.parent.rightChild = null;
            }
            temp = null;
          } else if (temp.leftChild == null) {
            this.cmd("BST_DELETE3");
            {
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }

            if (temp == temp.parent.leftChild) {
              {
                this.cmd(
                  "Connect",
                  temp.parent.objectID,
                  temp.rightChild.objectID,
                  this.foregroundColor
                );
                this.cmd("Step");
              }
              temp.parent.leftChild = temp.rightChild;
              temp.rightChild.parent = temp.parent;
            } else {
              {
                this.cmd(
                  "Connect",
                  temp.parent.objectID,
                  temp.rightChild.objectID,
                  this.foregroundColor
                );
                this.cmd("Step");
              }
              temp.parent.rightChild = temp.rightChild;
              temp.rightChild.parent = temp.parent;
            }
            temp = null;
            this.resizeTree();
          } else if (temp.rightChild == null) {
            this.cmd("BST_DELETE3");
            {
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
            }

            if (temp == temp.parent.leftChild) {
              {
                this.cmd(
                  "Connect",
                  temp.parent.objectID,
                  temp.leftChild.objectID,
                  this.foregroundColor
                );
                this.cmd("Step");
              }
              temp.parent.leftChild = temp.leftChild;
              temp.leftChild.parent = temp.parent;
            } else {
              {
                this.cmd(
                  "Connect",
                  temp.parent.objectID,
                  temp.leftChild.objectID,
                  this.foregroundColor
                );
                this.cmd("Step");
              }
              temp.parent.rightChild = temp.leftChild;
              temp.leftChild.parent = temp.parent;
            }
            temp = null;
            this.resizeTree();
          } else {
            var rightest = temp.leftChild;
            this.cmd("BST_DELETE4");
            while (rightest.rightChild != null) {
              {
                this.cmd("Step");
                this.cmd("SetHighlight", rightest.objectID, true);
                this.cmd("Step");
                this.cmd("SetHighlight", rightest.objectID, false);
                this.cmd("Step");
              }
              rightest = rightest.rightChild;
            }

            {
              this.cmd("SetHighlightColor", rightest.objectID, this.palegreen);
              this.cmd(
                "SetState",
                "Find the rightmost child of the left subtree"
              );
              this.cmd("Step");
              this.cmd("SetHighlight", rightest.objectID, true);
              this.cmd("Step");
              this.cmd("SetHighlight", rightest.objectID, false);
              this.cmd("Step");
              this.cmd("SetHighlightColor", rightest.objectID, this.tomato);
            }

            rightest.x = temp.x;
            rightest.y = temp.y;
            {
              this.cmd(
                "Disconnect",
                rightest.parent.objectID,
                rightest.objectID
              );
              this.cmd("Step");
              this.cmd(
                "Connect",
                rightest.objectID,
                temp.leftChild.objectID,
                this.foregroundColor
              );
              this.cmd("Step");
              this.cmd(
                "Connect",
                rightest.objectID,
                temp.rightChild.objectID,
                this.foregroundColor
              );
              this.cmd("Step");
              this.cmd("Disconnect", temp.parent.objectID, temp.objectID);
              this.cmd("Step");
              this.cmd("Disconnect", temp.objectID, temp.leftChild.objectID);
              this.cmd("Disconnect", temp.objectID, temp.rightChild.objectID);
              this.cmd("Step");
              this.cmd(
                "Connect",
                temp.parent.objectID,
                rightest.objectID,
                this.foregroundColor
              );
              this.cmd("Step");
              this.cmd("Delete", temp.objectID);
              this.cmd("Step");
              this.cmd("Move", rightest.objectID, rightest.x, rightest.y);
              this.cmd("Step");
            }
            if (rightest != temp.leftChild) {
              rightest.parent.rightChild = null;
              rightest.leftChild = temp.leftChild;
              temp.leftChild.parent = rightest;
            }
            rightest.rightChild = temp.rightChild;
            temp.rightChild.parent = rightest;
            rightest.parent = temp.parent;
            if (temp == temp.parent.leftChild) {
              temp.parent.leftChild = rightest;
            } else {
              temp.parent.rightChild = rightest;
            }
            temp = null;
            this.resizeTree();
          }
        }
        finded = true;
        break;
      }
    }
    if (!finded) {
      {
        this.cmd("SetState", "Node not found" + value + ", Cannot be deleted");
        this.cmd("Step");
      }
    } else {
      {
        this.cmd("SetState", "Delete complete");
        this.cmd("Step");
      }
    }
  }
  return this.commands;
};

BinarySearchTree.prototype.resizeTree = function () {
  this.resizeWidth(this.root);

  if (this.root != null) {
    this.setNewPosition(this.root, this.startRootX, this.startY, 0);
    this.animateNewPosition(this.root);
    this.cmd("Step");
  }
};

BinarySearchTree.prototype.setNewPosition = function (tree, x, y, side) {
  if (tree != null) {
    tree.y = y;
    if (side == -1) {
      x = parseInt(x - tree.rightWidth);
    } else if (side == 1) {
      x = parseInt(x + tree.leftWidth);
    }
    tree.x = x;
    this.setNewPosition(tree.leftChild, x, parseInt(y + this.intervalY), -1);
    this.setNewPosition(tree.rightChild, x, parseInt(y + this.intervalY), 1);
  }
};

BinarySearchTree.prototype.animateNewPosition = function (tree) {
  if (tree != null) {
    this.cmd("Move", tree.objectID, tree.x, tree.y);
    this.animateNewPosition(tree.leftChild);
    this.animateNewPosition(tree.rightChild);
  }
};

BinarySearchTree.prototype.resizeWidth = function (tree) {
  if (tree == null) {
    return 0;
  }

  tree.leftWidth = Math.max(this.resizeWidth(tree.leftChild), this.intervalX);
  tree.rightWidth = Math.max(this.resizeWidth(tree.rightChild), this.intervalX);
  return parseInt(tree.leftWidth + tree.rightWidth);
};

BinarySearchTree.prototype.DeepFirstSearch = function (order) {
  if (order == 1) {
    this.stateBox = "start";
    this.PreOrderRecursive(this.root);
  } else if (order == 2) {
    this.stateBox = "start";
    this.MidOrderRecursive(this.root);
  } else if (order == 3) {
    this.stateBox = "start";
    this.PostOrderRecursive(this.root);
  }
  return this.commands;
};

BinarySearchTree.prototype.PreOrderRecursive = function (tree) {
  if (tree != null) {
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }

    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }

    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
    this.PreOrderRecursive(tree.leftChild);
    this.PreOrderRecursive(tree.rightChild);
  }
};

BinarySearchTree.prototype.MidOrderRecursive = function (tree) {
  if (tree != null) {
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }
    this.MidOrderRecursive(tree.leftChild);

    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }

    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
    this.MidOrderRecursive(tree.rightChild);
  }
};

BinarySearchTree.prototype.PostOrderRecursive = function (tree) {
  if (tree != null) {
    if (tree.parent != null) {
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetLineHighlight", tree.parent.objectID, tree.objectID, false);
      this.cmd("Step");
    }
    this.PostOrderRecursive(tree.leftChild);
    this.PostOrderRecursive(tree.rightChild);

    {
      this.cmd("SetHighlight", tree.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", tree.objectID, false);
      this.cmd("Step");
    }

    this.stateBox = this.stateBox + ", " + tree.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }
  }
};

BinarySearchTree.prototype.BroadFirstSearch = function () {
  this.stateBox = "start";
  var queue = new Array();
  queue.push(this.root);

  while (queue.length != 0) {
    var temp = queue.shift();

    {
      this.cmd("SetHighlight", temp.objectID, true);
      this.cmd("Step");
      this.cmd("SetHighlight", temp.objectID, false);
      this.cmd("Step");
    }

    this.stateBox = this.stateBox + ", " + temp.value;
    {
      this.cmd("SetState", this.stateBox);
      this.cmd("Step");
    }

    if (temp.leftChild != null) {
      queue.push(temp.leftChild);
    }

    if (temp.rightChild != null) {
      queue.push(temp.rightChild);
    }
  }
  return this.commands;
};

var TreeNode = function (objectID, value, x, y, leftChild, rightChild, parent) {
  this.objectID = objectID;
  this.value = value;
  this.x = x;
  this.y = y;
  this.leftChild = leftChild;
  this.rightChild = rightChild;
  this.parent = parent;
};
