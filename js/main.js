// let treeDepth = 1;
// // -----------------------------------------------
// class Queue{
//     public data:TreeNode[];
//     public length:number;
//     constructor() {
//         this.data = [];
//         this.length = 0;
//     }
//     public push(data:any){
//         this.data.push(data);
//         this.length ++ ;
//     }
//     public shift(){
//         this.length -- ;
//         return this.data.shift();
//     }
//     public delete(data:any){
//         let index:number = this.data.indexOf(data);
//         if(index>0){
//             this.data.splice(index,1); 
//             this.length -- ;
//         }
//     }
// }
// // -----------------------------------------------
// class TreeNode {
//     public data:any;
//     public childNodes:TreeNode[] = [];
//     public parentNode:TreeNode;
//     constructor(data:any) {
//         this.data = data;
//     }
//     public addChildNode (data:any) {
//         let newNode = new TreeNode(data)
//         this.childNodes.push(newNode);
//         newNode.parentNode = this;
//         treeDepth ++;
//     }
//     public indexOf(node:TreeNode):number{
//         let childNodes = this.childNodes;
//         for (let index = 0; index < childNodes.length; index++) {
//             if(childNodes[index] == node){
//                 return index;
//             }
//         }
//         return -1;
//     }
//     public deleteChildNode(node:TreeNode){
//         let index:number = this.indexOf(node);
//         if(index>0 && index<this.childNodes.length){
//             this.childNodes.splice(index,1); 
//         }else{
// console.log('error:deleteChildNode, index out of this.childNodes.length');
//         }
//     }
//     public deleteThisNode(){
//         this.parentNode.deleteChildNode(this);
//     }
// }
//   class Tree {
//     public rootNode:TreeNode;
//     constructor(rootNodeData:any) {
//         this.rootNode = new TreeNode(data);
//     }
// }
// // -----------------------------------------------
var Layout = /** @class */ (function () {
    function Layout(layoutString) {
        if (layoutString === void 0) { layoutString = "304000018007820090900006000009405307275310060040072800896250103031689042450701600"; }
        this.guessCoord = null;
        if (layoutString == "none") {
            return;
        }
        if (layoutString.length != 81) {
            console.log('layoutString.length wrong: layoutstring.length = ' + layoutString.length);
        }
        else {
            this.unknown = 0;
            this.numbers = [];
            for (var i = 0; i < 9; i++) {
                this.numbers.push([]);
                for (var j = 0; j < 9; j++) {
                    var newNumber = ~~layoutString[i * 9 + j];
                    this.numbers[i].push(newNumber);
                    if (newNumber > 0) {
                        this.unknown++;
                    }
                }
            }
        }
    }
    Layout.prototype.countPossibleValue = function () {
        var numbers = this.numbers;
        var addNewNumber = false;
        var error = false;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if ((typeof (numbers[i][j]) != 'number') || numbers[i][j] == 0) {
                    var exclude = '';
                    for (var _i = 0; _i < 9; _i++) {
                        var number = numbers[_i][j];
                        if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                            exclude += number;
                        }
                    }
                    for (var _j = 0; _j < 9; _j++) {
                        var number = numbers[i][_j];
                        if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                            exclude += number;
                        }
                    }
                    var blockI = i - i % 3;
                    var blockJ = j - j % 3;
                    // console.log(`blockI = ${blockI}, blockJ = ${blockJ}`)
                    for (var _i = blockI; _i < blockI + 3; _i++) {
                        for (var _j = blockJ; _j < blockJ + 3; _j++) {
                            var number = numbers[_i][_j];
                            if (number > 0 && !(exclude.indexOf(number.toString()) > -1)) {
                                exclude += number;
                            }
                        }
                    }
                    var possibleValue = [];
                    for (var i_1 = 1; i_1 < 10; i_1++) {
                        if (exclude.indexOf(i_1.toString()) == -1) {
                            possibleValue.push(i_1);
                        }
                    }
                    // if(i == 8 && j == 7){
                    // console.log(`                      坐标：${i},${j},可能值数量：${possibleValue.length}`)
                    // console.log(exclude)
                    // }
                    if (possibleValue.length == 1) {
                        possibleValue = possibleValue[0];
                        addNewNumber = true;
                        // console.log(`坐标：${i},${j},新数字：${possibleValue}`);
                    }
                    else if (possibleValue.length == 0) {
                        error = true;
                    }
                    numbers[i][j] = possibleValue;
                }
            }
        }
        return { addNewNumber: addNewNumber, error: error };
    };
    Layout.prototype.consoleLog = function () {
        var numbers = this.numbers;
        var str = '';
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (typeof (numbers[i][j]) == 'number' && numbers[i][j] > 0) {
                    str += '[' + numbers[i][j] + ']';
                }
                else {
                    str += ' ' + numbers[i][j].length + ' ';
                }
            }
            str += '\n';
        }
        console.log(str);
    };
    Layout.prototype.toJson = function () {
        var unknown = this.unknown;
        var numbers = this.numbers;
        var obj = { unknown: unknown, numbers: numbers };
        return JSON.stringify(obj);
    };
    Layout.prototype.jsonToNumbers = function (json) {
        var obj = JSON.parse(json);
        this.numbers = obj.numbers;
        this.unknown = obj.unknown;
    };
    Layout.prototype.getGuessCoord = function () {
        var length = 9;
        var x, y;
        var numbers = this.numbers;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (!(typeof (numbers[i][j]) == 'number') && numbers[i][j].length < length) {
                    length = numbers[i][j].length;
                    x = i;
                    y = j;
                }
            }
        }
        this.guessCoord = { i: x, j: y };
    };
    return Layout;
}());
function main(sudoku) {
    if (sudoku === void 0) { sudoku = "000000500100070380500000010600000005000090840800001703070069000000803020901005000"; }
    var game = new Layout(sudoku);
    var layouts = [];
    var out = [];
    layouts.push(game);
    console.log("                      layouts.push,\u4E2A\u6570\uFF1A" + layouts.length);
    var step = 300;
    // console.log(layouts)
    var i = 0;
    var j = 0;
    while (step-- && layouts.length > 0) {
        // 得到节点下的游戏布局数据
        var layout = layouts.pop();
        console.log("layouts.pop,\u4E2A\u6570\uFF1A" + layouts.length);
        // console.log(`num:${layout.numbers[0][0]}`)
        var guess = false;
        if (layout.guessCoord) {
            var i_2 = layout.guessCoord.i;
            var j_1 = layout.guessCoord.j;
            console.log('guessCoord');
            if (layout.numbers[i_2][j_1].length == 1) {
                layout.numbers[i_2][j_1] = layout.numbers[i_2][j_1][0];
                console.log("\u5750\u6807(" + i_2 + "," + j_1 + ")\u4E0A\u7684\u6570\u5B57\u786E\u5B9A\u4E3A" + layout.numbers[i_2][j_1]);
            }
            else {
                guess = true;
            }
        }
        // 查找所有的确定空格并直接填上
        var res_1 = void 0;
        if (!guess) {
            console.log('!guess');
            do {
                res_1 = layout.countPossibleValue();
                // layout.consoleLog()
            } while (res_1.addNewNumber && !res_1.error);
        }
        if (res_1 && res_1.error) {
            // 改布局是错误的，需要清除
            console.log('猜测失败');
        }
        else {
            // console.log('----------------!res.error-------------------------')
            // 找到适合猜测的空格，这里直接根据空格的可能值数量来猜测
            layout.getGuessCoord();
            var coord = layout.guessCoord;
            var i_3 = void 0, j_2 = void 0;
            console.log("\u6CA1\u6709\u731C\u6D4B\u5931\u8D25");
            if (coord.i || coord.i == 0) {
                // console.log('----------------coord.i-------------------------')
                i_3 = coord.i;
                j_2 = coord.j;
                // 根据猜测的坐标，将所有的可能值记录下来
                var newNumber = layout.numbers[i_3][j_2].pop();
                console.log("\u731C\u6D4B(" + i_3 + "," + j_2 + ")\u4E0A\u7684\u6570\u5B57\u662F" + newNumber + "\uFF0C\u9664\u4E86\u8FD9\u4E2A\u53EF\u80FD\uFF0C\u5176\u4ED6\u53EF\u80FD\u503C\u7684\u6570\u91CF\u4E3A\uFF1A" + layout.numbers[i_3][j_2].length);
                // console.log(`newNumber:${newNumber}`)
                // console.log(layout.numbers[i][j])
                // 从可能值中取出一个数，将剩下的布局保存进layouts中
                layouts.push(layout);
                console.log("                      layouts.push,\u4E2A\u6570\uFF1A" + layouts.length);
                // 根据可能值，形成新的布局
                var newLayout = new Layout("none");
                newLayout.jsonToNumbers(layout.toJson());
                newLayout.numbers[i_3][j_2] = newNumber;
                layouts.push(newLayout);
                console.log("                      layouts.push,\u4E2A\u6570\uFF1A" + layouts.length);
            }
            else {
                console.log('结果来了');
                console.log(layout);
                out.push(layout);
                return layout;
            }
        }
        // console.log(layouts)
        console.log("-------------------------" + step + "-------------------------");
    }
    console.log(out);
}
// let res = main("000300020300560000904800060050000090190005400008402100000000030000000006009037000");
// var res = main("005040000602905080030012000000004235070500100000000000100400090003056470000020000");
// res.consoleLog();
// var res = main("375486002106000000800050000001700300000135964963824010680597231507240009209008405");
// res.consoleLog();
//# sourceMappingURL=main.js.map