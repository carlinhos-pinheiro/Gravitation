//Universal Constants///////////////////////////////////////////////////////////////////////////////////////
const G = Math.pow(6.6, -11);
const planets  = [];
const seconds = 300;

//Classes///////////////////////////////////////////////////////////////////////////////////////////////////
class Body{
  constructor(size, Ox, Oy, color, mass){
    this.size = size;
    this.Ox = Ox;
    this.Oy = Oy;
    this.color = color;
    this.mass = mass;
  }

  put(){
    if(this.color !== undefined){
      let c = color(this.color);
      fill(c);
      noStroke();
    }
    circle(this.Ox, this.Oy, this.size);
  }

  isOut(){
    if(this.Ox > 0 || this.Oy > 0){
      return false;
    }else{
      return true;
    }
  }
}

class Star extends Body{
  constructor(size, Ox, Oy, color, mass){
    super(size, Ox, Oy, color, mass);
  }


}

class Planet extends Body{
  constructor(size, Ox, Oy, color, mass, name){
    super(size, Ox, Oy, color, mass);
    this.name = name;
  }
  feelGravity(starOx, starOy, starMass){ //funtions 
  
    var distance = Math.sqrt(Math.pow(this.Ox - starOx, 2) +  Math.pow(this.Oy - starOy, 2))

    var tetha = Math.asin((Math.abs(this.Oy - starOy)/distance));

    let acellaration = (starMass*G)/Math.pow(distance,2);
    let displacement = ((acellaration*Math.pow(seconds,2)/2));
  
    let result = [displacement, distance, tetha];
    return result;
  }

  updatePosition(result, starOx, starOy){
    let displacement = result[0];
    let distance = result[1];
    let tetha = result[2];
    
    let x = Math.abs((displacement))*Math.cos(tetha)*5;
    let y = Math.abs((displacement)*Math.sin(tetha))*5;

    if(this.Ox > starOx && this.Oy === starOy){ // Case I
      x = x*-1;
      y = 0;
    }else if(this.Ox > starOx && this.Oy < starOy){ //Case 1
      x = x*-1;

    }else if(this.Ox == starOx && this.Oy < starOy){ // Case II
      x = 0;

    }else if(this.Ox < starOx && this.Oy === starOy){ // Case III
      y = 0;

    }else if(this.Ox < starOx && this.Oy > starOy){ //Case 3
      y = y*-1;

    }else if(this.Ox === starOx && this.Oy < starOy){ //Case IV
      x = 0;
      y = y*-1;

    }else if(this.Ox > starOx && this.Oy > starOy){ //Case 4
      x = x*-1;
      y = y*-1;
    }
    
    var position = [x,y];
    return position;
  }
}
