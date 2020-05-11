;(function() {
   /**
    * 基类
    * @type {Class|*|void}
    */
   const Base = window.Base = Class.extend({
      init: function() {
         this.sceenW = window.screen.width;
         this.sceenH = window.screen.height;
      },
      resetCanvasSize: function() {
      
      },
      move: function() {
      
      },
      update: function() {
      
      },
      /**
       *  render方法在继承的类中必须重写
       */
      render: function() {
         throw  new Error('请重写render函数')
      }
   });
})();




