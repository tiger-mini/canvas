;
(function() {
    const Bar = window.Bar = Core.extend({
        init: function(canvasId, config) {
            this._super(canvasId, config);
            this.chartBarWidth = 0;
        },

        _initCharBarWidth: function() {
        	const { data: { dataSet } } = this.options;
        	const dsLen = dataSet.length;
        	const firstXAxis = this.xAxisArr[0];
        	const secondXAxis = this.xAxisArr[1];

        	return Math.floor((secondXAxis - firstXAxis) / dsLen);
        },

        render: function() {
            this.draw();
            this.chartBarWidth = this._initCharBarWidth();
            this.drawSerise()
        },

        _drawBar: function(rect) {
        	let { w, h, x, y } = rect;
        	x = x + 2;
        	w = w - 4;
        	this.ctx.beginPath();
        	this.ctx.moveTo(x, x + h);
        	this.ctx.lineTo(x, y);
        	this.ctx.lineTo(x + w, y);
        	this.ctx.lineTo(x + w, x + h);
        	this.ctx.closePath();
        	this.ctx.fillStyle = "rgba(255, 187, 255, 0.9)";
        	this.ctx.fill();
        	//this.ctx.strokeStyle = 'rgba(255, 187, 255, 0.5)';
        	this.ctx.stroke();

        	// this.ctx.fillStyle = "rgba(255, 187, 255, 0.5)";
        	// this.ctx.fillRect(x, y, w, h);
        },

        _getRect: function(xValue, yValue) {
        	return {
        		x: xValue + 2,
        		y: this.maxYAxis - yValue,
        		h: this.maxYAxis - this.minYAxis,
        		w: this.chartBarWidth - 4
        	}
        },

        drawSerise: function() {

        	const { data: { dataSet } } = this.options;
            if (dataSet) {
            	dataSet.forEach((item, index) => {
            		console.log('item ----', item)
            		console.log(this.xAxisArr)
            		item.data.forEach((point, i) => {
            			const rect = this._getRect(this.xAxisArr[i], point)
            			this._drawBar(rect)
            		});
            	});
            }

        }

    });
})();