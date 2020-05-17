;(function () {
  /*
   * 得分类
   */
  const Score = window.Score = Base.extend({
    init: function () {
      this._super();
      this.canvas = document.getElementById("scoreCanvas");
      this.ctx = this.canvas.getContext("2d");
      
      this.score = 0;
    },
    draw: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.font = "38px Verdana";
      const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
      gradient.addColorStop(0,"magenta");
      gradient.addColorStop(0.5,"blue");
      gradient.addColorStop(1.0,"red");
      this.ctx.fillStyle = gradient;
      const score = this.score.toString();
      const len = score.length * 38;
      this.ctx.fillText(score, (this.canvas.width - len) / 2, 50);
    },
    //增加得分
    addScore: function (score) {
      this.score += score;
      this.draw()
    },
    render: function () {
      this.draw();
    }
  });
})();
