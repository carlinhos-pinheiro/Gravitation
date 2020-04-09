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