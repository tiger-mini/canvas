;
(function() {
    const Bar = window.Bar = Core.extend({
        init: function(canvasId, config) {
            this._super(canvasId, config);
            this.chartBarWidth = 0;
            this.rectArr = [];
            this.mousemoveHandler = null;
        },

        _initCharBarWidth: function() {
            const { data: { dataSet } } = this.options;
            const dsLen = dataSet.length;
            const firstXAxis = this.xAxisArr[0];
            const secondXAxis = this.xAxisArr[1];

            this.chartBarWidth = Math.floor((secondXAxis - firstXAxis) / dsLen);
        },

        render: function() {
            this.draw();
            this._initCharBarWidth();
            this.drawSerise();
            this.bindMouse();
        },

        _drawBar: function(rect, color = 'red') {
            let { w, h, x0, y0, x1, y1, x2, y2, x3, y3 } = rect;
            this.ctx.beginPath();
            this.ctx.moveTo(x0, y0);
            this.ctx.lineTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.lineTo(x3, y3);
            //this.ctx.closePath();
            this.ctx.fillStyle = color; //"rgba(255, 177, 193, 1)";
            this.ctx.fill();
            //this.ctx.strokeStyle = 'rgba(255, 187, 255, 0.5)';
            this.ctx.stroke();

            // this.ctx.fillStyle = "rgba(255, 187, 255, 0.5)";
            // this.ctx.fillRect(x, y, w, h);
        },

        _getRect: function(xValue, yValue) {
            const x0 = xValue + 2;
            const y0 = this.maxYAxis;
            const w = this.chartBarWidth - 4;

            return {
                x0,
                y0,
                x1: x0,
                y1: y0 - yValue,
                x2: x0 + w,
                y2: y0 - yValue,
                x3: x0 + w,
                y3: y0,
                h: yValue,
                w,
                is_active: false,
                is_toolTip: false
            }
        },

        drawSerise: function() {
            const { data: { dataSet } } = this.options;
            if (dataSet) {
                dataSet.forEach((item, index) => {
                    item.data.forEach((point, i) => {
                        const rect = this._getRect(this.xAxisArr[i], point);
                        this.rectArr.push(rect);
                        this._drawBar(rect)
                    });
                });
            }
        },

        _handleMousemove: function(e) {
            const that = this;
            let isLegend = false;
            let box = null;
            let pos = null;
            isLegend = false;
            box = that.canvas.getBoundingClientRect();
            pos = {
                x: e.clientX - box.left,
                y: e.clientY - box.top
            };
            that.rectArr.forEach((rect, index) => {
                if (HelperUtils.isInRect(pos, rect)) {
                    rect.is_active = true;
                    //rect.is_toolTip = true;
                } else {
                    rect.is_active = false;
                    rect.is_toolTip = false;
                }
            });
            that.rectArr.forEach((rect, index) => {
                if (rect.is_active) {
                    that._drawBar(that.rectArr[index], 'blue');
                    this.toolTip.render(rect);
                } else {
                    that._drawBar(that.rectArr[index]);
                }
            });
        },

        bindMouse: function() {
            this.mousemoveHandler = this._handleMousemove.bind(this);
            this.canvas.addEventListener("mousemove", this.mousemoveHandler);
        },

        unbindMouse: function() {
            this.canvas.removeEventListener("mousemove", this.mousemoveHandler)
        }

    });
})();