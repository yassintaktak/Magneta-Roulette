var Roulette = function(params) {
  params ? this.params = params : this.params = {
    background : "#f7f1e3",
    back_circle : "#40407a",
    zero_green : "rgba(33, 140, 116,1.0)",
    red : "rgba(179, 57, 57,1.0)",
    black : "rgba(0, 0, 0, .9)",
    text_color : "#FFF",
    outer_circle : "rgba(44, 44, 84,0.9)",
    inner_circle : "#f7f1e3",
    mid_circle : "#aaa69d",
    ball_color : "rgba(52, 172, 224,1.0)"
  };
  this.number_params = new Array();
}
Roulette.prototype.selectContainer = function(selector) {
  if(selector == "body")
    return document.body;
  else if(selector[0] == ".") {
    return document.getElementsByClassName(selector.replace(".", ""))[0]
  } else if(selector[0] == "#") {
    return document.getElementById(selector.replace("#", ""))
  }
}
Roulette.prototype.initRoulette = function(container, params) {
  try {
    container = this.selectContainer(container);
    this.canvas = document.createElement("canvas");
    (params.width == undefined) ? params.width = container.getAttribute("roulette-width") : params.width = params.width;
    (params.height == undefined) ? params.height = container.getAttribute("roulette-height") : params.width = params.width;
    (params.width != undefined && params.width == "FW") ? params.width = window.innerWidth : params.width = params.width;
    (params.height != undefined && params.height == "FH") ? params.height = window.innerHeight : params.height = params.height;
    (params.width != undefined && params.width == "HW") ? params.width = window.innerWidth/2 : params.width = params.width;
    (params.height != undefined && params.height == "HH") ? params.height = window.innerHeight/2 : params.height = params.height;
    this.canvas.width = params.width;
    this.canvas.height = params.height;
    container.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.roll(0);
  } catch(e) {
    console.log("DEBUG: "+e);
  }
}
Roulette.prototype.startRolling = function(callback) {
  try {
    let total_numbers = 37;
    let angle_per_unit = (Math.PI*2)/total_numbers;
    let velocity = Math.random()*20+4;
    let friction = 0.92;
    let d_angle = Math.random()+1;
    let ball = {
      _x : Math.cos(d_angle)*this.radius-2+this.canvas.width/2,
      _y : Math.sin(d_angle)*this.radius-3+this.canvas.height/2
    }
    let that = this;
    angle = 0;
    angle2 = 0;
    v2 = Math.random()*30+10;
    let = rollingInterval = setInterval(function() {
      that.roll(angle, ball);
      ball._x = Math.cos(d_angle-angle2)*that.radius-2+that.canvas.width/2;
      ball._y = Math.sin(d_angle-angle2)*that.radius-2+that.canvas.height/2;
      angle += velocity;
      velocity *= friction;
      angle2 += v2;
      v2 *= friction;
      if((v2 < 0.001)) {
        clearInterval(rollingInterval);
        let min_data = {
          min_dist : Math.sqrt(Math.pow((ball._x-that.number_params[0].pos_x), 2)+Math.pow((ball._y-that.number_params[0].pos_y), 2)),
          number : that.number_params[0].number
        };
        for(let i=0; i<that.number_params.length; i++) {
          if(Math.sqrt(Math.pow((ball._x-that.number_params[i].pos_x), 2)+Math.pow((ball._y-that.number_params[i].pos_y), 2)) <= min_data.min_dist) {
            min_data.min_dist = Math.sqrt(Math.pow((ball._x-that.number_params[i].pos_x), 2)+Math.pow((ball._y-that.number_params[i].pos_y), 2));
            min_data.number = that.number_params[i].number;
          }
        }
        callback(min_data.number);
      }
    }, 70)
  } catch(e) {
    console.log(e);
  }
}
Roulette.prototype.roll = function(angle, ball={}) {
  try {
    /* Init Circle */

    this.context.beginPath();
    this.context.fillStyle = this.params.background;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    let radius = (this.canvas.height*60)/100;
    if(radius > 120) {
      radius = 120;
    }
    this.radius = radius;

    this.context.beginPath();
    this.context.fillStyle = this.params.back_circle;
    this.context.arc(this.canvas.width/2, this.canvas.height/2, radius, Math.PI*2, 0);
    this.context.fill();

    /* Split Circle */
    let total_numbers = 37;
    let angle_per_unit = (Math.PI*2)/total_numbers;
    //let last_point = {_x : Math.cos(0)*radius+this.canvas.width/2, _y : Math.sin(0)*radius+this.canvas.height/2};
    for(var i=0; i<total_numbers; i++) {
      let _x = Math.cos(angle_per_unit*i+angle)*radius+this.canvas.width/2;
      let _y = Math.sin(angle_per_unit*i+angle)*radius+this.canvas.height/2;
      let p_x = Math.cos(angle_per_unit*(i-1)+angle)*radius+this.canvas.width/2;
      let p_y = Math.sin(angle_per_unit*(i-1)+angle)*radius+this.canvas.height/2;
      this.context.beginPath();
      if(i == 0) {
        this.context.beginPath();
        this.context.fillStyle = this.params.zero_green;
        this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
        this.context.lineTo(p_x, p_y);
        this.context.lineTo(_x, _y);
        this.context.lineTo(this.canvas.width/2, this.canvas.height/2);
        this.context.fill();
      } else {
        let hot_numbers = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
        if(hot_numbers.indexOf(i) != -1) {
          this.context.fillStyle = this.params.red;
        } else {
          this.context.fillStyle = this.params.black;
        }
        this.context.beginPath();

        this.context.moveTo(this.canvas.width/2, this.canvas.height/2);
        this.context.lineTo(p_x, p_y);
        this.context.lineTo(_x, _y);
        this.context.lineTo(this.canvas.width/2, this.canvas.height/2);
        this.context.fill();
      }

      this.context.beginPath();
      this.context.fillStyle = this.params.text_color;
      this.context.fillText(i, Math.cos(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.width/2-6, Math.sin(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.height/2);
      let found = false;
      for(let j=0; j<this.number_params.length; j++) {
        if(this.number_params[j].number == i) {
          this.number_params[j].pos_x = Math.cos(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.width/2-6;
          this.number_params[j].pos_y = Math.sin(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.height/2;
          found = true;
          break;
        }
      }
      if(!found) {
        let that = this;
        this.number_params.push({
          number : i,
          pos_x : Math.cos(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.width/2-6,
          pos_y : Math.sin(angle_per_unit*(i-.5)+angle)*(radius-12)+this.canvas.height/2
        })
      }

    }

    this.context.beginPath();
    this.context.fillStyle = this.params.outer_circle;
    this.context.arc(this.canvas.width/2, this.canvas.height/2, radius-90, Math.PI*2, 0);
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = this.params.inner_circle;
    this.context.arc(this.canvas.width/2, this.canvas.height/2, 5, Math.PI*2, 0);
    this.context.fill();

    this.context.beginPath();
    this.context.fillStyle = this.params.mid_circle;
    this.context.arc(this.canvas.width/2, this.canvas.height/2, 2.5, Math.PI*2, 0);
    this.context.fill();


    if(ball != {}) {
      this.context.beginPath();
      this.context.fillStyle = this.params.ball_color;
      this.context.arc(ball._x, ball._y, 5, Math.PI*2, 0);
      this.context.fill();
    }
  } catch(e) {
    console.log("DEBUG: "+e);
  }
}
Roulette.prototype.setParam = function(param, value) {
  try {
    this.params[param] = value;
  } catch(e) {
    console.log("DEBUG: "+e);
  }
}
