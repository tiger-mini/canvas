;
(function () {
  /**
   * 敌机类
   * @type {Class|*|void}
   */
  const EnemyPlan = window.EnemyPlan = Base.extend({
    init: function (bullet, score) {
      this._super();
      //子弹对象
      this.bullet = bullet;
      //得分对象
      this.score = score;
      
      //敌机资源信息
      this.enemyResourcesArray = [
        {
          src: "./static/img/enemy0.png",                  //敌机在非爆炸情况下的资源完整地址
          blastResourcePrefix: "./static/img/enemy0_down", //敌机在爆炸情况下的资源前缀
          blastStep: 4,                                    //爆炸有4个图片 索引从1开始
          blastCurrentStep: -1,                            //当前爆炸步骤
          w: 51,                                           //该敌机的宽度
          h: 39,                                           //该敌机的高度
          needBullet: 1,                                   //打爆该敌机需要的子弹数
          score: 1000                                      //消灭该敌机能获取的分数
        },
        {
          src: "./static/img/enemy1.png",
          blastResourcePrefix: "./static/img/enemy1_down",
          blastStep: 4,
          blastCurrentStep: -1,
          w: 69,
          h: 89,
          needBullet: 2,
          score: 6000
        },
        {
          src: "./static/img/enemy2.png",
          blastResourcePrefix: "./static/img/enemy2_down",
          blastStep: 6,
          blastCurrentStep: -1,
          w: 165,
          h: 246,
          needBullet: 3,
          score: 9000
        }
      ];
      this.enemyResourcesCount = 17;
      this.enemyResourcesHadLoadedCount = 0;
      this.enemyResourcesHadLoaded = false;
      //存放敌机数量数组
      this.enemysArray = [];
      
      //初始化所有的敌机图片资源
      this.initLoadAllResource();
      
      
      this.canvas = document.getElementById("enemyCanvas");
      this.ctx = this.canvas.getContext("2d");
      this.speed = 100;
      this.timer = null;
      this.resetCanvasSize();
      
      this.timerForAddEnemy = null;
      this.speedForAddEnemy = 2000;
      this.timer = null;
      this.speedForMove = 100;
      
      const img = new Image();
      img.src = this.enemyResourcesArray[0].src;
      img.onload = () => {};
      this.img = img;
    },
    //初始加载所有图片资源
    initLoadAllResource() {
      this.enemyResourcesArray.map(item => {
        const img = new Image();
        img.src = item.src;
        img.onload = () => {
          this.enemyResourcesHadLoadedCount++;
          if (this.enemyResourcesCount === this.enemyResourcesHadLoadedCount) {
            this.enemyResourcesHadLoaded = true;
          }
        };
        for (let i = 1; i <= item.blastStep; i++) {
          const blastImg = new Image();
          blastImg.src = item.blastResourcePrefix + i + ".png";
          blastImg.onload = () => {
            this.enemyResourcesHadLoadedCount++;
            if (this.enemyResourcesCount === this.enemyResourcesHadLoadedCount) {
              this.enemyResourcesHadLoaded = true;
            }
          };
        }
      });
    },
    // 获取给定整数区间的随机数
    getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    resetCanvasSize: function () {
      this.canvas.width = this.sceenW;
      this.canvas.height = this.sceenH;
    },
    //获取敌机随机出现的位置
    getRandomPosition: function (resource) {
      const max = this.canvas.width - resource.w;
      return {
        x: this.getRandomNumber(0, max),
        y: -resource.h
      };
    },
    //检测子弹和敌机是否发生相撞
    isHit: function () {
      const bulletArr = this.bullet.bulletsArray;
      this.enemysArray.map(enemy => {
        bulletArr.map(bullet => {
          const minx1 = bullet.x;
          const miny1 = bullet.y;
          const maxX1 = bullet.x + bullet.w;
          const maxY1 = bullet.y + bullet.h;
          
          const minx2 = enemy.x;
          const miny2 = enemy.y;
          const maxX2 = enemy.x + enemy.w;
          const maxY2 = enemy.y + enemy.h;
          
          const minX = Math.max(minx1, minx2);
          const minY = Math.max(miny1, miny2);
          const maxX = Math.min(maxX1, maxX2);
          const maxY = Math.min(maxY1, maxY2);
          
          if (minX < maxX && minY < maxY) {
            if (!enemy.bulletId.includes(bullet.id)) {
              enemy.bulletId.push(bullet.id);
              const len = enemy.bulletId.length;
              if (len > 0 && len >= enemy.needBullet) {
                enemy.canBlast = true;
              }
            }
          }
        });
      });
      this.enemyBlast();
    },
    //添加敌机
    enemyAdd: function () {
      const rd = this.getRandomNumber(0, 2);
      const resource = this.enemyResourcesArray[rd];
      const position = this.getRandomPosition(resource);
      this.enemysArray.push({
        x: position.x,      //敌机的x坐标
        y: position.y,      //敌机的y坐标
        w: resource.w,      //敌机的宽度
        h: resource.h,      //敌机的高度
        src: resource.src,  //敌机在非爆炸情况下的完整资源路径
        bulletId: [],       //击中该敌机的子弹数组
        needBullet: resource.needBullet,
        score: resource.score, //消灭该敌机能获取的分数
        hasAddScore: false,    //已经对外添加过分数了吗
        blastResourcePrefix: resource.blastResourcePrefix,
        blastStep: resource.blastStep,
        blastCurrentStep: resource.blastCurrentStep,
        blastNeedLoop: 5,    //爆炸需要的轮数为5次
        blastCurrentLoop: 0, //爆炸当前的轮数
        canBlast: false      //能爆炸
      });
    },
    //敌机被打中爆炸
    enemyBlast: function () {
      this.enemysArray.map((enemy, index) => {
        if (enemy.canBlast) {
          setInterval(() => {
            if (enemy.blastCurrentStep === -1) {
              enemy.blastCurrentStep = 1;
            }
            enemy.src = `${enemy.blastResourcePrefix}${enemy.blastCurrentStep}.png`;
            enemy.blastCurrentStep++;
            if (enemy.blastCurrentStep > enemy.blastStep) {
              enemy.blastCurrentStep = 1;
              if (enemy.blastCurrentLoop > enemy.blastNeedLoop) {
                enemy.x = -enemy.w;
                enemy.blastCurrentLoop = enemy.blastNeedLoop;
                if (!enemy.hasAddScore) {
                  this.score.addScore(enemy.score);
                  enemy.hasAddScore = true;
                }
              }
              enemy.blastCurrentLoop++;
            }
          }, 24);
        }
      });
    },
    updatePosition: function () {
      this.enemysArray.map((enemy, index) => {
        enemy.y += 10;
        if (enemy.y > this.canvas.height + enemy.h) {
          this.enemysArray.splice(index, 1);
        }
        return enemy;
      });
    },
    move: function () {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.enemysArray.map(enemy => {
        this.img.src = enemy.src;
        this.ctx.drawImage(this.img, 0, 0, enemy.w, enemy.h, enemy.x, enemy.y, enemy.w, enemy.h);
      });
    },
    render: function () {
      this.timerForAddEnemy = setInterval(() => {
        if (this.enemyResourcesHadLoaded) {
          this.enemyAdd();
        }
      }, this.speedForAddEnemy);
      
      this.timer = setInterval(() => {
        if (this.enemyResourcesHadLoaded) {
          this.isHit();
          this.updatePosition();
          this.move();
        }
      }, this.speedForMove);
    }
  });
})();
