;(function() {
	const Tooltips = window.Tooltips = Class.extend({
		init: function(superThis) {
			this._superThis = superThis;
		},
		render: function(activeRect) {
			if (activeRect.is_active && !activeRect.is_toolTip) {
				activeRect.is_toolTip = true;
				console.log('red')
			}
		}
	});
})();