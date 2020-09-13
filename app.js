const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode= document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//canvas default setting
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 1200;
canvas.height= 700;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.strokeStyle="INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth =2.5;
//

/*fillstyle ex
ctx.fillStyle = "green";
ctx.fillRect(50,20,100,49);//x,y,가로,세로
ctx.fillStyle = "purple";
ctx.fillRect(80,80,100,49);//x,y,가로,세로
*/

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}
function  startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){//path = line
        ctx.beginPath();
        ctx.moveTo(x,y);
        //console.log("creating path"+ x ,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
       // console.log("creating line"+ x ,y);
       // ctx.closePath();
    }

}
// function onMouseDown(event){
//     painting = true;
// }
// function onMouseUp(event){
//     stopPainting ();
// }
// function onMouseLeave(event){
//     stopPainting ();
// }

function handleColorClick(event){
    // console.log(event.target.style.backgroundColor);
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
function handleRangeChange(event){
    console.log(event.target.value);
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling == true){
    filling = false;
    mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint";
        ctx.fillStyle = ctx.strokeStyle;
    }
}
function handleClickCanvas(){
   if(filling){ ctx.fillRect(0,0, canvas.width, canvas.height);}
}
function handleCM(event){
   //console.log(evnet);
    event.preventDefault();
}
function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();

}
    if(canvas){
    canvas.addEventListener("mousemove",  onMouseMove);
    canvas.addEventListener("mousedown" , startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click",handleClickCanvas);
    canvas.addEventListener("contextmenu", handleCM);
}

console.log(Array.from(colors));
Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if(range){
 range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
}