;
(function() {
    /**
     * 敌机类
     * @type {Class|*|void}
     */
    const EnemyPlan = window.EnemyPlan = Base.extend({
        init: function(bullet) {

            this._super();
            //子弹对象
            this.bullet = bullet;

            this.canvas = document.getElementById("enemyCanvas");
            this.ctx = this.canvas.getContext("2d");
            this.speed = 100;
            this.timer = null;
            this.resetCanvasSize();

            //敌机资源信息
            this.enemyResourcesArray = [
                {
                    src: "./static/img/enemy0.png",
                    blastResourcePrefix: "./static/img/enemy0_down",
                    blastStep: 4, //爆炸有4个图片 索引从1开始
                    blastCurrentSetp: -1, //当前爆炸步骤
                    w: 51,
                    h: 39,
                    needBullet: 1, //打爆该敌机需要的子弹数
                },
                {
                    src: "./static/img/enemy1.png",
                    blastResourcePrefix: "./static/img/enemy1_down",
                    blastStep: 4, //爆炸有4个图片 索引从1开始
                    blastCurrentSetp: -1, //当前爆炸步骤
                    w: 69,
                    h: 89,
                    needBullet: 2
                },
                {
                    src: "./static/img/enemy2.png",
                    blastResourcePrefix: "./static/img/enemy2_down",
                    blastStep: 6, //爆炸有4个图片 索引从1开始
                    blastCurrentSetp: -1, //当前爆炸步骤
                    w: 165,
                    h: 246,
                    needBullet: 3
                }
            ];
            //存放敌机数量数组
            this.enemysArray = [];

            this.timerForAddEnemy = null;
            this.speedForAddEnemy = 2000;
            this.timer = null;
            this.speedForMove = 100;

            const img = new Image();
            img.src = this.enemyResourcesArray[0].src;
            img.onload = () => {};
            this.img = img;
        },
        // 获取给定整数区间的随机数
        getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        },
        resetCanvasSize: function() {
            this.canvas.width = this.sceenW;
            this.canvas.height = this.sceenH;
        },
        //获取敌机随机出现的位置
        getRandomPosition: function(resource) {
            const max = this.canvas.width - resource.w;
            return {
                x: this.getRandomNumber(0, max),
                y: -resource.h,
            }
        },
        //检测子弹和敌机是否发生相撞
        isHit: function() {
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
                                enemy.isBlast = true;
                                this.enemyBlast();
                            }
                        }
                    }
                });
            });
        },
        //添加敌机
        enemyAdd: function() {
            const rd = this.getRandomNumber(0, 2);
            const resource = this.enemyResourcesArray[rd];
            const position = this.getRandomPosition(resource);
            this.enemysArray.push({
                x: position.x,
                y: position.y,
                w: resource.w,
                h: resource.h,
                src: resource.src,
                bulletId: [], //击中该敌机的子弹
                needBullet: resource.needBullet,
                isBlast: false, //是否爆炸
            })
        },
        //敌机被打中爆炸
        enemyBlast: function() {
            const blastEnemyArr = this.enemysArray.filter(enemy => enemy.isBlast);
            blastEnemyArr.map(enemy => {
                setInterval(() => {
                    if (enemy.blastCurrentSetp === -1) {
                        enemy.blastCurrentSetp = 1;
                    }
                    enemy.src = `${this.blastResourcePrefix}${enemy.blastCurrentSetp}.png`
                    console.log(enemy.src)
                }, 24)
            })
        },
        updatePosition: function() {
            this.enemysArray.map((enemy, index) => {
                if (!enemy.isBlast) {
                    enemy.y += 10
                    if (enemy.y > this.canvas.height + enemy.h) {
                        this.enemysArray.splice(index, 1)
                    }
                }
                return enemy
            })
        },
        move: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.enemysArray.map(enemy => {
                this.img.src = enemy.src;
                this.ctx.drawImage(this.img, 0, 0, enemy.w, enemy.h, enemy.x, enemy.y, enemy.w, enemy.h);
            })
        },
        render: function() {
            this.timerForAddEnemy = setInterval(() => {
                this.enemyAdd()
            }, this.speedForAddEnemy);

            this.timer = setInterval(() => {
                this.isHit();
                this.updatePosition();
                this.move();
            }, this.speedForMove)
        }
    });
})();