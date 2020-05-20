;(function() {
	const Tooltips = window.Tooltips = Class.extend({
		init: function(superThis) {
			this._superThis = superThis;

			this.activeRect = null; 
		},

		_drawTriangle: function(centerPoint) {
			const { x, y } = centerPoint;
			const ctx = this._superThis.ctx;
			ctx.beginPath();
			ctx.moveTo(x + 6, y - 6);
			ctx.lineTo(x, y);
			ctx.lineTo(x + 6, y + 6);
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
			ctx.fill();
			ctx.stroke();
		},

		_drawTipsBody: function() {
			const { x0, y0, x1, y1, x2, y2, x3, y3, dataSet, dataPoint } =this.activeRect;
			if (dataSet) {
				const { label } = dataSet;
				const text = `${label}: ${dataPoint}`;
				const len = text.length;

				const center = {
					x: x1 + (Math.floor((x2 - x1) / 2)),
					y: y1
				}

				//绘制一个圆角矩形
				const rect = {
					x: center.x + 5,
					y: center.y - 16,
					w: len * 9,
					h: 32
				}
				HelpRect.drawRoundedRect(rect, 6, this._superThis.ctx);

				//绘制一个小三角形
				this._drawTriangle(center);

				//绘制文本
				this._superThis.ctx.fillStyle = '#ffffff';
				this._superThis.ctx.font = '18px 微软雅黑';
				this._superThis.ctx.fillText(text, center.x + 8, center.y + 6)
			}
		},

		drawTips: function() {
			//draw body 
			this._drawTipsBody();
			//draw triangle

		},

		render: function(activeRect) {
			this.activeRect = activeRect; 
			//if (activeRect.is_active && !activeRect.is_toolTip) {
				activeRect.is_toolTip = true;
				console.log('red')
				this.drawTips();
			//}
		}
	});
})();