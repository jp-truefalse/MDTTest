// var LongOvil = cc.Class({
    // module.exports = new LongOvil();
// var LongOvil = cc.Class({
    // module.exports = new LongOvil();
    var Gloabl = require("Global");
const Global = require("./Global");
cc.Class({
    extends: cc.Component,

    properties: {
       enemyPrefab: cc.Prefab,
    },

    start () {
        this.createNewPool();
        this.countEnemy = 0;
        // this.createEnemys();
        this.startNode = cc.find("Canvas/StartButton");
        this.lifeNode = cc.find("Canvas/labelNode/lifeCount");
        this.lifeCountLabel = this.lifeNode.getComponent(cc.Label);
        this.enemyCount = cc.find("Canvas/labelNode/enemyCount");
        this.enemyCountLabel = this.enemyCount.getComponent(cc.Label);
    },

    update (dt) {
        if(!this.startNode.active && Global.controlStartGame){
            this.countEnemy = 0;
            this.createEnemys();
            Global.controlStartGame = false;
        }
    },

    createNewPool: function(){
        this.enemyPool = new cc.NodePool();
        let initCount = 5;
        for(var i = 0; i < initCount; i++){
            let enemy = cc.instantiate(this.enemyPrefab);
            this.enemyPool.put(enemy);
        }
    },

    createEnemy: function(){
        let enemy = null;
        if(this.enemyPool.size() > 0){
            enemy = this.enemyPool.get();
        }
        else{
            enemy = cc.instantiate(this.enemyPrefab);
        }
        enemy.parent = this.node;
        enemy.setPosition(3,-400);
        this.enemyMove(enemy);
    },

    killEnemy: function(enemy){
        enemy.setPosition(3,-400);
        this.enemyPool.put(enemy);
    },

    enemyMove: function(enemy){
        var action1 = cc.moveTo(1,3,-325);
        var action2 = cc.moveTo(1,-195,-325);
        var action3 = cc.moveTo(3,-195,14);
        var action4 = cc.moveTo(1,3,14);
        var action5 = cc.moveTo(3,3,400);
        var self = this;
        enemy.runAction(cc.sequence(action1,action2,cc.callFunc(function(){
            enemy.scaleX = enemy.scaleX * (-1);
        }),action3,action4,cc.callFunc(function(){
            enemy.scaleX = enemy.scaleX * (-1);
        }),action5,cc.callFunc(function(){
            self.killEnemy(enemy);
            Global.lifeCount--;
            self.lifeCountLabel.string = "剩余生命值："+Global.lifeCount;
            Global.enemyCount--;
            self.enemyCountLabel.string = "剩余敌人："+Global.enemyCount;
        })));
    },

    createEnemys: function(){
        // this.createEnemy();
        // var interval = 3;  //间隔
        // var repeat = Global.enemyCount - 2;    //次数+1
        // var delay = 0;    //延时
        // this.callBack = function(){
        //     if(Gloabl.lifeCount == 0){
        //         this.unschedule(this.callback);
        //     }
        //     if(!this.startNode.active){
        //         this.createEnemy();
        //     }
        // };
        // this.enemySchedule = this.schedule(this.callBack, interval, repeat, delay);
        this.createEnemy();
        this.countEnemy++;
        if (this.enemyScheduleID) {
            clearInterval(this.enemyScheduleID);
        }
        this.enemyScheduleID = setInterval(this.enemySchedule.bind(this), 3000);   //一秒钟执行一次

    },

    enemySchedule: function(){
        console.log(this.countEnemy,Global.enemyCount);
        if(!this.startNode.active && (this.countEnemy < Global.levelCount*5)){
            this.createEnemy();
            this.countEnemy++;
        }
        // if(){}
    },
    
});
