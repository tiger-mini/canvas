;(function() {
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
      render: function() {
         throw  new Error('请重写render函数')
      }
   });
})();




