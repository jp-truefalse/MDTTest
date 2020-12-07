
var Global = cc.Class({
    extends: cc.Component,

    properties: {
        controlStartGame:true,
        enemyCount:null,
        lifeCount:null,
        levelCount: null,
        scoreCount: null,
        controlCreate:true,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
module.exports = new Global();
