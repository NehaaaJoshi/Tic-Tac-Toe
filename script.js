let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let msg= document.querySelector(".msg");
let draw= document.querySelector("p");
let image= document.querySelector("img");
let newBtn= document.querySelector(".new");

let turnO= true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];



boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        if(turnO){
            box.innerText= "O";
            box.style.color= "#3A4E48";
            turnO=false;
        }
        else{
            box.innerText= "X";
            box.style.color= "#DE6C83"
            turnO=true;
        }
        
        box.addEventListener("click", playMusic());

        box.disabled=true;
        count++;
         
       let isWinner = checkWinner();

       if( !isWinner && count===9 ){
        drawGame();
       }
       
    })
})

const playMusic = () =>{
  var audio= new Audio("click.wav");
  audio.play()
}

const drawGame = () =>{
 draw.innerText= "That's a draw";
 msg.classList.remove("hide");
 newBtn.classList.remove("hide");
 newBtn.style.backgroundColor= "#FFD131";
 image.src= "draw.gif";
 newBtn.innerText = " Try Again ";
 disableboxes();
}

let showWinner = (pos1Val) =>{
    newBtn.innerText = " New Game ";
    newBtn.style.backgroundColor = " #FFD131";
    msg.classList.remove("hide");
    newBtn.classList.remove("hide");
    draw.innerText= `Congratulations ${pos1Val} won !`;
    disableboxes();
}

let disableboxes = () =>{
  for( let box of boxes){
    box.disabled = true;
    box.classList.remove("a");
  }
}

const resetGame = () =>{
    let turnO= true;
   enableboxes();
   count = 0;
   msg.classList.add("hide");
   newBtn.classList.add("hide");
   resetBtn.innerText = "Reset Game";
   resetBtn.style.backgroundColor = " #E6E1C5";
   image.src= "excited.gif";


}

let enableboxes = () =>{
    for( let box of boxes){
      box.disabled = false;
      box.innerText="";
    }
  }

  let checkWinner = () =>{
    for (let i of winPatterns){
       let pos1Val = boxes[i[0]].innerText;
       let pos2Val = boxes[i[1]].innerText;
       let pos3Val = boxes[i[2]].innerText;

       if (pos1Val != "" && pos2Val != "" && pos3Val != "" ){
        if(pos1Val === pos2Val && pos2Val === pos3Val){
            showWinner(pos1Val);
            return true;
        }
       }
    }
} 

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);