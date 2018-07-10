var treeDepth = 1;
// -----------------------------------------------
var TreeNode = /** @class */ (function () {
    function TreeNode(data) {
        this.childNodes = [];
        this.data = data;
    }
    TreeNode.prototype.addChildNode = function (data) {
        var newNode = new TreeNode(data);
        this.childNodes.push(newNode);
        newNode.parentNode = this;
        treeDepth++;
    };
    TreeNode.prototype.indexOf = function (node) {
        var childNodes = this.childNodes;
        for (var index = 0; index < childNodes.length; index++) {
            if (childNodes[index] == node) {
                return index;
            }
        }
        return -1;
    };
    TreeNode.prototype.deleteChildNode = function (node) {
        var index = this.indexOf(node);
        if (index > 0 && index < this.childNodes.length) {
            this.childNodes.splice(index, 1);
        }
        else {
            console.log('error:deleteChildNode, index out of this.childNodes.length');
        }
    };
    TreeNode.prototype.deleteThisNode = function () {
        this.parentNode.deleteChildNode(this);
    };
    return TreeNode;
}());
var Tree = /** @class */ (function () {
    function Tree(data) {
        this.rootNode = new TreeNode(data);
    }
    return Tree;
}());
// -----------------------------------------------
var Layout = /** @class */ (function () {
    function Layout(layoutString) {
        if (layoutString === void 0) { layoutString = "304000018007820090900006000009405307275310060040072800896250103031689042450701600"; }
        this.string = layoutString;
        if (layoutString.length == 81) {
            this.numbers = [];
            for (var i = 0; i < 9; i++) {
                this.numbers.push([]);
                for (var j = 0; j < 9; j++) {
                    this.numbers[i].push(~~layoutString[i * 9 + j]);
                }
            }
        }
    }
    Layout.prototype.setString = function () {
        this.string = JSON.stringify(this.numbers).replace(/\[|\]|,/g, '');
    };
    Layout.prototype.isSolved = function () {
        return (this.string.indexOf('0') == -1) ? true : false;
    };
    Layout.prototype["try"] = function () {
        // console.log(this.string)
        var index = this.string.indexOf('0');
        var numbers = this.numbers;
        var res = [];
        var resString = [];
        // console.log(index)
        if (index > -1 && index < 81) {
            var i = Math.floor(index / 9);
            var j = index % 9;
            // console.log(`i = ${i}, j = ${j}.`);
            var exclude = '';
            for (var i_1 = 0; i_1 < 9; i_1++) {
                var number = numbers[i_1][j];
                if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                    exclude += numbers[i_1][j];
                }
            }
            for (var j_1 = 0; j_1 < 9; j_1++) {
                var number = numbers[i][j_1];
                if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                    exclude += numbers[i][j_1];
                }
            }
            var blockI = i - i % 3;
            var blockJ = j - j % 3;
            // console.log(`blockI = ${blockI}, blockJ = ${blockJ}`)
            for (var i_2 = blockI; i_2 < blockI + 3; i_2++) {
                for (var j_2 = blockJ; j_2 < blockJ + 3; j_2++) {
                    var number = numbers[i_2][j_2];
                    if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                        exclude += numbers[i_2][j_2];
                    }
                }
            }
            for (var i_3 = 1; i_3 < 10; i_3++) {
                if (exclude.indexOf(i_3.toString()) == -1) {
                    res.push(i_3);
                    resString.push(this.string.replace('0', i_3.toString()));
                }
            }
            // console.log(numbers)
            // console.log(exclude)
        }
        // console.log(res)
        // console.log(resString)
        return resString;
    };
    return Layout;
}());
function main(layoutString) {
    if (layoutString === void 0) { layoutString = '304000018007820090900006000009405307275310060040072800896250103031689042450701600'; }
    var rootLayout = new Layout(layoutString);
    var tree = new Tree(rootLayout);
    var treeRoot = tree.rootNode;
    var queue = [];
    var solved = [];
    queue.push(treeRoot);
    while (queue.length > 0) {
        var node = queue.shift();
        var layout = node.data;
        if (layout.isSolved()) {
            solved.push(layout);
            console.log("\u5F97\u5230\u7ED3\u679C\uFF0C\u8BA1\u7B97\u4E2A\u6570\uFF1AtreeDepth= " + treeDepth);
        }
        else {
            var res_1 = layout["try"]();
            if (res_1.length == 0) {
                // console.log('(res.length == 0)')
            }
            else {
                for (var _i = 0, res_2 = res_1; _i < res_2.length; _i++) {
                    var string = res_2[_i];
                    var newLayout = new Layout(string);
                    node.addChildNode(newLayout);
                }
                for (var _a = 0, _b = node.childNodes; _a < _b.length; _a++) {
                    var childNode = _b[_a];
                    queue.push(childNode);
                }
            }
        }
    }
    console.log(tree);
    console.log(rootLayout);
    console.log("treeDepth = " + treeDepth);
    return solved;
}
function show(res) {
    var str = '';
    for (var _i = 0, res_3 = res; _i < res_3.length; _i++) {
        var layout = res_3[_i];
        var layoutNumbers = layout.numbers;
        str += '----------------------<br>';
        str += '<table>';
        for (var _a = 0, layoutNumbers_1 = layoutNumbers; _a < layoutNumbers_1.length; _a++) {
            var row = layoutNumbers_1[_a];
            str += '<tr>';
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var number = row_1[_b];
                str += "<td>" + number + "</td>";
            }
            str += '</tr>';
        }
        str += '</table>';
        str += '----------------------<br>';
    }
    document.write(str);
}
// let res = main('490080000000400003010725000901050360072806140080090007154073082269540031837002950');
var res = main('007100000000000000000000053000060020000035040008000100600070900000400800300000000');
show(res);
//# sourceMappingURL=main.js.map