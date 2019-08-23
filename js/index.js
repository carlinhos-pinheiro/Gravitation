//Adjusting game - div to user screen size
const gameDiv = document.querySelector("#game");
innerHeight = window.innerHeight
gameDiv.style.height = `${innerHeight-canvasOy}px`
gameDiv.style.top = `${canvasOy}px`;
/////////////////////////////////////////////////////////////////////////////////////////////

let colors = ["#ff6188", "#ffd866", "#fc9867", "#ab9df2", "#78dce8","#c7fe40"]; // all possible colors of planets and top bar


// Random color in the top bar in the site
topColor = Math.floor(Math.random()*6);
const topContainer = document.querySelector(".TopContainer")
topContainer.style.background = colors[topColor];

////////////////////////////////////////////////////////////


// Changing color in the buttons. 
const button = document.querySelector("#button");
const buttonHole = document.querySelector("#buttonHole");
button.src = `js/css/img/button-black.png`
buttonHole.src = `js/css/img/button-black.png`



//Interaction and response when hovering AddPlanet Text and Button.


const addPlanet = document.querySelector("#addPlanet");
button.addEventListener("mouseover", function(){ //PLANETS
  event.preventDefault();
  this.src = `js/css/img/button${topColor}.png`
  addPlanet.style.color = "whitesmoke";
})

button.addEventListener("mouseout", function(){
  event.preventDefault();

  this.src = `js/css/img/button-black.png`;
  addPlanet.style.color = "black";
})


const addHole = document.querySelector("#addHole");
buttonHole.addEventListener("mouseover", function(){ //BLACK HOLES
  event.preventDefault();
  this.src = `js/css/img/button${topColor}.png`
  addHole.style.color = "whitesmoke";
})

buttonHole.addEventListener("mouseout", function(){
  event.preventDefault();
  this.src = `js/css/img/button-black.png`;
  addHole.style.color = "black";
})

//Adding mew planets and Black Holes!!///////////////////////////////////////////////////////////////////////////////////////////
var i = 0;
let adding = [false, ""];

function putPlanet(x, y){ //this function creates a new PLANET as new object

  if(i === 6){
    i = 0;
  }
  newPlanet = new Planet(
    10,
    x,
    y-canvasOy, 
    colors[i]
  );

  i++;
  planets.push(newPlanet);
}

function putHole(x, y){ //this function creates a new BLACK HOLE as new object
  if(i === 6){
    i = 0;
  }
  newHole = new Hole(
    sunSize,
    x,
    y-canvasOy, 
    "black",
    Math.pow(1.9,30)

  );

  i++;

  holes.push(newHole);
}

function mouseClicked(event){ // this funtions has call back funtion every time user clicks the screen.
  var x = event.clientX;
  var y = event.clientY;
  if(y > canvasOy && adding[0] === true && adding[1] === 0){
    putPlanet(x, y);
    adding = false;
    document.body.style.cursor = "default";
  }else if(y > canvasOy && adding[0] === true && adding[1] === 1){
    putHole(x,y);
    adding = false;
    document.body.style.cursor = "default";
  }
  return false;
}


button.addEventListener("click", function(){

})

let buttons = [button, buttonHole];

buttons.forEach(element => {
  element.addEventListener("click", function(){
    event.preventDefault();
    document.body.style.cursor = "cell";
    if(element === button){
      adding = [true, 0]
    }else if(element === buttonHole){
      adding = [true, 1]
    };
  })
});


mouseClicked();

