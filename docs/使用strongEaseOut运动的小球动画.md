
### 使用easeout运动的缓动动画


#### 使用ease 运动的js方法

``` html
 <div id="ball"></div>
```

``` style
#ball{
    position: absolute;
    left: 30px;
    width: 50px;
    height: 50px;
    background-color: red;
    border-radius: 50px;
}
```


```js
window.onload = function() {

	var tween = {
	  linear:function(t,b,c,d){
	    return c*t/d + b;
	  },
	  easeIn:function(t,b,c,d){
	    return c * ( t /= d ) * t + b;
	  },
	  easeOut: function (t, b, c, d) {
	    if ((t /= d) < (1 / 2.75)) {
	      return c * (7.5625 * t * t) + b;
	    } else if (t < (2 / 2.75)) {
	      return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
	    } else if (t < (2.5 / 2.75)) {
	      return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
	    } else {
	      return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
	    }
	  },
	  strongEaseIn:function(t,b,c,d){
	    return c * ( t /= d ) * t * t * t * t + b;
	  },
	  strongEaseOut:function(t,b,c,d){
	    return c * ( ( t = t / d -1 ) * t * t * t * t +1 ) + b;
	  },
	  sineaseIn:function(t,b,c,d){
	    return c * ( t /= d ) * t * t + b;
	  },
	  sineaseOut:function(t,b,c,d){
	    return c * ( ( t = t / d -1 ) * t * t *t +1 ) + b;
	  },
	};

	var Animate = function(dom){
	  this.dom = dom;
	  this.startTime = 0;
	  this.startPos = 0;
	  this.endPos = 0;
	  this.propertyName = null;
	  this.easing = null;
	  this.duration = null;
	}

	Animate.prototype.start = function(propertyName,endPos,duration,easing){
	  this.startTime = +new Date;
	  this.startPos = this.dom.getBoundingClientRect()[propertyName];
	  this.endPos = endPos;
	  this.propertyName = propertyName;
	  this.duration = duration;
	  this.easing = tween[easing];

	  var self = this;
	  // var timeId = setInterval(function(){
	  //   if(self.step() === false){
	  //     clearInterval(timeId);
	  //   }
	  // },19);
	  let requestId;
	  function gg() {
	    if (self.step()) {
	      requestId = window.requestAnimationFrame(gg)
	    } else {
	      window.cancelAnimationFrame(requestId)
	    }
	  }
	  gg();
	}

	Animate.prototype.step = function(){
	  var t = +new Date;
	  if(t>=this.startTime + this.duration){
	    this.update(this.endPos);
	    return false;
	  }
	  var pos = this.easing(t-this.startTime, this.startPos, this.endPos - this.startPos, this.duration);
	  this.update(pos);
	  return true
	}

	Animate.prototype.update = function(pos){
	  this.dom.style[this.propertyName] = pos + 'px';
	}

	var div = document.getElementById('ball');
	var animate = new Animate(div);
	animate.start('left', 500, 1000,'easeOut');
}
```









