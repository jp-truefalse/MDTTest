var manager = require("npcManager");
const Global = require("./Global");
cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // onLoad () {},

    start () {
       this.enemyCount = cc.find("Canvas/labelNode/enemyCount");
       this.enemyCountLabel = this.enemyCount.getComponent(cc.Label);
       this.scoreCount = cc.find("Canvas/labelNode/score");
       this.scoreCountLabel = this.scoreCount.getComponent(cc.Label);

    },

    // update (dt) {},

    onCollisionEnter:function(){
            this.node.active = false;
            Global.enemyCount--;
            Global.scoreCount++;
            this.scoreCountLabel.string = "得分："+Global.scoreCount;
            this.enemyCountLabel.string = "剩余敌人："+Global.enemyCount;
     
    },

});
