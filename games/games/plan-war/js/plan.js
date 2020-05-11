;(function () {
  const Plan = window.Plan = Base.extend({
    init: function () {
      this._super();
      this.canvas = document.getElementById("planCanvas");
      this.ctx = this.canvas.getContext("2d");
      this.resetCanvasSize();
      this.w = 100; //飞机的宽度
      this.h = 124; //飞机的高度
      
      this.x = Math.floor((this.sceenW - this.w) / 2);
      this.y = this.sceenH - this.h - 20;
      this.timer = null;
      this.speed = 100;
      
      this.resourcesArr = ["./static/img/hero1.png", "./static/img/hero2.png"];
      this.count = 1;
      this.imgHero1 = this.resourcesArr[0];
      this.imgHero2 = this.resourcesArr[1];
      const img = new Image();
      img.src = this.imgHero1;
      img.onload = () => {
        this.ctx.drawImage(img, 0, 0, this.w, this.h, this.x, this.y, this.w, this.h);
        this.img = img;
      };
      this.bindKeyboard();
    },
    resetCanvasSize: function () {
      this.canvas.width = this.sceenW;
      this.canvas.height = this.sceenH;
    },
    move(e) {
      const event = e || window.event;
      switch (event.keyCode) {
        case 37:
          this.x -= 10;
          if (this.x <= 0) {
            this.x = 0
          }
          break;
        case 38:
          this.y -= 10;
          if (this.y <= 0) {
            this.y = 0
          }
          break;
        case 39:
          this.x += 10;
          if (this.x + this.w > this.sceenW) {
            this.x = this.sceenW - this.w
          }
          break;
        case 40:
          this.y += 10;
          if (this.y + this.h > this.sceenH) {
            this.y = this.sceenH - this.h
          }
          break;
      }
    },
    bindKeyboard: function(e) {
       document.addEventListener("keydown", this.move.bind(this, e))
    },
    render: function () {
      this.timer = setInterval(() => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.count === 1) {
          this.count = 2;
          this.img.src = this.imgHero2;
        } else if (this.count === 2) {
          this.count = 1;
          this.img.src = this.imgHero1;
        }
      }, this.speed);
    }
  });
})();
