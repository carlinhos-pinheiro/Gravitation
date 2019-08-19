//Universal Constants///////////////////////////////////////////////////////////////////////////////////////
const G = Math.pow(6.6, -11);
const planets  = [];
const scale = 0.125*Math.pow(10,10); // One pixel is equal to 500000m
const seconds = 200 //this will a constant representing the time inside de simulation each frame.

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
    /*
    This fuction will recieve the Star mass and position.
    1# Based on that data it will calculate the distance between the planet and star using analytic geometry
    2# After the distance is calculated, we discorver the acellaration and displacement.
    3# Finally we discorver the angle between the line that represent the shortest distance between the planet and star
    and any horizontal line. So that displacement can be derivated between the horizontal and vetical direction properly.

    */
  
    var distance = Math.sqrt(Math.pow(this.Ox - starOx, 2) +  Math.pow(this.Oy - starOy, 2))// #1
    var distance = distance
    //console.log(distance);
    let acellaration = (starMass*G)/Math.pow(distance,2); // #2
    let displacement = ((acellaration*Math.pow(seconds,2)/2)); //#2
    //console.log(displacement);
    var tetha = Math.asin((Math.abs(this.Oy - starOy)/distance)); // #3
  
    let result = [displacement, distance, tetha];
    return result;
  }

  updatePosition(result, starOx, starOy){
    let displacement = result[0];
    let tetha = result[2];
    
    //this piece of code discorver the new position (x,y) based onde the displacement. 
    let x = Math.abs((displacement))*Math.cos(tetha)*10; 
    let y = Math.abs((displacement)*Math.sin(tetha))*10;


    //this piece of code adptates the position(x,y) based on the realive position between the bodies
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
