
//Functions////////////////////////////////////////////////////////////////////////////////////////////////


//Necessary variables/////////////////////////////////////////////////////////////////////////////////////////////////////

let canvasOx = 0;
let canvasOy = 70;

let width = window.innerWidth - canvasOx;
let height = window.innerHeight  - canvasOy;

var initialVelocity = 0;

let sunSize = 40


/////////////////////////////////////////////////////////////////////////////////////////////////////////

function setup() {
  // put setup code here
  canvasWidth = window.innerWidth - canvasOx;
  canvasHeight = window.innerHeight  - canvasOy;
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(canvasOx,canvasOy);
  createElement("h1", "Hello from p5.js");

}


//Initializing objects///////////////////////////////////////////////////////////////////////////////////////////////////
const newStar = new Star(
  sunSize,
  width/2 +sunSize/2,
  height/2,
  "white",
  Math.pow(1.9,30)
)

/*

const earth = new Planet(
  7,
  width/2 - 300,
  height/2,
  "#02AE99",
  Math.pow(5.9,24),
  "earth"
)

const mars = new Planet(
  7,
  width/2 + 400,
  height/2 - 200,
  "#FF0068",
  Math.pow(5.9,24),
  "mars"
)

const venus = new Planet(
  7,
  width/2 + 550,
  height/2 + 200,
  "orange",
  Math.pow(10,40),
  "venus"
)

const monoko = new Planet(
  7,
  width/2,
  height/2 - 500,
  "#C5FF00",
  Math.pow(10,40),
  "monoko"
)

planets.push(mars, earth, venus, monoko);
//////////////////////////////////////////////////////////////////////////////////////////////////////////
*/


function draw() {
  // put drawing code here

  backgroundColor = ("#282a3a");
  background(backgroundColor);

  planets.forEach(element => {
    let isOut  = element.isOut();
    if(isOut === false){
      element.put();
      result = element.feelGravity(newStar.Ox, newStar.Oy, newStar.mass);
      if(result[1] <= sunSize - 10){
        index = planets.indexOf(element);
        planets.splice(index, 1);
        console.log(planets);
      }else{
        position = element.updatePosition(result, newStar.Ox, newStar.Oy);
        element.Ox =  element.Ox + position[0];
        element.Oy = element.Oy + position[1];
      }
      
    }
  });

  //console.log(mars.Ox);

  newStar.put();
}