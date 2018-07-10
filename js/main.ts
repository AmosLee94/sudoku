let treeDepth = 1;
// -----------------------------------------------
class TreeNode {
    public data:any;
    public childNodes:TreeNode[] = [];
    public parentNode:TreeNode;
    constructor(data:any) {
        this.data = data;
    }
    public addChildNode (data:any) {
        let newNode = new TreeNode(data)
        this.childNodes.push(newNode);
        newNode.parentNode = this;
        treeDepth ++;
    }
    public indexOf(node:TreeNode):number{
        let childNodes = this.childNodes;
        for (let index = 0; index < childNodes.length; index++) {
            if(childNodes[index] == node){
                return index;
            }
        }
        return -1;
    }
    public deleteChildNode(node:TreeNode){
        let index:number = this.indexOf(node);
        if(index>0 && index<this.childNodes.length){
            this.childNodes.splice(index,1); 
        }else{
            console.log('error:deleteChildNode, index out of this.childNodes.length');
        }
    }
    public deleteThisNode(){
        this.parentNode.deleteChildNode(this);
    }
}

  class Tree {
    public rootNode:TreeNode;
    constructor(data:any) {
        this.rootNode = new TreeNode(data);
    }
}

// -----------------------------------------------

class Layout {
    public numbers :number[][];
    public string:string;
    public unknown:number;
    constructor(layoutString:string = "304000018007820090900006000009405307275310060040072800896250103031689042450701600") {
        this.string = layoutString;
        if(layoutString.length == 81){
            this.numbers=[];
            for (let i = 0; i < 9; i++) {
                this.numbers.push([]);
                for (let j = 0; j < 9; j++) {
                    this.numbers[i].push(~~layoutString[i*9+j])
                }
            }
        }
    }
    public setString(){
        this.string = JSON.stringify(this.numbers).replace(/\[|\]|,/g,'');
    }
    public isSolved(){

        return (this.string.indexOf('0')==-1)?true:false;
    }
    public try(){
        // console.log(this.string)
        let index = this.string.indexOf('0')
        let numbers = this.numbers;
        let res = [];
        let resString = [];
        // console.log(index)
        if(index > -1 && index < 81){
            let i = Math.floor(index / 9);
            let j = index % 9;
            // console.log(`i = ${i}, j = ${j}.`);
            let exclude = '';
            for(let i = 0; i < 9; i ++){
                let number = numbers[i][j];
                if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                    exclude += numbers[i][j];
                }
            }
            for(let j = 0; j < 9; j ++){
                let number = numbers[i][j];
                if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                    exclude += numbers[i][j];
                }
            }
            let blockI =i - i % 3;
            let blockJ =j - j % 3;
            // console.log(`blockI = ${blockI}, blockJ = ${blockJ}`)
            for(let i = blockI; i < blockI + 3 ; i ++){
                for(let j = blockJ; j < blockJ + 3 ; j ++){
                    let number = numbers[i][j];
                    if(number>0 && !(exclude.indexOf(number.toString())>-1)){
                        exclude += numbers[i][j];
                    }
                }
            }
            for(let i = 1 ;i < 10;i++){
                if(exclude.indexOf(i.toString()) == -1){
                    res.push(i);
                    resString.push(this.string.replace('0',i.toString()))
                }
            }
            // console.log(numbers)
            // console.log(exclude)
        }
        // console.log(res)
        // console.log(resString)
        return resString;
    }
}

function main(layoutString:string = '304000018007820090900006000009405307275310060040072800896250103031689042450701600'):Layout[]{
    let rootLayout = new Layout(layoutString);
    let tree = new Tree(rootLayout);
    let treeRoot = tree.rootNode;
    let queue = [];
    let solved = [];
    queue.push(treeRoot)
    while(queue.length > 0){
        let node = queue.shift();
        let layout = node.data;
        if(layout.isSolved()){
            solved.push(layout);
            console.log(`得到结果，计算个数：treeDepth= ${treeDepth}`)
        }else{
            let res = layout.try();
            if(res.length == 0){
                // console.log('(res.length == 0)')
            }else{
                for(let string of res){
                    let newLayout = new Layout(string)
                    node.addChildNode(newLayout)
                }
                for(let childNode of node.childNodes){
                    queue.push(childNode);
                }
            }
        }
    }
    console.log(tree)
    console.log(rootLayout)
    console.log(`treeDepth = ${treeDepth}`)
    return solved
}
function show(res){
    let str = ''
    for(let layout of res){
        let layoutNumbers = layout.numbers;
        str += '----------------------<br>'
        str +='<table>'
        for(let row of layoutNumbers){
            str +='<tr>'
            for(let number of row){
                str +=`<td>${number}</td>`
            }
            str +='</tr>'
        }
        str +='</table>'
        str += '----------------------<br>'
    }
    document.write(str);
}



// let res = main('490080000000400003010725000901050360072806140080090007154073082269540031837002950');
let res = main('007100000000000000000000053000060020000035040008000100600070900000400800300000000');
show(res);

