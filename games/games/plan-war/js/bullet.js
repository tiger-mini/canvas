;(function () {
  /**
   * 子弹类
   * @type {Class|*|void}
   */
  const Bullet = window.Bullet = Base.extend({
    init: function (plan) {
      this._super();
      this.w = 9; //子弹的宽度
      this.h = 22; //子弹的高度
      
      this.plan = plan;
      this.x = 0;
      this.y = 0;
      this.getBulletInitPosition();
      
      this.speed = 100;
      this.timer = null;
      this.addBulletTimer = null;
      this.addBulletSpeed = 500;
      this.canvas = document.getElementById("bulletCanvas");
      this.ctx = this.canvas.getContext("2d");
      //初始化一个数组，用于存放子弹
      this.bulletsArray = [{ x: this.x, y: this.y, w: this.w, h: this.h }];
      this.resetCanvasSize();
      
      const img = new Image();
      img.src = "./static/img/bullet1.png";
      img.onload = () => {
        this.move();
      };
      this.img = img;
    },
    resetCanvasSize: function () {
      this.canvas.width = this.sceenW;
      this.canvas.height = this.sceenH;
    },
    getBulletInitPosition: function () {
      this.x = this.plan.x + Math.ceil((this.plan.w - this.w) / 2);
      this.y = this.plan.y - 30;
    },
    move: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.bulletsArray.map(bullet => {
        this.ctx.drawImage(this.img, 0, 0, bullet.w, bullet.h, bullet.x, bullet.y, bullet.w, bullet.h);
      })
    },
    stop: function () {
      if (this.timer) clearInterval(this.timer);
      if (this.addBulletTimer) clearInterval(this.addBulletTimer);
    },
    addBullet: function () {
       this.bulletsArray.push({
         x: this.plan.x + Math.ceil((this.plan.w - this.w) / 2),
         y: this.plan.y - 30,
         w: this.w,
         h: this.h
       })
    },
    updateBulletPosition: function() {
      this.bulletsArray.map((bullet, index) =>{
        bullet.y -= 10
        if (bullet.y < 0) {
          this.bulletsArray.splice(index, 1)
        }
        return bullet
      })
    },
    render: function () {
      //添加子弹
      this.addBulletTimer = setInterval(() => {
        this.addBullet();
      }, this.addBulletSpeed);
      //更新子弹位置
      this.timer = setInterval(() => {
        this.updateBulletPosition();
        this.move();
      }, this.speed);
    }
  });
})();
