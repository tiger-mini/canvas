(function() {
    const BG = window.BG = Base.extend({
        init: function() {
            this._super();
            this.canvas = document.getElementById('bgCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.resetCanvasSize();

            this.y = 0;
            this.x = 0;
            this.speed = 24;
            this.timer = null;
            this.w = this.canvas.width;
            this.h = this.canvas.height; //图片高度
            
            const img = new Image();
            img.src = './static/img/background.png';
            img.onload = () => {
                this.ctx.drawImage(img, this.x, this.y)
                this.ctx.drawImage(img, this.x, this.h)
            }
            this.img = img;
        },
        resetCanvasSize: function() {
            this.canvas.width = this.sceenW;
            this.canvas.height = this.sceenH;
        },
        move: function() {
            this.y -= 1;
            if (this.y < -this.h) {
                this.y = 0
            }
        },
        update: function() {
            this.ctx.clearRect(0, 0, this.w, this.h)
            this.ctx.drawImage(this.img, this.x, this.y)
            this.ctx.drawImage(this.img, this.x, this.h + this.y)
        },
        stop: function() {
            if (this.timer) clearInterval(this.timer);
        },
        render() {
            if (this.timer) clearInterval(this.timer);
            this.timer = setInterval(() => {
              this.move();
              this.update();
            }, this.speed)
        }
    });
})();
