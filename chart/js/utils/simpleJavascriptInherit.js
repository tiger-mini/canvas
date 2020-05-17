(function() {
	var initializing = false,
		fnTest = /xyz/.test(function() {
			xyz;
		}) ? /\b_super\b/ : /.*/;
	this.Class = function() {}; //this---->window
	Class.extend = function(prop) {
		var _super = this.prototype; //  this---->Person构造函数      this.prototype---->Person.prototype  
		initializing = true;
		var prototype = new this(); //Person {}
		initializing = false;
		for(var name in prop) { //可以遍历到init  dance   swingSword
 
			prototype[name] =   //init方法里面调用了 _super
				typeof prop[name] == "function" && typeof _super[name] == "function" && fnTest.test(prop[name]) ?
				(function(name, fn) {
					return function() {
						var tmp = this._super;
						this._super = _super[name];   //闭包的原理
						var ret = fn.apply(this, arguments);
						this._super = tmp;
						return ret;
					};
				})(name, prop[name]) :
 
				prop[name];      
		}
 
		function Class() {
			if(!initializing && this.init)
				this.init.apply(this, arguments);
		}
		Class.prototype = prototype;
		Class.constructor = Class;
		Class.extend = arguments.callee;
		return Class;
	};
 
})();