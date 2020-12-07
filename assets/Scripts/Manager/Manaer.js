// var LongOvil = cc.Class({
    // module.exports = new LongOvil();
// var EnemyManager = require("enemyManager"); 
const Global = require("./Global");
cc.Class({
    extends: cc.Component,

    properties: {
        startNode:cc.Node,
        levelLabel:cc.Label,
        enemyCountLabel:cc.Label,
        scoreCountLabel:cc.Label,
        lifeCountLabel:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;     //开启碰撞检测
        this.initDate();
        this.TSButton = cc.find("Canvas/npc/Ts");
        this.WKButton = cc.find("Canvas/npc/WuKong");
        this.children1 = this.TSButton.children;
        this.children2 = this.WKButton.children;
        this.enemyNode = cc.find("Canvas/Enemys");
        this.bulletNode = cc.find("Canvas/bulletNodes");
        this.WKNode = cc.find("Canvas/npc/WuKong");
        this.TSNode = cc.find("Canvas/npc/Ts");
    },

    update (dt) {
         this.nextLevel();
         this.gameOver();
    },

    startGame: function(){
        this.startNode.active = false;
    },

    initDate: function(){
        Global.levelCount = 1;
        Global.enemyCount = Global.levelCount * 5;
        Global.scoreCount = 0;
        Global.lifeCount = 3;

        this.levelLabel.string = "第"+Global.levelCount+"关"; 
        this.enemyCountLabel.string = "剩余敌人："+Global.enemyCount;
        this.scoreCountLabel.string = "得分："+Global.scoreCount;
        this.lifeCountLabel.string = "剩余生命值："+Global.lifeCount;
    },

    nextLevel: function(){
        if(Global.enemyCount <= 0){
            Global.levelCount++;
            this.levelLabel.string = "第"+Global.levelCount+"关"; 
            Global.enemyCount = Global.levelCount * 5;
            this.enemyCountLabel.string = "剩余敌人："+Global.enemyCount;
            // Global.lifeCount = 3;
            // this.lifeCountLabel.string = "剩余生命值："+Global.lifeCount;
            Global.controlStartGame = true;
            var bulletChildren = this.bulletNode.children;
            for(var i in bulletChildren){
                bulletChildren[i].active = false;
            }
        }
    },

    gameOver: function(){
        if(Global.lifeCount <= 0){
            Global.levelCount = 1;
            Global.enemyCount = Global.levelCount * 5;
            Global.scoreCount = 0;
            Global.lifeCount = 3;
    
            this.levelLabel.string = "第"+Global.levelCount+"关"; 
            this.enemyCountLabel.string = "剩余敌人："+Global.enemyCount;
            this.scoreCountLabel.string = "得分："+Global.scoreCount;
            this.lifeCountLabel.string = "剩余生命值："+Global.lifeCount;
            this.startNode.active = true;
            Global.controlStartGame = true;

            this.children1[0].active = false;
            this.children1[1].active = false;
            this.children2[0].active = false;
            this.children2[1].active = false;

            var enemyChildren = this.enemyNode.children;
            var bulletChildren = this.bulletNode.children;
            for(var i in enemyChildren){
                enemyChildren[i].active = false;
            }
            for(var i in bulletChildren){
                bulletChildren[i].active = false;
            }

            this.WKNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
            this.TSNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
        }
    },


    
});
