(function() {
    var BG = window.BG = Class.extend({
        init: function() {
            this.canvas = document.getElementById('bgCanvas');
            this.w = this.canvas.width;
            this.h = 852; //图片高度
            this.y = 0;
            this.x = 0;
            this.timer = null;

            this.ctx = this.canvas.getContext('2d');
            this.imgUrl = './static/img/background.png';
             
            var self = this; 
            var img = new Image();
            img.src = this.imgUrl;
            img.onload = () => {
                this.ctx.drawImage(img, self.x, self.y)
                this.ctx.drawImage(img, self.x, self.h)
            }
            this.img = img;
        },
        move: function() {
            this.y -= 1;
            if (this.y < -this.h) {
                this.y = 0
                // this.stop();
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
            }, 10)
        }
    });
})();