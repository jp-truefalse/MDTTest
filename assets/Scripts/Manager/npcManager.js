const Global = require("./Global");

cc.Class({
    extends: cc.Component,

    properties: {
        TSButton: cc.Button,
        WKButton: cc.Button,
        bg: cc.Node,
        BulletNode: cc.Node,
        BulletPrefab: cc.Prefab,
    },

    start () {

        this.WKNode = cc.find("Canvas/npc/WuKong");
        this.TSNode = cc.find("Canvas/npc/Ts");
       
        this.satrtNode = cc.find("Canvas/StartButton");
        this.createBulletPool();
        this.TSButton.node.on("click",this.clickTS,this);
        this.WKButton.node.on("click",this.clickWK,this);
        this.bg.on(cc.Node.EventType.MOUSE_MOVE,function(event){
            if((!this.TSButton.node.children[0].active && !this.WKButton.node.children[0].active) || this.satrtNode.active){return;}
            if(this.TSButton.node.children[0].active){
                var localPosition = this.TSButton.node.convertToNodeSpaceAR(event.getLocation());
            }
            if(this.WKButton.node.children[0].active){
                var localPosition = this.WKButton.node.convertToNodeSpaceAR(event.getLocation());
            }
            var m = localPosition.x;
            var n = localPosition.y;
            var value = (80*(n - 45))/(80*Math.sqrt(m*m + (n-45)*(n-45)));
            var angle = Math.floor(180/(Math.PI/Math.acos(value)));
            if(m==0 && n<45){
                angle = 180;
            }
            if(m>0 && n==45){
                angle = 90;
            }
            if(m<0 && n==45){
                angle = 270;
            }
            if(m>0 && n<45){   //2
                angle = 360 + angle;
            }
            if(m<0 && n<45){  //3
                angle = 360 - angle;
            }
            if(m<0 && n>45){  //4
                angle = 360 - angle;
            }
            if(this.TSButton.node.children[0].active){
                this.TSButton.node.children[0].rotation = angle;
            }
            if(this.WKButton.node.children[0].active){
                this.WKButton.node.children[0].rotation = angle;
            }

        },this);

        this.bg.on(cc.Node.EventType.MOUSE_DOWN,function(event){
            if((!this.TSButton.node.children[0].active && !this.WKButton.node.children[0].active) || this.satrtNode.active){return;}
            if(Global.controlCreate){
                if(this.TSButton.node.children[0].active){
                    this.TSNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("attack",1);     //idle,select,aim,attack
                    var localPosition = this.TSButton.node.convertToNodeSpaceAR(event.getLocation());
                    var bullet = this.createBullet();
                    bullet.setPosition(-160,221);
                }
                if(this.WKButton.node.children[0].active){
                    this.WKNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("attack",1);     //idle,select,aim,attack
                    var localPosition = this.WKButton.node.convertToNodeSpaceAR(event.getLocation());
                    var bullet = this.createBullet();
                    bullet.setPosition(-95,-180);
                }
                bullet.runAction(cc.repeatForever(cc.moveBy(1,localPosition.x,localPosition.y)));
                Global.controlCreate = false;
                setTimeout(() => {
                    Global.controlCreate = true;
                }, 1000);
            }
          
        },this);

        this.bg.on(cc.Node.EventType.MOUSE_UP,function(){
            if((!this.TSButton.node.children[0].active && !this.WKButton.node.children[0].active) || this.satrtNode.active){return;}
            if(this.TSButton.node.children[0].active){
                this.TSNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("aim",0);     //idle,select,aim,attack
            }
            if(this.WKButton.node.children[0].active){
                this.WKNode.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("aim",0);     //idle,select,aim,attack
            }
        },this);
    },

    update (dt) {
        this.reaycleBullet();
    },

    clickTS: function(){
        if(this.satrtNode.active){return;}
        var children1 = this.TSButton.node.children;
        var children2 = this.WKButton.node.children;
        if(children1[0].active){
            this.TSButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
            children1[0].active = false;
            children1[1].active = false;
        }
        else{
            this.TSButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("select",1);     //idle,select,aim,attack
            this.TSButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("aim",0);     //idle,select,aim,attack
            this.WKButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
            children1[0].active = true;
            children1[1].active = true;
            children2[0].active = false;
            children2[1].active = false;
        }
    },

    clickWK: function(){
        if(this.satrtNode.active){return;}
        var children1 = this.TSButton.node.children;
        var children2 = this.WKButton.node.children;
        if(children2[0].active){
            this.WKButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
            children2[0].active = false;
            children2[1].active = false;
        }
        else{
            this.WKButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("select",1);     //idle,select,aim,attack
            this.WKButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("aim",0);     //idle,select,aim,attack
            this.TSButton.node.children[2].getComponent("dragonBones.ArmatureDisplay").playAnimation("idle",1);     //idle,select,aim,attack
            children1[0].active = false;
            children1[1].active = false;
            children2[0].active = true;
            children2[1].active = true;
        }
    },

    createBulletPool: function(){
        this.bulletPool = new cc.NodePool();
        let initCount = 5;
        for(var i = 0; i < initCount; i++){
            let bullet = cc.instantiate(this.BulletPrefab);
            this.bulletPool.put(bullet);
        }
    },

    createBullet: function(){
        let bullet = null;
        if(this.bulletPool.size() > 0){
            bullet = this.bulletPool.get();
        }
        else{
            bullet = cc.instantiate(this.BulletPrefab);
        }
        bullet.parent = this.BulletNode;
        return bullet;
    },

    killBullet: function(enemy){
        console.log("1111");
        this.bulletPool.put(enemy);
    },

    reaycleBullet: function(){
        var children = this.BulletNode.children;
        if(children.length <= 0){return;}
        for(var i in children){
            if(children[i].x > 320 || children[i].x < -320 || children[i].y > 568 || children[i].y < -568){
                children[i].stopAllActions();
                this.killBullet(children[i]);
            }
        }
    }

});
