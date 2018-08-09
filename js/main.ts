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
class Layout {
    public numbers :any[][];
    public unknown:number;
    public guessCoord:any;
    constructor(layoutString:string = "304000018007820090900006000009405307275310060040072800896250103031689042450701600") {
        this.guessCoord = null;
        if(layoutString == "none"){
            return;
        }
        if(layoutString.length != 81){
            console.log('layoutString.length wrong: layoutstring.length = ' + layoutString.length);
        }else{
            this.unknown = 0;
            this.numbers=[];
            for (let i = 0; i < 9; i++) {
                this.numbers.push([]);
                for (let j = 0; j < 9; j++) {
                    let newNumber = ~~layoutString[i*9+j]
                    this.numbers[i].push(newNumber);
                    if(newNumber > 0){
                        this.unknown ++;
                    }
                }
            }
        }
    }
    public countPossibleValue(){
        let numbers = this.numbers;
        let addNewNumber = false;
        let error = false;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if((typeof(numbers[i][j])  != 'number') || numbers[i][j] == 0){
                    let exclude = '';
                    for (let _i = 0; _i < 9; _i++) {
                        let number = numbers[_i][j];
                        if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                            exclude += number;
                        }
                    }
                    for (let _j = 0; _j < 9; _j++) {
                        let number = numbers[i][_j];
                        if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                            exclude += number;
                        }
                    }
                    let blockI =i - i % 3;
                    let blockJ =j - j % 3;
                    // console.log(`blockI = ${blockI}, blockJ = ${blockJ}`)
                    for(let _i = blockI; _i < blockI + 3 ; _i ++){
                        for(let _j = blockJ; _j < blockJ + 3 ; _j ++){
                            let number = numbers[_i][_j];
                            if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                                exclude += number;
                            }
                        }
                    }
                    let possibleValue = []
                    for(let i = 1 ;i < 10;i++){
                        if(exclude.indexOf(i.toString()) == -1){
                            possibleValue.push(i);
                        }
                    }
                    
                    // if(i == 8 && j == 7){

                        // console.log(`                      坐标：${i},${j},可能值数量：${possibleValue.length}`)
                        // console.log(exclude)
                        
                    // }
                    if(possibleValue.length==1){
                        possibleValue = possibleValue[0];
                        addNewNumber = true;
                        // console.log(`坐标：${i},${j},新数字：${possibleValue}`);
                    }else if(possibleValue.length == 0){
                        error = true;
                        
                    }
                    numbers[i][j] = possibleValue;
                }
            }
        }
        return {addNewNumber,error};
    }
    
    public consoleLog(){
        let numbers = this.numbers;
        let str ='';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if(typeof(numbers[i][j])=='number'&&numbers[i][j]>0){
                    str += '['+numbers[i][j]+']';
                }else{
                    str += ' '+numbers[i][j].length+' ';
                }
            }
            str += '\n';
        }
        console.log(str)
    }
    public toJson(){
        let unknown = this.unknown;
        let numbers = this.numbers;
        let obj = {unknown,numbers}
        return JSON.stringify(obj);
    }
    public jsonToNumbers(json:string){
        let obj = JSON.parse(json);
        this.numbers = obj.numbers;
        this.unknown = obj.unknown;
    }
    public getGuessCoord(){
        let length =9;
        let x,y;
        let numbers = this.numbers;
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if(!(typeof(numbers[i][j])=='number')&&numbers[i][j].length<length){
                    length = numbers[i][j].length;
                    x = i;
                    y = j;
                }
            }
        }
        this.guessCoord={i:x,j:y};
    }
}

function main(sudoku:string = "000000500100070380500000010600000005000090840800001703070069000000803020901005000"){
    
    let game = new Layout(sudoku);
    let layouts:Layout[] = [];
    let out:Layout[] = [];
    layouts.push(game)
    console.log(`                      layouts.push,个数：${layouts.length}`)
    let step = 300;
    // console.log(layouts)
    let i = 0;
    let j = 0;
    while(step--&&layouts.length>0){
        // 得到节点下的游戏布局数据
        let layout = layouts.pop();
        console.log(`layouts.pop,个数：${layouts.length}`)
        // console.log(`num:${layout.numbers[0][0]}`)
        let guess = false;
        if(layout.guessCoord){
            let i = layout.guessCoord.i;
            let j = layout.guessCoord.j;
            console.log('guessCoord')
            if(layout.numbers[i][j].length == 1){
                layout.numbers[i][j] = layout.numbers[i][j][0];
                console.log(`坐标(${i},${j})上的数字确定为${layout.numbers[i][j]}`)
            }else{
                guess = true;
            }
        }
        // 查找所有的确定空格并直接填上
        let res:any ;
        if(!guess){
            
            console.log('!guess')
            do{
                res = layout.countPossibleValue();
                // layout.consoleLog()
            }while(res.addNewNumber && !res.error);
        }
        if(res && res.error){
            // 改布局是错误的，需要清除
            console.log('猜测失败')
        }else{ 
            // console.log('----------------!res.error-------------------------')
            // 找到适合猜测的空格，这里直接根据空格的可能值数量来猜测
            layout.getGuessCoord();
            let coord = layout.guessCoord;
            let i,j;
            console.log(`没有猜测失败`)
            if(coord.i||coord.i==0){
                // console.log('----------------coord.i-------------------------')
                i = coord.i;
                j = coord.j;
                // 根据猜测的坐标，将所有的可能值记录下来
                let newNumber = layout.numbers[i][j].pop();
                console.log(`猜测(${i},${j})上的数字是${newNumber}，除了这个可能，其他可能值的数量为：${layout.numbers[i][j].length}`)
                // console.log(`newNumber:${newNumber}`)
                // console.log(layout.numbers[i][j])
                // 从可能值中取出一个数，将剩下的布局保存进layouts中
                layouts.push(layout);
                console.log(`                      layouts.push,个数：${layouts.length}`)
                // 根据可能值，形成新的布局
                let newLayout = new Layout("none");
                newLayout.jsonToNumbers(layout.toJson());
                newLayout.numbers[i][j] = newNumber;
                layouts.push(newLayout)
                console.log(`                      layouts.push,个数：${layouts.length}`)
            }else{
                console.log('结果来了')
                console.log(layout)
                out.push(layout);
                return layout;
            }
        }
        // console.log(layouts)
        console.log(`-------------------------${step}-------------------------`)
    }
    console.log(out)
}
// let res = main("000300020300560000904800060050000090190005400008402100000000030000000006009037000");
let res = main("005040000602905080030012000000004235070500100000000000100400090003056470000020000");
res.consoleLog()