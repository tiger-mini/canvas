;(function() {
	const Core = window.Core = Class.extend({
		
		init: function(canvasId, config) {
			this.canvas = document.getElementById(canvasId);
            this.ctx = this.canvas.getContext('2d');
            this.config = config;
            this.canvasWidth = this.canvas.width;
            this.canvasHeight = this.canvas.height;
            this.options = config;
            this.title = config.title;

            this.xAxisArr = [];
            this.minYAxis = 0;
            this.maxYAxis = 0;

            this.animate = new Animate({ speed: 10 });
            this.barConfig = DefaultConfig.bar;
		},

        _drawTitle: function() {
        	const { size, color, font, align } = this.barConfig.title;
            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.ctx.font = `${size}px ${font}`;
            this.ctx.fillStyle = color;
            let startX = 0;
            if (AlignConfig.left === align) {
				startX = 0
            } else if (AlignConfig.center === align) {
            	startX = Math.floor(this.canvasWidth - this.title.text.length * size ) / 2
            }
            this.ctx.fillText(this.title.text, startX, size);
        },

        _drawLine(startX, startY, endX, endY, color) {
        	this.ctx.beginPath();
        	this.ctx.moveTo(startX, startY);
        	this.ctx.lineTo(endX, endY);
        	this.ctx.strokeStyle = color;
        	this.ctx.stroke();
        },

        _drawAxis: function() {
            const { data: { labels } } = this.options;
            const { title: { size }, xAxis: { initX }, yAxis: { initY }, axisColor } = this.barConfig;
            if (labels) {
                const ilen = labels.length;
                const lineH = this.canvasHeight - size;
                const splitWidth = Math.floor(this.canvasWidth / ilen);
                this.maxYAxis = lineH - initY;
                this.minYAxis = initX;
                labels.forEach((label, index) => {
                	const x = initX + (splitWidth * index);
            		this.xAxisArr.push(x);
                	this._drawLine(x, size, x, this.maxYAxis, axisColor)
                });
                //或者Chart底部X轴
                this._drawLine(initX, this.maxYAxis, this.canvasWidth, this.maxYAxis, axisColor)
            }
        },

        _drawDataSet: function() {
            const { data: { dataSet } } = this.options;
            if (dataSet) {
            	dataSet.forEach((data, index) => {
            		console.log('data', data)
            	})
            }
        },

        draw: function() {
        	this._drawTitle();
            this._drawAxis();
            //this._drawDataSet();
        },

		render: function() {
			throw new Error("please implement the render method")
		},

        update: function() {

        }
	})
})();
